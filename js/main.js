var info = $('.info ol'),
	view   = $('.view ul'),
	page   = $('#page'),
	token  = $('#token'),
	count  = 1,
	dump   = null;

var onLoop = function( data ){
	var likes    = typeof data.likes == 'undefined' ? 0 : data.likes.count,
		comments = typeof data.comments == 'undefined' ? 0 : data.comments.count,
		message  = typeof data.message == 'undefined' ? '' : data.message;

	info.append('<li> Likes: ' + likes + ' - Comments: ' + comments + '</li>');
	view.append('<li title="' + message + '">' + (count++) +'</li>');
}

var onFinish = function( data ){
	$('#button').html('Restart').fadeTo("slow", 1.00);
}

var onError = function( response ){
	$('#button').html('Restart').fadeTo("slow", 1.00);
}

$('#button').click(function(){
	if(page.val() && token.val()) {
		info.html('');
		view.html('');
		$(this).html('Retrieving...').fadeTo("slow", 0.33);
		dump = $.Facebook({ 
			token : token.val(),
			page  : page.val(),
		    onLoop   : onLoop,
		    onFinish : onFinish,
		    onError  : onError,
		    log   : false });

		dump.start();
	} else {

	}
});

