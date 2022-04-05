function tabs(selector){
	var tabs = $(selector);
	var span = tabs.children('span');
	var div = tabs.children('div');
	tabs
	.addClass('tabs')
	.prepend('<div class = "tabs_controls"></div>')
	.append('<div class = "tabs_panels"></div>')
	.on('click', '.tabs_control', function(e){
		e.preventDefault();

		tabs
		.find('.tabs_control_active')
		.removeClass('tabs_control_active');

		tabs
		.find('.tabs_panel_active')
		.removeClass('tabs_panel_active');

		$(this).addClass('tabs_control_active');
		tabs
		.find('.tabs_panel')
		.eq($(this).index())
		.addClass('tabs_panel_active');

	});
	span
	.prependTo(selector + ' .tabs_controls')
	.each(function(i){

		var span=$(this);

		if (!i){
			span
			.replaceWith(
			'<a href = "#" class = "tabs_control tabs_control_active">'
			 +span.text()+ '</a>');
		} else{
			span.
			replaceWith(
			'<a href = "#" class = "tabs_control">'
			 +span.text()+ '</a>');
		}
	});

	div
	.prependTo(selector + ' .tabs_panels')
	.addClass('tabs_panel')
	.eq(0)
	.addClass('tabs_panel_active');
}
tabs('#tab');

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
var masters = document.querySelector('#masters');
city.addEventListener('change', function(){
	console.log(this.value);
});