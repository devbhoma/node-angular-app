import { Request, Response } from 'express';
import BaseController from "../components/base_controller";

export default class SiteController extends BaseController {


    public actionHome (req, res) {
        let data:any = {name:'ACTION HOME : Express Bhomaram'};
        res.status(200).send({
            data: data
        })
    }

    public actionAbout (req, res) {
        let data:any = {name:'ACTION About : Express Bhomaram'};
        res.send({data:data});
    }

    public actionLog (req: Request, res: Response) {
        let data:any = '5 Project';
        let r = 'hello';

        if (r == 'hello') {
            data = '0 Project';
        }
        res.status(200).send({data:data})
    }
    
}