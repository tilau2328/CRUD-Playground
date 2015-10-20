var Todo = require('../app/models/todo');

module.exports = function(app){
    app.route('/api/todos').post(function(req, res) {
            
        var todo = new Todo();
        console.log(req.body);
        todo.text = req.body.text;
        console.log();
        todo.done = false;

        todo.save(function(err) {
            if (err)
                res.send(err);

            res.json(todo);
        });  
    }).get(function(req, res) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);

            res.json(todos);
        });
    });

    app.route('/api/todos/:todo_id').get(function(req, res){ 
        Todo.findById(req.params.todo_id, function(err, todo) {
            if (err)
                res.send(err);
            res.json(todo);
        });
    }).put(function(req, res) {

        // use our bear model to find the bear we want
        Todo.findById(req.params.todo_id, function(err, todo) {// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)

            if (err)
                res.send(err);

            todo.text = req.body.text || todo.text;
            // save the bear
            todo.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Todo updated!' });
            });

        });
    }).delete(function(req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);

                res.json(todos);
            });
        });
    });
};