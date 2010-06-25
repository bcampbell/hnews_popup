/*
 * jquery popup widget to display hNews information on a page
 *
 * Written by Ben Campbell
 * Copyright 2010, the Media Standards Trust
 *
 * Released under the GPL (but we'd probably allow any
 * other open-source license too - just ask us!)
 *
 * Source code at:
 * http://github.com/bcampbell/hnews_popup
 */

(function($) {
    $.fn.hnews_popup = function(options) {
        options = $.extend({
            head_fn: function() {
                var html = '<div class="hnews-popup-container">\n';
                html += ' <div class="hnews-popup">\n';
                html += '<h3 class="hnews-popup-heading">hNews details</h3>\n';
                html += "<table>\n";
                return html;
            },
            foot_fn: function() {
                var html = '</table>\n';
                html += '</div>\n';
                html += ' </div>\n'; 
                return html;
            },
            row_fn: function( label, content ) {
                return ' <tr><td class="hnews-popup-name">' + label + '</td><td class="hnews-popup-value">' + content + "</td></tr>\n";
            },
            parser: 'kaply',        /* use "itchanged.org" to use the itchanged.org API */
            url: window.location.href  /* itchanged parser can parse hNews from _other_ pages */
        }, options);

        $(this).each(function() {
            var trigger = $(this);
            trigger.addClass( 'hnews-popup-trigger' );

            if( options.parser == 'kaply' ) {
              // parse now, using kaply parser
              var hnews = Microformats.get( 'hNews',document.documentElement);
              //console.dir( hnews );
              html = options.head_fn();
              html += generate_popup_body_kaply( hnews );
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
            } else if( options.parser == 'itchanged.org' ) {
              // call itchanged api to parse
              // TODO: we should fill the popup now, with just a placeholder
              // "loading..." spinner in the body.
              // Then, when the ajax call comes back with the data, format it
              // and insert it into the popup.

              // do a jsonp call to the itchanged.org api
              var targ = encodeURIComponent( options.url );
              var fullurl = "http://itchanged.org/parse?url=" + targ + "&callback=?";
              $.getJSON( fullurl, function( data ) {
                html = options.head_fn();
                html += generate_popup_body_itchanged( data[0] );
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
            }

        });

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


        // format output from kaply parser
        function generate_popup_body_kaply( art ) {
            var row = options.row_fn;
            out = '';
            art = art[0];

            //console.log( art['entry-title'] )

            out += row( "Title", art['entry-title'] );



            if( art.author ) {
                for( var i=0; i<art.author.length; ++i ) {
                    out += row( "Author", fmt_hcard( art.author[i]) );
                }
            }

            var tmp=[];
            for( var i=0; i<art['author'].length; ++i ) {
                tmp.push( fmt_hcard(art['author'][i]) );
                //console.log( tmp );
            }
            if( art.published ) {
                out += row( "Published", fmt_date( art.published ) );
            }
            if( art.updated ) {
                out += row( "Updated", fmt_date( art.updated ) );
            }

            if( art['source-org'] ) {
                out += row( "Source Org", fmt_hcard( art['source-org'] ) );
            }

            if( art.dateline ) {
                out += row( 'Dateline', art.dateline );
            }

            if( art.principles ) {
                var icon = '<img src="http://labs.ap.org/principles-book-blue.png" alt="principles"  style="border: none; padding: 0px;" />';
                var txt = art.principles.text; 
                var link = art.principles.link; 
                if( !txt ) {
                    txt = link;
                }
                var snippet = '<a href="'+link+'">'+txt+'</a>';
                out += row( "Principles " + icon, snippet );
            }

            /* NOTE: item-license _should_ be an array... eg for dual-licencing */
            if( art['item-license'] ) { 
                for( var i=0; i<art['item-license'].length; ++i ) {
                    var el = art['item-license'][i];
                    var snippet = '<a href="'+el.link+'">'+(el.text ? el.text:el.link)+'</a>';
                    out += row( "License", snippet );
                }
            }
            return out;
        }


        // format results from ITCHANGED parser
        function generate_popup_body_itchanged( art ) {
            var row = options.row_fn;
            out = '';


            out += row( "Title", art['entry-title'] );


            /* NOTE: item-license _should_ be an array... eg for dual-licencing */
            if( art['item-license'] ) {
                out += row( "License", fmt_link( art['item-license'] ) );
            }

            var tmp=[];
            for( var i=0; i<art['author'].length; ++i ) {
                tmp.push( fmt_hcard(art['author'][i]) );
                //console.log( tmp );
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

