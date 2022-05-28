var User = require("../models/users_model.js"),
	UsersController = {},
	mongoose = require("mongoose");

UsersController.index = function(req, res) {
    console.log('Вызвано действие: UsersController.index');
    User.find(function(err, users) {
        if (err !== null) {
            res.json(500, err);
        } else {
            res.status(200).json(users);
        }
    });
};

UsersController.show = function(req, res) {
    console.log('Вызвано действие: отобразить пользователя');
    User.find({ 'username': req.params.username }, function(err, result) {
        if (err) {
            console.log(err);
        } else if (result.length !== 0 && result[0].role === 'admin') {
            res.sendfile('./client/Admin_panel.html');
        } else if (result.length !== 0 && result[0].role === 'moderator') {
            res.sendfile('./client/Moderator_panel.html');
        } else {
            res.send(404);
        }
    });
};
UsersController.search = function(req, res) {
    console.log('Вызвано действие: найти пользователя');
    User.findOne({ 'username': req.params.username }, function(err, result) {
        if (err !== null) {
            res.json(500, err);
        } else {
            res.status(200).json(result);
        }
    });
};

UsersController.update = function(req, res) {
    console.log("Вызвано действие: обновить пользователя");
    var username = req.params.username;
    console.log("Старое имя пользователя: " + username);
    var newUsername = { $set: { username: req.body.username, role: "moderator"} };
    console.log("Новое имя пользователя: " + req.body.username);
    User.updateOne({ "username": username, role: "moderator"}, newUsername, function(err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (user.modifiedCount == 1){
                console.log('Изменен');
                res.status(200).json(user);}
            
        }
    });
};


UsersController.create = function(req, res) {
    console.log('Вызвано действие: создать пользователя');
    var username = req.body.username;
    var role = req.body.role;
    User.find({ "username": username }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501).send("Пользователь уже существует");
            console.log(err);
            console.log("Пользователь уже существует");
        } else {
            var newUser = new User({
                "username": username,
                "role" : role
            });
            newUser.save(function(err, result) {
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

UsersController.destroy = function(req, res) {
    console.log("Вызвано действие: удалить пользователя");
    var username = req.params.username;
    User.find({ "username": username, "role":"moderator" }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
                console.log("Удаляем пользователя");
                User.deleteOne({ "username": username, "role":"moderator" }, function(err, user) {
                    if (err !== null) {
                        res.status(500).json(err);
                    } else {
                        // console.log(user.n, user.ok, user.deletedCount);
                        if (user.deletedCount === 1) {
                            res.status(200).json(user);
                        } else {
                            res.status(404).json({ "status": 404 });
                        }
                    }
                });
   
        } else {
            res.status(404).send("Пользователь не существует");
            console.log(err);
        }
    });
}

module.exports = UsersController;