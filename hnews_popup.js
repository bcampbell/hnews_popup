/*
 * jquery popup widget to display hNews information on a page
 *
 * Written by Ben Campbell
 * Copyright 2010, the Media Standards Trust
 *
 * Released under the GPL (but we'd be happy with any
 * other open-source license too - just ask)
 *
 * Source code at:
 * http://github.com/bcampbell/hnews_popup
 *
 * Uses Dan Webb's Sumo uF parser (with modifications).
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
      // fns to format particular bits of data:
      fmt_hcard: function( hcard ) {
        if( hcard.url ) {
          return '<a href="' + hcard.url + '">' + hcard.fn + '</a>';
        } else {
          return hcard.fn
        }
      },
      fmt_link: function( link ) {
        var txt = link.text || link.href;
        return '<a href="' + link.href + '">' + txt + '</a>';
      },
      fmt_date: function( d ) {
        // d is string containing an iso-8061 date
        /* TODO: should do more human-formatting here */
        return d;
      },
      fmt_geo: function(geo) {
        /* add a googlemap link by default */
        return 'lat: ' + geo.latitude + ' long: ' + geo.longitude +
          ' (<a href="http://maps.google.com/?ll=' + geo.latitude + ',' + geo.longitude + '">map</a>)';
      }
    }, options);

    $(this).each(function() {
      var trigger = $(this);
      trigger.addClass( 'hnews-popup-trigger' );
      var hentry = trigger.closest( '.hentry' );  // get containing article
      // parse now, using sumo parser
      var uf = HNews.discover( hentry );
      var html = options.head_fn();
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
    });

    // format content of popup box
    function generate_popup_body_sumo( art ) {
      var row = options.row_fn;
      var fmt_link=options.fmt_link;
      var fmt_date=options.fmt_date;
      var fmt_geo=options.fmt_geo;
      var fmt_hcard=options.fmt_hcard;
      out = '';

      out += row( "Title", art.entryTitle );
      if( art.authorList ) {
        $.each( art.authorList, function(i,author) {
          out += row( "Author", fmt_hcard( author) );
        });
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
        $.each( art.principlesList, function(i,link) {
          out += row('Principles', fmt_link(link) );
        });
      }

      if( art.itemLicenseList ) {
        $.each( art.itemLicenseList, function(i,link) {
          out += row('License', fmt_link(link));
        });
      }

      if( art.tagList ) {
        var fragments = []
        $.each( art.tagList, function(i,tag) {
          fragments.push( fmt_link( { href: tag.href, text: tag.tag } ) );
        } );
        out += row( 'Tags', fragments.join(', ') );
      }

      return out;
    }
}
})(jQuery);

