
import Application from "../app";
let async = require('async');

export default class UserModel {

    public app:Application = new Application();
    private _init = false;

    constructor(app) {

    }

    init(cb) {
        if (this._init) {
            cb(this._init);
            return;
        }
        this._init = true;
        cb(this._init);

    }

    getName() {
        return "user";
    }

    dispose() {
    }

    getTableName() {
        return "user";
    }

    public validateAccessToken(token, callback){
        callback(null,'bhomaramjangid');
    }

    public validateUserKey(key, user_id, callback?:any){

        callback(null,{});
        /*
        this.app.db.pool.query("select * from user where sha1(sha1(sha1(password))) = ? and user.id = ?",
            [key,user_id],(err,rows)=>{
                if(err){
                    callback('Internal server error');
                } else{
                    if(rows.length>0){
                        callback(null,rows[0]);
                    } else{
                        callback('can not find');
                    }
                }
            });*/
    }

    public validateUserLogin(email, password, callback?: any) {

        this.app.db.pool.query("SELECT * FROM `my_application`.`user__copy` LIMIT ?",['1'],(err, rows)=>{
            if (err)
                return  callback("Internal server error");

            if (rows.length > 0) {
                let data = {
                    id: rows[0].id,
                    user_name: rows[0].name,
                    email: rows[0].email,
                    key: rows[0].password,
                };
                return callback(null, data);
            } else {
                callback('Whoops! We don’t recognize that email or password.');
            }
        });
    }

}