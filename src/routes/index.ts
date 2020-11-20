import * as express from "express";
import { authMiddleware } from "../Helper/Auth";
import {DatabaseHandler } from "../Helper/Database";
const router = express.Router();

//////////////////////// MAIN ROUTES ////////////////////////

/* 
 * GET
 * Returns data to a specific key
 */
router.get("/",function(req, res, next) {
  res.send();
});



export default router;