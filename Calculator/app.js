const express = require('express');
const bodyparse = require('body-parser');
const app = express();


// connecting to db
const client = require('./db');
client.connect();


// getting form value
app.use(bodyparse.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/resl', (req, res) => {
    const n1 = Number(req.body.num1);
    const n2 = Number(req.body.num2);
    if (req.body.res == '+') {
        const result = n1 + n2;
        // res.send(' ' + result.toExponential());
        res.send(' ' + BigInt(result));
        // res.send(' ' + result.toFixed());      ------Max limit is 20 in toFixed
        // const data = {
        //     first: String(n1),
        //     second: String(n2),
        //     operator: req.body.res,
        //     res: String(result) $1,$2,$3,$4, [data.first, data.second, data.operator, data.res],
        // };
        client.query("Insert into calculator values('" + n1 + "','" + n2 + "','" + req.body.res + "','" + result + "',current_timestamp)",
            (err, result) => {
                if (!err) {
                    console.log('Inserted 1 Row!');
                }
                else {
                    console.log(err);
                }
                // client.end();
            });
    }
    else if (req.body.res == '-') {
        const result = n1 - n2;
        res.send(' ' + BigInt(result));
        client.query("Insert into calculator values('" + n1 + "','" + n2 + "','" + req.body.res + "','" + result + "',current_timestamp)",
            (err, result) => {
                if (!err) {
                    console.log('Inserted 1 Row!');
                }
                else {
                    console.log(err);
                }
                // client.end();
            });
    }
    else if (req.body.res == '*') {
        const result = n1 * n2;
        res.send(' ' + BigInt(result));
        client.query("Insert into calculator values('" + n1 + "','" + n2 + "','" + req.body.res + "','" + result + "',current_timestamp)",
            (err, result) => {
                if (!err) {
                    console.log('Inserted 1 Row!');
                }
                else {
                    console.log(err);
                }
                // client.end();
            });
    }
    else if (req.body.res == '/') {
        const result = n1 / n2;
        res.send(' ' + BigInt(result));
        client.query("Insert into calculator values('" + n1 + "','" + n2 + "','" + req.body.res + "','" + result + "',current_timestamp)",
            (err, result) => {
                if (!err) {
                    console.log('Inserted 1 Row!');
                }
                else {
                    console.log(err);
                }
                // client.end();
            });
    }
    else if (req.body.res == '%') {
        const result = n1 % n2;
        res.send(' ' + BigInt(result));
        client.query("Insert into calculator values('" + n1 + "','" + n2 + "','" + req.body.res + "','" + result + "',current_timestamp)",
            (err, result) => {
                if (!err) {
                    console.log('Inserted 1 Row!');
                }
                else {
                    console.log(err);
                }
                // client.end();
            });
    }
    else {
        res.send('Please select any operations First!');
    }

});

app.get('/hs', (req, res) => {
    client.query("Select * from calculator ", (err, result) => {
        if (!err) {
            res.render('hs', { 'items': result.rows }
            );
            // client.end();
        }
        else {
            console.log(err);
        }
    })

});
app.listen(4000, (res) => {
    console.log('Connected at port 4000');
});