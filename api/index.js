const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

require('./routes/index.js')(app);

// app.get('/', (req, res)=>{
//     console.log("welcome home");
// });

app.listen(3001, ()=>{
    console.log('running on port 3001');
});