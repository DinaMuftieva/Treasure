var express = require("express"),
	http = require("http"),
	// импортируем библиотеку mongoose
	mongoose = require("mongoose"),
	ServicesController = require("./controllers/services_controller.js"),
	MastersController = require("./controllers/masters.controller.js"),
	UsersController = require("./controllers/users_controller.js"),
	ApplicationsController = require("./controllers/applications_controller.js"),
	app = express();

app.use('/', express.static(__dirname + "/client"));
app.use('/user/:username', express.static(__dirname + "/client"));//папку клиента статичной
// командуем Express принять поступающие
// объекты JSON
app.use(express.urlencoded({ extended: true}));

// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/Treasure',{
				useNewUrlParser: true,
				/*useCreateIndex: true,*/
				useUnifiedTopology: true
				}).then(res => {
					console.log("DB connected");
				}).catch(err => {
					console.log("ERROR" + err);
				});

// начинаем слушать запросы
http.createServer(app).listen(3000);
app.get("/services.json", ServicesController.index);
app.get("/services/:name", ServicesController.show);
app.post("/services", ServicesController.create);
app.put("/service/:name", ServicesController.update);
app.delete("/service/:name", ServicesController.destroy);
app.get("/serviceFind/:name", ServicesController.search);

app.get("/masters.json", MastersController.index);
app.post("/masters",MastersController.create );
app.put("/master/:name", MastersController.update);
app.delete("/master/:name", MastersController.destroy);
app.get("/masterFind/:name", MastersController.search);

app.get("/users/:username", UsersController.show);
app.get("/userFind/:username", UsersController.search);
app.get("/users.json", UsersController.index);
app.post("/users", UsersController.create);
app.put("/users/:username", UsersController.update);
app.delete("/users/:username", UsersController.destroy);

app.get("/applications.json", ApplicationsController.index);
app.post("/applications", ApplicationsController.create);