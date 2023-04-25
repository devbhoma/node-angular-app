import {Request, Response } from "express";
import * as path from "path";
import BaseController from "../components/base_controller";

export default class AuthController extends BaseController {
    public rr:any = 'ARRR';

    public actionSignUp (req, res, user) {
        let data:any = {name:'AUTH Singup',user};
        res.sendFile(this.get_view({
            view:'register',
            type:'html',
            data:data
        }));
    }

    actionLogin (req, res, user) {
        console.log('req.body: ',req.body);
        console.log('user actionLogin: ',user);

        this.app.db.pool.query("SELECT * FROM `my_application`.`user__copy` LIMIT ?, ?",[0,100],(err, data)=>{
            if (err)
                res.out(err);
            else
                res.out(null, data);
        });
        //res.out(null, data);
    }
}