const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

require('./routes/index.js')(app);

const port = process.env.API_PORT || 3001;

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

module.exports = app;