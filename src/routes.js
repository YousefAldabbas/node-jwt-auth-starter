import express from "express";
import {
  createUserHandler,
  loginUserHandler,
  refreshTokenHandler,
} from "./controller/user.controller";
import { protect } from "./middleware/authMiddleware";

export default function routes(app) {
  //  check if the server working
  app.get("/healthcheck", (req, res) => res.sendStatus(200));
  //  create user
  app.route("/auth/").post(createUserHandler);
  app.route("/auth/login").post(loginUserHandler);
  app.route("/auth/refresh").post(refreshTokenHandler);
  //  for testing only
  app.route("/protect").get(protect, (req, res) => res.send(req.email));
}
