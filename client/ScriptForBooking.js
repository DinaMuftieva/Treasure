var main = function (productsObjects) {
	"use strict";
	var $start = $('<h3>Ваше имя</h3>');
	$start.append('<input type="text" class = "input-name" id="name">'+'<br>');
	$start.append('<h3>Ваш номер телефона</h3>');
	$start.append('<input type="tel" class = "input-name art-stranger" id="number">'+'<br>');
	$start.append('<h3>Дата желаемого посещения</h3>');
	var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var min = year + "-0" + month + "-" + day;
	$start.append('<input type="date" max="2022-12-01" min="'+min+'" class="input-contact" id="date">');
	$(".start").append($start);
		for (var i = 0; i<productsObjects.length; i++) {
			if (productsObjects[i].tag === "Дизайн"||productsObjects[i].tag === "Дополнительные услуги" ){
				var $todoListItem = $('<a style="font-size: large;">');
				$todoListItem.append ('<p><input type="checkbox" name="choose_addition" value ="'+productsObjects[i].tag +'   '+productsObjects[i].name+ '">'+productsObjects[i].tag +'   '+productsObjects[i].name+'</p> <br>');
				$(".content_addition").append($todoListItem);
			}else{
				var $todoListItem = $('<a style="font-size: large;">');
				$todoListItem.append('<p><input type="radio" name ="choose_service" id = "choose_service" value="'+productsObjects[i].tag +'   '+productsObjects[i].name+ '">'+ productsObjects[i].tag +'   '+productsObjects[i].name+'</p> <br>')
				$(".content_services").append($todoListItem);
			}
		}
		
$.getJSON("/masters.json", function(masters){
	var $masters = $("<select id='masters' class ='choose_master'>");
	for (var i=0; i<masters.length;i++){
		$masters.append('<option>'+masters[i].name + '</option>');
	}
	$(".masters").append($masters);
});
var $butSave = $("<button>").text("Отправить заявку").addClass("button-contact");
$("main").append($butSave);

$butSave.on("click", function() {
	var $name = $('#name').val();
		var $number = $('#number').val();
		var $date = $('#date').val();
		console.log($name.trim());
		console.log($name);
	if ( $name.trim() != '' && $number.trim() != '' && $date.trim() != '' && document.querySelector('input[name="choose_service"]:checked') != null){
	console.log("заходит");
	var service = document.querySelector('input[name="choose_service"]:checked').value;
	var $addition = [];
	$('input[name="choose_addition"]:checked').each(function(){
      $addition.push($(this).val());
    }); 
	var getValue_master = document.getElementById('masters').value;

	var NewApplication = {name: $name, number : $number, date:$date,  service:service, addition:$addition, master:getValue_master};


	$.post("/applications", NewApplication, function(result) {
                console.log(result);
                //UsersObjects.push(newUser);
            }).done(function(response) {
                console.log(response);
                alert('Заявка отправлена!');
                $('#name').val("");
                $('#number').val("");
                $('#date').val("");
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                if (jqXHR.status === 501) {
                    alert("Такая заявка уже существует!");
                } else {                    
                    alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);   
                }
            });





	}else{
		alert("Вы не заполнили все поля!");
	}
});

$('.art-stranger').mask('+7 (999) 999-99-99');
$.fn.setCursorPosition = function(pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};
$('input[type="tel"]').click(function(){
    $(this).setCursorPosition(4);  // set position number
  });
}
$(document).ready(function () {
	$.getJSON("/services.json", function (productsObjects) {
		// вызов функции main с аргументом в виде объекта productsObjects
		main(productsObjects);
	});
});