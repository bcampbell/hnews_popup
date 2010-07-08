//

// done:
// 
// source-org
// principles 
// item-license
// entry-title
// entry-content
// entry-summary
// updated
// published
// author
// geo
//
// TODO:
//
// bookmark - if missing, use nearest-in-parent?
// dateline - string or hcard
// source-org - if missing, use nearest-in-parent
// tags - rel
//
// ISSUES:
// - should relative hrefs be made absolute autmatically?
//
// - problems with nested geos.
// the hnews 'geo' field will pick up 'geo's nested in other uFs, which
// isn't what we want. This is a more general nested-uF problem with sumo,
// I think, and deserves a more general solution...

var Geo = Microformat.define( 'geo', { one:['latitude','longitude'] } )

var HNews = Microformat.define('hentry', {
  one : ['entry-title', 'entry-summary', 'entry-content', 'published', 'updated', {'source-org': HCard} ],
  many : [ {'author' : HCard}, {'geo':Geo} ],
  rels : [ 'principles', 'item-license', 'tag' ],
  postprocess : function( data,node ) {
    // implied updated
    if( data.published && !data.updated ) {
        data.updated=data.published;
    }
  }
});

