;(function( $ ) {

    var dump = null,
        
        defaults = {
            token : null,
            page  : null,
            log   : false,
            onStart  : function( data ) {},
            onLoop   : function( data ) {},
            onFinish : function( data ) {},
            onError  : function( data ) {}
        },
        
        methods = {
            retrieve : function( path ) {
                methods.log( 'Facebook: Retrieving data - ' +  path );
                $.ajax({
                    url      : path,
                    dataType : 'json',
                    success  : methods.process,
                    error    : methods.error
                });
            },
            process : function( response ) {
                methods.log( 'Facebook: Processing data retrieved' );
                $.each( response, function(index, value) {
                    switch ( index ){
                        case 'data' :
                                methods.log( 'Facebook: More ' + value.length + ' itens retrieved -  Total of ' + dump.count );
                                value.length ? $.each( value, methods.insert ) : methods.finish();
                            break;
                        case 'paging' :
                                methods.log( 'Facebook: Searching for more data' );
                                methods.retrieve( value.next );
                            break;
                    }
                });
            },
            insert : function( index,item ) {
                methods.callback( dump.options.onLoop, item );
                dump.data.push( item );
                dump.count++;
            },
            finish : function() {
                methods.callback( dump.options.onFinish, dump.data );
                methods.log( 'Facebook: Dump finalized' );
                methods.log( 'Facebook: <strong>JSON dump</strong>' );
                methods.log( JSON.stringify( dump.data ) );
            },
            error : function( response ) {
                methods.callback( dump.options.onError, response );
            },
            callback : function( _function,response ) {
                typeof _function == 'function' ? _function.call( this, response ) : false;
            },
            log : function( message ) {
                dump.options.log ? console.log( message ) : false;
            }
        }

    function Facebook( options ) {
        this.options  = $.extend( {}, defaults, options ) ;
        this.defaults = defaults;
        this.count    = 0;
        this.path     = null;
        this.data     = [];
    }

    Facebook.prototype = {
        start : function( path ) {
            this.path = path ? path : 'https://graph.facebook.com/' + this.options.page + '/feed?access_token=' + this.options.token;
            methods.callback( this.options.onStart, this.path );
            methods.retrieve( this.path );
        }
    }

    $.Facebook = function( options ) {
        dump = new Facebook( options );
        return dump;
    };

}(jQuery));