import "dotenv/config";
import express from "express";
import User from "../model/User.mjs";
import { createJWT, verifyJWT } from "../utils/authUtils.mjs";
import { OAuth2Client } from "google-auth-library";
import Subscriber from "../model/Subscribers.mjs";
import { compare, hash } from "bcrypt";

const client = new OAuth2Client();

const authRouter = express.Router();

const checkAuthMiddleWare = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const auth = verifyJWT(token);
    if (auth) {
      next();
    }
  } catch {
    return res
      .status(401)
      .json({ code: 401, message: "Unautenticated attempt!" });
  }
};

const logInUser = (user, res) => {
  const token = createJWT({ id: user.id });

  return res
    .status(200)
    .json({ message: "User authenticated successfully!", user, token });
};

authRouter.post("/login", async (req, res, next) => {
  const credentials = req.body;
  const { identifier, identifierType, password } = credentials;

  if (!identifier || !identifierType || !password) {
    return res.status(400).json({
      code: 400,
      message: "Atleast one of the mandatory information is missing",
    });
  }

  try {
    const user = await User.findOne({ [identifierType]: identifier });

    if (user) {
      const passwordMatched = await compare(password, user.password);

      if (passwordMatched) {
        logInUser(user, res);
      } else {
        return res.status(401).json({
          code: 401,
          message: "Credentials didn't match!",
        });
      }
    } else {
      return res.status(401).json({
        code: 401,
        message: "Account with given email or mobile no. doesn't exist!",
      });
    }
  } catch (err) {
    next(err);
  }
});

authRouter.post("/sign-up", async (req, res, next) => {
  const userData = req.body;
  const {
    firstName,
    lastName,
    email,
    mobile,
    countryCallingCode,
    nationalNumber,
    password,
  } = userData;

  if (
    (!email && !mobile) ||
    !firstName ||
    !lastName ||
    (mobile && (!countryCallingCode || !nationalNumber)) ||
    !password
  ) {
    res.status(400).json({
      code: 400,
      message: "Bad request, at least one of the mandatory field is missing!",
    });
  }
  /* check if email or mobile exists */
  try {
    let criteria = [];
    if (email) {
      criteria.push({ email: email });
    }

    if (mobile) {
      criteria.push({ mobile: mobile });
    }

    let user = await User.findOne({
      $or: criteria,
    });

    if (user) {
      return res.status(400).json({
        code: 400,
        message: "User already exists, for given email or mobile",
      });
    }

    const saltRounds = 10;
    const hashedPwd = await hash(password, saltRounds);

    user = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      countryCallingCode,
      nationalNumber,
      password: hashedPwd,
    });

    const token = createJWT({ id: user.id });
    return res
      .status(201)
      .json({ message: "Signed up successfully!", user, token });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login-with-google", async (req, res, next) => {
  const googleAccessToken = req.body.googleAccessToken;

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleAccessToken,
      audience: process.env.GOOGLE_OAUTH2_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub: googleId,
      given_name: firstName,
      family_name: lastName,
      email,
    } = payload;

    let user = await User.findOne({ googleId });

    if (user) {
      logInUser(user, res);
    } else {
      user = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            googleId,
            firstName,
            lastName,
            email,
            updatedDate: new Date(),
          },
        },
        { upsert: true, new: true }
      );

      logInUser(user, res);
    }
  } catch (err) {
    next(err);
  }
});

authRouter.post("/subscribe-to-newsletter", async (req, res, next) => {
  const email = req.body.email;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ code: 400, message: "Bad Request, please provide email!" });
    }

    let sub = await Subscriber.findOne({ email });

    if (sub) {
      return res.status(200).json({
        subscriber: sub,
        message: "You're already subscribed to our newsletters!",
      });
    } else {
      sub = await Subscriber.create({
        email,
      });
      return res.status(201).json({
        subscriber: sub,
        message: "You're now subscribed to our newsletters!",
      });
    }
  } catch (err) {
    next(err);
  }
});

export default authRouter;
export { checkAuthMiddleWare };
