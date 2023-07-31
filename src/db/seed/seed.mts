import db from "../connection.mjs";
import usersData from "../data/developement/usersData.js";
import { UserModel } from "../../models/users.model.mjs";

db.dropCollection('users');

UserModel.insertMany(usersData)
.then((data)=>{
    console.log(data);
}).catch((e)=>{
    console.log(e);
});