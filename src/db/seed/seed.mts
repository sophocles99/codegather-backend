import db from "../connection.mjs";
import usersData from "../data/developement/usersData.mjs";
import { UserModel } from "../../models/users.model.mjs";

db.dropCollection("users").then(() => {
  UserModel.insertMany(usersData)
    .then((data) => {
      console.log("Users collection created");
      eventsData.forEach((event) => {
        userIdIndex = Math.floor(Math.random() * data.length);
        event.user_id = data[userIdIndex]._id;
        newEvent = EventModel(event);
        newEvent.save();
      });
    })
    .catch((e) => {
      console.log(e);
    });
});
