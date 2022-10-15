const mongoose = require("mongoose");
const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../middleware/auth");

const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

//@route    POST /hospital/
//@descrip  Register a hospital
//@access   public
router.post(
  "/hospital",
  [
    //CHecking the data sent
    check("username", "Please enter a valid username").exists(),
    check("password", "Please enter a valid password").exists(),
    check("location", "Please enter a valid location").exists(),
    check("name", "Please enter a valid name").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const { name, username, password, location } = req.body;

    try {
      let hospital = await Hospital.findOne({ username });

      if (hospital) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Hospital already exists" }] });
      }

      hospital = new Hospital({
        name,
        username,
        password,
        location,
      });

      const salt = await bcrypt.genSalt(10);
      hospital.password = await bcrypt.hash(password, salt);

      await hospital.save();

      const payload = {
        user: { id: hospital.id },
        role: "admin",
      };

      jwt.sign(payload, config.get("JWT"), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    POST /login/
//@descrip  Login
//@access   public
router.post(
  "/login",
  [
    check("username", "Please inculde a valid username").exists(),
    check("password", "Please inculde a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await Patient.findOne({ username });

      if (!user) {
        user = await Doctor.findOne({ username });
        if (!user) {
          user = await Hospital.findOne({ username });
          if (!user) {
            return res
              .status(400)
              .json({ errors: { msg: "Invalid Credentials" } });
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return res
              .status(400)
              .json({ errors: { msg: "Invalid Credentials" } });
          }

          const payload = {
            user: { id: user.id },
            role: "admin",
          };

          jwt.sign(payload, config.get("JWT"), (err, token) => {
            if (err) throw err;
            res.json({ token });
          });
        }
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: { msg: "Invalid Credentials" } });
      }

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(payload, config.get("JWT"), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    POST /doctors/
//@descrip  Register doctor
//@access   Restricted
router.post(
  "/doctors",
  [
    auth,
    check("name", "Enter a valid name").exists(),
    check("username", "Enter a valid username").exists(),
    check("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    if (req.role !== "admin") {
      return res.status(401).json({ msg: "Access Denied" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const { name, username, password } = req.body;

    try {
      let doctor = await Doctor.findOne({ username });

      if (doctor) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Doctor already exists" }] });
      }

      doctor = new Doctor({
        name,
        username,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(password, salt);

      await doctor.save();

      const payload = {
        user: { id: doctor.id },
      };

      jwt.sign(payload, config.get("JWT"), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    POST /patients/
//@descrip  Register patient
//@access   Restricted
router.post(
  "/patients",
  [
    auth,
    check("name", "Enter a valid name").exists(),
    check("username", "Enter a valid username").exists(),
    check("password", "Enter a valid password").exists(),
    check("status", "Enter a valid status").exists(),
    check("gender", "Enter a valid gender").exists(),
    check("age", "Enter a valid age").isNumeric(),
  ],
  async (req, res) => {
    if (req.role !== "admin") {
      return res.status(401).json({ msg: "Access Denied" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const { name, username, password, gender, age, status } = req.body;

    try {
      let patient = await Patient.findOne({ username });

      if (patient) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Patient already exists" }] });
      }

      patient = new Patient({
        name,
        username,
        password,
        gender,
        age,
        status,
      });

      const salt = await bcrypt.genSalt(10);
      patient.password = await bcrypt.hash(password, salt);

      await patient.save();

      const payload = {
        user: { id: patient.id },
      };

      jwt.sign(payload, config.get("JWT"), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    GET /hospitals/
//@descrip  Test
//@access   private
router.get("/hospitals", (req, res) => res.send("Hello from hospitals"));

module.exports = router;
