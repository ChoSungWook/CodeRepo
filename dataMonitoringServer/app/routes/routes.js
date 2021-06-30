module.exports = function(app){
    var data = require('../controllers/data.controllers.js');

    app.post('/api/data',data.postData);
    app.get('/api/data',data.getData);
}