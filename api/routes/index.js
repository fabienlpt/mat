module.exports = (app) => {
    const materials = require('../controller/materialController.js');

    // Create a new material
    app.post('/api/material/create', materials.create);

    // Get all materials
    app.get('/api/material/get', materials.read);

    // Get one material by id
    app.get('/api/material/get/:id', materials.readone);

    // Update a material by id 
    app.put('/api/material/update', materials.update);

    // Delete a material by id
    app.delete('/api/material/delete', materials.delete);
    
    const lends = require('../controller/lendController.js');

    // Create a new lend
    app.post('/api/lend/create', lends.create);

    // Get all lends
    app.get('/api/lend/get', lends.read);

    // Get one lend by id
    app.get('/api/lend/get/:id', lends.readone);

    // Update a lend by id
    app.put('/api/lend/update', lends.update);

    // Delete a lend by id
    app.delete('/api/lend/delete', lends.delete);

    // Send a mail
    app.post('/api/sendMail', lends.sendmail);

}