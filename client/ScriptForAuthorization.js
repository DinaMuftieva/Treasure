var main = function (productsObjects) {
	var $input = $("<input>").addClass("input-name"),
	    $butLogin = $("<button>").text("Войти в аккаунт").addClass("authorization-btn");
	$butLogin.on("click", function() {
		var username = $input.val();
        if (username !== null && username.trim() !== "") {
            var loginUser = {"username": username};
            $.ajax({
                'url': '/users/' + username,
                'type': 'GET'
            }).done(function(response) {
                window.location.replace('users/' + username + '/');
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);   
            });
        }
        else
            alert("Неудачное имя пользователя!");
    });
    $("main .authorization").append($input);
    $("main .authorization").append($butLogin);
}
$(document).ready(function () {
	$.getJSON("/users.json", function (productsObjects) {
		// вызов функции main с аргументом в виде объекта productsObjects
		main(productsObjects);
	});
});