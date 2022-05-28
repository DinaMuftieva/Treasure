var Master = require("../models/masters_model.js"),
	MastersController = {};

MastersController.index = function(req, res) {
    console.log('Вызвано действие: отобразить мастера');
    Master.find(function(err, masters) {
    	if (err !== null){
    		res.json(500,err);
    	} else{
    		res.status(200).json(masters);
    	}
    });
};

MastersController.search = function(req, res) {
    console.log('Вызвано действие: найти мастера');
    Master.findOne({ 'name': req.params.name }, function(err, result) {
        if (err !== null) {
            res.json(500, err);
        } else {
            res.status(200).json(result);
        }
    });
};

MastersController.create = function(req, res) {
    console.log('Вызвано действие: создать мастера');
    var name = req.body.name;
    console.log(name);
    Master.find({ "name": name }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501).send("Мастер уже существует");
            console.log(err);
            console.log("Мастер уже существует");
        } else {
            var newMaster = new Master({
                "name": name
            });
            newMaster.save(function(err, result) {
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
MastersController.update = function(req, res) {
    console.log("Вызвано действие: обновить мастера");
    var name = req.params.name;
    console.log("Старое имя мастера: " + name);
    var newMastername = { $set: { name: req.body.name} };
    console.log("Новое имя мастера: " + req.body.name);
    Master.updateOne({"name": name}, newMastername, function(err, master) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (master.modifiedCount == 1) {
                console.log('Изменен'); //МЕНЯЕТ НО СЮДА НЕ ИДЕТ ПАЧИМУ
                res.status(200).json(master);
            } else {
                res.status(404);
            }
        }
    });
};

MastersController.destroy = function(req, res) {
    console.log("Вызвано действие: удалить мастера");
    var name = req.params.name;
    Master.find({ "name": name }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
                console.log("Удаляем мастера");
                Master.deleteOne({ "name": name }, function(err, master) {
                    if (err !== null) {
                        res.status(500).json(err);
                    } else {
                        // console.log(user.n, user.ok, user.deletedCount);
                        if (master.deletedCount === 1) {
                            res.status(200).json(master);
                        } else {
                            res.status(404).json({ "status": 404 });
                        }
                    }
                });
   
        } else {
            res.status(404).send("Мастера не существует");
            console.log(err);
        }
    });
}
module.exports = MastersController;