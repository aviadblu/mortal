import * as pg from "pg";

export interface QueryOptionsInterface {
    dbConnStr?: string;
    querySQL: string;
    queryArgs?: Array<any>;
}

const config = {
    user: 'eibo',
    database: 'eibo_db',
    password: 'eibo2017',
    host: 'deep-mantis-922.db.databaselabs.io',
    port: 5432,
    ssl: true,
    max: 10,
    idleTimeoutMillis: 30000,
};

export class PgService {
    private pool: any;

    constructor() {
        this.pool = new pg.Pool(config);

        this.pool.on('error', function (err, client) {
            // if an error is encountered by a client while it sits idle in the pool
            // the pool itself will emit an error event with both the error and
            // the client which emitted the original error
            // this is a rare occurrence but can happen if there is a network partition
            // between your application and the database, the database restarts, etc.
            // and so you might want to handle it and at least log it out
            console.error('idle client error', err.message, err.stack)
        })
    }

    query(options: QueryOptionsInterface) {

        if (!options.queryArgs) {
            options.queryArgs = [];
        }

        return new Promise((resolve, reject) => {
            this.pool.connect((err, client, done) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                client.query(options.querySQL, options.queryArgs, function (err, result) {
                    //call `done()` to release the client back to the pool
                    done();
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(result);
                });

            });
        });
    }
}