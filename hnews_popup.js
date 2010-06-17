

(function($) {
    $.fn.hnews_popup = function(options) {
        options = $.extend({
            url: window.location.href,
            head_fn: function() {
                var html = '<div class="hnews-popup-container">\n';
                html += ' <div class="hnews-popup">\n';
                html += '<h3 class="hnews-popup-heading">hNews details</h3>\n';
/*                html += "<dl>\n"; */
                html += "<table>\n";
                return html;
            },
            foot_fn: function() {
                /*var html = '</dl>\n'; */
                var html = '</table>\n';
                html += '</div>\n';
                html += ' </div>\n'; 
                return html;
            },
/*
            row_fn: function( label, content ) {
                return ' <dt class="hnews-popup-name">' + label + '</dt><dd class="hnews-popup-value">' + content + "</dd>\n";
            }
*/
            row_fn: function( label, content ) {
                return ' <tr><td class="hnews-popup-name">' + label + '</td><td class="hnews-popup-value">' + content + "</td></tr>\n";
            }
        }, options);

        $(this).each(function() {
            var targ = encodeURIComponent( options.url );
            var fullurl = "http://itchanged.org/parse?url=" + targ + "&callback=?";
            var trigger = $(this);
            trigger.addClass( 'hnews-popup-trigger' );
            $.getJSON( fullurl, function( data ) {
                html = options.head_fn();
                html += generate_popup_body( data[0] );
                html += options.foot_fn();

                var div = $(html);
                trigger.after( div );
                div.mouseleave( function() { div.hide(); } );
                trigger.mouseenter( function() {
                    if( div.is(':hidden') ) {
                        div.show();
                        div.offset( trigger.offset() );
                    }
                } );
            } );
        });

/*
hNews-specific fields:
    source-org
    dateline
    geo
*    item-license
*    principles

hAtom fields:    
*    entry-title. required. text.
-    entry-content. optional (see field description). text. [*]
-    entry-summary. optional. text.
*    updated. required using datetime-design-pattern. [*]
*    published. optional using datetime-design-pattern.
*    author. required using hCard. [*]
    bookmark (permalink). optional, using rel-bookmark.
    tags
*/

        function fmt_hcard( hcard ) {
            if( hcard.url ) {
                return '<a href="' + hcard.url + '">' + hcard.fn + '</a>';
            } else {
                return hcard.fn
            }
        }

        /* TODO: should we expand relative URLs here? or not? */
        function fmt_link( link ) {
            return '<a href="' + link.href + '">' + link.text + '</a>';
        }

        /* TODO: datetime pattern - do nice formatting here */
        function fmt_date( d ) {
            return d;
        }

        function generate_popup_body( art ) {
            var row = options.row_fn;
            out = '';


            out += row( "Title", art['entry-title'] );

            var tmp=[];
            for( var i=0; i<art['author'].length; ++i ) {
                tmp.push( fmt_hcard(art['author'][i]) );
                //console.log( tmp );
            }

            /* NOTE: item-license _should_ be an array... eg for dual-licencing */
            if( art['item-license'] ) {
                out += row( "License", fmt_link( art['item-license'] ) );
            }

            out += row( "Author", tmp.join(', ') );
            if( art.published ) {
                out += row( "Published", fmt_date( art.published ) );
            }
            if( art.updated ) {
                out += row( "Updated", fmt_date( art.updated ) );
            }

            if( art.principles ) {
                var icon = '<img src="http://labs.ap.org/principles-book-blue.png" alt="principles"  style="border: none; padding: 0px;" />';
                var snippet = '<a href="'+art.principles.href+'">'+art.principles.href+'</a>';
                out += row( "Principles " + icon, snippet );
            }

            return out;
        }


    }
})(jQuery);

