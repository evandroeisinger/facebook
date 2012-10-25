var dump = $.Fpde({ 
	token : '390648241005588|Dfb2X2n-4MuwRPXLNz8TTkEU2Ug',
	page  : 'wikicidade',
    limit : 50,
    console : $('html'),
    log   : true });

$('#start').click(function(){
	$('body').fadeOut(function(){
		dump.retrieve();
	});
});