;(function( $ ) {

    var dump = null,
        
        defaults = {
            token : null,
            page  : null,
            limit : 25,
            console : null,
            log   : false
        },
        
        methods = {
            process : function( response ){
                methods.log( 'Fpde: Processing data retrieved' );
                $.each( response, function(index, value) {
                    switch( index ){
                        case 'data' :
                                methods.log( 'Fpde: More ' + value.length + ' itens retrieved -  Total of ' + dump.count );
                                value.length ? $.each( value, methods.insert ) : methods.finish();
                            break;
                        case 'paging' :
                                methods.log( 'Fpde: Searching for more data' );
                                dump.retrieve(value.next);
                            break;
                    }
                });
            },
            insert : function( index,item ){
                dump.data.push(item);
                dump.count++;
            },
            finish : function(){
                methods.log( 'Fpde: Dump finalized' );
                methods.log( 'Fpde: <strong>JSON dump</strong>' );
                methods.log( JSON.stringify(dump.data) );
            },
            log : function( message ){
                if ( dump.options.log ){
                    dump.options.console ? dump.options.console.append('<p>' + message + '</p>') : console.log(message);
                }
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
        retrieve: function( path ) {
            this.path = path ? path : 'https://graph.facebook.com/' + this.options.page + '/feed?limit=' + this.options.limit + '&access_token=' + this.options.token;
            methods.log( 'Fpde: Retrieving data - ' +  this.path );
            $.getJSON( this.path, methods.process );
        }
    }

    $.Fpde = function( options ) {
        dump = new Fpde( options );
        return dump;
    };

}(jQuery));