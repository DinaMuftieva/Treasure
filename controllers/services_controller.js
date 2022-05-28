var Service = require("../models/services_model.js"),
	ServicesController = {};

ServicesController.index = function(req, res) {
    console.log('Вызвано действие: отобразить услуги');
    Service.find(function(err, services) {
    	if (err !== null){
    		res.json(500,err);
    	} else{
    		res.status(200).json(services);
    	}
    });
};
ServicesController.show = function(req, res) {
    console.log('Вызвано действие: отобразить услугу');
    Service.find({ 'name': req.params.name }, function(err, result) {
        if (err) {
            console.log(err);
        } else if (result.length !== 0) {
            console.log(result);
            res.send(result);
        } else {
            res.send(404);
        }
    });
};

ServicesController.update = function(req, res) {
    console.log("Вызвано действие: обновить услугу");
    var tag = req.body.tag,
    name = req.body.name,
    short_description = req.body.short_description,
    long_description = req.body.long_description;

    Service.updateOne({"name": name}, {"tag":tag, "name":name, "short_description":short_description, "long_description":long_description}, function(err, service) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (service.modifiedCount == 1) {
                console.log('Изменен'); //МЕНЯЕТ НО СЮДА НЕ ИДЕТ ПАЧИМУ
                res.status(200).json(service);
            } else {
                res.status(404);
            }
        }
    });
};
ServicesController.search = function(req, res) {
    console.log('Вызвано действие: найти услугу');
    Service.findOne({ 'name': req.params.name }, function(err, result) {
        if (err !== null) {
            res.json(500, err);
        } else {
            res.status(200).json(result);
        }
    });
};

ServicesController.destroy = function(req, res) {
    console.log("Вызвано действие: удалить услугу");
    var name = req.params.name;
    Service.find({ "name": name}, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
                console.log("Удаляем услугу");
                Service.deleteOne({ "name": name}, function(err, service) {
                    if (err !== null) {
                        res.status(500).json(err);
                    } else {
                        // console.log(user.n, user.ok, user.deletedCount);
                        if (service.deletedCount === 1) {
                            res.status(200).json(service);
                        } else {
                            res.status(404).json({ "status": 404 });
                        }
                    }
                });
   
        } else {
            res.status(404).send("Услуги не существует");
            console.log(err);
        }
    });
};

ServicesController.create = function(req, res) {
    console.log('Вызвано действие: создать услугу');
    var tag = req.body.tag;
    var name = req.body.name;
    var ShortDescription = req.body.short_description;
    var LongDescription = req.body.long_description;
    Service.find({ "tag": tag ,"name": name, "short_description":ShortDescription, "long_description":LongDescription }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501).send("Услуга уже существует");
            console.log(err);
            console.log("Услуга уже существует");
        } else {
            var newService = new Service({
                "tag": tag ,
                "name": name, 
                "short_description":ShortDescription, 
                "long_description":LongDescription
            });
            newService.save(function(err, result) {
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
module.exports = ServicesController;