const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: 'https://fabien.iamroot.fr',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

require('./routes/index.js')(app);

app.listen(3001, () => {
    console.log('Server listening on port 3001')
})

module.exports = app;