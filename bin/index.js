#!/usr/bin/env node
"use strict";function _interopDefault(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var events=_interopDefault(require("events")),child_process=_interopDefault(require("child_process")),path=require("path"),path__default=_interopDefault(path),fs=require("fs"),fs__default=_interopDefault(fs),util=_interopDefault(require("util")),crypto=_interopDefault(require("crypto"));function createCommonjsModule(t,e){return t(e={exports:{}},e.exports),e.exports}var commander=createCommonjsModule(function(t,e){var r=events.EventEmitter,n=child_process.spawn,o=path__default.dirname,i=path__default.basename;function s(t,e){this.flags=t,this.required=t.indexOf("<")>=0,this.optional=t.indexOf("[")>=0,this.bool=-1===t.indexOf("-no-"),(t=t.split(/[ ,|]+/)).length>1&&!/^[[<]/.test(t[1])&&(this.short=t.shift()),this.long=t.shift(),this.description=e||""}function a(t){this.commands=[],this.options=[],this._execs={},this._allowUnknownOption=!1,this._args=[],this._name=t||""}function l(t,e){var r=Math.max(0,e-t.length);return t+Array(r+1).join(" ")}function u(t,e){e=e||[];for(var r=0;r<e.length;r++)"--help"!==e[r]&&"-h"!==e[r]||(t.outputHelp(),process.exit(0))}function c(t){var e=t.name+(!0===t.variadic?"...":"");return t.required?"<"+e+">":"["+e+"]"}function h(t){try{if(fs__default.statSync(t).isFile())return!0}catch(t){return!1}}util.inherits(a,r),(e=t.exports=new a).Command=a,e.Option=s,s.prototype.name=function(){return this.long.replace("--","").replace("no-","")},s.prototype.attributeName=function(){return this.name().split("-").reduce(function(t,e){return t+e[0].toUpperCase()+e.slice(1)})},s.prototype.is=function(t){return this.short===t||this.long===t},a.prototype.command=function(t,e,r){"object"==typeof e&&null!==e&&(r=e,e=null),r=r||{};var n=t.split(/ +/),o=new a(n.shift());return e&&(o.description(e),this.executables=!0,this._execs[o._name]=!0,r.isDefault&&(this.defaultExecutable=o._name)),o._noHelp=!!r.noHelp,this.commands.push(o),o.parseExpectedArgs(n),o.parent=this,e?this:o},a.prototype.arguments=function(t){return this.parseExpectedArgs(t.split(/ +/))},a.prototype.addImplicitHelpCommand=function(){this.command("help [cmd]","display help for [cmd]")},a.prototype.parseExpectedArgs=function(t){if(t.length){var e=this;return t.forEach(function(t){var r={required:!1,name:"",variadic:!1};switch(t[0]){case"<":r.required=!0,r.name=t.slice(1,-1);break;case"[":r.name=t.slice(1,-1)}r.name.length>3&&"..."===r.name.slice(-3)&&(r.variadic=!0,r.name=r.name.slice(0,-3)),r.name&&e._args.push(r)}),this}},a.prototype.action=function(t){var e=this,r=function(r,n){r=r||[],n=n||[];var o=e.parseOptions(n);u(e,o.unknown),o.unknown.length>0&&e.unknownOption(o.unknown[0]),o.args.length&&(r=o.args.concat(r)),e._args.forEach(function(t,n){t.required&&null==r[n]?e.missingArgument(t.name):t.variadic&&(n!==e._args.length-1&&e.variadicArgNotLast(t.name),r[n]=r.splice(n))}),e._args.length?r[e._args.length]=e:r.push(e),t.apply(e,r)},n=this.parent||this,o=n===this?"*":this._name;return n.on("command:"+o,r),this._alias&&n.on("command:"+this._alias,r),this},a.prototype.option=function(t,e,r,n){var o=this,i=new s(t,e),a=i.name(),l=i.attributeName();if("function"!=typeof r)if(r instanceof RegExp){var u=r;r=function(t,e){var r=u.exec(t);return r?r[0]:e}}else n=r,r=null;return(!i.bool||i.optional||i.required)&&(i.bool||(n=!0),void 0!==n&&(o[l]=n,i.defaultValue=n)),this.options.push(i),this.on("option:"+a,function(t){null!==t&&r&&(t=r(t,void 0===o[l]?n:o[l])),"boolean"==typeof o[l]||void 0===o[l]?o[l]=null==t?!!i.bool&&(n||!0):t:null!==t&&(o[l]=t)}),this},a.prototype.allowUnknownOption=function(t){return this._allowUnknownOption=0===arguments.length||t,this},a.prototype.parse=function(t){this.executables&&this.addImplicitHelpCommand(),this.rawArgs=t,this._name=this._name||i(t[1],".js"),this.executables&&t.length<3&&!this.defaultExecutable&&t.push("--help");var e=this.parseOptions(this.normalize(t.slice(2))),r=this.args=e.args,n=this.parseArgs(this.args,e.unknown),o=n.args[0],s=null;return o&&(s=this.commands.filter(function(t){return t.alias()===o})[0]),this._execs[o]&&"function"!=typeof this._execs[o]?this.executeSubCommand(t,r,e.unknown):s?(r[0]=s._name,this.executeSubCommand(t,r,e.unknown)):this.defaultExecutable?(r.unshift(this.defaultExecutable),this.executeSubCommand(t,r,e.unknown)):n},a.prototype.executeSubCommand=function(t,e,r){(e=e.concat(r)).length||this.help(),"help"===e[0]&&1===e.length&&this.help(),"help"===e[0]&&(e[0]=e[1],e[1]="--help");var s,a=t[1],l=i(a,path__default.extname(a))+"-"+e[0],u=fs__default.lstatSync(a).isSymbolicLink()?fs__default.readlinkSync(a):a;u!==a&&"/"!==u.charAt(0)&&(u=path__default.join(o(a),u)),s=o(u);var c,p=path__default.join(s,l),f=!1;h(p+".js")?(l=p+".js",f=!0):h(p+".ts")?(l=p+".ts",f=!0):h(p)&&(l=p),e=e.slice(1),"win32"!==process.platform?f?(e.unshift(l),e=(process.execArgv||[]).concat(e),c=n(process.argv[0],e,{stdio:"inherit",customFds:[0,1,2]})):c=n(l,e,{stdio:"inherit",customFds:[0,1,2]}):(e.unshift(l),c=n(process.execPath,e,{stdio:"inherit"}));["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach(function(t){process.on(t,function(){!1===c.killed&&null===c.exitCode&&c.kill(t)})}),c.on("close",process.exit.bind(process)),c.on("error",function(t){"ENOENT"===t.code?console.error("error: %s(1) does not exist, try --help",l):"EACCES"===t.code&&console.error("error: %s(1) not executable. try chmod or run with root",l),process.exit(1)}),this.runningCommand=c},a.prototype.normalize=function(t){for(var e,r,n,o=[],i=0,s=t.length;i<s;++i){if(e=t[i],i>0&&(r=this.optionFor(t[i-1])),"--"===e){o=o.concat(t.slice(i));break}r&&r.required?o.push(e):e.length>1&&"-"===e[0]&&"-"!==e[1]?e.slice(1).split("").forEach(function(t){o.push("-"+t)}):/^--/.test(e)&&~(n=e.indexOf("="))?o.push(e.slice(0,n),e.slice(n+1)):o.push(e)}return o},a.prototype.parseArgs=function(t,e){var r;return t.length?(r=t[0],this.listeners("command:"+r).length?this.emit("command:"+t.shift(),t,e):this.emit("command:*",t)):(u(this,e),e.length>0&&this.unknownOption(e[0]),0===this.commands.length&&0===this._args.filter(function(t){return t.required}).length&&this.emit("command:*")),this},a.prototype.optionFor=function(t){for(var e=0,r=this.options.length;e<r;++e)if(this.options[e].is(t))return this.options[e]},a.prototype.parseOptions=function(t){for(var e,r,n,o=[],i=t.length,s=[],a=0;a<i;++a)if(n=t[a],e)o.push(n);else if("--"!==n)if(r=this.optionFor(n))if(r.required){if(null==(n=t[++a]))return this.optionMissingArgument(r);this.emit("option:"+r.name(),n)}else r.optional?(null==(n=t[a+1])||"-"===n[0]&&"-"!==n?n=null:++a,this.emit("option:"+r.name(),n)):this.emit("option:"+r.name());else n.length>1&&"-"===n[0]?(s.push(n),a+1<t.length&&"-"!==t[a+1][0]&&s.push(t[++a])):o.push(n);else e=!0;return{args:o,unknown:s}},a.prototype.opts=function(){for(var t={},e=this.options.length,r=0;r<e;r++){var n=this.options[r].attributeName();t[n]=n===this._versionOptionName?this._version:this[n]}return t},a.prototype.missingArgument=function(t){console.error("error: missing required argument `%s'",t),process.exit(1)},a.prototype.optionMissingArgument=function(t,e){e?console.error("error: option `%s' argument missing, got `%s'",t.flags,e):console.error("error: option `%s' argument missing",t.flags),process.exit(1)},a.prototype.unknownOption=function(t){this._allowUnknownOption||(console.error("error: unknown option `%s'",t),process.exit(1))},a.prototype.variadicArgNotLast=function(t){console.error("error: variadic arguments must be last `%s'",t),process.exit(1)},a.prototype.version=function(t,e){if(0===arguments.length)return this._version;this._version=t;var r=new s(e=e||"-V, --version","output the version number");return this._versionOptionName=r.long.substr(2)||"version",this.options.push(r),this.on("option:"+this._versionOptionName,function(){process.stdout.write(t+"\n"),process.exit(0)}),this},a.prototype.description=function(t,e){return 0===arguments.length?this._description:(this._description=t,this._argsDescription=e,this)},a.prototype.alias=function(t){var e=this;if(0!==this.commands.length&&(e=this.commands[this.commands.length-1]),0===arguments.length)return e._alias;if(t===e._name)throw new Error("Command alias can't be the same as its name");return e._alias=t,this},a.prototype.usage=function(t){var e=this._args.map(function(t){return c(t)}),r="[options]"+(this.commands.length?" [command]":"")+(this._args.length?" "+e.join(" "):"");return 0===arguments.length?this._usage||r:(this._usage=t,this)},a.prototype.name=function(t){return 0===arguments.length?this._name:(this._name=t,this)},a.prototype.prepareCommands=function(){return this.commands.filter(function(t){return!t._noHelp}).map(function(t){var e=t._args.map(function(t){return c(t)}).join(" ");return[t._name+(t._alias?"|"+t._alias:"")+(t.options.length?" [options]":"")+(e?" "+e:""),t._description]})},a.prototype.largestCommandLength=function(){return this.prepareCommands().reduce(function(t,e){return Math.max(t,e[0].length)},0)},a.prototype.largestOptionLength=function(){var t=[].slice.call(this.options);return t.push({flags:"-h, --help"}),t.reduce(function(t,e){return Math.max(t,e.flags.length)},0)},a.prototype.largestArgLength=function(){return this._args.reduce(function(t,e){return Math.max(t,e.name.length)},0)},a.prototype.padWidth=function(){var t=this.largestOptionLength();return this._argsDescription&&this._args.length&&this.largestArgLength()>t&&(t=this.largestArgLength()),this.commands&&this.commands.length&&this.largestCommandLength()>t&&(t=this.largestCommandLength()),t},a.prototype.optionHelp=function(){var t=this.padWidth();return this.options.map(function(e){return l(e.flags,t)+"  "+e.description+(e.bool&&void 0!==e.defaultValue?" (default: "+JSON.stringify(e.defaultValue)+")":"")}).concat([l("-h, --help",t)+"  output usage information"]).join("\n")},a.prototype.commandHelp=function(){if(!this.commands.length)return"";var t=this.prepareCommands(),e=this.padWidth();return["Commands:",t.map(function(t){var r=t[1]?"  "+t[1]:"";return(r?l(t[0],e):t[0])+r}).join("\n").replace(/^/gm,"  "),""].join("\n")},a.prototype.helpInformation=function(){var t=[];if(this._description){t=[this._description,""];var e=this._argsDescription;if(e&&this._args.length){var r=this.padWidth();t.push("Arguments:"),t.push(""),this._args.forEach(function(n){t.push("  "+l(n.name,r)+"  "+e[n.name])}),t.push("")}}var n=this._name;this._alias&&(n=n+"|"+this._alias);var o=["Usage: "+n+" "+this.usage(),""],i=[],s=this.commandHelp();s&&(i=[s]);var a=["Options:",""+this.optionHelp().replace(/^/gm,"  "),""];return o.concat(t).concat(a).concat(i).join("\n")},a.prototype.outputHelp=function(t){t||(t=function(t){return t}),process.stdout.write(t(this.helpInformation())),this.emit("--help")},a.prototype.help=function(t){this.outputHelp(t),process.exit()}}),commander_1=commander.Command,commander_2=commander.Option,MAX_SAFE_INTEGER=9007199254740991,nativeFloor=Math.floor;function baseRepeat(t,e){var r="";if(!t||e<1||e>MAX_SAFE_INTEGER)return r;do{e%2&&(r+=t),(e=nativeFloor(e/2))&&(t+=t)}while(e);return r}var freeGlobal="object"==typeof global&&global&&global.Object===Object&&global,freeSelf="object"==typeof self&&self&&self.Object===Object&&self,root=freeGlobal||freeSelf||Function("return this")(),Symbol=root.Symbol;function arrayMap(t,e){for(var r=-1,n=null==t?0:t.length,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}var isArray=Array.isArray,objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,nativeObjectToString=objectProto.toString,symToStringTag=Symbol?Symbol.toStringTag:void 0;function getRawTag(t){var e=hasOwnProperty.call(t,symToStringTag),r=t[symToStringTag];try{t[symToStringTag]=void 0}catch(t){}var n=nativeObjectToString.call(t);return e?t[symToStringTag]=r:delete t[symToStringTag],n}var objectProto$1=Object.prototype,nativeObjectToString$1=objectProto$1.toString;function objectToString(t){return nativeObjectToString$1.call(t)}var nullTag="[object Null]",undefinedTag="[object Undefined]",symToStringTag$1=Symbol?Symbol.toStringTag:void 0;function baseGetTag(t){return null==t?void 0===t?undefinedTag:nullTag:symToStringTag$1&&symToStringTag$1 in Object(t)?getRawTag(t):objectToString(t)}function isObjectLike(t){return null!=t&&"object"==typeof t}var symbolTag="[object Symbol]";function isSymbol(t){return"symbol"==typeof t||isObjectLike(t)&&baseGetTag(t)==symbolTag}var INFINITY=1/0,symbolProto=Symbol?Symbol.prototype:void 0,symbolToString=symbolProto?symbolProto.toString:void 0;function baseToString(t){if("string"==typeof t)return t;if(isArray(t))return arrayMap(t,baseToString)+"";if(isSymbol(t))return symbolToString?symbolToString.call(t):"";var e=t+"";return"0"==e&&1/t==-INFINITY?"-0":e}function baseSlice(t,e,r){var n=-1,o=t.length;e<0&&(e=-e>o?0:o+e),(r=r>o?o:r)<0&&(r+=o),o=e>r?0:r-e>>>0,e>>>=0;for(var i=Array(o);++n<o;)i[n]=t[n+e];return i}function castSlice(t,e,r){var n=t.length;return r=void 0===r?n:r,!e&&r>=n?t:baseSlice(t,e,r)}var rsAstralRange="\\ud800-\\udfff",rsComboMarksRange="\\u0300-\\u036f",reComboHalfMarksRange="\\ufe20-\\ufe2f",rsComboSymbolsRange="\\u20d0-\\u20ff",rsComboRange=rsComboMarksRange+reComboHalfMarksRange+rsComboSymbolsRange,rsVarRange="\\ufe0e\\ufe0f",rsZWJ="\\u200d",reHasUnicode=RegExp("["+rsZWJ+rsAstralRange+rsComboRange+rsVarRange+"]");function hasUnicode(t){return reHasUnicode.test(t)}function baseProperty(t){return function(e){return null==e?void 0:e[t]}}var asciiSize=baseProperty("length"),rsAstralRange$1="\\ud800-\\udfff",rsComboMarksRange$1="\\u0300-\\u036f",reComboHalfMarksRange$1="\\ufe20-\\ufe2f",rsComboSymbolsRange$1="\\u20d0-\\u20ff",rsComboRange$1=rsComboMarksRange$1+reComboHalfMarksRange$1+rsComboSymbolsRange$1,rsVarRange$1="\\ufe0e\\ufe0f",rsAstral="["+rsAstralRange$1+"]",rsCombo="["+rsComboRange$1+"]",rsFitz="\\ud83c[\\udffb-\\udfff]",rsModifier="(?:"+rsCombo+"|"+rsFitz+")",rsNonAstral="[^"+rsAstralRange$1+"]",rsRegional="(?:\\ud83c[\\udde6-\\uddff]){2}",rsSurrPair="[\\ud800-\\udbff][\\udc00-\\udfff]",rsZWJ$1="\\u200d",reOptMod=rsModifier+"?",rsOptVar="["+rsVarRange$1+"]?",rsOptJoin="(?:"+rsZWJ$1+"(?:"+[rsNonAstral,rsRegional,rsSurrPair].join("|")+")"+rsOptVar+reOptMod+")*",rsSeq=rsOptVar+reOptMod+rsOptJoin,rsSymbol="(?:"+[rsNonAstral+rsCombo+"?",rsCombo,rsRegional,rsSurrPair,rsAstral].join("|")+")",reUnicode=RegExp(rsFitz+"(?="+rsFitz+")|"+rsSymbol+rsSeq,"g");function unicodeSize(t){for(var e=reUnicode.lastIndex=0;reUnicode.test(t);)++e;return e}function stringSize(t){return hasUnicode(t)?unicodeSize(t):asciiSize(t)}function asciiToArray(t){return t.split("")}var rsAstralRange$2="\\ud800-\\udfff",rsComboMarksRange$2="\\u0300-\\u036f",reComboHalfMarksRange$2="\\ufe20-\\ufe2f",rsComboSymbolsRange$2="\\u20d0-\\u20ff",rsComboRange$2=rsComboMarksRange$2+reComboHalfMarksRange$2+rsComboSymbolsRange$2,rsVarRange$2="\\ufe0e\\ufe0f",rsAstral$1="["+rsAstralRange$2+"]",rsCombo$1="["+rsComboRange$2+"]",rsFitz$1="\\ud83c[\\udffb-\\udfff]",rsModifier$1="(?:"+rsCombo$1+"|"+rsFitz$1+")",rsNonAstral$1="[^"+rsAstralRange$2+"]",rsRegional$1="(?:\\ud83c[\\udde6-\\uddff]){2}",rsSurrPair$1="[\\ud800-\\udbff][\\udc00-\\udfff]",rsZWJ$2="\\u200d",reOptMod$1=rsModifier$1+"?",rsOptVar$1="["+rsVarRange$2+"]?",rsOptJoin$1="(?:"+rsZWJ$2+"(?:"+[rsNonAstral$1,rsRegional$1,rsSurrPair$1].join("|")+")"+rsOptVar$1+reOptMod$1+")*",rsSeq$1=rsOptVar$1+reOptMod$1+rsOptJoin$1,rsSymbol$1="(?:"+[rsNonAstral$1+rsCombo$1+"?",rsCombo$1,rsRegional$1,rsSurrPair$1,rsAstral$1].join("|")+")",reUnicode$1=RegExp(rsFitz$1+"(?="+rsFitz$1+")|"+rsSymbol$1+rsSeq$1,"g");function unicodeToArray(t){return t.match(reUnicode$1)||[]}function stringToArray(t){return hasUnicode(t)?unicodeToArray(t):asciiToArray(t)}var nativeCeil=Math.ceil;function createPadding(t,e){var r=(e=void 0===e?" ":baseToString(e)).length;if(r<2)return r?baseRepeat(e,t):e;var n=baseRepeat(e,nativeCeil(t/stringSize(e)));return hasUnicode(e)?castSlice(stringToArray(n),0,t).join(""):n.slice(0,t)}function isObject(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}var NAN=NaN,reTrim=/^\s+|\s+$/g,reIsBadHex=/^[-+]0x[0-9a-f]+$/i,reIsBinary=/^0b[01]+$/i,reIsOctal=/^0o[0-7]+$/i,freeParseInt=parseInt;function toNumber(t){if("number"==typeof t)return t;if(isSymbol(t))return NAN;if(isObject(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=isObject(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(reTrim,"");var r=reIsBinary.test(t);return r||reIsOctal.test(t)?freeParseInt(t.slice(2),r?2:8):reIsBadHex.test(t)?NAN:+t}var INFINITY$1=1/0,MAX_INTEGER=1.7976931348623157e308;function toFinite(t){return t?(t=toNumber(t))===INFINITY$1||t===-INFINITY$1?(t<0?-1:1)*MAX_INTEGER:t==t?t:0:0===t?t:0}function toInteger(t){var e=toFinite(t),r=e%1;return e==e?r?e-r:e:0}function toString(t){return null==t?"":baseToString(t)}function padStart(t,e,r){t=toString(t);var n=(e=toInteger(e))?stringSize(t):0;return e&&n<e?createPadding(e-n,r)+t:t}for(var rng=function(){return crypto.randomBytes(16)},byteToHex=[],i=0;i<256;++i)byteToHex[i]=(i+256).toString(16).substr(1);function bytesToUuid(t,e){var r=e||0,n=byteToHex;return[n[t[r++]],n[t[r++]],n[t[r++]],n[t[r++]],"-",n[t[r++]],n[t[r++]],"-",n[t[r++]],n[t[r++]],"-",n[t[r++]],n[t[r++]],"-",n[t[r++]],n[t[r++]],n[t[r++]],n[t[r++]],n[t[r++]],n[t[r++]]].join("")}var bytesToUuid_1=bytesToUuid;function v4(t,e,r){var n=e&&r||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null);var o=(t=t||{}).random||(t.rng||rng)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,e)for(var i=0;i<16;++i)e[n+i]=o[i];return e||bytesToUuid_1(o)}var v4_1=v4,nodeProgress=createCommonjsModule(function(t,e){function r(t,e){if(this.stream=e.stream||process.stderr,"number"==typeof e){var r=e;(e={}).total=r}else{if(e=e||{},"string"!=typeof t)throw new Error("format required");if("number"!=typeof e.total)throw new Error("total required")}this.fmt=t,this.curr=e.curr||0,this.total=e.total,this.width=e.width||this.total,this.clear=e.clear,this.chars={complete:e.complete||"=",incomplete:e.incomplete||"-",head:e.head||e.complete||"="},this.renderThrottle=0!==e.renderThrottle?e.renderThrottle||16:0,this.callback=e.callback||function(){},this.tokens={},this.lastDraw=""}t.exports=r,r.prototype.tick=function(t,e){if(0!==t&&(t=t||1),"object"==typeof t&&(e=t,t=1),e&&(this.tokens=e),0==this.curr&&(this.start=new Date),this.curr+=t,this.renderThrottleTimeout||(this.renderThrottleTimeout=setTimeout(this.render.bind(this),this.renderThrottle)),this.curr>=this.total)return this.renderThrottleTimeout&&this.render(),this.complete=!0,this.terminate(),void this.callback(this)},r.prototype.render=function(t){if(clearTimeout(this.renderThrottleTimeout),this.renderThrottleTimeout=null,t&&(this.tokens=t),this.stream.isTTY){var e,r,n,o=this.curr/this.total,i=100*(o=Math.min(Math.max(o,0),1)),s=new Date-this.start,a=100==i?0:s*(this.total/this.curr-1),l=this.curr/(s/1e3),u=this.fmt.replace(":current",this.curr).replace(":total",this.total).replace(":elapsed",isNaN(s)?"0.0":(s/1e3).toFixed(1)).replace(":eta",isNaN(a)||!isFinite(a)?"0.0":(a/1e3).toFixed(1)).replace(":percent",i.toFixed(0)+"%").replace(":rate",Math.round(l)),c=Math.max(0,this.stream.columns-u.replace(":bar","").length);c&&"win32"===process.platform&&(c-=1);var h=Math.min(this.width,c);if(n=Math.round(h*o),r=Array(Math.max(0,n+1)).join(this.chars.complete),e=Array(Math.max(0,h-n+1)).join(this.chars.incomplete),n>0&&(r=r.slice(0,-1)+this.chars.head),u=u.replace(":bar",r+e),this.tokens)for(var p in this.tokens)u=u.replace(":"+p,this.tokens[p]);this.lastDraw!==u&&(this.stream.cursorTo(0),this.stream.write(u),this.stream.clearLine(1),this.lastDraw=u)}},r.prototype.update=function(t,e){var r=Math.floor(t*this.total)-this.curr;this.tick(r,e)},r.prototype.interrupt=function(t){this.stream.clearLine(),this.stream.cursorTo(0),this.stream.write(t),this.stream.write("\n"),this.stream.write(this.lastDraw)},r.prototype.terminate=function(){this.clear?this.stream.clearLine&&(this.stream.clearLine(),this.stream.cursorTo(0)):this.stream.write("\n")}}),progress=nodeProgress;function toInt(t){return parseInt(t)}function addRenameCommand(){commander.option("--prefix <n>","文件名开头","P").option("--length <n>","数字位数",toInt,3).option("--path <n>","目录，默认为当前目录",path.resolve(process.cwd())).option("--skip <n>","跳过前面几个文件",toInt,0).option("--start <n>","开始序号",toInt,1).option("--step <n>","步进",toInt,2).description("重命名指定目录下面的所有文件名称。按创建时间先后顺序，以序号命名").action(t=>{let e=t.prefix,r=t.length,n=t.path,o=t.skip,i=t.start,s=t.step,a=[];fs.readdirSync(n).map(t=>{let e=path.join(n,t),r=fs.lstatSync(e);a.push({fileFullName:e,lastWriteTime:r.mtimeMs})}),(a=a.sort((t,e)=>t.lastWriteTime-e.lastWriteTime)).map((t,e)=>{if(e>=o){let e=`${path.dirname(t.fileFullName)}/${v4_1()}${path.extname(t.fileFullName)}`;fs.renameSync(t.fileFullName,e),t.fileFullName=e}});const l=new progress("处理进度[:bar]进度值:percent 用时:etas",{complete:"=",incomplete:"-",width:100,total:a.length-o});let u=0;a.map((t,n,a)=>{if(n>=o){let a=i+(n-o)*s,c=path.join(path.dirname(t.fileFullName),`${e}${padStart(a,r,"0")}${path.extname(t.fileFullName)}`);fs.renameSync(t.fileFullName,c),l.tick(),u++}}),console.log(`\n完成，共处理文件数：${u}，跳过：${o}`)})}addRenameCommand(),commander.parse(process.argv);
