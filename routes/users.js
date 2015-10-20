var User = require('../app/models/user');

module.exports = function(app){
    app.route('/api/users').post(function(req, res) {
            
        var user = new User();      
        user.name = req.body.name;  
        user.username = req.body.username;  
        user.password = req.body.password;  

        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });  
    }).get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

    app.route('/api/users/:user_id').get(function(req, res){
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    }).put(function(req, res) {

        // use our bear model to find the bear we want
        User.findById(req.params.user_id, function(err, user) {// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)

            if (err)
                res.send(err);

            user.name = req.body.name || user.name;  
            user.username = req.body.username || user.username;  
            user.password = req.body.password || user.password;  

            // save the bear
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    }).delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
};