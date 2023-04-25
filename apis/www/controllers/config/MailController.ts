import {Request, Response } from "express";
import BaseController from "../../components/base_controller";

export default class MailController extends BaseController {


    public actionSend (req: Request, res: Response) {
        let data:any = {name:'mail controller'};
        //res.send(err);
        res.json(data);
    }


}