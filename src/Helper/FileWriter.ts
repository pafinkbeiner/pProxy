import * as fs from "fs";
import { Proxy } from "../models/Proxy";
import { DatabaseHandler } from "./Database";

export class FileWriter{

    job: any = undefined;
    activeFlag: boolean = false; 
    interval: number = 1000;

    init(interval?:any){
        // Set Interval if provided
        if(interval != undefined) this.interval = interval;

        // Start File Writer Job
        if(!this.activeFlag){
            this.activeFlag = true;
            this.job = setInterval(this.update, this.interval)
            return "Started!"
        }else{
            return "Already Running!"
        }   
    }

    stop(){

        // Stop File Writer Job
        if(this.activeFlag){
            clearInterval(this.job);
            this.activeFlag = false;
            return "Successfully Stopped Service"
        }else{
            return "Active Flag was not set!"
        }
    }

    async update(){
        DatabaseHandler.getDbInstance().getAllAsArray().forEach((proxy: any) => {
            this.set(proxy);
        });
    }

    set(data: Proxy){
        const string:string = `server {\n\tlisten ${data.server_port};\n\tlisten [::]:${data.server_port};\n\tserver_name ${data.server_name};\n \tlocation: / {\n \t \tproxy_pass ${data.proxy_pass.protocol}://${data.proxy_pass.ip}:${data.proxy_pass.port};\n \t} \n}`;
        fs.writeFileSync(`${data.server_name}`, string);
    }

    remove(key: string){
        if(fs.existsSync(`${key}`)) fs.unlinkSync(`${key}`);
    }
}

export class FileWriterHandler{

    private static FileWriter: FileWriter;

    private constructor(){}

    public static getFwInstance(): FileWriter{
        if(!FileWriterHandler.FileWriter){
            FileWriterHandler.FileWriter = new FileWriter();
        }
        return FileWriterHandler.FileWriter;
    }
}