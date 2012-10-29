;(function( $ ) {

    var dump = null,
        
        defaults = {
            token : null,
            page  : null,
            limit : 25,
            log   : false,
            onStart  : function( data ) {},
            onLoop   : function( data ) {},
            onFinish : function( data ) {}
        },
        
        methods = {
            retrieve : function( path ) {
                methods.log( 'Fpde: Retrieving data - ' +  path );
                $.getJSON( path, methods.process );
            },
            process : function( response ) {
                methods.log( 'Fpde: Processing data retrieved' );
                $.each( response, function(index, value) {
                    switch ( index ){
                        case 'data' :
                                methods.log( 'Fpde: More ' + value.length + ' itens retrieved -  Total of ' + dump.count );
                                value.length ? $.each( value, methods.insert ) : methods.finish();
                            break;
                        case 'paging' :
                                methods.log( 'Fpde: Searching for more data' );
                                methods.retrieve(value.next);
                            break;
                    }
                });
            },
            insert : function( index,item ) {
                methods.callback( dump.options.onLoop, item );
                dump.data.push(item);
                dump.count++;
            },
            finish : function() {
                methods.callback( dump.options.onFinish, dump.data );
                methods.log( 'Fpde: Dump finalized' );
                methods.log( 'Fpde: <strong>JSON dump</strong>' );
                methods.log( JSON.stringify(dump.data) );
            },
            callback : function( _function,response ) {
                typeof _function == 'function' ? _function.call( this, response ) : false;
            },
            log : function( message ) {
                dump.options.log ? console.log(message) : false;
            }
        }

    function Fpde( options ) {
        this.options  = $.extend( {}, defaults, options ) ;
        this.defaults = defaults;
        this.count    = 0;
        this.path     = null;
        this.data     = [];
    }

    Fpde.prototype = {
        start : function( path ) {
            this.path = path ? path : 'https://graph.facebook.com/' + this.options.page + '/feed?limit=' + this.options.limit + '&access_token=' + this.options.token;
            methods.callback( this.options.onStart, this.path );
            methods.retrieve( this.path );
        }
    }

    $.Fpde = function( options ) {
        dump = new Fpde( options );
        return dump;
    };

}(jQuery));