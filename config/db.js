
require('./config')
const mongoose = require('mongoose');



async function makeNewConnection(dbname) {
    return new Promise (function(resolve, reject){
        const db = mongoose.createConnection(process.env.STRING_CONNECTION,{
            /* bufferCommands: false, // Disable mongoose buffering
            bufferMaxEntries: 0, */
            dbName:dbname,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex:true,
            tls: true,
            tlsCAFile: `${__dirname}/../${process.env.CERTIFICATE}`,
            connectTimeoutMS:  1800000,
            socketTimeoutMS:  1800000
    
        });
    
        db.on('error', function (error) {
            /* console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`); */
            reject(error)
            /* db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`)); */
        });
    
    
        db.on('connected', function () {
            console.log(`MongoDB :: connected ${this.name}`);
            resolve(db)
            /* mongoose.set('debug', function (col, method, query, doc) {
                console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
            });
            console.log(`MongoDB :: connected ${this.name}`); */
        });
    
        /* db.on('disconnected', function () {
            console.log(`MongoDB :: disconnected ${this.name}`);
        });
    
        return db; */
    })
/*     return await mongoose.createConnection(process.env.STRING_CONNECTION,{
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0,
        dbName:dbname,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex:true,
        tls: true,
        tlsCAFile: `${__dirname}/../${process.env.CERTIFICATE}`

    });

    db.on('error', function (error) {
        console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });


    db.on('connected', function () {
        mongoose.set('debug', function (col, method, query, doc) {
            console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
        });
        console.log(`MongoDB :: connected ${this.name}`);
        
    });

    db.on('disconnected', function () {
        console.log(`MongoDB :: disconnected ${this.name}`);
    });

    return db; */

}

module.exports = {makeNewConnection};