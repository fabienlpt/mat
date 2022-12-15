const mysql = require('mysql2');
const user = require('./userController');

// require('dotenv').config({path:__dirname+'../../.env'});

const con = mysql.createConnection({
    host: 'db',
    user: 'debian',
    password: 'qwerty',
    database: 'lend_nws',
    port: 3306
});

const nodemailer = require('nodemailer');

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

// Create and Save a new lend
exports.create = async (req, res) => {
    // Validate request
    if (!(req.body.material_id && req.body.user_id && req.body.lend_date && req.body.return_date)) {
        return res.status(400).send({
            message: "Tout les champs doivent être remplis"
        });
    }

    const material_id = req.body.material_id;
    const user_id = req.body.user_id;
    const lend_date = new Date(req.body.lend_date);
    const return_date = new Date(req.body.return_date);
    const email = req.body.email;

    const sql= 'SELECT name FROM material WHERE id = ?';
    const sql2 = 'INSERT INTO lend (material_id, user_id, lend_date, return_date) VALUES (?,?,?,?)';

    const result = await con.promise().query(sql, [material_id]);

    const name = result[0][0].name;

    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "no.reply.material.nws@gmail.com",
          pass: "ktapxcbesjsdipgm"
        }
      });

    transport.verify(function(error, success) {
        if (error) {
                console.log(error);
        } else {
                console.log('Server is ready to take our messages');
        }
    });

    const mailOptions = {
        from: "no.reply.material.nws@gmail.com",
        to: email,
        subject: 'Nouvel emprunt',
        text: 'Bonjour ' + email + ',\n\nVous avez emprunté le matériel ' + name + ' du ' + lend_date + ' au ' + return_date + '. Merci de bien vouloir nous le retourner avant la date de l échance.\n\nCordialement,\n\nL\'équipe de NWS'
    }
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    con.query(sql2, [material_id, user_id, lend_date, return_date], (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(200, result);
            }
        }
    );
}

// Retrieve and return all lend from the database.
exports.read = (req, res) => {
    let lends = [];
    con.query('SELECT * FROM lend',(err, result) => {
        if (err) {
            res.send(err);
        } else {
            lends = result;
            res.send(lends);
        }
    })
}

// Find a single lend with a id
exports.readone = (req, res) => {
    con.query('select * from lend where material_id=?',
        [req.params.id],
        function (error, results) {
            if (error) {
                res.send(error)
            } else {
                const request = {
                    params: {
                        id: results[0].user_id
                    }
                }
                // get mail from user_id with get by id in userController and add it to email in result
                user.readone(request, res).then(email => {
                    results[0].email = email;
                }
                );
                res.send(results);
            }
        }
    )
}

// Update a lend identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!(req.body.material_id || req.body.lend_date || req.body.user_id || req.body.return_date || req.body.is_returned)) {
        return res.status(400).send({
            message: "Lend content can not be empty"
        });
    }
    const id = req.body.id;
    const user_id = req.body.user_id;
    const lend_date = new Date(req.body.lend_date);
    const return_date = new Date(req.body.return_date);
    const is_returned = req.body.is_returned;

    con.query(
        'UPDATE lend SET user_id = ?, lend_date = ?, return_date = ? , is_returned = ? WHERE id = ?',
        [user_id, lend_date, return_date, is_returned, id],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
}

// Delete a lend with the specified id in the request
exports.delete = (req, res) => {
    con.query('DELETE FROM lend WHERE id = ?',
        [req.body.id],
        function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.send(results);
            }
        }
    )
}

// Send mail
exports.sendmail = async (req, res) => {
    const material_id = req.body.material_id;
    const name = req.body.name;
    const email = req.body.email;

    const sql = "SELECT * FROM lend WHERE material_id = ?";
    const result = await con.promise().query(sql, [material_id]);

    const user_id = result[0][0].user_id;
    const lend_date = result[0][0].lend_date;
    const return_date = result[0][0].return_date;
    
    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "no.reply.material.nws@gmail.com",
          pass: "ktapxcbesjsdipgm"
        }
      });

    transport.verify(function(error, success) {
    if (error) {
            console.log(error);
    } else {
            console.log('Server is ready to take our messages');
    }
    });

    const mailOptions = {
        from: "no.reply.material.nws@gmail.com",
        to: email,
        subject: 'Rappel de prêt',
        text: 'Bonjour ' + email + ',\n\nVous avez emprunté le matériel ' + name + ' du ' + lend_date + ' au ' + return_date + '. Merci de bien vouloir nous le retourner avant la date de l échance.\n\nCordialement,\n\nL\'équipe de NWS'
    }
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send(200, 'Mail sent');
}