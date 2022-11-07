const mysql = require('mysql');

const con = mysql.createConnection({  
    host: "mysql",
    user: "username",
    password: "password",
    database: "test",
    port: 3306,
});

con.connect(function(err) {
    console.log(err);
    if (err) throw err;
    console.log("Connected!");
})

// Create and Save a new Todo
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Material description can not be empty"
        });
    }

    var params = req.body;
    console.log(params);

    connection.query("INSERT INTO material SET ? ", params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'New material has been created successfully.'
            });
        });
};

// Retrieve and return all material from the database.
exports.findAll = (req, res) => {
    connection.query('select * from material',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Find a single material with a id
exports.findOne = (req, res) => {

    connection.query('select * from material where Id=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Update a material identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Material description can not be empty"
        });
    }

    console.log(req.params.id);
    console.log(req.body.description);
    connection.query('UPDATE `material` SET `name`=?,`description`=? where `id`=?',
        [req.body.name, req.body.description, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Delete a material with the specified id in the request
exports.delete = (req, res) => {
    console.log(req.body);
    connection.query('DELETE FROM `material` WHERE `Id`=?', 
        [req.body.id], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
    });
};

// app.get('/api/get', (req, res)=>{
//     const sqlSelect = "SELECT * FROM material;";
//     con.query(sqlSelect, (err, result) => {
//         res.send(result);
//     });
// });