import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as fs from "fs";
import Database from "./components/database";
import * as async from 'async';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

export default class Application {
    public web: express.Application;
    public router:any;
    public ws:any;
    public db:Database = new Database();
    public models:any = {};
    public controllers:any = {};

    constructor() {
        this.web = express();
        this.config();
        this.router = express.Router();
        this.loadRouting();
        this.init();
    }

    private config(): void{
        this.web.use(bodyParser.json());
        this.web.use(bodyParser.urlencoded({ extended: false }));
        //this.web.use(express.static('public'));
        this.web.set('view','./public');
        this.web.set('view engine', 'html');
        this.web.use(cookieParser("tgcrmX0.01"));
        this.web.set('etag', false);
    }

    public init() {
        this.web.use(session({
            secret: 'tgcrmX0.01',
            name: 'acsess',
            resave: false,
            secure: true,
            saveUninitialized: false,
            cookie: {maxAge: 86400 * 1000}
        }));

        this.web.use((req, res, next)=> {
            if (!req.headers ||
                !req.headers['x-forwarded-proto'] ||
                (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto']=='https')
            ) {
                return next();
            } else {
                res.set('location', 'https://' + req.headers.host + req.url);
                return res.status(301).send();
            }
        });

        this.web.use((req,res,next)=>{
            let st:any= typeof req.headers.origin!=='undefined'?req.headers.origin:"*";
            res.header("Access-Control-Allow-Origin", st);
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
            next();
        });


        this.web.get('*.*', (req, res) => {
            let url = req.originalUrl;
            url = url.split('?')[0].replace('..','');
            res.sendFile(path.join(__dirname, '../../front/web/'+ url ));
        });

        let indexHTMLPath=path.join(__dirname, '../../front/web/index.html');
        let html=fs.readFileSync(indexHTMLPath);
        fs.watch(indexHTMLPath, function (event, filename) {
            html=fs.readFileSync(indexHTMLPath);
        });

        this.web.get('*', (req, res) => {
            if (req.url.indexOf('/api')===0){
                req.url = req.url.substr(4);

                return (<any>req).next();
            }
            if (req.headers['x-request-api']!=='App' && (
                    req.url.indexOf('/s/') == -1 &&
                    req.url.indexOf('/bare-backend.html') == -1
                ) ){
                res.send(html.toString());
            } else (<any>req).next();
        });
    }

    private loadRouting() {
        this.router.use((req, res, next) => {
            this.getControllers();
            next();
        });

        this.web.use(this.router);
    }

    public getControllers() {
        let paths = fs.readdirSync(__dirname+'/controllers');
        for (let module of paths){
            if(fs.lstatSync(__dirname+'/controllers/'+module).isDirectory()){
                let controllers = fs.readdirSync(__dirname+'/controllers/'+module);
                for (let ctl of controllers) {
                    if (ctl.indexOf('.js')>0 && ctl.indexOf('.js.map') == -1 ){
                        let cpath:any = require('./controllers/'+module+'/'+ctl);
                        this.addAction(new cpath.default(),module);
                    }
                }
            }
            else {
                if (module.indexOf('.js')>0 && module.indexOf('.js.map') == -1 ){
                    let cpath = require('./controllers/'+module);
                    this.addAction(new cpath.default());
                }
            }
        }
    }

    public addAction(controller:any,folder:string = null) {
        let camelCase = (str) => {
            return str
                .replace(/(?:^|\.?)([A-Z])/g, function (x,y){
                    return "-" + y.toLowerCase()
                })
                .replace(/^-/,'');
        };
        let name:any = controller.constructor.name.replace('Controller','');
        let actions =  Object.getOwnPropertyNames(Object.getPrototypeOf(controller));
        for (let func of actions){
            if(func.indexOf('action') == 0){
                let url = (folder!==null?folder+'/':'')+name.toLowerCase()+'/'+camelCase(func.replace('action',''));
                // this.router.put('/'+url, (<any>controller[func]).bind(controller));
                this.router.post('/api/'+url, this.filter((<any>controller[func]).bind(controller)));
                this.router.get('/'+url, this.filter((<any>controller[func]).bind(controller)));

            }
        }
    }

    filter(callback) {
        return (req, res) => {
            let authenticate = true;
            let user:any = {
                id:'010',
                email:'dev.bhomaram@gmail.com',
            };

            res.out = (errorMessage, data: {}, httpCode = 200) => {
                if (errorMessage) {
                    res.status(httpCode).send({
                        success: false,
                        error: errorMessage,
                        data: data
                    });
                } else {
                    res.status(httpCode).send({
                        success: true,
                        error: errorMessage,
                        data: data
                    });
                }
            };

            res.render = (file,data) => {
                res.status(200).send({
                    success: true,
                    error: null,
                    data: data
                });
            };

            if (authenticate) {
                callback(req, res, user);
            } else {
                res.out('request token invalid',user,200);
            }
        }
    }

    private manualAction() {
        this.router.get('/', (req, res) => {
            res.render('index', { title: 'Express 2!!!' });
        });

        this.router.get('/home', (req, res) => {
            res.send('home page');
            res.send('home manually')
        });
    }

    public getData() {
        console.log('===>getData')
    }

}