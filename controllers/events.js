const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const { eventsschema } = require("../models/events");
const aggregationobject = {
  venueName: "$venueName",
  time: "$time",
  location: "$location",
  date: "$date",
  event: "$event",
};
const errors = {
  time: "",
  date: "",
  eventName: "",
};
// const moment = require("moment");
// pm.globals.set("today", moment().format("MM/DD/YYYY"));
//handle errors
const handleErrors = (err) => {
  if (err.message.includes("events validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const getEvents = async function (req, res, filter) {
  try {
    await eventsschema
      .find(filter)
      .sort({ date: 1 })
      .then((dbModel) => res.json(dbModel));
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors: errors });
  }
};

const postEvents = async (req, res) => {
  const {
    date,
    time,
    venueName,
    city,
    address,
    image,
    eventName,
    description,
  } = await req.body;
  try {
    const identical = await eventsschema.aggregate([
      {
        $group: {
          _id: {
            venueName: "$venueName",
            time: "$time",
            location: "$location",
            date: "$date",
            event: "$event",
          },
          count: { $sum: 1 },
        },
      },
    ]);
    if (identical[1].count > 0) {
      console.log(identical[1].count);
      return res.status(400).json({
        errors: "Event already exists, please change specific details",
      });
    } else {
      await eventsschema
        .create({
          date: date,
          time: time,
          city: city,
          venueName: venueName,
          address: {
            street: address.street,
            number: address.number,
            district: address.district,
          },
          eventName: eventName,
          description: description,
          //url string - later on multer
          image: image,
        })
        .then((data) => {
          res.status(201).json(data);
        });
      //end else statement
    }
    //end try statement
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors: errors });
  }
};
const updateEvent = async function (req, res) {
  try {
    await eventsschema
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((data) => {
        res.status(201).json(data);
      });
  } catch (err) {
    res.status(422).send(err.message);
  }
};
const removeEvent = async function (req, res) {
  try {
    await eventsschema
      .findById({ _id: req.params.id })
      .then((data) => data.remove())
      .then((data) => {
        res.status(201).json(data);
      });
  } catch (err) {
    res.status(422).send(err.message);
  }
};

//Initialize
module.exports = {
  getEvents: getEvents,
  postEvents: postEvents,
  removeEvent: removeEvent,
  updateEvent: updateEvent,
};
