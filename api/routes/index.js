module.exports = (app) => {
    const materials = require('../controller/index.js');

    // Create a new material
    app.post('/api/create', materials.create);

    // Get all materials
    app.get('/api/get', materials.findAll);

    // Get one material by id
    app.get('/api/get/:id', materials.findOne);

    // Update a material by id 
    app.put('/api/update/:id', materials.update);

    // Delete a material by id
    app.delete('/api/delete/:id', materials.delete);
}