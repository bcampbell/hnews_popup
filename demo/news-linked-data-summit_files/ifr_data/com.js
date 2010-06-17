var gadgets=gadgets||{},shindig=shindig||{},osapi=osapi||{};
;
gadgets.config=function(){var A=[];
var B;
return{register:function(E,D,C){var F=A[E];
if(!F){F=[];
A[E]=F
}F.push({validators:D||{},callback:C})
},get:function(C){if(C){return B[C]||{}
}return B
},init:function(E,L){B=E;
for(var C in A){if(A.hasOwnProperty(C)){var D=A[C],I=E[C];
for(var H=0,G=D.length;
H<G;
++H){var J=D[H];
if(I&&!L){var F=J.validators;
for(var K in F){if(F.hasOwnProperty(K)){if(!F[K](I[K])){throw new Error('Invalid config value "'+I[K]+'" for parameter "'+K+'" in component "'+C+'"')
}}}}if(J.callback){J.callback(E)
}}}}},EnumValidator:function(F){var E=[];
if(arguments.length>1){for(var D=0,C;
(C=arguments[D]);
++D){E.push(C)
}}else{E=F
}return function(H){for(var G=0,I;
(I=E[G]);
++G){if(H===E[G]){return true
}}}
},RegExValidator:function(C){return function(D){return C.test(D)
}
},ExistsValidator:function(C){return typeof C!=="undefined"
},NonEmptyStringValidator:function(C){return typeof C==="string"&&C.length>0
},BooleanValidator:function(C){return typeof C==="boolean"
},LikeValidator:function(C){return function(E){for(var F in C){if(C.hasOwnProperty(F)){var D=C[F];
if(!D(E[F])){return false
}}}return true
}
}}
}();;
gadgets.util=function(){function G(L){var M;
var K=L;
var I=K.indexOf("?");
var J=K.indexOf("#");
if(J===-1){M=K.substr(I+1)
}else{M=[K.substr(I+1,J-I-1),"&",K.substr(J+1)].join("")
}return M.split("&")
}var E=null;
var D={};
var C={};
var F=[];
var A={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true};
function B(I,J){return String.fromCharCode(J)
}function H(I){D=I["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,H)
}return{getUrlParameters:function(Q){if(E!==null&&typeof Q==="undefined"){return E
}var M={};
E={};
var J=G(Q||document.location.href);
var O=window.decodeURIComponent?decodeURIComponent:unescape;
for(var L=0,K=J.length;
L<K;
++L){var N=J[L].indexOf("=");
if(N===-1){continue
}var I=J[L].substring(0,N);
var P=J[L].substring(N+1);
P=P.replace(/\+/g," ");
M[I]=O(P)
}if(typeof Q==="undefined"){E=M
}return M
},makeClosure:function(L,N,M){var K=[];
for(var J=2,I=arguments.length;
J<I;
++J){K.push(arguments[J])
}return function(){var O=K.slice();
for(var Q=0,P=arguments.length;
Q<P;
++Q){O.push(arguments[Q])
}return N.apply(L,O)
}
},makeEnum:function(J){var L={};
for(var K=0,I;
(I=J[K]);
++K){L[I]=I
}return L
},getFeatureParameters:function(I){return typeof D[I]==="undefined"?null:D[I]
},hasFeature:function(I){return typeof D[I]!=="undefined"
},getServices:function(){return C
},registerOnLoadHandler:function(I){F.push(I)
},runOnLoadHandlers:function(){for(var J=0,I=F.length;
J<I;
++J){F[J]()
}},escape:function(I,M){if(!I){return I
}else{if(typeof I==="string"){return gadgets.util.escapeString(I)
}else{if(typeof I==="array"){for(var L=0,J=I.length;
L<J;
++L){I[L]=gadgets.util.escape(I[L])
}}else{if(typeof I==="object"&&M){var K={};
for(var N in I){if(I.hasOwnProperty(N)){K[gadgets.util.escapeString(N)]=gadgets.util.escape(I[N],true)
}}return K
}}}}return I
},escapeString:function(M){if(!M){return M
}var J=[],L,N;
for(var K=0,I=M.length;
K<I;
++K){L=M.charCodeAt(K);
N=A[L];
if(N===true){J.push("&#",L,";")
}else{if(N!==false){J.push(M.charAt(K))
}}}return J.join("")
},unescapeString:function(I){if(!I){return I
}return I.replace(/&#([0-9]+);/g,B)
}}
}();
gadgets.util.getUrlParameters();;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.util,"escapeString"],[gadgets.util,"getFeatureParameters"],[gadgets.util,"getUrlParameters"],[gadgets.util,"hasFeature"],[gadgets.util,"registerOnLoadHandler"],[gadgets.util,"unescapeString"]])
});;
shindig.Auth=function(){var authToken=null;
var trusted=null;
function addParamsToToken(urlParams){var args=authToken.split("&");
for(var i=0;
i<args.length;
i++){var nameAndValue=args[i].split("=");
if(nameAndValue.length===2){var name=nameAndValue[0];
var value=nameAndValue[1];
if(value==="$"){value=encodeURIComponent(urlParams[name]);
args[i]=name+"="+value
}}}authToken=args.join("&")
}function init(configuration){var urlParams=gadgets.util.getUrlParameters();
var config=configuration["shindig.auth"]||{};
if(config.authToken){authToken=config.authToken
}else{if(urlParams.st){authToken=urlParams.st
}}if(authToken!==null){addParamsToToken(urlParams)
}if(config.trustedJson){trusted=eval("("+config.trustedJson+")")
}}gadgets.config.register("shindig.auth",null,init);
return{getSecurityToken:function(){return authToken
},updateSecurityToken:function(newToken){authToken=newToken
},getTrustedData:function(){return trusted
}}
};;
shindig.auth=new shindig.Auth();;
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json=(function(){var A=/___$/;
return{parse:function(C){try{return window.JSON.parse(C)
}catch(B){return false
}},stringify:function(C){try{return window.JSON.stringify(C,function(E,D){return !A.test(E)?D:null
})
}catch(B){return null
}}}
})()
}else{gadgets.json=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",f(this.getUTCMonth()+1),"-",f(this.getUTCDate()),"T",f(this.getUTCHours()),":",f(this.getUTCMinutes()),":",f(this.getUTCSeconds()),"Z"].join("")
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;
switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c
}c=a.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}a=[];
if(typeof value.length==="number"&&!value.propertyIsEnumerable("length")){l=value.length;
for(i=0;
i<l;
i+=1){a.push(stringify(value[i])||"null")
}return"["+a.join(",")+"]"
}for(k in value){if(k.match("___$")){continue
}if(value.hasOwnProperty(k)){if(typeof k==="string"){v=stringify(value[k]);
if(v){a.push(stringify(k)+":"+v)
}}}}return"{"+a.join(",")+"}"
}}return{stringify:stringify,parse:function(text){if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return eval("("+text+")")
}return false
}}
}()
}gadgets.json.flatten=function(C){var D={};
if(C===null||C===undefined){return D
}for(var A in C){if(C.hasOwnProperty(A)){var B=C[A];
if(null===B||undefined===B){continue
}D[A]=(typeof B==="string")?B:gadgets.json.stringify(B)
}}return D
};;
var tamings___=tamings___||[];
tamings___.push(function(A){___.tamesTo(gadgets.json.stringify,safeJSON.stringify);
___.tamesTo(gadgets.json.parse,safeJSON.parse)
});;
gadgets.io=function(){var config={};
var oauthState;
function makeXhr(){var x;
if(typeof shindig!="undefined"&&shindig.xhrwrapper&&shindig.xhrwrapper.createXHR){return shindig.xhrwrapper.createXHR()
}else{if(window.ActiveXObject){x=new ActiveXObject("Msxml2.XMLHTTP");
if(!x){x=new ActiveXObject("Microsoft.XMLHTTP")
}return x
}else{if(window.XMLHttpRequest){return new window.XMLHttpRequest()
}}}}function hadError(xobj,callback){if(xobj.readyState!==4){return true
}try{if(xobj.status!==200){var error=(""+xobj.status);
if(xobj.responseText){error=error+" "+xobj.responseText
}callback({errors:[error],rc:xobj.status,text:xobj.responseText});
return true
}}catch(e){callback({errors:[e.number+" Error not specified"],rc:e.number,text:e.description});
return true
}return false
}function processNonProxiedResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var data={body:xobj.responseText};
callback(transformResponseData(params,data))
}var UNPARSEABLE_CRUFT="throw 1; < don't be evil' >";
function processResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var txt=xobj.responseText;
txt=txt.substr(UNPARSEABLE_CRUFT.length);
var data=eval("("+txt+")");
data=data[url];
if(data.oauthState){oauthState=data.oauthState
}if(data.st){shindig.auth.updateSecurityToken(data.st)
}callback(transformResponseData(params,data))
}function transformResponseData(params,data){var resp={text:data.body,rc:data.rc||200,headers:data.headers,oauthApprovalUrl:data.oauthApprovalUrl,oauthError:data.oauthError,oauthErrorText:data.oauthErrorText,errors:[]};
if(resp.rc<200||resp.rc>=400){resp.errors=[resp.rc+" Error"]
}else{if(resp.text){if(resp.rc>=300&&resp.rc<400){params.CONTENT_TYPE="TEXT"
}switch(params.CONTENT_TYPE){case"JSON":case"FEED":resp.data=gadgets.json.parse(resp.text);
if(!resp.data){resp.errors.push("500 Failed to parse JSON");
resp.rc=500;
resp.data=null
}break;
case"DOM":var dom;
if(window.ActiveXObject){dom=new ActiveXObject("Microsoft.XMLDOM");
dom.async=false;
dom.validateOnParse=false;
dom.resolveExternals=false;
if(!dom.loadXML(resp.text)){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}else{var parser=new DOMParser();
dom=parser.parseFromString(resp.text,"text/xml");
if("parsererror"===dom.documentElement.nodeName){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}break;
default:resp.data=resp.text;
break
}}}return resp
}function makeXhrRequest(realUrl,proxyUrl,callback,paramData,method,params,processResponseFunction,opt_contentType){var xhr=makeXhr();
if(proxyUrl.indexOf("//")==0){proxyUrl=document.location.protocol+proxyUrl
}xhr.open(method,proxyUrl,true);
if(callback){xhr.onreadystatechange=gadgets.util.makeClosure(null,processResponseFunction,realUrl,callback,params,xhr)
}if(paramData!==null){xhr.setRequestHeader("Content-Type",opt_contentType||"application/x-www-form-urlencoded");
xhr.send(paramData)
}else{xhr.send(null)
}}function respondWithPreload(postData,params,callback){if(gadgets.io.preloaded_&&postData.httpMethod==="GET"){for(var i=0;
i<gadgets.io.preloaded_.length;
i++){var preload=gadgets.io.preloaded_[i];
if(preload&&(preload.id===postData.url)){delete gadgets.io.preloaded_[i];
if(preload.rc!==200){callback({rc:preload.rc,errors:[preload.rc+" Error"]})
}else{if(preload.oauthState){oauthState=preload.oauthState
}var resp={body:preload.body,rc:preload.rc,headers:preload.headers,oauthApprovalUrl:preload.oauthApprovalUrl,oauthError:preload.oauthError,oauthErrorText:preload.oauthErrorText,errors:[]};
callback(transformResponseData(params,resp))
}return true
}}}return false
}function init(configuration){config=configuration["core.io"]||{}
}var requiredConfig={proxyUrl:new gadgets.config.RegExValidator(/.*%(raw)?url%.*/),jsonProxyUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("core.io",requiredConfig,init);
return{makeRequest:function(url,callback,opt_params){var params=opt_params||{};
var httpMethod=params.METHOD||"GET";
var refreshInterval=params.REFRESH_INTERVAL;
var auth,st;
if(params.AUTHORIZATION&&params.AUTHORIZATION!=="NONE"){auth=params.AUTHORIZATION.toLowerCase();
st=shindig.auth.getSecurityToken()
}else{if(httpMethod==="GET"&&refreshInterval===undefined){refreshInterval=3600
}}var signOwner=true;
if(typeof params.OWNER_SIGNED!=="undefined"){signOwner=params.OWNER_SIGNED
}var signViewer=true;
if(typeof params.VIEWER_SIGNED!=="undefined"){signViewer=params.VIEWER_SIGNED
}var headers=params.HEADERS||{};
if(httpMethod==="POST"&&!headers["Content-Type"]){headers["Content-Type"]="application/x-www-form-urlencoded"
}var urlParams=gadgets.util.getUrlParameters();
var paramData={url:url,httpMethod:httpMethod,headers:gadgets.io.encodeValues(headers,false),postData:params.POST_DATA||"",authz:auth||"",st:st||"",contentType:params.CONTENT_TYPE||"TEXT",numEntries:params.NUM_ENTRIES||"3",getSummaries:!!params.GET_SUMMARIES,signOwner:signOwner,signViewer:signViewer,gadget:urlParams.url,container:urlParams.container||urlParams.synd||"default",bypassSpecCache:gadgets.util.getUrlParameters().nocache||"",getFullHeaders:!!params.GET_FULL_HEADERS};
if(auth==="oauth"||auth==="signed"){if(gadgets.io.oauthReceivedCallbackUrl_){paramData.OAUTH_RECEIVED_CALLBACK=gadgets.io.oauthReceivedCallbackUrl_;
gadgets.io.oauthReceivedCallbackUrl_=null
}paramData.oauthState=oauthState||"";
for(var opt in params){if(params.hasOwnProperty(opt)){if(opt.indexOf("OAUTH_")===0){paramData[opt]=params[opt]
}}}}var proxyUrl=config.jsonProxyUrl.replace("%host%",document.location.host);
if(!respondWithPreload(paramData,params,callback,processResponse)){if(httpMethod==="GET"&&refreshInterval>0){var extraparams="?refresh="+refreshInterval+"&"+gadgets.io.encodeValues(paramData);
makeXhrRequest(url,proxyUrl+extraparams,callback,null,"GET",params,processResponse)
}else{makeXhrRequest(url,proxyUrl,callback,gadgets.io.encodeValues(paramData),"POST",params,processResponse)
}}},makeNonProxiedRequest:function(relativeUrl,callback,opt_params,opt_contentType){var params=opt_params||{};
makeXhrRequest(relativeUrl,relativeUrl,callback,params.POST_DATA,params.METHOD,params,processNonProxiedResponse,opt_contentType)
},clearOAuthState:function(){oauthState=undefined
},encodeValues:function(fields,opt_noEscaping){var escape=!opt_noEscaping;
var buf=[];
var first=false;
for(var i in fields){if(fields.hasOwnProperty(i)&&!/___$/.test(i)){if(!first){first=true
}else{buf.push("&")
}buf.push(escape?encodeURIComponent(i):i);
buf.push("=");
buf.push(escape?encodeURIComponent(fields[i]):fields[i])
}}return buf.join("")
},getProxyUrl:function(url,opt_params){var params=opt_params||{};
var refresh=params.REFRESH_INTERVAL;
if(refresh===undefined){refresh="3600"
}var urlParams=gadgets.util.getUrlParameters();
var rewriteMimeParam=params.rewriteMime?"&rewriteMime="+encodeURIComponent(params.rewriteMime):"";
var ret=config.proxyUrl.replace("%url%",encodeURIComponent(url)).replace("%host%",document.location.host).replace("%rawurl%",url).replace("%refresh%",encodeURIComponent(refresh)).replace("%gadget%",encodeURIComponent(urlParams.url)).replace("%container%",encodeURIComponent(urlParams.container||urlParams.synd)).replace("%rewriteMime%",rewriteMimeParam);
if(ret.indexOf("//")==0){ret=window.location.protocol+ret
}return ret
}}
}();
gadgets.io.RequestParameters=gadgets.util.makeEnum(["METHOD","CONTENT_TYPE","POST_DATA","HEADERS","AUTHORIZATION","NUM_ENTRIES","GET_SUMMARIES","GET_FULL_HEADERS","REFRESH_INTERVAL","OAUTH_SERVICE_NAME","OAUTH_USE_TOKEN","OAUTH_TOKEN_NAME","OAUTH_REQUEST_TOKEN","OAUTH_REQUEST_TOKEN_SECRET","OAUTH_RECEIVED_CALLBACK"]);
gadgets.io.MethodType=gadgets.util.makeEnum(["GET","POST","PUT","DELETE","HEAD"]);
gadgets.io.ContentType=gadgets.util.makeEnum(["TEXT","DOM","JSON","FEED"]);
gadgets.io.AuthorizationType=gadgets.util.makeEnum(["NONE","SIGNED","OAUTH"]);;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.io,"encodeValues"],[gadgets.io,"getProxyUrl"],[gadgets.io,"makeRequest"]])
});;
(function(){var I=null;
var J={};
var F=gadgets.util.escapeString;
var D={};
var H={};
var E="en";
var B="US";
var A=0;
function C(){var L=gadgets.util.getUrlParameters();
for(var K in L){if(L.hasOwnProperty(K)){if(K.indexOf("up_")===0&&K.length>3){J[K.substr(3)]=String(L[K])
}else{if(K==="country"){B=L[K]
}else{if(K==="lang"){E=L[K]
}else{if(K==="mid"){A=L[K]
}}}}}}}function G(){for(var K in H){if(typeof J[K]==="undefined"){J[K]=H[K]
}}}gadgets.Prefs=function(){if(!I){C();
G();
I=this
}return I
};
gadgets.Prefs.setInternal_=function(M,O){var N=false;
if(typeof M==="string"){if(!J.hasOwnProperty(M)||J[M]!==O){N=true
}J[M]=O
}else{for(var L in M){if(M.hasOwnProperty(L)){var K=M[L];
if(!J.hasOwnProperty(L)||J[L]!==K){N=true
}J[L]=K
}}}return N
};
gadgets.Prefs.setMessages_=function(K){D=K
};
gadgets.Prefs.setDefaultPrefs_=function(K){H=K
};
gadgets.Prefs.prototype.getString=function(K){if(K===".lang"){K="lang"
}return J[K]?F(J[K]):""
};
gadgets.Prefs.prototype.setDontEscape_=function(){F=function(K){return K
}
};
gadgets.Prefs.prototype.getInt=function(K){var L=parseInt(J[K],10);
return isNaN(L)?0:L
};
gadgets.Prefs.prototype.getFloat=function(K){var L=parseFloat(J[K]);
return isNaN(L)?0:L
};
gadgets.Prefs.prototype.getBool=function(K){var L=J[K];
if(L){return L==="true"||L===true||!!parseInt(L,10)
}return false
};
gadgets.Prefs.prototype.set=function(K,L){throw new Error("setprefs feature required to make this call.")
};
gadgets.Prefs.prototype.getArray=function(N){var O=J[N];
if(O){var K=O.split("|");
for(var M=0,L=K.length;
M<L;
++M){K[M]=F(K[M].replace(/%7C/g,"|"))
}return K
}return[]
};
gadgets.Prefs.prototype.setArray=function(K,L){throw new Error("setprefs feature required to make this call.")
};
gadgets.Prefs.prototype.getMsg=function(K){return D[K]||""
};
gadgets.Prefs.prototype.getCountry=function(){return B
};
gadgets.Prefs.prototype.getLang=function(){return E
};
gadgets.Prefs.prototype.getModuleId=function(){return A
}
})();;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistCtors([[gadgets,"Prefs",Object]]);
caja___.whitelistMeths([[gadgets.Prefs,"getArray"],[gadgets.Prefs,"getBool"],[gadgets.Prefs,"getCountry"],[gadgets.Prefs,"getFloat"],[gadgets.Prefs,"getInt"],[gadgets.Prefs,"getLang"],[gadgets.Prefs,"getMsg"],[gadgets.Prefs,"getString"],[gadgets.Prefs,"set"],[gadgets.Prefs,"setArray"]])
});;
var gadgets;
var JSON=window.JSON||gadgets.json;
var _IG_Prefs=(function(){var A=null;
var B=function(){if(!A){A=new gadgets.Prefs();
A.setDontEscape_()
}return A
};
B._parseURL=gadgets.Prefs.parseUrl;
return B
})();
function _IG_Fetch_wrapper(B,A){B(A.data?A.data:"")
}function _IG_FetchContent(B,G,C){var F=C||{};
if(F.refreshInterval){F.REFRESH_INTERVAL=F.refreshInterval
}else{F.REFRESH_INTERVAL=3600
}for(var E in F){var D=F[E];
delete F[E];
F[E.toUpperCase()]=D
}var A=gadgets.util.makeClosure(null,_IG_Fetch_wrapper,G);
gadgets.io.makeRequest(B,A,F)
}function _IG_FetchXmlContent(B,E,C){var D=C||{};
if(D.refreshInterval){D.REFRESH_INTERVAL=D.refreshInterval
}else{D.REFRESH_INTERVAL=3600
}D.CONTENT_TYPE="DOM";
var A=gadgets.util.makeClosure(null,_IG_Fetch_wrapper,E);
gadgets.io.makeRequest(B,A,D)
}function _IG_FetchFeedAsJSON(B,F,C,A,D){var E=D||{};
E.CONTENT_TYPE="FEED";
E.NUM_ENTRIES=C;
E.GET_SUMMARIES=A;
gadgets.io.makeRequest(B,function(J){J.data=J.data||{};
if(J.errors&&J.errors.length>0){J.data.ErrorMsg=J.errors[0]
}if(J.data.link){J.data.URL=B
}if(J.data.title){J.data.Title=J.data.title
}if(J.data.description){J.data.Description=J.data.description
}if(J.data.link){J.data.Link=J.data.link
}if(J.data.items&&J.data.items.length>0){J.data.Entry=J.data.items;
for(var H=0;
H<J.data.Entry.length;
++H){var I=J.data.Entry[H];
I.Title=I.title;
I.Link=I.link;
I.Summary=I.summary||I.description;
I.Date=I.pubDate
}}for(var G=0;
G<J.data.Entry.length;
++G){var I=J.data.Entry[G];
I.Date=(I.Date/1000)
}F(J.data)
},E)
}function _IG_GetCachedUrl(A,B){var C=B||{};
C.REFRESH_INTERVAL=3600;
if(C.refreshInterval){C.REFRESH_INTERVAL=C.refreshInterval
}return gadgets.io.getProxyUrl(A,C)
}function _IG_GetImageUrl(A,B){return _IG_GetCachedUrl(A,B)
}function _IG_GetImage(B){var A=document.createElement("img");
A.src=_IG_GetCachedUrl(B);
return A
}function _IG_RegisterOnloadHandler(A){gadgets.util.registerOnLoadHandler(A)
}function _IG_Callback(B,C){var A=arguments;
return function(){var D=Array.prototype.slice.call(arguments);
B.apply(null,D.concat(Array.prototype.slice.call(A,1)))
}
}var _args=gadgets.util.getUrlParameters;
function _gel(A){return document.getElementById?document.getElementById(A):null
}function _gelstn(A){if(A==="*"&&document.all){return document.all
}return document.getElementsByTagName?document.getElementsByTagName(A):[]
}function _gelsbyregex(D,F){var C=_gelstn(D);
var E=[];
for(var B=0,A=C.length;
B<A;
++B){if(F.test(C[B].id)){E.push(C[B])
}}return E
}function _esc(A){return window.encodeURIComponent?encodeURIComponent(A):escape(A)
}function _unesc(A){return window.decodeURIComponent?decodeURIComponent(A):unescape(A)
}function _hesc(A){return gadgets.util.escapeString(A)
}function _striptags(A){return A.replace(/<\/?[^>]+>/g,"")
}function _trim(A){return A.replace(/^\s+|\s+$/g,"")
}function _toggle(A){A=(typeof A==="string")?_gel(A):A;
if(A!==null){if(A.style.display.length===0||A.style.display==="block"){A.style.display="none"
}else{if(A.style.display==="none"){A.style.display="block"
}}}}var _uid=(function(){var A=0;
return function(){return A++
}
})();
function _min(B,A){return(B<A?B:A)
}function _max(B,A){return(B>A?B:A)
}function _exportSymbols(A,C){var I=window;
var F=A.split(".");
for(var H=0,G=F.length;
H<G;
H++){var B=F[H];
I[B]=I[B]||{};
I=I[B]
}for(var E=0,D=C.length;
E<D;
E+=2){I[C[E]]=C[E+1]
}}function _IG_AddDOMEventHandler(C,B,A){gadgets.warn("_IG_AddDOMEventHandler not implemented - see SHINDIG-198")
};;
gadgets.log=(function(){var E=1;
var A=2;
var F=3;
var C=4;
var D=function(I){B(E,I)
};
gadgets.warn=function(I){B(A,I)
};
gadgets.error=function(I){B(F,I)
};
gadgets.setLogLevel=function(I){H=I
};
function B(J,I){if(J<H||!G){return 
}if(J===A&&G.warn){G.warn(I)
}else{if(J===F&&G.error){G.error(I)
}else{if(G.log){G.log(I)
}}}}D.INFO=E;
D.WARNING=A;
D.NONE=C;
var H=E;
var G=window.console?window.console:window.opera?window.opera.postError:undefined;
return D
})();;
var tamings___=tamings___||[];
tamings___.push(function(A){___.grantRead(gadgets.log,"INFO");
___.grantRead(gadgets.log,"WARNING");
___.grantRead(gadgets.log,"ERROR");
___.grantRead(gadgets.log,"NONE");
caja___.whitelistFuncs([[gadgets,"log"],[gadgets,"warn"],[gadgets,"error"],[gadgets,"setLogLevel"]])
});;
{var css={'properties':(function(){var c=[/^\s*0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+(?:0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+)?$/i,/^\s*(?:#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|transparent|inherit)\s+$/i,/^\s*(?:none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit)\s+$/i,/^\s*(?:thin|medium|thick|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|inherit)\s+$/i,/^\s*(?:(?:(?:thin|medium|thick|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|transparent|inherit)\s+)+|inherit\s+)$/i,/^\s*(?:none|inherit)\s+$/i,/^\s*(?:url\("[^\(\)\\\"\r\n]+"\)|none|inherit)\s+$/i,/^\s*(?:0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|0|(?:\d+(?:\.\d+)?)%|auto|inherit)\s+$/i,/^\s*(?:0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)|0|[+-]?\d+(?:\.\d+)?%|none|inherit)\s+$/i,/^\s*(?:0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)|0|[+-]?\d+(?:\.\d+)?%|inherit)\s+$/i,/^\s*(?:(?:0(?:\.[0-9]+)?|\.[0-9]+|1(?:\.0+)?)|inherit)\s+$/i,/^\s*(?:(?:(?:#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|invert|inherit|none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|thin|medium|thick|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc))\s+)+|inherit\s+)$/i,/^\s*(?:#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|invert|inherit)\s+$/i,/^\s*(?:visible|hidden|scroll|auto|no-display|no-content)\s+$/i,/^\s*(?:auto|always|avoid|left|right|inherit)\s+$/i,/^\s*(?:0|[+-]?\d+(?:\.\d+)?m?s|0|(?:\d+(?:\.\d+)?)%|inherit)\s+$/i,/^\s*(?:0|[+-]?\d+(?:\.\d+)?|inherit)\s+$/i,/^\s*(?:clip|ellipsis)\s+$/i,/^\s*(?:normal|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|inherit)\s+$/i];return{'-moz-border-radius':c[0],'-moz-opacity':c[10],'-moz-outline':c[11],'-moz-outline-color':c[12],'-moz-outline-style':c[2],'-moz-outline-width':c[3],'-o-text-overflow':c[17],'-webkit-border-radius':c[0],'azimuth':/^\s*(?:0|[+-]?\d+(?:\.\d+)?(?:deg|g?rad)\s+|(?:(?:left-side|far-left|left|center-left|center|center-right|right|far-right|right-side|behind)\s+)+|leftwards\s+|rightwards\s+|inherit\s+)$/i,'background':/^\s*(?:(?:(?:(?:#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|transparent|inherit)\s+|(?:url\("[^\(\)\\\"\r\n]+"\)|none|inherit)\s+|(?:repeat|repeat-x|repeat-y|no-repeat|inherit)\s+|(?:scroll|fixed|inherit)\s+|(?:0|(?:\d+(?:\.\d+)?)%|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|left|center|right)\s+(?:(?:0|(?:\d+(?:\.\d+)?)%|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|top|center|bottom)\s+)?|(?:(?:left|center|right|top|bottom)\s+)+|inherit\s+))+|inherit\s+)$/i,'background-attachment':/^\s*(?:scroll|fixed|inherit)\s+$/i,'background-color':c[1],'background-image':c[6],'background-position':/^\s*(?:(?:0|(?:\d+(?:\.\d+)?)%|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|left|center|right)\s+(?:(?:0|(?:\d+(?:\.\d+)?)%|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|top|center|bottom)\s+)?|(?:(?:left|center|right|top|bottom)\s+)+|inherit\s+)$/i,'background-repeat':/^\s*(?:repeat|repeat-x|repeat-y|no-repeat|inherit)\s+$/i,'border':/^\s*(?:(?:(?:thin|medium|thick|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|transparent)\s+)+|inherit\s+)$/i,'border-bottom':c[4],'border-bottom-color':c[1],'border-bottom-style':c[2],'border-bottom-width':c[3],'border-collapse':/^\s*(?:collapse|separate|inherit)\s+$/i,'border-color':/^\s*(?:(?:(?:#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|transparent)\s+){1,4}|inherit\s+)$/i,'border-left':c[4],'border-left-color':c[1],'border-left-style':c[2],'border-left-width':c[3],'border-radius':c[0],'border-right':c[4],'border-right-color':c[1],'border-right-style':c[2],'border-right-width':c[3],'border-spacing':/^\s*(?:0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+(?:0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+)?|inherit\s+)$/i,'border-style':/^\s*(?:(?:(?:none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)\s+){1,4}|inherit\s+)$/i,'border-top':c[4],'border-top-color':c[1],'border-top-style':c[2],'border-top-width':c[3],'border-width':/^\s*(?:(?:(?:thin|medium|thick|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc))\s+){1,4}|inherit\s+)$/i,'bottom':c[7],'caption-side':/^\s*(?:top|bottom|inherit)\s+$/i,'clear':/^\s*(?:none|left|right|both|inherit)\s+$/i,'clip':/^\s*(?:auto|inherit)\s+$/i,'color':/^\s*(?:#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|inherit)\s+$/i,'counter-increment':c[5],'counter-reset':c[5],'cue':/^\s*(?:(?:(?:url\("[^\(\)\\\"\r\n]+"\)|none|inherit)\s+)+|inherit\s+)$/i,'cue-after':c[6],'cue-before':c[6],'cursor':/^\s*(?:(?:url\("[^\(\)\\\"\r\n]+"\)\s+,\s+)*(?:auto|crosshair|default|pointer|move|e-resize|ne-resize|nw-resize|n-resize|se-resize|sw-resize|s-resize|w-resize|text|wait|help|progress|all-scroll|col-resize|hand|no-drop|not-allowed|row-resize|vertical-text)|inherit)\s+$/i,'direction':/^\s*(?:ltr|rtl|inherit)\s+$/i,'display':/^\s*(?:inline|block|list-item|run-in|inline-block|table|inline-table|table-row-group|table-header-group|table-footer-group|table-row|table-column-group|table-column|table-cell|table-caption|none|inherit|-moz-inline-box|-moz-inline-stack)\s+$/i,'elevation':/^\s*(?:0|[+-]?\d+(?:\.\d+)?(?:deg|g?rad)|below|level|above|higher|lower|inherit)\s+$/i,'empty-cells':/^\s*(?:show|hide|inherit)\s+$/i,'float':/^\s*(?:left|right|none|inherit)\s+$/i,'font':/^\s*(?:(?:(?:normal|italic|oblique|inherit|small-caps|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)\s+)+(?:xx-small|x-small|small|medium|large|x-large|xx-large|(?:small|larg)er|0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)|0|[+-]?\d+(?:\.\d+)?%|inherit)\s+(?:\/\s+(?:normal|0|(?:\d+(?:\.\d+)?)|0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)|0|[+-]?\d+(?:\.\d+)?%|inherit)\s+)?(?:(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|serif|sans-serif|cursive|fantasy|monospace)\s+(?:,\s+(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|serif|sans-serif|cursive|fantasy|monospace)\s+)*|inherit\s+)|caption\s+|icon\s+|menu\s+|message-box\s+|small-caption\s+|status-bar\s+|inherit\s+)$/i,'font-family':/^\s*(?:(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|serif|sans-serif|cursive|fantasy|monospace)\s+(?:,\s+(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|serif|sans-serif|cursive|fantasy|monospace)\s+)*|inherit\s+)$/i,'font-size':/^\s*(?:xx-small|x-small|small|medium|large|x-large|xx-large|(?:small|larg)er|0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)|0|[+-]?\d+(?:\.\d+)?%|inherit)\s+$/i,'font-stretch':/^\s*(?:normal|wider|narrower|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded)\s+$/i,'font-style':/^\s*(?:normal|italic|oblique|inherit)\s+$/i,'font-variant':/^\s*(?:normal|small-caps|inherit)\s+$/i,'font-weight':/^\s*(?:normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit)\s+$/i,'height':c[7],'left':c[7],'letter-spacing':c[18],'line-height':/^\s*(?:normal|0|(?:\d+(?:\.\d+)?)|0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)|0|[+-]?\d+(?:\.\d+)?%|inherit)\s+$/i,'list-style':/^\s*(?:(?:(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit|inside|outside|url\("[^\(\)\\\"\r\n]+"\))\s+)+|inherit\s+)$/i,'list-style-image':c[6],'list-style-position':/^\s*(?:inside|outside|inherit)\s+$/i,'list-style-type':/^\s*(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit)\s+$/i,'margin':/^\s*(?:(?:(?:0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|0|(?:\d+(?:\.\d+)?)%|auto)\s+){1,4}|inherit\s+)$/i,'margin-bottom':c[7],'margin-left':c[7],'margin-right':c[7],'margin-top':c[7],'max-height':c[8],'max-width':c[8],'min-height':c[9],'min-width':c[9],'opacity':c[10],'outline':c[11],'outline-color':c[12],'outline-style':c[2],'outline-width':c[3],'overflow':/^\s*(?:visible|hidden|scroll|auto|inherit)\s+$/i,'overflow-x':c[13],'overflow-y':c[13],'padding':/^\s*(?:(?:(?:0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)|0|[+-]?\d+(?:\.\d+)?%)\s+){1,4}|inherit\s+)$/i,'padding-bottom':c[9],'padding-left':c[9],'padding-right':c[9],'padding-top':c[9],'page-break-after':c[14],'page-break-before':c[14],'page-break-inside':/^\s*(?:avoid|auto|inherit)\s+$/i,'pause':/^\s*(?:(?:(?:0|[+-]?\d+(?:\.\d+)?m?s|0|(?:\d+(?:\.\d+)?)%)\s+){1,2}|inherit\s+)$/i,'pause-after':c[15],'pause-before':c[15],'pitch':/^\s*(?:0|(?:\d+(?:\.\d+)?)k?Hz|x-low|low|medium|high|x-high|inherit)\s+$/i,'pitch-range':c[16],'play-during':/^\s*(?:url\("[^\(\)\\\"\r\n]+"\)\s+(?:(?:mix|repeat)\s+)+|auto\s+|none\s+|inherit\s+)$/i,'position':/^\s*(?:static|relative|absolute|inherit)\s+$/i,'quotes':c[5],'richness':c[16],'right':c[7],'speak':/^\s*(?:normal|none|spell-out|inherit)\s+$/i,'speak-header':/^\s*(?:once|always|inherit)\s+$/i,'speak-numeral':/^\s*(?:digits|continuous|inherit)\s+$/i,'speak-punctuation':/^\s*(?:code|none|inherit)\s+$/i,'speech-rate':/^\s*(?:0|[+-]?\d+(?:\.\d+)?|x-slow|slow|medium|fast|x-fast|faster|slower|inherit)\s+$/i,'stress':c[16],'table-layout':/^\s*(?:auto|fixed|inherit)\s+$/i,'text-align':/^\s*(?:left|right|center|justify|inherit)\s+$/i,'text-decoration':/^\s*(?:none\s+|(?:(?:underline|overline|line-through|blink)\s+)+|inherit\s+)$/i,'text-indent':/^\s*(?:0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|0|(?:\d+(?:\.\d+)?)%|inherit)\s+$/i,'text-overflow':c[17],'text-shadow':/^\s*(?:none\s+|(?:(?:(?:#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)\s+0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+(?:0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)\s+)?|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+(?:0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)\s+)?(?:(?:#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)\s+)?),\s+)*(?:(?:#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)\s+0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+(?:0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)\s+)?|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)\s+(?:0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)\s+)?(?:(?:#(?:[0-9a-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)\s+)?))$/i,'text-transform':/^\s*(?:capitalize|uppercase|lowercase|none|inherit)\s+$/i,'text-wrap':/^\s*(?:normal|unrestricted|none|suppress)\s+$/i,'top':c[7],'unicode-bidi':/^\s*(?:normal|embed|bidi-override|inherit)\s+$/i,'vertical-align':/^\s*(?:baseline|sub|super|top|text-top|middle|bottom|text-bottom|0|(?:\d+(?:\.\d+)?)%|0|[+-]?\d+(?:\.\d+)?(?:em|ex|px|in|cm|mm|pt|pc)|inherit)\s+$/i,'visibility':/^\s*(?:visible|hidden|collapse|inherit)\s+$/i,'voice-family':/^\s*(?:(?:(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|male|female|child)\s+,\s+)*(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|male|female|child)|inherit)\s+$/i,'volume':/^\s*(?:0|(?:\d+(?:\.\d+)?)|0|[+-]?\d+(?:\.\d+)?%|silent|x-soft|soft|medium|loud|x-loud|inherit)\s+$/i,'white-space':/^\s*(?:normal|pre|nowrap|pre-wrap|pre-line|inherit|-o-pre-wrap|-moz-pre-wrap|-pre-wrap)\s+$/i,'width':/^\s*(?:0|(?:\d+(?:\.\d+)?)(?:em|ex|px|in|cm|mm|pt|pc)|0|[+-]?\d+(?:\.\d+)?%|auto|inherit)\s+$/i,'word-spacing':c[18],'word-wrap':/^\s*(?:normal|break-word)\s+$/i,'z-index':/^\s*(?:auto|-?\d+|inherit)\s+$/i,'zoom':/^\s*(?:normal|0|(?:\d+(?:\.\d+)?)|0|[+-]?\d+(?:\.\d+)?%)\s+$/i}})(),'alternates':{'float':['cssFloat','styleFloat']},'HISTORY_INSENSITIVE_STYLE_WHITELIST':{'display':true,'filter':true,'float':true,'height':true,'left':true,'opacity':true,'overflow':true,'position':true,'right':true,'top':true,'visibility':true,'width':true,'padding-left':true,'padding-right':true,'padding-top':true,'padding-bottom':true}},html,html4;html4={},html4
.atype={'NONE':0,'URI':1,'URI_FRAGMENT':11,'SCRIPT':2,'STYLE':3,'ID':4,'IDREF':5,'IDREFS':6,'GLOBAL_NAME':7,'LOCAL_NAME':8,'CLASSES':9,'FRAME_TARGET':10},html4
.ATTRIBS={'*::class':9,'*::dir':0,'*::id':4,'*::lang':0,'*::onclick':2,'*::ondblclick':2,'*::onkeydown':2,'*::onkeypress':2,'*::onkeyup':2,'*::onload':2,'*::onmousedown':2,'*::onmousemove':2,'*::onmouseout':2,'*::onmouseover':2,'*::onmouseup':2,'*::style':3,'*::title':0,'a::accesskey':0,'a::coords':0,'a::href':1,'a::hreflang':0,'a::name':7,'a::onblur':2,'a::onfocus':2,'a::rel':0,'a::rev':0,'a::shape':0,'a::tabindex':0,'a::target':10,'a::type':0,'area::accesskey':0,'area::alt':0,'area::coords':0,'area::href':1,'area::nohref':0,'area::onblur':2,'area::onfocus':2,'area::shape':0,'area::tabindex':0,'area::target':10,'bdo::dir':0,'blockquote::cite':1,'br::clear':0,'button::accesskey':0,'button::disabled':0,'button::name':8,'button::onblur':2,'button::onfocus':2,'button::tabindex':0,'button::type':0,'button::value':0,'caption::align':0,'col::align':0,'col::char':0,'col::charoff':0,'col::span':0,'col::valign':0,'col::width':0,'colgroup::align':0,'colgroup::char':0,'colgroup::charoff':0,'colgroup::span':0,'colgroup::valign':0,'colgroup::width':0,'del::cite':1,'del::datetime':0,'dir::compact':0,'div::align':0,'dl::compact':0,'font::color':0,'font::face':0,'font::size':0,'form::accept':0,'form::action':1,'form::enctype':0,'form::method':0,'form::name':7,'form::onreset':2,'form::onsubmit':2,'form::target':10,'h1::align':0,'h2::align':0,'h3::align':0,'h4::align':0,'h5::align':0,'h6::align':0,'hr::align':0,'hr::noshade':0,'hr::size':0,'hr::width':0,'iframe::align':0,'iframe::frameborder':0,'iframe::height':0,'iframe::longdesc':1,'iframe::marginheight':0,'iframe::marginwidth':0,'iframe::width':0,'img::align':0,'img::alt':0,'img::border':0,'img::height':0,'img::hspace':0,'img::ismap':0,'img::longdesc':1,'img::name':7,'img::src':1,'img::usemap':11,'img::vspace':0,'img::width':0,'input::accept':0,'input::accesskey':0,'input::align':0,'input::alt':0,'input::checked':0,'input::disabled':0,'input::ismap':0,'input::maxlength':0,'input::name':8,'input::onblur':2,'input::onchange':2,'input::onfocus':2,'input::onselect':2,'input::readonly':0,'input::size':0,'input::src':1,'input::tabindex':0,'input::type':0,'input::usemap':11,'input::value':0,'ins::cite':1,'ins::datetime':0,'label::accesskey':0,'label::for':5,'label::onblur':2,'label::onfocus':2,'legend::accesskey':0,'legend::align':0,'li::type':0,'li::value':0,'map::name':7,'menu::compact':0,'ol::compact':0,'ol::start':0,'ol::type':0,'optgroup::disabled':0,'optgroup::label':0,'option::disabled':0,'option::label':0,'option::selected':0,'option::value':0,'p::align':0,'pre::width':0,'q::cite':1,'select::disabled':0,'select::multiple':0,'select::name':8,'select::onblur':2,'select::onchange':2,'select::onfocus':2,'select::size':0,'select::tabindex':0,'table::align':0,'table::bgcolor':0,'table::border':0,'table::cellpadding':0,'table::cellspacing':0,'table::frame':0,'table::rules':0,'table::summary':0,'table::width':0,'tbody::align':0,'tbody::char':0,'tbody::charoff':0,'tbody::valign':0,'td::abbr':0,'td::align':0,'td::axis':0,'td::bgcolor':0,'td::char':0,'td::charoff':0,'td::colspan':0,'td::headers':6,'td::height':0,'td::nowrap':0,'td::rowspan':0,'td::scope':0,'td::valign':0,'td::width':0,'textarea::accesskey':0,'textarea::cols':0,'textarea::disabled':0,'textarea::name':8,'textarea::onblur':2,'textarea::onchange':2,'textarea::onfocus':2,'textarea::onselect':2,'textarea::readonly':0,'textarea::rows':0,'textarea::tabindex':0,'tfoot::align':0,'tfoot::char':0,'tfoot::charoff':0,'tfoot::valign':0,'th::abbr':0,'th::align':0,'th::axis':0,'th::bgcolor':0,'th::char':0,'th::charoff':0,'th::colspan':0,'th::headers':6,'th::height':0,'th::nowrap':0,'th::rowspan':0,'th::scope':0,'th::valign':0,'th::width':0,'thead::align':0,'thead::char':0,'thead::charoff':0,'thead::valign':0,'tr::align':0,'tr::bgcolor':0,'tr::char':0,'tr::charoff':0,'tr::valign':0,'ul::compact':0,'ul::type':0},html4
.eflags={'OPTIONAL_ENDTAG':1,'EMPTY':2,'CDATA':4,'RCDATA':8,'UNSAFE':16,'FOLDABLE':32,'SCRIPT':64,'STYLE':128},html4
.ELEMENTS={'a':0,'abbr':0,'acronym':0,'address':0,'applet':16,'area':2,'b':0,'base':18,'basefont':18,'bdo':0,'big':0,'blockquote':0,'body':49,'br':2,'button':0,'caption':0,'center':0,'cite':0,'code':0,'col':2,'colgroup':1,'dd':1,'del':0,'dfn':0,'dir':0,'div':0,'dl':0,'dt':1,'em':0,'fieldset':0,'font':0,'form':0,'frame':18,'frameset':16,'h1':0,'h2':0,'h3':0,'h4':0,'h5':0,'h6':0,'head':49,'hr':2,'html':49,'i':0,'iframe':4,'img':2,'input':2,'ins':0,'isindex':18,'kbd':0,'label':0,'legend':0,'li':1,'link':18,'map':0,'menu':0,'meta':18,'noframes':20,'noscript':20,'object':16,'ol':0,'optgroup':0,'option':1,'p':1,'param':18,'pre':0,'q':0,'s':0,'samp':0,'script':84,'select':0,'small':0,'span':0,'strike':0,'strong':0,'style':148,'sub':0,'sup':0,'table':0,'tbody':1,'td':1,'textarea':8,'tfoot':1,'th':1,'thead':1,'title':24,'tr':1,'tt':0,'u':0,'ul':0,'var':0},html=(function(){var
ENTITIES,INSIDE_TAG_TOKEN,OUTSIDE_TAG_TOKEN,ampRe,decimalEscapeRe,entityRe,eqRe,gtRe,hexEscapeRe,lcase,looseAmpRe,ltRe,nulRe,quotRe;'script'==='SCRIPT'.toLowerCase()?(lcase=function(s){return s.toLowerCase()}):(lcase=function(s){return s.replace(/[A-Z]/g,function(ch){return String.fromCharCode(ch.charCodeAt(0)|32)})}),ENTITIES={'lt':'<','gt':'>','amp':'&','nbsp':'\xa0','quot':'\"','apos':'\''},decimalEscapeRe=/^#(\d+)$/,hexEscapeRe=/^#x([0-9A-Fa-f]+)$/;function
lookupEntity(name){var m;return name=lcase(name),ENTITIES.hasOwnProperty(name)?ENTITIES[name]:(m=name.match(decimalEscapeRe),m?String.fromCharCode(parseInt(m[1],10)):(m=name.match(hexEscapeRe))?String.fromCharCode(parseInt(m[1],16)):'')}function
decodeOneEntity(_,name){return lookupEntity(name)}nulRe=/\0/g;function stripNULs(s){return s.replace(nulRe,'')}entityRe=/&(#\d+|#x[0-9A-Fa-f]+|\w+);/g;function
unescapeEntities(s){return s.replace(entityRe,decodeOneEntity)}ampRe=/&/g,looseAmpRe=/&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,ltRe=/</g,gtRe=/>/g,quotRe=/\"/g,eqRe=/\=/g;function
escapeAttrib(s){return s.replace(ampRe,'&amp;').replace(ltRe,'&lt;').replace(gtRe,'&gt;').replace(quotRe,'&#34;').replace(eqRe,'&#61;')}function
normalizeRCData(rcdata){return rcdata.replace(looseAmpRe,'&amp;$1').replace(ltRe,'&lt;').replace(gtRe,'&gt;')}INSIDE_TAG_TOKEN=new
RegExp('^\\s*(?:(?:([a-z][a-z-]*)(\\s*=\\s*(\"[^\"]*\"|\'[^\']*\'|(?=[a-z][a-z-]*\\s*=)|[^>\"\'\\s]*))?)|(/?>)|.[^\\w\\s>]*)','i'),OUTSIDE_TAG_TOKEN=new
RegExp('^(?:&(\\#[0-9]+|\\#[x][0-9a-f]+|\\w+);|<!--[\\s\\S]*?-->|<!\\w[^>]*>|<\\?[^>*]*>|<(/)?([a-z][a-z0-9]*)|([^<&>]+)|([<&>]))','i');function
makeSaxParser(handler){return function parse(htmlText,param){var attribName,attribs,dataEnd,decodedValue,eflags,encodedValue,htmlLower,inTag,m,openTag,tagName;htmlText=String(htmlText),htmlLower=null,inTag=false,attribs=[],tagName=void
0,eflags=void 0,openTag=void 0,handler.startDoc&&handler.startDoc(param);while(htmlText){m=htmlText.match(inTag?INSIDE_TAG_TOKEN:OUTSIDE_TAG_TOKEN),htmlText=htmlText.substring(m[0].length);if(inTag){if(m[1]){attribName=lcase(m[1]);if(m[2]){encodedValue=m[3];switch(encodedValue.charCodeAt(0)){case
34:case 39:encodedValue=encodedValue.substring(1,encodedValue.length-1)}decodedValue=unescapeEntities(stripNULs(encodedValue))}else
decodedValue=attribName;attribs.push(attribName,decodedValue)}else if(m[4])eflags!==void
0&&(openTag?handler.startTag&&handler.startTag(tagName,attribs,param):handler.endTag&&handler.endTag(tagName,param)),openTag&&eflags&(html4
.eflags.CDATA|html4 .eflags.RCDATA)&&(htmlLower===null?(htmlLower=lcase(htmlText)):(htmlLower=htmlLower.substring(htmlLower.length-htmlText.length)),dataEnd=htmlLower.indexOf('</'+tagName),dataEnd<0&&(dataEnd=htmlText.length),eflags&html4
.eflags.CDATA?handler.cdata&&handler.cdata(htmlText.substring(0,dataEnd),param):handler.rcdata&&handler.rcdata(normalizeRCData(htmlText.substring(0,dataEnd)),param),htmlText=htmlText.substring(dataEnd)),tagName=eflags=openTag=void
0,attribs.length=0,inTag=false}else if(m[1])handler.pcdata&&handler.pcdata(m[0],param);else
if(m[3])openTag=!m[2],inTag=true,tagName=lcase(m[3]),eflags=html4 .ELEMENTS.hasOwnProperty(tagName)?html4
.ELEMENTS[tagName]:void 0;else if(m[4])handler.pcdata&&handler.pcdata(m[4],param);else
if(m[5]){if(handler.pcdata)switch(m[5]){case'<':handler.pcdata('&lt;',param);break;case'>':handler.pcdata('&gt;',param);break;default:handler.pcdata('&amp;',param)}}}handler.endDoc&&handler.endDoc(param)}}return{'normalizeRCData':normalizeRCData,'escapeAttrib':escapeAttrib,'unescapeEntities':unescapeEntities,'makeSaxParser':makeSaxParser}})(),html.makeHtmlSanitizer=function(sanitizeAttributes){var
ignoring,stack;return html.makeSaxParser({'startDoc':function(_){stack=[],ignoring=false},'startTag':function(tagName,attribs,out){var
attribName,eflags,i,n,value;if(ignoring)return;if(!html4 .ELEMENTS.hasOwnProperty(tagName))return;eflags=html4
.ELEMENTS[tagName];if(eflags&html4 .eflags.FOLDABLE)return;else if(eflags&html4 .eflags.UNSAFE)return ignoring=!(eflags&html4
.eflags.EMPTY),void 0;attribs=sanitizeAttributes(tagName,attribs);if(attribs){eflags&html4
.eflags.EMPTY||stack.push(tagName),out.push('<',tagName);for(i=0,n=attribs.length;i<n;i+=2)attribName=attribs[i],value=attribs[i+1],value!==null&&value!==void
0&&out.push(' ',attribName,'=\"',html.escapeAttrib(value),'\"');out.push('>')}},'endTag':function(tagName,out){var
eflags,i,index,stackEl;if(ignoring)return ignoring=false,void 0;if(!html4 .ELEMENTS.hasOwnProperty(tagName))return;eflags=html4
.ELEMENTS[tagName];if(!(eflags&(html4 .eflags.UNSAFE|html4 .eflags.EMPTY|html4 .eflags.FOLDABLE))){if(eflags&html4
.eflags.OPTIONAL_ENDTAG)for(index=stack.length;--index>=0;){stackEl=stack[index];if(stackEl===tagName)break;if(!(html4
.ELEMENTS[stackEl]&html4 .eflags.OPTIONAL_ENDTAG))return}else for(index=stack.length;--index>=0;)if(stack[index]===tagName)break;if(index<0)return;for(i=stack.length;--i>index;)stackEl=stack[i],html4
.ELEMENTS[stackEl]&html4 .eflags.OPTIONAL_ENDTAG||out.push('</',stackEl,'>');stack.length=index,out.push('</',tagName,'>')}},'pcdata':function(text,out){ignoring||out.push(text)},'rcdata':function(text,out){ignoring||out.push(text)},'cdata':function(text,out){ignoring||out.push(text)},'endDoc':function(out){var
i;for(i=stack.length;--i>=0;)out.push('</',stack[i],'>');stack.length=0}})};function
html_sanitize(htmlText,opt_urlPolicy,opt_nmTokenPolicy){var out=[];return html.makeHtmlSanitizer(function
sanitizeAttribs(tagName,attribs){var attribKey,attribName,atype,i,value;for(i=0;i<attribs.length;i+=2){attribName=attribs[i],value=attribs[i+1],atype=null,((attribKey=tagName+'::'+attribName,html4
.ATTRIBS.hasOwnProperty(attribKey))||(attribKey='*::'+attribName,html4 .ATTRIBS.hasOwnProperty(attribKey)))&&(atype=html4
.ATTRIBS[attribKey]);if(atype!==null)switch(atype){case 0:break;case html4 .atype.SCRIPT:case
html4 .atype.STYLE:value=null;break;case html4 .atype.ID:case html4 .atype.IDREF:case
html4 .atype.IDREFS:case html4 .atype.GLOBAL_NAME:case html4 .atype.LOCAL_NAME:case
html4 .atype.CLASSES:value=opt_nmTokenPolicy?opt_nmTokenPolicy(value):value;break;case
html4 .atype.URI:value=opt_urlPolicy&&opt_urlPolicy(value);break;case html4 .atype.URI_FRAGMENT:value&&'#'===value.charAt(0)?(value=opt_nmTokenPolicy?opt_nmTokenPolicy(value):value,value&&(value='#'+value)):(value=null);break;default:value=null}else
value=null;attribs[i+1]=value}return attribs})(htmlText,out),out.join('')}};
(function(){var aa="_gat",ba="_gaq",r=true,v=false,w=undefined,ca=document,da="4.7.2",y="length",z="cookie",A="location",ea="_gaUserPrefs",fa="ioo",B="&",C="=",D="__utma=",F="__utmb=",G="__utmc=",ga="__utmk=",H="__utmv=",K="__utmz=",L="__utmx=",ha="GASO=";var M=function(i){return w==i||"-"==i||""==i},ia=function(i){return i[y]>0&&" \n\r\t".indexOf(i)>-1},O=function(i,f,m){var u="-",l;if(!M(i)&&!M(f)&&!M(m)){l=i.indexOf(f);if(l>-1){m=i.indexOf(m,l);if(m<0)m=i[y];u=N(i,l+f.indexOf(C)+1,m)}}return u},ka=function(i){var f=v,m=0,u,l;if(!M(i)){f=r;for(u=0;u<i[y];u++){l=i.charAt(u);m+="."==l?1:0;f=f&&m<=1&&(0==u&&"-"==l||".0123456789".indexOf(l)>-1)}}return f},P=function(i,f){var m=encodeURIComponent;return m instanceof Function?f?encodeURI(i):m(i):escape(i)},
Q=function(i,f){var m=decodeURIComponent,u;i=i.split("+").join(" ");if(m instanceof Function)try{u=f?decodeURI(i):m(i)}catch(l){u=unescape(i)}else u=unescape(i);return u},R=function(i,f){return i.indexOf(f)>-1},S=function(i,f){i[i[y]]=f},U=function(i){return i.toLowerCase()},V=function(i,f){return i.split(f)},la=function(i,f){return i.indexOf(f)},N=function(i,f,m){m=w==m?i[y]:m;return i.substring(f,m)},ma=function(i,f){return i.join(f)},na=function(i){var f=1,m=0,u;if(!M(i)){f=0;for(u=i[y]-1;u>=0;u--){m=
i.charCodeAt(u);f=(f<<6&268435455)+m+(m<<14);m=f&266338304;f=m!=0?f^m>>21:f}}return f},oa=function(){var i=window,f=w;if(i&&i.gaGlobal&&i.gaGlobal.hid)f=i.gaGlobal.hid;else{f=W();i.gaGlobal=i.gaGlobal?i.gaGlobal:{};i.gaGlobal.hid=f}return f},W=function(){return Math.round(Math.random()*2147483647)},pa=function(i,f){var m=ca.createElement("script");m.type="text/javascript";m.src=i;if(f)m.id=f;(ca.getElementsByTagName("head")[0]||ca.getElementsByTagName("body")[0]).appendChild(m)};var ra=function(i,f){this.Wa=i;this.jb=f},sa=function(){function i(m){var u=[];m=m.split(",");for(var l,o=0;o<m.length;o++){l=m[o].split(":");u.push(new ra(l[0],l[1]))}return u}var f=this;f.Ba="utm_campaign";f.Ca="utm_content";f.Da="utm_id";f.Ea="utm_medium";f.Fa="utm_nooverride";f.Ga="utm_source";f.Ha="utm_term";f.Ia="gclid";f.Y=0;f.z=0;f.Ma=15768E6;f.pb=18E5;f.w=63072E6;f.oa=[];f.qa=[];f.ac="cse";f.bc="q";f.kb=5;f.R=i("daum:q,eniro:search_word,naver:query,images.google:q,google:q,yahoo:p,msn:q,bing:q,aol:query,aol:encquery,lycos:query,ask:q,altavista:q,netscape:query,cnn:query,about:terms,mamma:query,alltheweb:q,voila:rdata,virgilio:qs,live:q,baidu:wd,alice:qs,yandex:text,najdi:q,aol:q,mama:query,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,pchome:q,kvasir:q,sesam:q,ozu:q,terra:query,mynet:q,ekolay:q,rambler:words");
f.u=w;f.hb=v;f.h="/";f.S=100;f.ja="/__utm.gif";f.aa=1;f.ba=1;f.v="|";f.$=1;f.Na=1;f.Ka=1;f.c="auto";f.G=1;f.ma=1E3;f.wc=10;f.Hb=10;f.xc=0.2;f.o=w;f.a=document;f.e=window};var ta=function(i){function f(d,a,j,c){var n="",s=0;n=O(d,"2"+a,";");if(!M(n)){d=n.indexOf("^"+j+".");if(d<0)return["",0];n=N(n,d+j[y]+2);if(n.indexOf("^")>0)n=n.split("^")[0];j=n.split(":");n=j[1];s=parseInt(j[0],10);if(!c&&s<o.s)n=""}if(M(n))n="";return[n,s]}function m(d,a){return"^"+ma([[a,d[1]].join("."),d[0]],":")}function u(d,a){var j=d+"; path="+k.h+"; "+a+o.ab();k.a[z]=j}function l(d){var a=new Date;d=new Date(a.getTime()+d);return"expires="+d.toGMTString()+"; "}var o=this,k=i;o.s=(new Date).getTime();
var g=[D,F,G,K,H,L,ha];o.k=function(){var d=k.a[z];return k.o?o.Ob(d,k.o):d};o.Ob=function(d,a){var j=[],c,n;for(c=0;c<g[y];c++){n=f(d,g[c],a)[0];M(n)||(j[j[y]]=g[c]+n+";")}return j.join("")};o.m=function(d,a,j){var c=j>0?l(j):"";if(k.o){a=o.Yb(k.a[z],d,k.o,a,j);d="2"+d;c=j>0?l(k.w):""}u(d+a,c)};o.Yb=function(d,a,j,c,n){var s="";n=n||k.w;c=m([c,o.s+n*1],j);s=O(d,"2"+a,";");if(!M(s)){d=m(f(d,a,j,r),j);s=ma(s.split(d),"");return s=c+s}return c};o.ab=function(){return M(k.c)?"":"domain="+k.c+";"}};var ua=function(i){function f(q){q=q instanceof Array?q.join("."):"";return M(q)?"-":q}function m(q,b){var e=[],h;if(!M(q)){e=q.split(".");if(b)for(h=0;h<e[y];h++)ka(e[h])||(e[h]="-")}return e}function u(q,b,e){var h=c.K,p,t;for(p=0;p<h[y];p++){t=h[p][0];t+=M(b)?b:b+h[p][4];h[p][2](O(q,t,e))}}var l,o,k,g,d,a,j,c=this,n,s=i;c.j=new ta(i);c.gb=function(){return w==n||n==c.N()};c.k=function(){return c.j.k()};c.ha=function(){return d?d:"-"};c.sb=function(q){d=q};c.ua=function(q){n=ka(q)?q*1:"-"};c.ga=
function(){return f(a)};c.va=function(q){a=m(q)};c.Nb=function(){c.j.m(H,"",-1)};c.Zb=function(){return n?n:"-"};c.ab=function(){return M(s.c)?"":"domain="+s.c+";"};c.ea=function(){return f(l)};c.qb=function(q){l=m(q,1)};c.B=function(){return f(o)};c.ta=function(q){o=m(q,1)};c.fa=function(){return f(k)};c.rb=function(q){k=m(q,1)};c.ia=function(){return f(g)};c.tb=function(q){g=m(q);for(q=0;q<g[y];q++)if(q<4&&!ka(g[q]))g[q]="-"};c.Vb=function(){return j};c.qc=function(q){j=q};c.Kb=function(){l=[];
o=[];k=[];g=[];d=w;a=[];n=w};c.N=function(){var q="",b;for(b=0;b<c.K[y];b++)q+=c.K[b][1]();return na(q)};c.pa=function(q){var b=c.k(),e=v;if(b){u(b,q,";");c.ua(c.N());e=r}return e};c.mc=function(q){u(q,"",B);c.ua(O(q,ga,B))};c.uc=function(){var q=c.K,b=[],e;for(e=0;e<q[y];e++)S(b,q[e][0]+q[e][1]());S(b,ga+c.N());return b.join(B)};c.Bc=function(q,b){var e=c.K,h=s.h,p;c.pa(q);s.h=b;for(p=0;p<e[y];p++)M(e[p][1]())||e[p][3]();s.h=h};c.Ab=function(){c.j.m(D,c.ea(),s.w)};c.ya=function(){c.j.m(F,c.B(),s.pb)};
c.Bb=function(){c.j.m(G,c.fa(),0)};c.Aa=function(){c.j.m(K,c.ia(),s.Ma)};c.Cb=function(){c.j.m(L,c.ha(),s.w)};c.za=function(){c.j.m(H,c.ga(),s.w)};c.Dc=function(){c.j.m(ha,c.Vb(),0)};c.K=[[D,c.ea,c.qb,c.Ab,"."],[F,c.B,c.ta,c.ya,""],[G,c.fa,c.rb,c.Bb,""],[L,c.ha,c.sb,c.Cb,""],[K,c.ia,c.tb,c.Aa,"."],[H,c.ga,c.va,c.za,"."]]};var wa=function(i){var f=this,m=i,u=new ua(m),l=!X.Cc(),o=function(){},k=function(g){var d=(new Date).getTime(),a;a=(d-g[3])*(m.xc/1E3);if(a>=1){g[2]=Math.min(Math.floor(g[2]*1+a),m.Hb);g[3]=d}return g};f.F=function(g,d,a,j,c,n){var s,q=m.G,b=m.a[A];u.pa(a);s=V(u.B(),".");if(s[1]<500||j){if(c)s=k(s);if(j||!c||s[2]>=1){if(!j&&c)s[2]=s[2]*1-1;s[1]=s[1]*1+1;g="?utmwv="+da+"&utmn="+W()+(M(b.hostname)?"":"&utmhn="+P(b.hostname))+(m.S==100?"":"&utmsp="+P(m.S))+g;if(0==q||2==q){j=2==q?o:n||o;l&&f.Ta(m.ja+
g,j)}if(1==q||2==q){g=("https:"==b.protocol?"https://ssl.google-analytics.com/__utm.gif":"http://www.google-analytics.com/__utm.gif")+g+"&utmac="+d+"&utmcc="+f.Rb(a);if(va)g+="&gaq=1";if(X.Va)g+="&aip=1";l&&f.Ta(g,n)}}}u.ta(s.join("."));u.ya()};f.Ta=function(g,d){var a=new Image(1,1);a.src=g;a.onload=function(){a.onload=null;(d||o)()}};f.Rb=function(g){var d=[],a=[D,K,H,L],j,c=u.k(),n;for(j=0;j<a[y];j++){n=O(c,a[j]+g,";");if(!M(n)){if(a[j]==H){n=V(n.split(g+".")[1],"|")[0];if(M(n))continue;n=g+"."+
n}S(d,a[j]+n+";")}}return P(d.join("+"))}};var Y=function(){var i=this;i.W=[];i.db=function(f){var m,u=i.W,l;for(l=0;l<u.length;l++)m=f==u[l].q?u[l]:m;return m};i.Gb=function(f,m,u,l,o,k,g,d){var a=i.db(f);if(w==a){a=new Y.Eb(f,m,u,l,o,k,g,d);S(i.W,a)}else{a.Ja=m;a.xb=u;a.wb=l;a.ub=o;a.Qa=k;a.vb=g;a.Sa=d}return a}};Y.Db=function(i,f,m,u,l,o){var k=this;k.zb=i;k.wa=f;k.r=m;k.Oa=u;k.mb=l;k.nb=o;k.xa=function(){return"&"+["utmt=item","tid="+P(k.zb),"ipc="+P(k.wa),"ipn="+P(k.r),"iva="+P(k.Oa),"ipr="+P(k.mb),"iqt="+P(k.nb)].join("&utm")}};
Y.Eb=function(i,f,m,u,l,o,k,g){var d=this;d.q=i;d.Ja=f;d.xb=m;d.wb=u;d.ub=l;d.Qa=o;d.vb=k;d.Sa=g;d.P=[];d.Fb=function(a,j,c,n,s){var q=d.Wb(a),b=d.q;if(w==q)S(d.P,new Y.Db(b,a,j,c,n,s));else{q.zb=b;q.wa=a;q.r=j;q.Oa=c;q.mb=n;q.nb=s}};d.Wb=function(a){var j,c=d.P,n;for(n=0;n<c.length;n++)j=a==c[n].wa?c[n]:j;return j};d.xa=function(){return"&"+["utmt=tran","id="+P(d.q),"st="+P(d.Ja),"to="+P(d.xb),"tx="+P(d.wb),"sp="+P(d.ub),"ci="+P(d.Qa),"rg="+P(d.vb),"co="+P(d.Sa)].join("&utmt")}};var xa=function(i){function f(){var k,g,d;g="ShockwaveFlash";var a="$version",j=l.d?l.d.plugins:w;if(j&&j[y]>0)for(k=0;k<j[y]&&!d;k++){g=j[k];if(R(g.name,"Shockwave Flash"))d=g.description.split("Shockwave Flash ")[1]}else{g=g+"."+g;try{k=new ActiveXObject(g+".7");d=k.GetVariable(a)}catch(c){}if(!d)try{k=new ActiveXObject(g+".6");d="WIN 6,0,21,0";k.AllowScriptAccess="always";d=k.GetVariable(a)}catch(n){}if(!d)try{k=new ActiveXObject(g);d=k.GetVariable(a)}catch(s){}if(d){d=V(d.split(" ")[1],",");d=
d[0]+"."+d[1]+" r"+d[2]}}return d?d:o}var m=i,u=m.e,l=this,o="-";l.T=u.screen;l.La=!l.T&&u.java?java.awt.Toolkit.getDefaultToolkit():w;l.d=u.navigator;l.U=o;l.sa=o;l.Pa=o;l.la=o;l.ka=1;l.Za=o;l.Sb=function(){var k;if(u.screen){l.U=l.T.width+"x"+l.T.height;l.sa=l.T.colorDepth+"-bit"}else if(l.La)try{k=l.La.getScreenSize();l.U=k.width+"x"+k.height}catch(g){}l.la=U(l.d&&l.d.language?l.d.language:l.d&&l.d.browserLanguage?l.d.browserLanguage:o);l.ka=l.d&&l.d.javaEnabled()?1:0;l.Za=m.ba?f():o;l.Pa=P(m.a.characterSet?
m.a.characterSet:m.a.charset?m.a.charset:o)};l.vc=function(){return B+"utm"+["cs="+P(l.Pa),"sr="+l.U,"sc="+l.sa,"ul="+l.la,"je="+l.ka,"fl="+P(l.Za)].join("&utm")};l.Qb=function(){var k=m.a,g=u.history[y];k=l.d.appName+l.d.version+l.la+l.d.platform+l.d.userAgent+l.ka+l.U+l.sa+(k[z]?k[z]:"")+(k.referrer?k.referrer:"");for(var d=k[y];g>0;)k+=g--^d++;return na(k)}};var Z=function(i,f,m,u){function l(d){var a="";d=U(d.split("://")[1]);if(R(d,"/")){d=d.split("/")[1];if(R(d,"?"))a=d.split("?")[0]}return a}function o(d){var a="";a=U(d.split("://")[1]);if(R(a,"/"))a=a.split("/")[0];return a}var k=u,g=this;g.b=i;g.ob=f;g.s=m;g.cb=function(d){var a=g.da();return new Z.t(O(d,k.Da+C,B),O(d,k.Ga+C,B),O(d,k.Ia+C,B),g.O(d,k.Ba,"(not set)"),g.O(d,k.Ea,"(not set)"),g.O(d,k.Ha,a&&!M(a.I)?Q(a.I):w),g.O(d,k.Ca,w))};g.fb=function(d){var a=o(d),j=l(d);if(R(a,"google")){d=d.split("?").join(B);
if(R(d,B+k.bc+C))if(j==k.ac)return r}return v};g.da=function(){var d,a=g.ob,j,c,n=k.R;if(!(M(a)||"0"==a||!R(a,"://")||g.fb(a))){d=o(a);for(j=0;j<n[y];j++){c=n[j];if(R(d,U(c.Wa))){a=a.split("?").join(B);if(R(a,B+c.jb+C)){d=a.split(B+c.jb+C)[1];if(R(d,B))d=d.split(B)[0];return new Z.t(w,c.Wa,w,"(organic)","organic",d,w)}}}}};g.O=function(d,a,j){d=O(d,a+C,B);return j=!M(d)?Q(d):!M(j)?j:"-"};g.hc=function(d){var a=k.oa,j=v,c;if(d&&"organic"==d.Q){d=U(Q(d.I));for(c=0;c<a[y];c++)j=j||U(a[c])==d}return j};
g.bb=function(){var d="",a="";d=g.ob;if(!(M(d)||"0"==d||!R(d,"://")||g.fb(d))){d=d.split("://")[1];if(R(d,"/")){a=N(d,d.indexOf("/"));a=a.split("?")[0];d=U(d.split("/")[0])}if(0==d.indexOf("www."))d=N(d,4);return new Z.t(w,d,w,"(referral)","referral",w,a)}};g.$a=function(d){var a="";if(k.Y){a=d&&d.hash?d.href.substring(d.href.indexOf("#")):"";a=""!=a?a+B:a}a+=d.search;return a};g.Tb=function(){return new Z.t(w,"(direct)",w,"(direct)","(none)",w,w)};g.ic=function(d){var a=v,j,c=k.qa;if(d&&"referral"==
d.Q){d=U(P(d.V));for(j=0;j<c[y];j++)a=a||R(d,U(c[j]))}return a};g.l=function(d){return w!=d&&d.ib()};g.isNewCampaign=function(d){d=O(d,K+g.b+".",";");var a=d.split(".");d=new Z.t;d.lb(a.slice(4).join("."));if(!g.l(d))return true;a=k.a[A];a=g.$a(a);a=g.cb(a);if(!g.l(a)){a=g.da();g.l(a)||(a=g.bb())}return g.l(a)&&U(d.J())!=U(a.J())};g.getCampaignInformation=function(d,a){if(k.Na){var j="",c="-",n,s=0,q,b,e=g.b;if(d){b=d.k();j=g.$a(k.a[A]);if(k.z&&d.gb()){c=d.ia();if(!M(c)&&!R(c,";")){d.Aa();return}}c=
O(b,K+e+".",";");n=g.cb(j);if(g.l(n)){j=O(j,k.Fa+C,B);if("1"==j&&!M(c))return}if(!g.l(n)){n=g.da();if(!M(c)&&g.hc(n))return}if(!g.l(n)&&a){n=g.bb();if(!M(c)&&g.ic(n))return}if(!g.l(n))if(M(c)&&a)n=g.Tb();if(g.l(n)){if(!M(c)){s=c.split(".");q=new Z.t;q.lb(s.slice(4).join("."));q=U(q.J())==U(n.J());s=s[3]*1}if(!q||a){b=O(b,D+e+".",";");q=b.lastIndexOf(".");b=q>9?N(b,q+1)*1:0;s++;b=0==b?1:b;d.tb([e,g.s,b,s,n.J()].join("."));d.Aa()}}}}}};
Z.t=function(i,f,m,u,l,o,k){var g=this;g.q=i;g.V=f;g.Z=m;g.r=u;g.Q=l;g.I=o;g.Ra=k;g.J=function(){var d=[],a=[["cid",g.q],["csr",g.V],["gclid",g.Z],["ccn",g.r],["cmd",g.Q],["ctr",g.I],["cct",g.Ra]],j,c;if(g.ib())for(j=0;j<a[y];j++)if(!M(a[j][1])){c=a[j][1].split("+").join("%20");c=c.split(" ").join("%20");S(d,"utm"+a[j][0]+C+c)}return d.join("|")};g.ib=function(){return!(M(g.q)&&M(g.V)&&M(g.Z))};g.lb=function(d){var a=function(j){return Q(O(d,"utm"+j+C,"|"))};g.q=a("cid");g.V=a("csr");g.Z=a("gclid");
g.r=a("ccn");g.Q=a("cmd");g.I=a("ctr");g.Ra=a("cct")}};var ya=function(i,f,m,u){function l(j,c,n){var s;if(!M(n)){n=n.split(",");for(var q=0;q<n[y];q++){s=n[q];if(!M(s)){s=s.split(g);if(s[y]==4)c[s[0]]=[s[1],s[2],j]}}}}var o=this,k=f,g=C,d=i,a=u;o.L=m;o.na="";o.p={};o.gc=function(){var j;j=V(O(o.L.k(),H+k+".",";"),k+".")[1];if(!M(j)){j=j.split("|");l(1,o.p,j[1]);o.na=j[0];o.X()}};o.X=function(){o.Ib();var j=o.na,c,n,s="";for(c in o.p)if((n=o.p[c])&&1===n[2])s+=c+g+n[0]+g+n[1]+g+1+",";M(s)||(j+="|"+s);if(M(j))o.L.Nb();else{o.L.va(k+"."+j);o.L.za()}};o.rc=
function(j){o.na=j;o.X()};o.pc=function(j,c,n,s){if(1!=s&&2!=s&&3!=s)s=3;var q=v;if(c&&n&&j>0&&j<=d.kb){c=P(c);n=P(n);if(c[y]+n[y]<=64){o.p[j]=[c,n,s];o.X();q=r}}return q};o.$b=function(j){if((j=o.p[j])&&1===j[2])return j[1]};o.Mb=function(j){var c=o.p;if(c[j]){delete c[j];o.X()}};o.Ib=function(){a._clearKey(8);a._clearKey(9);a._clearKey(11);var j=o.p,c,n;for(n in j)if(c=j[n]){a._setKey(8,n,c[0]);a._setKey(9,n,c[1]);(c=c[2])&&3!=c&&a._setKey(11,n,""+c)}}};var $=function(){function i(h,p,t,x){if(w==k[h])k[h]={};if(w==k[h][p])k[h][p]=[];k[h][p][t]=x}function f(h,p){if(w!=k[h]&&w!=k[h][p]){k[h][p]=w;var t=r,x;for(x=0;x<a[y];x++)if(w!=k[h][a[x]]){t=v;break}if(t)k[h]=w}}function m(h){var p="",t=v,x,E;for(x=0;x<a[y];x++){E=h[a[x]];if(w!=E){if(t)p+=a[x];p+=u(E);t=v}else t=r}return p}function u(h){var p=[],t,x;for(x=0;x<h[y];x++)if(w!=h[x]){t="";if(x!=e&&w==h[x-1])t+=x.toString()+s;t+=l(h[x]);S(p,t)}return j+p.join(n)+c}function l(h){var p="",t,x,E;for(t=
0;t<h[y];t++){x=h.charAt(t);E=b[x];p+=w!=E?E:x}return p}var o=this,k={},g="k",d="v",a=[g,d],j="(",c=")",n="*",s="!",q="'",b={};b[q]="'0";b[c]="'1";b[n]="'2";b[s]="'3";var e=1;o.dc=function(h){return w!=k[h]};o.D=function(){var h="",p;for(p in k)if(w!=k[p])h+=p.toString()+m(k[p]);return h};o.nc=function(h){if(h==w)return o.D();var p=h.D(),t;for(t in k)if(w!=k[t]&&!h.dc(t))p+=t.toString()+m(k[t]);return p};o._setKey=function(h,p,t){if(typeof t!="string")return v;i(h,g,p,t);return r};o._setValue=function(h,
p,t){if(typeof t!="number"&&(w==Number||!(t instanceof Number))||Math.round(t)!=t||t==NaN||t==Infinity)return v;i(h,d,p,t.toString());return r};o._getKey=function(h,p){return w!=k[h]&&w!=k[h][g]?k[h][g][p]:w};o._getValue=function(h,p){return w!=k[h]&&w!=k[h][d]?k[h][d][p]:w};o._clearKey=function(h){f(h,g)};o._clearValue=function(h){f(h,d)}};var za=function(i,f){var m=this;m.Fc=f;m.jc=i;m._trackEvent=function(u,l,o){return f._trackEvent(m.jc,u,l,o)}};var Aa=function(i,f,m){function u(){if("auto"==c.c){var b=c.a.domain;if("www."==N(b,0,4))b=N(b,4);c.c=b}c.c=U(c.c)}function l(){u();var b=c.c,e=b.indexOf("www.google.")*b.indexOf(".google.")*b.indexOf("google.");return e||"/"!=c.h||b.indexOf("google.org")>-1}function o(b,e,h){if(M(b)||M(e)||M(h))return"-";b=O(b,D+a.b+".",e);if(!M(b)){b=b.split(".");b[5]=b[5]?b[5]*1+1:1;b[3]=b[4];b[4]=h;b=b.join(".")}return b}function k(){return"file:"!=c.a[A].protocol&&l()}function g(b){if(!b||""==b)return"";for(;ia(b.charAt(0));)b=
N(b,1);for(;ia(b.charAt(b[y]-1));)b=N(b,0,b[y]-1);return b}function d(b,e,h,p){if(!M(b())){e(p?Q(b()):b());R(b(),";")||h()}}var a=this,j=w,c=new sa,n=v,s=w;a.e=window;a.r=i;a.s=Math.round((new Date).getTime()/1E3);a.n=f||"UA-XXXXX-X";a.Ua=c.a.referrer;a.ca=w;a.f=w;a.M=w;a.C=v;a.A=w;a.g=w;a.Xa=w;a.b=w;a.i=w;c.o=m?P(m):w;var q=function(b){var e,h=""!=b&&c.a[A].host!=b;if(h)for(e=0;e<c.u[y];e++)h=h&&la(U(b),U(c.u[e]))==-1;return h};a.lc=function(){if(!a.M)return null;var b=a.M.match(/^(?:\|([-0-9a-z.]{1,30})(?::(\d{4,5}))?\|)?([-.\w]{10,1200})$/i);
if(!b)return null;return{domain:b[1]||null,port:b[2]||null,token:b[3]}};a.Xb=function(){return W()^a.A.Qb()&2147483647};a.Ub=function(){if(!c.c||""==c.c||"none"==c.c){c.c="";return 1}u();return c.Ka?na(c.c):1};a.Pb=function(b,e){if(M(b))b="-";else{e+=c.h&&"/"!=c.h?c.h:"";var h=b.indexOf(e);b=h>=0&&h<=8?"0":"["==b.charAt(0)&&"]"==b.charAt(b[y]-1)?"-":b}return b};a.ra=function(b){var e="",h=c.a;e+=c.$?a.A.vc():"";e+=c.aa&&!M(h.title)?"&utmdt="+P(h.title):"";e+="&utmhid="+oa()+"&utmr="+P(a.ca)+"&utmp="+
P(a.oc(b));return e};a.oc=function(b){var e=c.a[A];return b=w!=b&&""!=b?P(b,r):P(e.pathname+e.search,r)};a.yc=function(b){if(a.H()){var e="";if(a.g!=w&&a.g.D()[y]>0)e+="&utme="+P(a.g.D());e+=a.ra(b);j.F(e,a.n,a.b)}};a.Lb=function(){var b=new ua(c);return b.pa(a.b)?b.uc():w};a._getLinkerUrl=function(b,e){var h=b.split("#"),p=b,t=a.Lb();if(t)if(e&&1>=h[y])p+="#"+t;else if(!e||1>=h[y])if(1>=h[y])p+=(R(b,"?")?B:"?")+t;else p=h[0]+(R(b,"?")?B:"?")+t+"#"+h[1];return p};a.sc=function(){var b=a.lc();if(b){a.i.qc(a.M);
a.i.Dc();X._gasoDomain=c.c;X._gasoCPath=c.h;var e="www.google.com";if(b.domain)e=b.domain+".google.com"+(b.port?":"+b.port:"");var h="https://www.google.com/analytics/reporting/overlay_js?gaso=";if(b.domain)h="https://"+e+"/analytics/reporting/overlay_js?gaso=";h+=b.token+B+W();pa(h,"_gasojs")}};a.cc=function(){var b=a.s,e=a.i,h=e.k(),p=a.b+"",t=c.e,x=t?t.gaGlobal:w,E,ja=R(h,D+p+"."),Ba=R(h,F+p),Ca=R(h,G+p),I,J=[],T="",qa=v;h=M(h)?"":h;if(c.z){E=c.a[A]&&c.a[A].hash?c.a[A].href.substring(c.a[A].href.indexOf("#")):
"";if(c.Y&&!M(E))T=E+B;T+=c.a[A].search;if(!M(T)&&R(T,D)){e.mc(T);e.gb()||e.Kb();I=e.ea()}d(e.ha,e.sb,e.Cb,true);d(e.ga,e.va,e.za)}if(M(I))if(ja)if(!Ba||!Ca||0){I=o(h,";",b);a.C=r}else{I=O(h,D+p+".",";");J=V(O(h,F+p,";"),".")}else{I=ma([p,a.Xb(),b,b,b,1],".");qa=a.C=r}else if(M(e.B())||M(e.fa())){I=o(T,B,b);a.C=r}else{J=V(e.B(),".");p=J[0]}I=I.split(".");if(t&&x&&x.dh==p&&!c.o){I[4]=x.sid?x.sid:I[4];if(qa){I[3]=x.sid?x.sid:I[4];if(x.vid){b=x.vid.split(".");I[1]=b[0];I[2]=b[1]}}}e.qb(I.join("."));
J[0]=p;J[1]=J[1]?J[1]:0;J[2]=w!=J[2]?J[2]:c.wc;J[3]=J[3]?J[3]:I[4];e.ta(J.join("."));e.rb(p);M(e.Zb())||e.ua(e.N());e.Ab();e.ya();e.Bb()};a.ec=function(){j=new wa(c)};a._getName=function(){return a.r};a._initData=function(){var b;if(!n){if(!a.A){a.A=new xa(c);a.A.Sb()}a.b=a.Ub();a.i=new ua(c);a.g=new $;s=new ya(c,a.b,a.i,a.g);a.ec()}if(k()){if(!n){a.ca=a.Pb(a.Ua,c.a.domain);b=new Z(a.b,a.ca,a.s,c)}a.cc(b);s.gc()}if(!n){k()&&b.getCampaignInformation(a.i,a.C);a.Xa=new $;n=r}a.fc()};a._visitCode=function(){a._initData();
var b=O(a.i.k(),D+a.b+".",";");b=b.split(".");return b[y]<4?"":b[1]};a._cookiePathCopy=function(b){a._initData();a.i&&a.i.Bc(a.b,b)};a.fc=function(){if(!X.eb){var b=c.a[A].hash;if(b&&1==b.indexOf("gaso="))b=O(b,"gaso=",B);else b=(b=c.e.name)&&0<=b.indexOf("gaso=")?O(b,"gaso=",B):O(a.i.k(),ha,";");if(b[y]>=10){a.M=b;a.sc()}X.eb=r}};a.H=function(){return a._visitCode()%1E4<c.S*100};a.tc=function(){var b,e,h=c.a.links;if(!c.hb){b=c.a.domain;if("www."==N(b,0,4))b=N(b,4);c.u.push("."+b)}for(b=0;b<h[y]&&
(c.ma==-1||b<c.ma);b++){e=h[b];if(q(e.host))if(!e.gatcOnclick){e.gatcOnclick=e.onclick?e.onclick:a.kc;e.onclick=function(p){var t=!this.target||this.target=="_self"||this.target=="_top"||this.target=="_parent";t=t&&!a.Jb(p);a.zc(p,this,t);return t?v:this.gatcOnclick?this.gatcOnclick(p):r}}}};a.kc=function(){};a._trackPageview=function(b){if(k()){a._initData();c.u&&a.tc();a.yc(b);a.C=v}};a._trackTrans=function(){var b=a.b,e=[],h,p,t;a._initData();if(a.f&&a.H()){for(h=0;h<a.f.W[y];h++){p=a.f.W[h];S(e,
p.xa());for(t=0;t<p.P[y];t++)S(e,p.P[t].xa())}for(h=0;h<e[y];h++)j.F(e[h],a.n,b,r)}};a._setTrans=function(){var b=c.a,e,h,p;b=b.getElementById?b.getElementById("utmtrans"):b.utmform&&b.utmform.utmtrans?b.utmform.utmtrans:w;a._initData();if(b&&b.value){a.f=new Y;p=b.value.split("UTM:");c.v=!c.v||""==c.v?"|":c.v;for(b=0;b<p[y];b++){p[b]=g(p[b]);e=p[b].split(c.v);for(h=0;h<e[y];h++)e[h]=g(e[h]);if("T"==e[0])a._addTrans(e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]);else"I"==e[0]&&a._addItem(e[1],e[2],e[3],
e[4],e[5],e[6])}}};a._addTrans=function(b,e,h,p,t,x,E,ja){a.f=a.f?a.f:new Y;return a.f.Gb(b,e,h,p,t,x,E,ja)};a._addItem=function(b,e,h,p,t,x){var E;a.f=a.f?a.f:new Y;(E=a.f.db(b))||(E=a._addTrans(b,"","","","","","",""));E.Fb(e,h,p,t,x)};a._setVar=function(b){if(b&&""!=b&&l()){a._initData();s.rc(P(b));a.H()&&j.F("&utmt=var",a.n,a.b)}};a._setCustomVar=function(b,e,h,p){a._initData();return s.pc(b,e,h,p)};a._deleteCustomVar=function(b){a._initData();s.Mb(b)};a._getVisitorCustomVar=function(b){a._initData();
return s.$b(b)};a._setMaxCustomVariables=function(b){c.kb=b};a._link=function(b,e){if(c.z&&b){a._initData();c.a[A].href=a._getLinkerUrl(b,e)}};a._linkByPost=function(b,e){if(c.z&&b&&b.action){a._initData();b.action=a._getLinkerUrl(b.action,e)}};a._setXKey=function(b,e,h){a.g._setKey(b,e,h)};a._setXValue=function(b,e,h){a.g._setValue(b,e,h)};a._getXKey=function(b,e){return a.g._getKey(b,e)};a._getXValue=function(b,e){return a.g.getValue(b,e)};a._clearXKey=function(b){a.g._clearKey(b)};a._clearXValue=
function(b){a.g._clearValue(b)};a._createXObj=function(){a._initData();return new $};a._sendXEvent=function(b){var e="";a._initData();if(a.H()){e+="&utmt=event&utme="+P(a.g.nc(b))+a.ra();j.F(e,a.n,a.b,v,r)}};a._createEventTracker=function(b){a._initData();return new za(b,a)};a._trackEvent=function(b,e,h,p){a._initData();var t=a.Xa;if(w!=b&&w!=e&&""!=b&&""!=e){t._clearKey(5);t._clearValue(5);(b=t._setKey(5,1,b)&&t._setKey(5,2,e)&&(w==h||t._setKey(5,3,h))&&(w==p||t._setValue(5,1,p)))&&a._sendXEvent(t)}else b=
v;return b};a.zc=function(b,e,h){a._initData();if(a.H()){var p=new $;p._setKey(6,1,e.href);var t=h?function(){a.Ya(b,e)}:w;j.F("&utmt=event&utme="+P(p.D())+a.ra(),a.n,a.b,v,r,t);h&&c.e.setTimeout(function(){a.Ya(b,e)},500)}};a.Ya=function(b,e){if(!b)b=c.e.event;var h=r;if(e.gatcOnclick)h=e.gatcOnclick(b);if(h||typeof h=="undefined")if(!e.target||e.target=="_self")c.e[A]=e.href;else if(e.target=="_top")c.e.top.document[A]=e.href;else if(e.target=="_parent")c.e.parent.document[A]=e.href};a.Jb=function(b){if(!b)b=
c.e.event;var e=b.shiftKey||b.ctrlKey||b.altKey;if(!e)if(b.modifiers&&c.e.Event)e=b.modifiers&c.e.Event.CONTROL_MASK||b.modifiers&c.e.Event.SHIFT_MASK||b.modifiers&c.e.Event.ALT_MASK;return e};a.Ec=function(){return c};a._setDomainName=function(b){c.c=b};a._addOrganic=function(b,e,h){c.R.splice(h?0:c.R.length,0,new ra(b,e))};a._clearOrganic=function(){c.R=[]};a._addIgnoredOrganic=function(b){S(c.oa,b)};a._clearIgnoredOrganic=function(){c.oa=[]};a._addIgnoredRef=function(b){S(c.qa,b)};a._clearIgnoredRef=
function(){c.qa=[]};a._setAllowHash=function(b){c.Ka=b?1:0};a._setCampaignTrack=function(b){c.Na=b?1:0};a._setClientInfo=function(b){c.$=b?1:0};a._getClientInfo=function(){return c.$};a._setCookiePath=function(b){c.h=b};a._setTransactionDelim=function(b){c.v=b};a._setCookieTimeout=function(b){a._setCampaignCookieTimeout(b*1E3)};a._setCampaignCookieTimeout=function(b){c.Ma=b};a._setDetectFlash=function(b){c.ba=b?1:0};a._getDetectFlash=function(){return c.ba};a._setDetectTitle=function(b){c.aa=b?1:
0};a._getDetectTitle=function(){return c.aa};a._setLocalGifPath=function(b){c.ja=b};a._getLocalGifPath=function(){return c.ja};a._setLocalServerMode=function(){c.G=0};a._setRemoteServerMode=function(){c.G=1};a._setLocalRemoteServerMode=function(){c.G=2};a._getServiceMode=function(){return c.G};a._setSampleRate=function(b){c.S=b};a._setSessionTimeout=function(b){a._setSessionCookieTimeout(b*1E3)};a._setSessionCookieTimeout=function(b){c.pb=b};a._setAllowLinker=function(b){c.z=b?1:0};a._setAllowAnchor=
function(b){c.Y=b?1:0};a._setCampNameKey=function(b){c.Ba=b};a._setCampContentKey=function(b){c.Ca=b};a._setCampIdKey=function(b){c.Da=b};a._setCampMediumKey=function(b){c.Ea=b};a._setCampNOKey=function(b){c.Fa=b};a._setCampSourceKey=function(b){c.Ga=b};a._setCampTermKey=function(b){c.Ha=b};a._setCampCIdKey=function(b){c.Ia=b};a._getAccount=function(){return a.n};a._setAccount=function(b){a.n=b};a._setNamespace=function(b){c.o=b?P(b):w};a._getVersion=function(){return da};a._setAutoTrackOutbound=
function(b){c.u=[];if(b)c.u=b};a._setTrackOutboundSubdomains=function(b){c.hb=b};a._setHrefExamineLimit=function(b){c.ma=b};a._setReferrerOverride=function(b){a.Ua=b};a._setCookiePersistence=function(b){a._setVisitorCookieTimeout(b)};a._setVisitorCookieTimeout=function(b){c.w=b}};var Da=function(){var i=this;i.Va=v;i.yb={};i.Ac=0;i.eb=v;i._gasoDomain=w;i._gasoCPath=w;i._getTracker=function(f,m){return i._createTracker(f,w,m)};i._createTracker=function(f,m,u){if(m==w)m="~"+X.Ac++;return X.yb[m]=new Aa(m,f,u)};i._getTrackerByName=function(f){f=f||"";return X.yb[f]||X._createTracker(undefined,f)};i.Cc=function(){var f=window[ea];return f&&f[fa]&&f[fa]()};i._anonymizeIp=function(){i.Va=r}};var va=v,Fa=function(){var i=this;i._createAsyncTracker=function(f,m){return X._createTracker(f,m||"")};i._getAsyncTracker=function(f){return X._getTrackerByName(f)};i.push=function(){var f=arguments,m=0;va=r;for(var u=0;u<f[y];u++)try{if(typeof f[u]==="function")f[u]();else{var l="",o=f[u][0],k=o.lastIndexOf(".");if(k>0){l=N(o,0,k);o=N(o,k+1)}var g=l==aa?X:l==ba?Ea:X._getTrackerByName(l);g[o].apply(g,f[u].slice(1))}}catch(d){m++}return m}};function Ga(){var i=window[aa];if(i&&typeof i._getTracker=="function")X=i;else window[aa]=X}function Ha(){var i=window[ba],f=v;if(i&&typeof i.push=="function"){f=i.constructor==Array;if(!f)return}window[ba]=Ea;f&&Ea.push.apply(Ea,i)}var X=new Da;Ga();var Ea=new Fa;Ha();})()
;
function iga2_a(a){iga2_(this.a,a)}function iga2_(a,b){b||(b="/");a._trackPageview(b)}function iga2_b(a,b,c,d){iga2_c(this.a,a,b,c,d)}function iga2_c(a,b,c,d,e){if(!b||!c)throw new Error("_IG_GA.reportEvent(category, action): category or action cannot be null, empty, or undefined.");a=a._createEventTracker(b);a._trackEvent(c,d,e)}function iga2_d(a,b){iga2_(this.a,b);iga2_e(a)}function iga2_f(a,b,c,d,e){iga2_c(this.a,b,c,d,e);iga2_e(a)}function iga2_e(a){window.setTimeout(iga2_g(a),500)}
function iga2_g(a){return function(){iga2_h(a)}}function iga2_h(a){_ADS_ClickDestinationUrl&&_ADS_ReportInteraction?_ADS_ClickDestinationUrl(a):window.open(a,"_top","")}
function _IG_GA(a){this.a=null;this.reportPageview=iga2_a;this.reportEvent=iga2_b;this.reportPageviewClick=iga2_d;this.reportEventClick=iga2_f;if(!a)throw new Error("_IG_GA(ga_id): ga_id is undefined");if(!a.match(/^UA-\d+-\d+$/))throw new Error("_IG_GA(ga_id): id contains invalid characters.  It should look something like: UA-000000-0.");this.a=_gat._getTracker(a);this.a._initData()};
;
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.wpm){gadgets.rpctx.wpm=function(){var A;
return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(B,C){A=C;
var D=function(E){B(gadgets.json.parse(E.data))
};
if(typeof window.addEventListener!="undefined"){window.addEventListener("message",D,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onmessage",D)
}else{gadgets.warn("wpm init failure")
}}A("..",true);
return true
},setup:function(C,B){if(C===".."){gadgets.rpc.call(C,gadgets.rpc.ACK)
}return true
},call:function(C,G,F){var E=gadgets.rpc._getTargetWin(C);
var D=gadgets.rpc.getRelayUrl(C)||gadgets.util.getUrlParameters()["parent"];
var B=gadgets.rpc.getOrigin(D);
if(B){E.postMessage(gadgets.json.stringify(F),B)
}else{gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message")
}return true
}}
}()
};;
;
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.frameElement){gadgets.rpctx.frameElement=function(){var E="__g2c_rpc";
var B="__c2g_rpc";
var D;
var C;
function A(G,K,J){try{if(K!==".."){var F=window.frameElement;
if(typeof F[E]==="function"){if(typeof F[E][B]!=="function"){F[E][B]=function(L){D(gadgets.json.parse(L))
}
}F[E](gadgets.json.stringify(J));
return 
}}else{var I=document.getElementById(G);
if(typeof I[E]==="function"&&typeof I[E][B]==="function"){I[E][B](gadgets.json.stringify(J));
return 
}}}catch(H){}return true
}return{getCode:function(){return"fe"
},isParentVerifiable:function(){return false
},init:function(F,G){D=F;
C=G;
return true
},setup:function(J,F){if(J!==".."){try{var I=document.getElementById(J);
I[E]=function(K){D(gadgets.json.parse(K))
}
}catch(H){return false
}}if(J===".."){C("..",true);
var G=function(){window.setTimeout(function(){gadgets.rpc.call(J,gadgets.rpc.ACK)
},500)
};
gadgets.util.registerOnLoadHandler(G)
}return true
},call:function(F,H,G){A(F,H,G)
}}
}()
};;
;
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.nix){gadgets.rpctx.nix=function(){var C="GRPC____NIXVBS_wrapper";
var D="GRPC____NIXVBS_get_wrapper";
var F="GRPC____NIXVBS_handle_message";
var B="GRPC____NIXVBS_create_channel";
var A=10;
var J=500;
var I={};
var H;
var G=0;
function E(){var L=I[".."];
if(L){return 
}if(++G>A){gadgets.warn("Nix transport setup failed, falling back...");
H("..",false);
return 
}if(!L&&window.opener&&"GetAuthToken" in window.opener){L=window.opener;
if(L.GetAuthToken()==gadgets.rpc.getAuthToken("..")){var K=gadgets.rpc.getAuthToken("..");
L.CreateChannel(window[D]("..",K),K);
I[".."]=L;
window.opener=null;
H("..",true);
return 
}}window.setTimeout(function(){E()
},J)
}return{getCode:function(){return"nix"
},isParentVerifiable:function(){return false
},init:function(L,M){H=M;
if(typeof window[D]!=="unknown"){window[F]=function(O){window.setTimeout(function(){L(gadgets.json.parse(O))
},0)
};
window[B]=function(O,Q,P){if(gadgets.rpc.getAuthToken(O)===P){I[O]=Q;
H(O,true)
}};
var K="Class "+C+"\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended = name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n "+F+"(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call "+B+"(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction "+D+"(name, auth)\nDim wrap\nSet wrap = New "+C+"\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet "+D+" = wrap\nEnd Function";
try{window.execScript(K,"vbscript")
}catch(N){return false
}}return true
},setup:function(O,K){if(O===".."){E();
return true
}try{var M=document.getElementById(O);
var N=window[D](O,K);
M.contentWindow.opener=N
}catch(L){return false
}return true
},call:function(K,N,M){try{if(I[K]){I[K].SendMessage(gadgets.json.stringify(M))
}}catch(L){return false
}return true
}}
}()
};;
;
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.rmr){gadgets.rpctx.rmr=function(){var G=500;
var E=10;
var H={};
var B;
var I;
function K(P,N,O,M){var Q=function(){document.body.appendChild(P);
P.src="about:blank";
if(M){P.onload=function(){L(M)
}
}P.src=N+"#"+O
};
if(document.body){Q()
}else{gadgets.util.registerOnLoadHandler(function(){Q()
})
}}function C(O){if(typeof H[O]==="object"){return 
}var P=document.createElement("iframe");
var M=P.style;
M.position="absolute";
M.top="0px";
M.border="0";
M.opacity="0";
M.width="10px";
M.height="1px";
P.id="rmrtransport-"+O;
P.name=P.id;
var N=gadgets.rpc.getRelayUrl(O);
if(!N){N=gadgets.rpc.getOrigin(gadgets.util.getUrlParameters()["parent"])+"/robots.txt"
}H[O]={frame:P,receiveWindow:null,relayUri:N,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0};
if(O!==".."){K(P,N,A(O))
}D(O)
}function D(O){var Q=null;
H[O].searchCounter++;
try{var N=gadgets.rpc._getTargetWin(O);
if(O===".."){Q=N.frames["rmrtransport-"+gadgets.rpc.RPC_ID]
}else{Q=N.frames["rmrtransport-.."]
}}catch(P){}var M=false;
if(Q){M=F(O,Q)
}if(!M){if(H[O].searchCounter>E){return 
}window.setTimeout(function(){D(O)
},G)
}}function J(N,P,T,S){var O=null;
if(T!==".."){O=H[".."]
}else{O=H[N]
}if(O){if(P!==gadgets.rpc.ACK){O.queue.push(S)
}if(O.waiting||(O.queue.length===0&&!(P===gadgets.rpc.ACK&&S&&S.ackAlone===true))){return true
}if(O.queue.length>0){O.waiting=true
}var M=O.relayUri+"#"+A(N);
try{O.frame.contentWindow.location=M;
var Q=O.width==10?20:10;
O.frame.style.width=Q+"px";
O.width=Q
}catch(R){return false
}}return true
}function A(N){var O=H[N];
var M={id:O.sendId};
if(O){M.d=Array.prototype.slice.call(O.queue,0);
M.d.push({s:gadgets.rpc.ACK,id:O.recvId})
}return gadgets.json.stringify(M)
}function L(X){var U=H[X];
var Q=U.receiveWindow.location.hash.substring(1);
var Y=gadgets.json.parse(decodeURIComponent(Q))||{};
var N=Y.d||[];
var O=false;
var T=false;
var V=0;
var M=(U.recvId-Y.id);
for(var P=0;
P<N.length;
++P){var S=N[P];
if(S.s===gadgets.rpc.ACK){I(X,true);
if(U.waiting){T=true
}U.waiting=false;
var R=Math.max(0,S.id-U.sendId);
U.queue.splice(0,R);
U.sendId=Math.max(U.sendId,S.id||0);
continue
}O=true;
if(++V<=M){continue
}++U.recvId;
B(S)
}if(O||(T&&U.queue.length>0)){var W=(X==="..")?gadgets.rpc.RPC_ID:"..";
J(X,gadgets.rpc.ACK,W,{ackAlone:O})
}}function F(P,S){var O=H[P];
try{var N=false;
N="document" in S;
if(!N){return false
}N=typeof S.document=="object";
if(!N){return false
}var R=S.location.href;
if(R==="about:blank"){return false
}}catch(M){return false
}O.receiveWindow=S;
function Q(){L(P)
}if(typeof S.attachEvent==="undefined"){S.onresize=Q
}else{S.attachEvent("onresize",Q)
}if(P===".."){K(O.frame,O.relayUri,A(P),P)
}else{L(P)
}return true
}return{getCode:function(){return"rmr"
},isParentVerifiable:function(){return true
},init:function(M,N){B=M;
I=N;
return true
},setup:function(O,M){try{C(O)
}catch(N){gadgets.warn("Caught exception setting up RMR: "+N);
return false
}return true
},call:function(M,O,N){return J(M,N.s,O,N)
}}
}()
};;
;
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.ifpc){gadgets.rpctx.ifpc=function(){var E=[];
var D=0;
var C;
function B(H){var F=[];
for(var I=0,G=H.length;
I<G;
++I){F.push(encodeURIComponent(gadgets.json.stringify(H[I])))
}return F.join("&")
}function A(I){var G;
for(var F=E.length-1;
F>=0;
--F){var J=E[F];
try{if(J&&(J.recyclable||J.readyState==="complete")){J.parentNode.removeChild(J);
if(window.ActiveXObject){E[F]=J=null;
E.splice(F,1)
}else{J.recyclable=false;
G=J;
break
}}}catch(H){}}if(!G){G=document.createElement("iframe");
G.style.border=G.style.width=G.style.height="0px";
G.style.visibility="hidden";
G.style.position="absolute";
G.onload=function(){this.recyclable=true
};
E.push(G)
}G.src=I;
window.setTimeout(function(){document.body.appendChild(G)
},0)
}return{getCode:function(){return"ifpc"
},isParentVerifiable:function(){return true
},init:function(F,G){C=G;
C("..",true);
return true
},setup:function(G,F){C(G,true);
return true
},call:function(F,K,I){var J=gadgets.rpc.getRelayUrl(F);
++D;
if(!J){gadgets.warn("No relay file assigned for IFPC");
return 
}var H=null;
if(I.l){var G=I.a;
H=[J,"#",B([K,D,1,0,B([K,I.s,"","",K].concat(G))])].join("")
}else{H=[J,"#",F,"&",K,"@",D,"&1&0&",encodeURIComponent(gadgets.json.stringify(I))].join("")
}A(H);
return true
}}
}()
};;
if(!gadgets.rpc){gadgets.rpc=function(){var T="__cb";
var S="";
var G="__ack";
var R=500;
var J=10;
var B={};
var C={};
var X={};
var K={};
var N=0;
var i={};
var W={};
var D={};
var f={};
var L={};
var V={};
var M=(window.top!==window.self);
var O=window.name;
var g=(function(){function j(k){return function(){gadgets.log("gadgets.rpc."+k+"("+gadgets.json.stringify(Array.prototype.slice.call(arguments))+"): call ignored. [caller: "+document.location+", isChild: "+M+"]")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:j("init"),setup:j("setup"),call:j("call")}
})();
if(gadgets.util){f=gadgets.util.getUrlParameters()
}var a=(f.rpc_earlyq==="1");
function A(){return typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?gadgets.rpctx.nix:navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc
}function b(o,m){var k=c;
if(!m){k=g
}L[o]=k;
var j=V[o]||[];
for(var l=0;
l<j.length;
++l){var n=j[l];
n.t=Y(o);
k.call(o,n.f,n)
}V[o]=[]
}function U(k){if(k&&typeof k.s==="string"&&typeof k.f==="string"&&k.a instanceof Array){if(K[k.f]){if(K[k.f]!==k.t){throw new Error("Invalid auth token. "+K[k.f]+" vs "+k.t)
}}if(k.s===G){window.setTimeout(function(){b(k.f,true)
},0);
return 
}if(k.c){k.callback=function(l){gadgets.rpc.call(k.f,T,null,k.c,l)
}
}var j=(B[k.s]||B[S]).apply(k,k.a);
if(k.c&&typeof j!=="undefined"){gadgets.rpc.call(k.f,T,null,k.c,j)
}}}function e(l){if(!l){return""
}l=l.toLowerCase();
if(l.indexOf("//")==0){l=window.location.protocol+l
}if(l.indexOf("://")==-1){l=window.location.protocol+"//"+l
}var m=l.substring(l.indexOf("://")+3);
var j=m.indexOf("/");
if(j!=-1){m=m.substring(0,j)
}var o=l.substring(0,l.indexOf("://"));
var n="";
var p=m.indexOf(":");
if(p!=-1){var k=m.substring(p+1);
m=m.substring(0,p);
if((o==="http"&&k!=="80")||(o==="https"&&k!=="443")){n=":"+k
}}return o+"://"+m+n
}function I(k){if(typeof k==="undefined"||k===".."){return window.parent
}k=String(k);
var j=window.frames[k];
if(j){return j
}j=document.getElementById(k);
if(j&&j.contentWindow){return j.contentWindow
}return null
}var c=A();
B[S]=function(){gadgets.warn("Unknown RPC service: "+this.s)
};
B[T]=function(k,j){var l=i[k];
if(l){delete i[k];
l(j)
}};
function P(l,j){if(W[l]===true){return 
}if(typeof W[l]==="undefined"){W[l]=0
}var k=document.getElementById(l);
if(l===".."||k!=null){if(c.setup(l,j)===true){W[l]=true;
return 
}}if(W[l]!==true&&W[l]++<J){window.setTimeout(function(){P(l,j)
},R)
}else{L[l]=g;
W[l]=true
}}function F(k,n){if(typeof D[k]==="undefined"){D[k]=false;
var m=gadgets.rpc.getRelayUrl(k);
if(e(m)!==e(window.location.href)){return false
}var l=I(k);
try{D[k]=l.gadgets.rpc.receiveSameDomain
}catch(j){gadgets.error("Same domain call failed: parent= incorrectly set.")
}}if(typeof D[k]==="function"){D[k](n);
return true
}return false
}function H(k,j,l){C[k]=j;
X[k]=!!l
}function Y(j){return K[j]
}function E(j,k){k=k||"";
K[j]=String(k);
P(j,k)
}function Q(j){function l(o){var q=o?o.rpc:{};
var n=q.parentRelayUrl;
if(n.substring(0,7)!=="http://"&&n.substring(0,8)!=="https://"&&n.substring(0,2)!=="//"){if(typeof f.parent==="string"&&f.parent!==""){if(n.substring(0,1)!=="/"){var m=f.parent.lastIndexOf("/");
n=f.parent.substring(0,m+1)+n
}else{n=e(f.parent)+n
}}}var p=!!q.useLegacyProtocol;
H("..",n,p);
if(p){c=gadgets.rpctx.ifpc;
c.init(U,b)
}E("..",j)
}var k={parentRelayUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("rpc",k,l)
}function Z(l,j){var k=j||f.parent;
if(k){H("..",k);
E("..",l)
}}function d(j,n,p){if(!gadgets.util){return 
}var m=document.getElementById(j);
if(!m){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+j+", element not found.")
}var k=n||m.src;
H(j,k);
var o=gadgets.util.getUrlParameters(m.src);
var l=p||o.rpctoken;
E(j,l)
}function h(j,l,m){if(j===".."){var k=m||f.rpctoken||f.ifpctok||"";
if(window.__isgadget===true){Q(k)
}else{Z(k,l)
}}else{d(j,l,m)
}}return{register:function(k,j){if(k===T||k===G){throw new Error("Cannot overwrite callback/ack service")
}if(k===S){throw new Error("Cannot overwrite default service: use registerDefault")
}B[k]=j
},unregister:function(j){if(j===T||j===G){throw new Error("Cannot delete callback/ack service")
}if(j===S){throw new Error("Cannot delete default service: use unregisterDefault")
}delete B[j]
},registerDefault:function(j){B[S]=j
},unregisterDefault:function(){delete B[S]
},forceParentVerifiable:function(){if(!c.isParentVerifiable()){c=gadgets.rpctx.ifpc
}},call:function(j,k,p,n){j=j||"..";
var o="..";
if(j===".."){o=O
}++N;
if(p){i[N]=p
}var m={s:k,f:o,c:p?N:0,a:Array.prototype.slice.call(arguments,3),t:K[j],l:X[j]};
if(j!==".."&&!document.getElementById(j)){gadgets.log("WARNING: attempted send to nonexistent frame: "+j);
return 
}if(F(j,m)){return 
}var l=L[j]?L[j]:c;
if(!l){if(!V[j]){V[j]=[m]
}else{V[j].push(m)
}return 
}if(X[j]){l=gadgets.rpctx.ifpc
}if(l.call(j,o,m)===false){L[j]=g;
c.call(j,o,m)
}},getRelayUrl:function(k){var j=C[k];
if(j&&j.indexOf("//")==0){j=document.location.protocol+j
}return j
},setRelayUrl:H,setAuthToken:E,setupReceiver:h,getAuthToken:Y,getRelayChannel:function(){return c.getCode()
},receive:function(j){if(j.length>4){U(gadgets.json.parse(decodeURIComponent(j[j.length-1])))
}},receiveSameDomain:function(j){j.a=Array.prototype.slice.call(j.a);
window.setTimeout(function(){U(j)
},0)
},getOrigin:e,init:function(){if(c.init(U,b)===false){c=g
}if(M){h("..")
}},_getTargetWin:I,ACK:G,RPC_ID:O}
}();
gadgets.rpc.init()
};;
gadgets.views=function(){var E=null;
var B={};
var D={};
function A(H){if(!H){H=window.event
}var G;
if(H.target){G=H.target
}else{if(H.srcElement){G=H.srcElement
}}if(G.nodeType===3){G=G.parentNode
}if(G.nodeName.toLowerCase()==="a"){var F=G.getAttribute("href");
if(F&&F[0]!=="#"&&F.indexOf("://")===-1){gadgets.views.requestNavigateTo(E,F);
if(H.stopPropagation){H.stopPropagation()
}if(H.preventDefault){H.preventDefault()
}H.returnValue=false;
H.cancelBubble=true;
return false
}}return false
}function C(I){var H=I.views||{};
for(var L in H){if(H.hasOwnProperty(L)){if(L!="rewriteLinks"){var M=H[L];
if(!M){continue
}B[L]=new gadgets.views.View(L,M.isOnlyVisible);
var F=M.aliases||[];
for(var K=0,J;
(J=F[K]);
++K){B[J]=new gadgets.views.View(L,M.isOnlyVisible)
}}}}var G=gadgets.util.getUrlParameters();
if(G["view-params"]){D=gadgets.json.parse(G["view-params"])||D
}E=B[G.view]||B["default"];
if(H.rewriteLinks){if(document.attachEvent){document.attachEvent("onclick",A)
}else{document.addEventListener("click",A,false)
}}}gadgets.config.register("views",null,C);
return{bind:function(W,U){if(typeof W!=="string"){throw new Error("Invalid urlTemplate")
}if(typeof U!=="object"){throw new Error("Invalid environment")
}var R=/^([a-zA-Z0-9][a-zA-Z0-9_\.\-]*)(=([a-zA-Z0-9\-\._~]|(%[0-9a-fA-F]{2}))*)?$/,Y=new RegExp("\\{([^}]*)\\}","g"),V=/^-([a-zA-Z]+)\|([^|]*)\|(.+)$/,M=[],Q=0,K,J,H,P,L,G,N,S;
function I(a,Z){return U.hasOwnProperty(a)?U[a]:Z
}function F(Z){if(!(J=Z.match(R))){throw new Error("Invalid variable : "+Z)
}}function X(d,Z,c){var a,b=d.split(",");
for(a=0;
a<b.length;
++a){F(b[a]);
if(c(Z,I(J[1]),J[1])){break
}}return Z
}function T(Z){if((typeof Z==="object")||(typeof Z==="function")){for(var a in Z){if(Z.hasOwnProperty(a)){return false
}}return true
}return false
}while((K=Y.exec(W))){M.push(W.substring(Q,K.index));
Q=Y.lastIndex;
if((J=K[1].match(R))){H=J[1];
P=J[2]?J[2].substr(1):"";
M.push(I(H,P))
}else{if((J=K[1].match(V))){L=J[1];
G=J[2];
N=J[3];
S=0;
switch(L){case"neg":S=1;
case"opt":if(X(N,{flag:S},function(a,Z){if(typeof Z!=="undefined"&&!T(Z)){a.flag=!a.flag;
return 1
}return 0
}).flag){M.push(G)
}break;
case"join":M.push(X(N,[],function(b,a,Z){if(typeof a==="string"){b.push(Z+"="+a)
}else{if(typeof a==="object"){for(var c in a){if(a.hasOwnProperty(c)){b.push(c+"="+a[c])
}}}}}).join(G));
break;
case"list":F(N);
var O=I(J[1]);
if(typeof O==="object"&&typeof O.join==="function"){M.push(O.join(G))
}break;
case"prefix":S=1;
case"suffix":F(N);
O=I(J[1],J[2]&&J[2].substr(1));
if(typeof O==="string"){M.push(S?G+O:O+G)
}else{if(typeof O==="object"&&typeof O.join==="function"){M.push(S?G+O.join(G):O.join(G)+G)
}}break;
default:throw new Error("Invalid operator : "+L)
}}else{throw new Error("Invalid syntax : "+K[0])
}}}M.push(W.substr(Q));
return M.join("")
},requestNavigateTo:function(F,H,G){if(typeof F!=="string"){F=F.getName()
}gadgets.rpc.call(null,"requestNavigateTo",null,F,H,G)
},getCurrentView:function(){return E
},getSupportedViews:function(){return B
},getParams:function(){return D
}}
}();
gadgets.views.View=function(A,B){this.name_=A;
this.isOnlyVisible_=!!B
};
gadgets.views.View.prototype.getName=function(){return this.name_
};
gadgets.views.View.prototype.getUrlTemplate=function(){return gadgets.config&&gadgets.config.views&&gadgets.config.views[this.name_]&&gadgets.config.views[this.name_].urlTemplate
};
gadgets.views.View.prototype.bind=function(A){return gadgets.views.bind(this.getUrlTemplate(),A)
};
gadgets.views.View.prototype.isOnlyVisibleGadget=function(){return this.isOnlyVisible_
};
gadgets.views.ViewType=gadgets.util.makeEnum(["CANVAS","HOME","PREVIEW","PROFILE","FULL_PAGE","DASHBOARD","POPUP"]);;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistCtors([[gadgets.views,"View",Object]]);
caja___.whitelistMeths([[gadgets.views.View,"bind"],[gadgets.views.View,"getUrlTemplate"],[gadgets.views.View,"isOnlyVisibleGadget"],[gadgets.views.View,"getName"]]);
caja___.whitelistFuncs([[gadgets.views,"getCurrentView"],[gadgets.views,"getParams"],[gadgets.views,"requestNavigateTo"]])
});;
gadgets.skins=function(){var b=null,e={BG_COLOR:["CONTENT_BG_COLOR"],FONT_COLOR:["CONTENT_TEXT_COLOR"],ANCHOR_COLOR:["CONTENT_LINK_COLOR"],CONTENT_HEADLINE_COLOR:["CONTENT_TEXT_COLOR"],CONTENT_SECONDARY_TEXT_COLOR:["CONTENT_TEXT_COLOR"],CONTENT_SECONDARY_LINK_COLOR:["CONTENT_LINK_COLOR"],ENDCAP_BG_COLOR:["CONTENT_BG_COLOR"],ENDCAP_LINK_COLOR:["CONTENT_LINK_COLOR"],ENDCAP_TEXT_COLOR:["CONTENT_TEXT_COLOR"],ALTERNATE_BG_COLOR:["CONTENT_BG_COLOR"],CONTENT_VISITED_LINK_COLOR:["CONTENT_LINK_COLOR"]};return{init:function(){b=
null},getProperty:function(d){if(!b){var c=gadgets.views.getParams();b=c.skin||{}}var a=b[d];if(!a&&e[d])for(c=0;c<e[d].length;c++){a=e[d][c];if(a=b[a])break}if(a)a=gadgets.util.escapeString(a);return a}}}();
gadgets.skins.Property=gadgets.util.makeEnum(["BG_IMAGE","BG_COLOR","FONT_COLOR","BG_POSITION","BG_REPEAT","ANCHOR_COLOR","FONT_FACE","BORDER_COLOR","CONTENT_BG_COLOR","CONTENT_HEADLINE_COLOR","CONTENT_LINK_COLOR","CONTENT_SECONDARY_TEXT_COLOR","CONTENT_SECONDARY_LINK_COLOR","CONTENT_TEXT_COLOR","ENDCAP_BG_COLOR","ENDCAP_LINK_COLOR","ENDCAP_TEXT_COLOR","CONTENT_VISITED_LINK_COLOR","ALTERNATE_BG_COLOR"]);
;
gadgets.window=gadgets.window||{};
(function(){gadgets.window.getViewportDimensions=function(){if(self.innerHeight){x=self.innerWidth;
y=self.innerHeight
}else{if(document.documentElement&&document.documentElement.clientHeight){x=document.documentElement.clientWidth;
y=document.documentElement.clientHeight
}else{if(document.body){x=document.body.clientWidth;
y=document.body.clientHeight
}else{x=0;
y=0
}}}return{width:x,height:y}
}
})();;
gadgets.window=gadgets.window||{};
(function(){var C;
function A(F,D){var E=window.getComputedStyle(F,"");
var G=E.getPropertyValue(D);
G.match(/^([0-9]+)/);
return parseInt(RegExp.$1,10)
}function B(){var E=0;
var D=[document.body];
while(D.length>0){var I=D.shift();
var H=I.childNodes;
for(var G=0;
G<H.length;
G++){var J=H[G];
if(typeof J.offsetTop!=="undefined"&&typeof J.scrollHeight!=="undefined"){var F=J.offsetTop+J.scrollHeight+A(J,"margin-bottom");
E=Math.max(E,F)
}D.push(J)
}}return E+A(document.body,"border-bottom")+A(document.body,"margin-bottom")+A(document.body,"padding-bottom")
}gadgets.window.adjustHeight=function(I){var F=parseInt(I,10);
var E=false;
if(isNaN(F)){E=true;
var K=gadgets.window.getViewportDimensions().height;
var D=document.body;
var J=document.documentElement;
if(document.compatMode==="CSS1Compat"&&J.scrollHeight){F=J.scrollHeight!==K?J.scrollHeight:J.offsetHeight
}else{if(navigator.userAgent.indexOf("AppleWebKit")>=0){F=B()
}else{if(D&&J){var G=J.scrollHeight;
var H=J.offsetHeight;
if(J.clientHeight!==H){G=D.scrollHeight;
H=D.offsetHeight
}if(G>K){F=G>H?G:H
}else{F=G<H?G:H
}}}}}if(F!==C&&!isNaN(F)&&!(E&&F===0)){C=F;
gadgets.rpc.call(null,"resize_iframe",null,F)
}}
}());
var _IG_AdjustIFrameHeight=gadgets.window.adjustHeight;;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.window,"adjustHeight"],[gadgets.window,"getViewportDimensions"]])
});;
