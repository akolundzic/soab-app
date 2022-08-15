const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const { eventsschema } = require("../models/events");

const getEvents = async function (req, res, next) {
  const query = req.params.query;
  const filter = null;
  switch (query) {
    case "location":
      filter = { location: query };
    case "date":
      filter = { date: query };
    case "events":
      filter = {};
  }
  try {
    // await eventsschema.find({ filter }, (err, data) => res.send(data));
    // res.send(await Object.entries(eventsschema));
    console.log("201 successfully");
    res.send("201");
    // });
  } catch (err) {
    console.log(err.message);
    res.status(404).send("No data found, query is:" + req.params.query);
  }
};

const postEvents = async function (req, res) {
  // const { user, date, location, image, description } = req.body;
  console.log(req.body);
  // eventsschema.create({
  //   user: {
  //     id: user.id,
  //     name: user.name,
  //   },
  //   date: Date(),
  //   location: location,
  //   image: image,
  //   description: description,
  // });
  res.send("201");
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
  // .then(function (newMessage) {
  //   res.send(newMessage);
  // });
};

//Initialize
module.exports = {
  getEvents: getEvents,
  postEvents: postEvents,
};
