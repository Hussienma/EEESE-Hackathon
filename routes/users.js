const express = require("express");
const { check, validationResult } = require("express-validator");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const router = express.Router();

const auth = require("../middleware/auth");

//@Route    PUT /users/addpatient/:patient_id
//@Descrip  Puts or updates the doctor in charge of the patient
//@Access   Private
router.put("/addpatient/:patient_id", auth, async (req, res) => {
  try {
    let doc = await Doctor.findById(req.user.id);
    if (!doc) {
      return res.status(404).json({ msg: "Doctor not found" });
    }
    let patient = await Patient.findById(req.params.patient_id);

    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    doc.patients.push(patient);
    patient.doctor = doc;

    await doc.save();
    await patient.save();

    res.json(doc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@Route    PUT /users/addpatient/:patient_id
//@Descrip  Puts or updates the doctor in charge of the patient
//@Access   Private
router.put(
  "/addshift",
  [
    auth,
    check("start", "Enter a valid date").isDate(),
    check("end", "Enter a valid date").isDate(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    try {
      const doc = await Doctor.findById(req.user.id);
      if (!doc) {
        return res.status(404).json({ msg: "Doctor not found" });
      }

      const { start, end } = req.body;

      doc.shifts.push({ start, end });

      await doc.save();

      res.json(doc.shifts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@Route    PUT /users/addpatient/:patient_id
//@Descrip  Puts or updates the doctor in charge of the patient
//@Access   Private
router.post(
  "/updatecondition",
  [auth, check("condition", "Please enter condition").exists()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    try {
      const patient = await Patient.findById(req.user.id);

      if (!patient) {
        return res.status(404).json({ msg: "Patient not found" });
      }
      const { condition } = req.body;
      patient.updates.push({ condition });

      await patient.save();

      res.json(patient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@Route    PUT /users/appointment
//@Descrip  Appoints the doctor to the patient when available
//@Access   Private
router.put("/appointment", auth, async (req, res) => {
  try {
    let patient = await Patient.findById(req.user.id);

    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }
    let doc = await Doctor.findById(patient.doctor);

    if (!doc) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    // Check the doctor availablility
    for (let shift of doc.shifts) {
      const today = new Date().getTime();
      if (shift.end.getTime() - today > 0) {
        patient.appointment = shift.start;
        await patient.save();

        return res.json({ appointment: patient.appointment });
      }
    }
    res.json({ msg: "Doctor not available" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
