const axios = require("axios");


// Retrieve and return all lend from the database.
exports.read = (req, res) => {
    try {
        axios.get("http://vps-a47222b1.vps.ovh.net:4242/Student")
        .then((response) => {
            // const students = await StudentModel.find();
            const students = response.data
            if (students) {
                res.json({
                    data: students,
                });
            }
        });
    } catch (error) {
    console.error(error);
    }
}

// Find a single lend with a id
exports.readone = async (req, res) => {
    try {
        const students = await axios.get("http://vps-a47222b1.vps.ovh.net:4242/Student");

        const student = students.data.filter((student) => student.id === parseInt(req.params.id));
        console.log(student);
        if (student) {
            res.json({
                data: student,
            });
        }
    } catch (error) {
    console.error(error);
    }
}