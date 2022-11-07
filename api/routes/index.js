module.exports = (app) => {
    const materials = require('../controller/index.js');

    // Create a new material
    app.post('/api/create', materials.create);

    // Get all materials
    app.get('/api/get', materials.read);

    // Get one material by id
    app.get('/api/get/:id', materials.readone);

    // Update a material by id 
    app.put('/api/update', materials.update);

    // Delete a material by id
    app.delete('/api/delete', materials.delete);
}