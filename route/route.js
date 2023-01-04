import express from "express";
import { getEvents,addEvent } from "../controller/controller.js";
import { body } from "express-validator";
const route=express.Router();

route.get('/', getEvents);

route.post('/addevent',[
    body('name','Please enter a valid name with atleast 3 digits').isLength({min:3}),
    body('type','Please enter a valid type with atleast 3 digits').isLength({min:3}),
], addEvent);
export {route};