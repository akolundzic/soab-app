const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const { eventsschema } = require("../models/events");

const getEvents = async function (req, res, next) {
  const query = req.params.events;
  const filter = null;
  const arr = ["time", "date", "district"];
  //
  res.send(query);

  // try {
  //   // await eventsschema.find({ filter }, (err, data) => res.send(data));
  //   // res.send(await Object.entries(eventsschema));

  //   res.send(query + " , " + filter);
  //   // });
  // } catch (err) {
  //   console.log(err.message);
  //   res.status(404).send("No data found, query is:" + req.params.query);
  // }
};

const postEvents = (req, res) => {
  const { user, date, time, district, image, city, description } = req.body;

  eventsschema
    .create({
      user: {
        id: user.id,
        name: user.name,
      },
      date: date,
      city: city,
      district: district,
      time: time,
      image: image,
      description: description,
    })
    .then(function (newMessage) {
      res.send(newMessage);
    });

  // console.log(
  //   "user:" +
  //     user +
  //     "" +
  //     "date: " +
  //     date +
  //     "location: " +
  //     location +
  //     "image: " +
  //     image +
  //     "" +
  //     "location:" +
  //     location +
  //     "" +
  //     "description :" +
  //     description
  // );
};

//Initialize
module.exports = {
  getEvents: getEvents,
  postEvents: postEvents,
};
