var dump = $.Fpde({ 
	token : '390648241005588|Dfb2X2n-4MuwRPXLNz8TTkEU2Ug',
	page  : 'wikicidade',
    limit : 50,
    onStart  : function( data ){ console.log(data) },
    onLoop   : function( data ){ console.log(data) },
    onFinish : function( data ){ console.log(data) },
    log   : false });

$('#start').click(function(){
	$('body').fadeOut(function(){
		dump.start();
	});
});