import * as mysql from 'mysql';

export default class Database {
    pool:any;
    public models: any = {};
    public since = Date.now();
    public statics = {
        avg_time: null,
        queries_count: 0,
        queries_rate: 0,
        avg_rate: 0,
        queries: {},
    };

    constructor() {
        this.since = Date.now();
        this.statics = {
            avg_time: null,
            queries_count: 0,
            queries_rate: 0,
            avg_rate: 0,
            queries: {},
        };


        this.pool = mysql.createPool({
            connectionLimit : 10,
            host            : 'localhost',
            user            : 'root',
            password        : '',
            database        : 'human_relation',
            dateStrings: true,
            multipleStatements: true
        });

        this.init();
    }

    init() {
        this.pool.getConnection((err, connection) => {
            if (err) {
                console.log('DB : err => ',err);
            }else{
                connection.release();
                console.log('connection.release success!');
            }
        });
    }

    public getName(){
        return 'db';
    }
}