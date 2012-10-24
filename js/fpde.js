;(function( $ ) {
    
    var defaults = {
            page  : '',
            limit : 50,
            log   : false
        };

    function Fpde( options ) {
        this.options = $.extend( {}, defaults, options ) ;
        this.defaults = defaults;
        this.setup();
    }

    Fpde.prototype = {
        setup: function() {
        },
        dump: function() {

        },
        progress: function() {

        },
        finish: function() {

        },
        log: function() {
        }
    }

    $.Fpde = function( options ) {
        return new Fpde( options );
    };

}(jQuery));