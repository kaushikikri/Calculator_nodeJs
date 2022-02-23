const { Client } = require('pg');
const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "stom@234",
    database: "demo1"
});
client.on("connect", () => {
    console.log("Connection start");
});
client.on("end", () => {
    console.log("Connection end");
});
module.exports = client;