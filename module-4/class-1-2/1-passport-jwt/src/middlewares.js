import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "./config.js";
import { User } from "./User.js";

import dotenv from "dotenv";
dotenv.config();


const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(new Strategy(params, (payload, done) => {
  User.find({ _id: payload.id })
    .then(([user]) =>
      !user
        ? done(new Error("User not found!"))
        : done(null, user)
    ).catch(done);
}));

export const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (!user || error) return res.status(401).json({ message: "Unauthorized!" });
    req.user = user;
    next();
  })(req, res, next);
};