module.exports = function(app){
	app.use(function(req, res, next){
	    //console.log('Something is happening.');
	    next();
	});

	var bears = require("./bears")(app),
		users = require("./users")(app),
		todos = require("./todos")(app);
};