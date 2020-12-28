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

  const server_name: string = req.body.server_name;
  const protocol: string = req.body.protocol;
  const ip: string = req.body.ip;
  const port: string = req.body.port;
  const server_port: string = req.body.server_port;

  if(server_name != "" && protocol != "" && ip != "" && port != "" && server_port != ""){

    //Handle inputs

    const proxy: Proxy = {
      server_name: server_name,
      server_port: server_port,
      proxy_pass: {
        protocol: protocol,
        ip: ip,
        port: port
      }
    };

    DatabaseHandler.getDbInstance().set(proxy.server_name,proxy);

    res.redirect("../");

  }else{
    if(server_name == "") res.redirect("/?success=false");
    else if(protocol == "") res.redirect("/?success=false");
    else if(ip == "") res.redirect("/?success=false");
    else if(port == "") res.redirect("/?success=false");
    else if(server_port == "") res.redirect("/?success=false");
  }

});

router.get("/all", (req,res,next) => {

  const data = DatabaseHandler.getDbInstance().getAll();

  let array: any = [];

  Object.keys(data).map(item => {

    array.push(data[item]);
  });

  res.json( array);

});


export default router;