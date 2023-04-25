import {Request, Response } from "express";
import Application from "./../app";
import * as fs from "fs";
import * as path from "path";

let PROFILE_RESPONSE=true;

export default class BaseController {
    public app:Application = new Application();
    public is_auth_required = false;

    constructor(){

    }

    init(req: Request, res: Response) {

        console.log('call base init');
    }

    requireParams(){
        return {};
    }

    checkAccess(){
        return {};
    }

    get_view(res) {
        let filePath = path.join(__dirname, '../../public/'+res.view+'.'+(typeof res.type !== "undefined"?res.type:'html'));
        fs.readFile(filePath, function (err, content:any) {
            return content.toString().replace('#title#', '<h3>' + res.name + '</h3>');
        });

       return filePath;
    }

}