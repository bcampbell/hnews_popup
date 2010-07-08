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

// TODO: support multiple articles per page


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
            parser: 'sumo',        /* use "itchanged.org" to use the itchanged.org API */
            url: window.location.href  /* itchanged parser can parse hNews from _other_ pages */
        }, options);

        $(this).each(function() {
            var trigger = $(this);
            trigger.addClass( 'hnews-popup-trigger' );

            if( options.parser == 'sumo' ) {
              // parse now, using sumo parser
//              var hnews = Microformats.get( 'hNews',document.documentElement);
              uf = HNews.discover();
              //console.dir( hnews );
              html = options.head_fn();
              html += generate_popup_body_sumo( uf[0] );
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

        /* TODO: do nice formatting here */
        function fmt_date( d ) {
            return d;
        }

        function fmt_url(url) {
            return '<a href="' + url + '">' + url + '</a>';
        }

        function fmt_geo(geo) {
            return 'lat: ' + geo.latitude + ' long: ' + geo.longitude +
                ' (<a href="http://maps.google.com/?ll=' + geo.latitude + ',' + geo.longitude + '">map</a>)';
        }
        // format output from sumo parser
        function generate_popup_body_sumo( art ) {
          var row = options.row_fn;
          out = '';

        // fields not yet displayed:
        // entry-content
        // entry-summary
        // bookmark
        // tags

          out += row( "Title", art.entryTitle );
          for( var i=0; i<art.authorList.length; ++i ) {
              out += row( "Author", fmt_hcard( art.authorList[i]) );
          }

            if( art.published ) {
                out += row( "Published", fmt_date( art.published ) );
            }
            if( art.updated ) {
                out += row( "Updated", fmt_date( art.updated ) );
            }
            if( art.sourceOrg ) {
                out += row( "Source organisation", fmt_hcard( art.sourceOrg ) );
            }

            if( art.dateline ) {
                out += row( 'Dateline', art.dateline );
            }
            if( art.geoList ) {
              $.each( art.geoList, function(i,geo) {
                out += row('Geo', fmt_geo(geo) );
              });
            }

            if( art.principlesList ) {
              $.each( art.principlesList, function(i,url) {
                out += row('Principles', fmt_url(url) );
              });
            }

            if( art.itemLicenseList ) {
              $.each( art.itemLicenseList, function(i,url) {
                out += row('License', fmt_url(url));
              });
            }

            return out;
        }
    }
})(jQuery);

