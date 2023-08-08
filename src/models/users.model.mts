import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUser } from "../../types/interfaces.js";

interface IUserDocument extends IUser {
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  }
});

userSchema.pre("insertMany", function (next, docs) {
  if (Array.isArray(docs) && docs.length) {
    const hashPromises = docs.map((user) => {
      return bcrypt
        .hash(user.password, 8)
        .then((hash) => (user.password = hash));
    });
    Promise.all(hashPromises).then((hashedUsers) => {
      docs = hashedUsers;
      next();
    });
  }
});

userSchema.methods.comparePassword = function (password: string) {
  if (!password) {
    console.log("Password is missing, cannot compare");
    return;
  }
  return bcrypt
    .compare(password, this.password)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log("Error while comparing password", err.message);
    });
};

export const UserModel = model("User", userSchema);
