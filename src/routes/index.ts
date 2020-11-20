import * as express from "express";
import { authMiddleware } from "../Helper/Auth";
import {DatabaseHandler } from "../Helper/Database";
import { Proxy } from "../models/Proxy";
import { errorStatus } from "../models/Status";
const router = express.Router();

//////////////////////// MAIN ROUTES ////////////////////////

/* 
 * GET
 * Returns index.html
 */
router.get("/",function(req, res, next) {
  res.sendFile(__dirname+"/index.html");
});

router.post("/new", (req,res,next) => {
  console.log("Try to make new",req.body);

  const server_name: string = req.body.server_name;
  const protocol: string = req.body.protocol;
  const ip: string = req.body.ip;
  const port: string = req.body.port;

  if(server_name != "" && protocol != "" && ip != "" && port != ""){

    //Handle inputs

    const proxy: Proxy = {
      server_name: server_name,
      proxy_pass: {
        protocol: protocol,
        ip: ip,
        port: port
      }
    };

    DatabaseHandler.getDbInstance().set(proxy.server_name,proxy);

    res.redirect(200,"/");

  }else{
    if(server_name == "") res.redirect(406,"/");
    else if(protocol == "") res.redirect(406,"/");
    else if(ip == "") res.redirect(406,"/");
    else if(port == "") res.redirect(406,"/");
  }

});

router.get("/all", (req,res,next) => {

  res.json(DatabaseHandler.getDbInstance().getAll());

});

export default router;