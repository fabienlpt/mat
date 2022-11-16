const mysql = require('mysql2');

// require('dotenv').config({path:__dirname+'../../.env'});

const con = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'lend_nws',
    port: 3306
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

// Create and Save a new material
exports.create = (req, res) => {
    // Validate request
    if (!(req.body.name && req.body.description)) {
        return res.status(400).send({
            message: "Tout les champs doivent être remplis"
        });
    }

    const name = req.body.name;
    const description = req.body.description;
    
    con.query(
        'INSERT INTO material (name, description) VALUES (?,?)',
        [name, description],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
};

// Retrieve and return all material from the database.
exports.read = (req, res) => {
    con.query('SELECT * FROM material',(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
};

// Find a single material with a id
exports.readone = (req, res) => {
    con.query('select * from material where id=?',
        [req.params.id],
        function (error, results) {
            if (error) throw error;
            res.send(results);
        });
};

// Update a material identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name && !req.body.description) {
        return res.status(400).send({
            message: "Material content can not be empty"
        });
    }

    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    con.query(
        'UPDATE material SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
};

// Delete a material with the specified id in the request
exports.delete = (req, res) => {
    const id = req.body.id;
    con.query('DELETE FROM material WHERE id = ?', id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }     
    })
};