import supertest from "supertest";
import { app } from "../app.js";
import * as chai from 'chai';



export const expect = chai.expect;
export const apiRequest = supertest(app);
