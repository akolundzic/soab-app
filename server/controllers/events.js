const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const { eventsschema } = require("../models/events");

const getEvents = async function (req, res, filter) {
  try {
    await eventsschema
      .find(filter)
      .sort({ date: 1 })
      .then((dbModel) => res.json(dbModel));
  } catch (err) {
    console.log(err.message);
    res.status(404).send("No data found");
    console.log(req.params);
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
      .then(async function (data) {
        console.log(data);
        res.send(await data);
        // res.send(venueName);
      });
  } catch (err) {
    res.status(422).send(err.message);
  }
};
const updateEvent = async function (req, res) {
  try {
    await eventsschema
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((data) => res.json(data));
  } catch (err) {
    res.status(422).send(err.message);
  }
};
const removeEvent = async function (req, res) {
  try {
    await eventsschema
      .findById({ _id: req.params.id })
      .then((data) => data.remove())
      .then((data) => res.json(data));
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
