var main = function (productsObjects) {
	"use strict";
	//создание пустого массива с вкладками
	var tabs = [];

	var ListOfTags = TagList(productsObjects);

	for (var i = 0; i<ListOfTags.length; i++){
		tabs.push({
			"name": ListOfTags[i]
		})
	}

	$("main .content").append('<div class="tabs_controls"></div>');

	tabs.forEach(function (tab) {
		var $aElement = $("<a class='tabs_control'>").attr("href",""),
			$spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement);
		$("main #tab").append($aElement);

		$spanElement.on("click", function () {
			var $content;
			$("#tab a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .tabs_controls").empty();
			$.getJSON("/services.json", function(productsObjects){
				var $content = $("<div class='tabs_panels'>");
				for (var i = 0; i<productsObjects.length; i++) {
					if (productsObjects[i].tag === $spanElement.text()){
						var $todoListItem = liaView(productsObjects[i]);
						$content.append($todoListItem);
					}
				}
				$(".tabs_controls").append($content);

			})
			return false;
		});
		let offset = 0; //смещение от левого края
		const sliderline = document.querySelector('#tab');
				document.querySelector('.SliderForTab_Next').addEventListener('click', function(){
					offset+=570;
					sliderline.style.left = -offset +'px';
					}
					);
				document.querySelector('.SliderForTab_Prev').addEventListener('click', function(){
				offset-=570;
				if (offset<0){
					offset= 0;
				}
				sliderline.style.left = -offset +'px';
				});
	});

	$("#tab a:first-child span").trigger("click");

	$.getJSON("/masters.json", function (masters) {
		var $content = $("<div class = 'slider-line'>");
		var $ForEachMaster = $("<a style='font-weight: bold;font-family: EB Garamond, serif; font-size: large; padding-left: 5px;padding-top: 10px;''>");
		for (var i=0; i<masters.length;i++){
			$content.append($ForEachMaster);
			$content.append(masters[i].name + '</a>');
			$content.append('<img src=' + masters[i].img + '>');
		}
		$(".slider").append($content);
		let offset = 0; //смещение от левого края
		const sliderline = document.querySelector('.slider-line');
		document.querySelector('.slider-next').addEventListener('click', function(){
			offset+=409.141;
			if (offset>818.282){
				offset= 0;
			}
			sliderline.style.left = -offset +'px';
		}
		);
		document.querySelector('.slider-prev').addEventListener('click', function(){
			offset-=409.141;
				if (offset<0){
					offset= 818.282;
				}
			sliderline.style.left = -offset +'px';
		}
	);
	});

};

var TagList = function(productsObjects){
	var tags = [];
		productsObjects.forEach(function (service) {
			if (tags.indexOf(service.tag) === -1) {
				tags.push(service.tag);
			}
	});
	return tags;
}

var liaView = function(element) {
	var $astyleItem = $('<a style="font-weight: bold">');
	$astyleItem.append(element.name + '<br>');


	element.short_description.forEach(function (description) {
		$astyleItem.append(description + '<br>');
	});
	var $divItem = $("<div class='tabs_panel'>");
	$divItem.append($astyleItem);

	var $content = $("<ul>");
	element.long_description.forEach(function (description) {
		$content.append($("<li>").text(description));
	})

	$divItem.append($content);

	return $divItem;
};

$(document).ready(function () {
	$.getJSON("/services.json", function (productsObjects) {
		// вызов функции main с аргументом в виде объекта productsObjects
		main(productsObjects);
	});
});