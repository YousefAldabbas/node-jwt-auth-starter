import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import logger from "../utils/logger";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email address"],
      unique: [true, "This email is already in use"],
      validate: {
        validator: checkEmail,
        message: "Not a valid e-mail",
      },
      lowercase: true,
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: [true, "That username has been taken."],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      select: false,
      minLength: 8,
    },
  },
  { timestamps: true }
);

function checkEmail() {
  return validator.isEmail(this.email);
}

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(Number(process.env.saltWorkFactor));
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => {
    logger.error(e);
    return false;
  });
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
