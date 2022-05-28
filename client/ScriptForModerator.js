var main = function (productsObjects) {
    var $inputMaster = $("<input>").addClass("input-name"),
        $butMasterRegister = $("<button>").text("Добавить мастера").addClass("authorization-btn"),
        $butMasterEdit = $("<button>").text(" Изменить имя мастера").addClass("authorization-btn"),
        $butMasterDestroy = $("<button>").text("Удалить мастера").addClass("authorization-btn");

    var $inputService = $("<input>").addClass("input-name"),
        $butServiceRegister = $("<button>").text("Добавить услугу").addClass("authorization-btn"),
        $butServiceEdit = $("<button>").text("Изменить услугy").addClass("authorization-btn"),
        $butServiceDestroy = $("<button>").text("Удалить услугу").addClass("authorization-btn");


    $butMasterRegister.on("click", function() {
        var name = $inputMaster.val();
        if (name !== null && name.trim() !== "") {
            var newMaster = {"name": name};
            console.log(newMaster);
            $.post("/masters", newMaster, function(result) {
                console.log(result);
                //UsersObjects.push(newUser);
            }).done(function(response) {
                console.log(response);
                alert('Мастер добавлен!');
                $inputMaster.val("");
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                if (jqXHR.status === 501) {
                    alert("Такой пользователь уже существует!");
                } else {                    
                    alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);   
                }
            });
        }
        else
            alert("Неудачное имя пользователя!");
    });

$butMasterEdit.on("click", function() {

       if ($inputMaster.val() !== null && $inputMaster.val().trim() !== "") {
            var name = $inputMaster.val();
            $.get("/masterFind/" + name, function(master){
                if (master != null) {
                    console.log(master);
                    var newname = prompt("Введите новое имя мастера", $inputMaster.val());
                    if (newname !== null && newname.trim() !== "") {
                     $.ajax({
                    'url': '/master/'+name,
                    'type': 'PUT',
                    'data': {'name':newname}
                     }).done(function(responde) {
                    console.log(responde);
                    $inputMaster.val("");
                    alert('Имя мастера успешно изменено');
                     }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);   
                });
                 } else alert("Неудачное имя мастера!");

                }else{
                    alert("Такого мастера нет в системе!");
                }
            });
        }
        else
            alert("Неудачное имя мастера!");
    });

    $butMasterDestroy.on("click", function() {
        if ($inputMaster.val() !== null && $inputMaster.val().trim() !== "") {
            var name = $inputMaster.val();
            if (confirm("Вы уверены, что хотете удалить мастера " + name + "?")) {
                $.ajax({
                    'url': '/master/'+name,
                    'type': 'DELETE',
                }).done(function(responde) {
                    console.log(responde);
                    $inputMaster.val("");
                    alert('Мастер успешно удален');
                }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);   
                });
            }
        }
        else
            alert("Неудачное имя модератора!");
    });


    $butServiceDestroy.on("click", function() {
        if ($inputService.val() !== null && $inputService.val().trim() !== "") {
            var name = $inputService.val();
            if (confirm("Вы уверены, что хотете удалить услугу " + name + "?")) {
                $.ajax({
                    'url': '/service/'+name,
                    'type': 'DELETE',
                }).done(function(responde) {
                    console.log(responde);
                    $inputService.val("");
                    alert('Услуга успешно удалена');
                }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);   
                });
            }
        }
        else
            alert("Неудачное название услуги!");
    });


    $butServiceRegister.on("click", function() {
        $butServiceRegister.attr("disabled", true);
        $butServiceEdit.attr("disabled", true);
        $butServiceDestroy.attr("disabled", true);
        var $inputTag = $("<input placeholder = 'Вкладка'>").addClass("input-name"),
            $inputName = $("<input placeholder = 'Название услуги'>").addClass("input-name"),
            $inputShortDescription = $("<textarea style='resize: none' placeholder = 'Краткое описание'>").addClass("input-name"),
            $inputLongDescription = $("<textarea style='resize: none' placeholder = 'Полное описание'>").addClass("input-name"),
            $butServiceAdd = $("<button>").text("Сохранить").addClass("authorization-btn");

            $butServiceAdd.on("click", function() {
        var tag = $inputTag.val(),
        name = $inputName.val(),
        short_description = $inputShortDescription.val().split("\n"),
        long_description = $inputLongDescription.val().split("\n");
        console.log(typeof(short_description));

        if (tag !== null && tag.trim() !== "" && name !== null && name.trim() !== "" && short_description !== null  && long_description !== null) {
            var newService = {"tag": tag ,"name": name, "short_description":short_description, "long_description":long_description};
            console.log(newService);
            $.post("/services", newService, function(result) {
                console.log(result);
                //UsersObjects.push(newUser);
            }).done(function(response) {
                console.log(response);
                alert('Услуга добавлена!');
                $inputMaster.val("");
                $butServiceRegister.attr("disabled", false);
                $butServiceEdit.attr("disabled", false);
                $butServiceDestroy.attr("disabled", false);
                $("main .Form").empty();
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                if (jqXHR.status === 501) {
                    alert("Такая услуга уже существует!");
                } else {                    
                    alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);   
                }
            });
        }
        else
            alert("Неудачное имя пользователя!");
            });
            $("main .Form").append($inputTag);
            $("main .Form").append($inputName);
            $("main .Form").append($inputShortDescription);
            $("main .Form").append($inputLongDescription);
            $("main .Form").append($butServiceAdd);
});

    $butServiceEdit.on("click", function() {
        var $name = $inputService.val();
        if ($name != null && $name.trim() !== ""){
            $.get("/serviceFind/" + $name, function(service){
                if (service != null) {

                    var $inputTag = $("<input placeholder = 'Вкладка'>").addClass("input-name"),
            $inputName = $("<input placeholder = 'Название услуги'>").addClass("input-name"),
            $inputShortDescription = $("<textarea style='resize: none' placeholder = 'Краткое описание'>").addClass("input-name"),
            $inputLongDescription = $("<textarea style='resize: none' placeholder = 'Полное описание'>").addClass("input-name"),
            $butServiceAdd = $("<button>").text("Сохранить").addClass("authorization-btn");

        $.get("/services/"+ $name, function(elements){
            $butServiceRegister.attr("disabled", true);
            $butServiceEdit.attr("disabled", true);
            $butServiceDestroy.attr("disabled", true);
            tag = elements[0].tag;
            name = elements[0].name;
            short_description = elements[0].short_description;
            long_description = elements[0].long_description;
            $inputTag.val(tag);
            $inputName.val(name);
            $inputShortDescription.val(short_description);
            $inputLongDescription.val(long_description) ;
            $("main .Form").append($inputTag);
            $("main .Form").append($inputName);
            $("main .Form").append($inputShortDescription);
            $("main .Form").append($inputLongDescription);
            $("main .Form").append($butServiceAdd);

            $butServiceAdd.on("click", function() {
            if ($inputTag.val() !== null && $inputTag.val().trim() !== "" && $inputName.val() !== null && $inputName.val().trim() !== "" && $inputShortDescription.val() !== null && $inputShortDescription.val().trim() !== "" && $inputLongDescription.val() !== null && $inputLongDescription.val().trim() !== "") {
                var NewName = $inputName.val(),
                    NewTag = $inputTag.val(),
                    NewShortDescription = $inputShortDescription.val(),
                    NewLongDescription = $inputLongDescription.val();
                $.ajax({
                    'url': '/service/' + name,
                    'type': 'PUT',
                    'data': { 'tag': NewTag , 'name':NewName, 'short_description':NewShortDescription, 'long_description':NewLongDescription }
                }).done(function(responde) {
                    console.log(responde);
                    $inputService.val("");
                    alert('Услуга успешно изменена');
                    $butServiceRegister.attr("disabled", false);
                    $butServiceEdit.attr("disabled", false);
                    $butServiceDestroy.attr("disabled", false);
                    $("main .Form").empty();
                }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);   
                });
            }
        });
        });
                }else alert("Такой услуги нет в системе!");
            });
        
        
    }
});


            
    


    var $content = $('<div class = "list_of_moderators">');
        $content.append("<br><h2>Список всех мастеров</h2><br>");
        for (var i = 0; i<productsObjects.length; i++) {
            
                $content.append("<li>"+productsObjects[i].name+"<br>");
        }

        $("main .ListOfMasters").append($content);

        $("main .masters").append($inputMaster);
        $("main .masters").append($butMasterRegister);
        $("main .masters").append($butMasterEdit);
        $("main .masters").append($butMasterDestroy);

        $("main .service").append($inputService);
        $("main .service").append($butServiceRegister);
        $("main .service").append($butServiceEdit);
        $("main .service").append($butServiceDestroy);

        var $apps = $('<div class = "applications">');
        $.getJSON("/applications.json", function (applications) {
            var $app = $('<div class = "tabs_panel" style = "width: 670px;margin-left:230px">');
            for (var i = 0; i<applications.length; i++){
                $app.append('<a style="font-weight: bold">'+'Имя:');
                $app.append(applications[i].name+'<br>');
                $app.append('<a style="font-weight: bold">'+'Номер телефона:');
                $app.append(applications[i].number+'<br>');
                $app.append('<a style="font-weight: bold">'+'Желаемая дата:');
                $app.append(applications[i].date+'<br>');
                $app.append('<a style="font-weight: bold">'+'Услуга:');
                $app.append(applications[i].service+'<br>');
                if (applications[i].addition != null){
                    $app.append('<a style="font-weight: bold">'+ 'Доп:');
                    $app.append(applications[i].addition+'<br>');
                }
                $app.append('<a style="font-weight: bold">'+'Мастер:');
                $app.append(applications[i].master+'<br>'+'<br>');
                $butPhone = $("<button>").text("Связаться").addClass("authorization-btn");
                $app.append($butPhone);
                }
                
                $apps.append($app);
            

            $("main").append($apps);
            

        });

};


$(document).ready(function () {
	$.getJSON("/masters.json", function (productsObjects) {
		// вызов функции main с аргументом в виде объекта productsObjects
		main(productsObjects);
	});
});