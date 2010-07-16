// Sumo uF parser for hNews
// by Ben Campbell (Media Standards Trust)
//
// bookmark - not yet done. if missing, use nearest-in-parent?
// dateline - string or hcard
// source-org - if missing, use nearest-in-parent
//
// ISSUES:
// - problems with nested geos.
// the hnews 'geo' field will pick up 'geo's nested in other uFs, which
// isn't what we want. This is a more general nested-uF problem with sumo,
// I think, and deserves a more general solution...

var Geo = Microformat.define( 'geo', { one:['latitude','longitude'] } )

var HNews = Microformat.define('hentry', {
  one : ['entry-title', 'entry-summary', 'entry-content', 'published', 'updated', {'source-org': HCard}, 'dateline' ],
  many : [ {'author' : HCard}, {'geo':Geo} ],
  rels : [ 'principles', 'item-license', 'tag' ],
  postprocess : function( data,node ) {

    // if 'updated' not present, defaults to 'published'
    if( data.published && !data.updated ) {
        data.updated=data.published;
    }

    // extract names of tags from their URLs
    if( data.tagList ) {
      for( var i in data.tagList ) {
        var url = data.tagList[i].href;
        var m = /[/]([^/]*)[/]?([?].*)?$/.exec( url );
        data.tagList[i].tag = unescape( m ? m[1] : '' );
      }
    }
  }
});

