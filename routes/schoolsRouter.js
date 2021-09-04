const express = require("express");
const isAuth = require("../middlewares/isAuth");
const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const sanitize = require("mongo-sanitize");
const { db } = require("../models/schoolsModel");
const schoolsRouter = express.Router();

// Define routes

schoolsRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.send("Schools route");
  })
);

// Get all schools by aff code
schoolsRouter.get(
  "/get/:authToken/aff/:affCode",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const aff = sanitize(req.params.affCode);
    // find all schools by with the same aff code in collection schools
    const schools = await db.collection("AllSchools").find({ aff_no: aff });
    // convert the schools to an array
    const schoolsArray = await schools.toArray();
    // if no schools found on aff
    if (schoolsArray.length === 0) {
      res.status(404).json({
        message: "No schools found for this aff",
      });
    }
    // if schools found on aff
    else {
      res.status(200).json(schoolsArray);
    }
  })
);

// get all schools by school name
schoolsRouter.get(
  "/get/:authToken/name/:schoolName",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const schoolName = sanitize(req.params.schoolName);
    // find if exact match if not apply regex
    const schools = await db.collection("AllSchools").find({
      name: { $regex: schoolName, $options: "i" },
    });
    // convert the schools to an array
    const schoolsArray = await schools.toArray();
    // if no schools found
    if (schoolsArray.length === 0) {
      res.status(404).json({
        message: "No schools found for this school name",
      });
    }
    // if schools found
    else {
      res.status(200).json(schoolsArray);
    }
  })
);

// Get all schools by pin code
schoolsRouter.get(
  "/get/:authToken/pin/:pinCode",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const pin = sanitize(req.params.pinCode);
    // find all schools by with the same pin code in collection schools
    const schools = await db.collection("AllSchools").find({ pincode: pin });
    // convert the schools to an array
    const schoolsArray = await schools.toArray();
    // if no schools found on pin
    if (schoolsArray.length === 0) {
      res.status(404).json({
        message: "No schools found for this pin",
      });
    }
    // if schools found on pin
    else {
      res.status(200).json(schoolsArray);
    }
  })
);

// Get school by district name
schoolsRouter.get(
  "/get/:authToken/city/:districtName",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const districtName = sanitize(req.params.districtName);
    // find if exact match if not apply regex
    const schools = await db.collection("AllSchools").find({
      district: { $regex: districtName, $options: "i" },
    });
    // convert the schools to an array
    const schoolsArray = await schools.toArray();
    // if no schools found
    if (schoolsArray.length === 0) {
      res.status(404).json({
        message: "No schools found for this district name",
      });
    }
    // if schools found
    else {
      res.status(200).json(schoolsArray);
    }
  })
);

// Get school by region name
schoolsRouter.get(
  "/get/:authToken/region/:regionName",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const regionName = sanitize(req.params.regionName);
    // find if exact match if not apply regex
    const schools = await db.collection("AllSchools").find({
      region: { $regex: regionName, $options: "i" },
    });
    // convert the schools to an array
    const schoolsArray = await schools.toArray();
    // if no schools found
    if (schoolsArray.length === 0) {
      res.status(404).json({
        message: "No schools found for this region name",
      });
    }
    // if schools found
    else {
      res.status(200).json(schoolsArray);
    }
  })
);

// Get school by state name
schoolsRouter.get(
  "/get/:authToken/state/:stateName",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const stateName = sanitize(req.params.stateName);
    // find if exact match if not apply regex
    const schools = await db.collection("AllSchools").find({
      state: { $regex: stateName, $options: "i" },
    });
    // convert the schools to an array
    const schoolsArray = await schools.toArray();
    // if no schools found
    if (schoolsArray.length === 0) {
      res.status(404).json({
        message: "No schools found for this state name",
      });
    }
    // if schools found
    else {
      res.status(200).json(schoolsArray);
    }
  })
);

module.exports = schoolsRouter;
