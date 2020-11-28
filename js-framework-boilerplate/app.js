$('#login').click(function(){
	var g = G$('Prateek', 'Pandey');
	$('#logindiv').hide();
	g.setLanguage($('#lang').val()).HTMLgreeter('#greeting', true);
})