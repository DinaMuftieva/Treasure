var main = function (productsObjects) {
    var $input = $("<input>").addClass("input-name"),
        $butRegister = $("<button>").text("Создать модератора").addClass("authorization-btn"),
        $butEdit = $("<button>").text(" Изменить имя модератора").addClass("authorization-btn"),
        $butDestroy = $("<button>").text("Удалить модератора").addClass("authorization-btn");

    $butRegister.on("click", function() {
        var username = $input.val();
        if (username !== null && username.trim() !== "") {
            var newUser = {"username": username, "role": "moderator"};
            $.post("/users", newUser, function(result) {
                console.log(result);
                //UsersObjects.push(newUser);
            }).done(function(response) {
                console.log(response);
                alert('Аккаунт создан!');
                $input.val("");
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


        $butEdit.on("click", function() {

       if ($input.val() !== null && $input.val().trim() !== "") {
            var username = $input.val();
            $.get("/userFind/" + username, function(user){
                if (user != null) {
                    console.log(user);
                    var newUsername = prompt("Введите новое имя модератора", $input.val());
                    if (newUsername !== null && newUsername.trim() !== "") {
                     $.ajax({
                    'url': '/users/' + username,
                    'type': 'PUT',
                    'data': { 'username': newUsername , 'role':'moderator'}
                     }).done(function(responde) {
                    console.log(responde);
                    $input.val("");
                    alert('Имя модератора успешно изменено');
                     }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);   
                });
                 } else alert("Неудачное имя модератора!");

                }else{
                    alert("Такого модератора нет в системе!");
                }
            });
        }
        else
            alert("Неудачное имя модератора!");
    });

    $butDestroy.on("click", function() {
        if ($input.val() !== null && $input.val().trim() !== "") {
            var username = $input.val();
            if (confirm("Вы уверены, что хотете удалить модератора " + username + "?")) {
                $.ajax({
                    'url': '/users/' + username,
                    'type': 'DELETE',
                }).done(function(responde) {
                    console.log(responde);
                    $input.val("");
                    alert('Модератор успешно удален');
                }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);   
                });
            }
        }
        else
            alert("Неудачное имя модератора!");
    });

        $("main .adding_buttons").append($input);
        $("main .adding_buttons").append($butRegister);
        $("main .adding_buttons").append($butEdit);
        $("main .adding_buttons").append($butDestroy);

        var $content = $('<div class = "list_of_moderators">');
        $content.append("<br><h2>Список всех модераторов</h2><br>");
        for (var i = 0; i<productsObjects.length; i++) {
            if (productsObjects[i].role == "moderator"){
                $content.append("<li>"+productsObjects[i].username+"<br>");
            }
        }

        $("main .admin").append($content);
}
$(document).ready(function () {
	$.getJSON("/users.json", function (productsObjects) {
		// вызов функции main с аргументом в виде объекта productsObjects
		main(productsObjects);
	});
});