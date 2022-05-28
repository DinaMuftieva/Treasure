var Application = require("../models/application_moder.js"),
	ApplicationController = {};

ApplicationController.index = function(req, res) {
console.log('Вызвано действие: отобразить заявки');
Application.find(function(err, applications) {
    if (err !== null){
    	res.json(500,err);
    } else{
    	res.status(200).json(applications);
    }
});
};

ApplicationController.create = function(req, res) {
    console.log('Вызвано действие: создать заявку');
    var name = req.body.name;
    var number = req.body.number;
    var date = req.body.date;
    var service = req.body.service;
    var addition = req.body.addition;
    var master = req.body.master;
    Application.find({ "name": name ,"date": date, "service":service, "addition":addition, "master":master, "number":number}, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501).send("Заявка уже существует");
            console.log(err);
            console.log("Заявка уже существует");
        } else {
            var newApplication = new Application({
                "name": name ,
                "date": date, 
                "service":service, 
                "addition":addition, 
                "master":master, 
                "number": number
            });
            newApplication.save(function(err, result) {
                console.log(err);
                if (err !== null) {
                    res.json(500, err);
                } else {
                    res.json(200, result);
                    console.log(result);
                }
            });
        }
    });
};
module.exports = ApplicationController;