/*!
 * keyboardjs
 * 0.4.2
 * https://github.com/RobertWHurst/KeyboardJS
 */
!function(e,n){function t(){function t(e){var r;return r=n(e,"amd"),r.fork=t,r}return t(e)}function r(){function t(e){var r;return r=n(e,"CommonJS"),r.fork=t,r}module.exports=t(e)}function o(){function t(e){function r(){var n,t;for(t=Array.prototype.slice.apply(arguments),n=0;n<a.length;n+=1)void 0===i[a[n]]?delete e[a[n]]:e[a[n]]=i[a[n]];for(i={},n=0;n<t.length;n+=1){if("string"!=typeof t[n])throw Error("Cannot replace namespaces. All new namespaces must be strings.");i[t[n]]=e[t[n]],e[t[n]]=o}return a=t}var o,a=[],i={};return o=n(e,"global"),o.fork=t,o.noConflict=r,o.noConflict("KeyboardJS","k"),o}var r;r=t(e)}[].indexOf||(Array.prototype.indexOf=function(e,n,t){for(t=this.length,n=(t+~~n)%t;!(n>=t||n in this&&this[n]===e);n++);return n^t?n:-1}),"function"==typeof define&&define.amd?define(t):"undefined"!=typeof module?r():o()}(this,function(e){function n(){e.addEventListener?(e.document.addEventListener("keydown",o,!1),e.document.addEventListener("keyup",a,!1),e.addEventListener("blur",r,!1),e.addEventListener("webkitfullscreenchange",r,!1),e.addEventListener("mozfullscreenchange",r,!1)):e.attachEvent&&(e.document.attachEvent("onkeydown",o),e.document.attachEvent("onkeyup",a),e.attachEvent("onblur",r))}function t(){r(),e.removeEventListener?(e.document.removeEventListener("keydown",o,!1),e.document.removeEventListener("keyup",a,!1),e.removeEventListener("blur",r,!1),e.removeEventListener("webkitfullscreenchange",r,!1),e.removeEventListener("mozfullscreenchange",r,!1)):e.detachEvent&&(e.document.detachEvent("onkeydown",o),e.document.detachEvent("onkeyup",a),e.detachEvent("onblur",r))}function r(e){K=[],u(),g(e)}function o(e){var n,t,r;if(n=i(e.keyCode),n.length>=1){for(e.isRepeat=!1,r=0;r<n.length;r+=1)t=n[r],-1!=C().indexOf(t)&&(e.isRepeat=!0),E(t);s(),d(e)}}function a(e){var n,t;if(n=i(e.keyCode),n.length>=1){for(t=0;t<n.length;t+=1)x(n[t]);u(),g(e)}}function i(e){return L[e]||[]}function c(e){var n;for(n in L)if(L.hasOwnProperty(n)&&L[n].indexOf(e)>-1)return n;return!1}function f(e,n){if("string"!=typeof e&&("object"!=typeof e||"function"!=typeof e.push))throw Error("Cannot create macro. The combo must be a string or array.");if("object"!=typeof n||"function"!=typeof n.push)throw Error("Cannot create macro. The injectedKeys must be an array.");T.push([e,n])}function l(e){var n;if("string"!=typeof e&&("object"!=typeof e||"function"!=typeof e.push))throw Error("Cannot remove macro. The combo must be a string or array.");for(mI=0;mI<T.length;mI+=1)if(n=T[mI],y(e,n[0])){x(n[1]),T.splice(mI,1);break}}function s(){var e,n,t;for(e=0;e<T.length;e+=1)if(n=v(T[e][0]),-1===F.indexOf(T[e])&&b(n))for(F.push(T[e]),t=0;t<T[e][1].length;t+=1)E(T[e][1][t])}function u(){var e,n,t;for(e=0;e<F.length;e+=1)if(n=v(F[e][0]),b(n)===!1){for(t=0;t<F[e][1].length;t+=1)x(F[e][1][t]);F.splice(e,1),e-=1}}function h(e,n,t){function r(){var e;for(e=0;e<l.length;e+=1)q.splice(q.indexOf(l[e]),1)}function o(e){function n(){var n,r;for(n=0;n<t.length;n+=1)if("function"==typeof t[n])if("keyup"===e)for(r=0;r<l.length;r+=1)l[r].keyUpCallback.splice(l[r].keyUpCallback.indexOf(t[n]),1);else for(r=0;r<l.length;r+=1)l[r].keyDownCallback.splice(l[r].keyDownCallback.indexOf(t[n]),1)}var t,r,o,a={};if("string"!=typeof e)throw Error("Cannot bind callback. The event name must be a string.");if("keyup"!==e&&"keydown"!==e)throw Error('Cannot bind callback. The event name must be a "keyup" or "keydown".');for(t=Array.prototype.slice.apply(arguments,[1]),r=0;r<t.length;r+=1)if("function"==typeof t[r])if("keyup"===e)for(o=0;o<l.length;o+=1)l[o].keyUpCallback.push(t[r]);else if("keydown"===e)for(o=0;o<l.length;o+=1)l[o].keyDownCallback.push(t[r]);return a.clear=n,a}var a,i,c,f={},l=[];for("string"==typeof e&&(e=v(e)),i=0;i<e.length;i+=1){if(a={},c=w([e[i]]),"string"!=typeof c)throw Error("Failed to bind key combo. The key combo must be string.");a.keyCombo=c,a.keyDownCallback=[],a.keyUpCallback=[],n&&a.keyDownCallback.push(n),t&&a.keyUpCallback.push(t),q.push(a),l.push(a)}return f.clear=r,f.on=o,f}function p(e){var n,t;for(n=0;n<q.length;n+=1)t=q[n],y(e,t.keyCombo)&&(q.splice(n,1),n-=1)}function m(e){var n,t,r;if(e){for(n=0;n<q.length;n+=1)for(r=q[n],t=0;t<r.keyCombo.length;t+=1)if(r.keyCombo[t].indexOf(e)>-1){q.splice(n,1),n-=1;break}}else q=[]}function d(e){var n,t,r,o,a,i,c,f,l,s,u,h=[];for(a=[].concat(K),n=0;n<q.length;n+=1)u=k(q[n].keyCombo).length,h[u]||(h[u]=[]),h[u].push(q[n]);for(t=h.length-1;t>=0;t-=1)if(h[t])for(n=0;n<h[t].length;n+=1){for(r=h[t][n],o=k(r.keyCombo),l=!0,f=0;f<o.length;f+=1)if(-1===a.indexOf(o[f])){l=!1;break}if(l&&b(r.keyCombo)){for(z.push(r),f=0;f<o.length;f+=1)s=a.indexOf(o[f]),s>-1&&(a.splice(s,1),f-=1);for(i=0;i<r.keyDownCallback.length;i+=1)r.keyDownCallback[i](e,C(),r.keyCombo)===!1&&(c=!0);c===!0&&(e.preventDefault(),e.stopPropagation())}}}function g(e){var n,t,r,o;for(n=0;n<z.length;n+=1)if(r=z[n],b(r.keyCombo)===!1){for(t=0;t<r.keyUpCallback.length;t+=1)r.keyUpCallback[t](e,C(),r.keyCombo)===!1&&(o=!0);o===!0&&(e.preventDefault(),e.stopPropagation()),z.splice(n,1),n-=1}}function y(e,n){var t,r,o;if(e=v(e),n=v(n),e.length!==n.length)return!1;for(t=0;t<e.length;t+=1){if(e[t].length!==n[t].length)return!1;for(r=0;r<e[t].length;r+=1){if(e[t][r].length!==n[t][r].length)return!1;for(o=0;o<e[t][r].length;o+=1)if(-1===n[t][r].indexOf(e[t][r][o]))return!1}}return!0}function b(e){var n,t,r,o,a,i,c=0;for(e=v(e),n=0;n<e.length;n+=1){for(i=!0,c=0,t=0;t<e[n].length;t+=1){for(r=[].concat(e[n][t]),o=c;o<K.length;o+=1)a=r.indexOf(K[o]),a>-1&&(r.splice(a,1),c=o);if(0!==r.length){i=!1;break}}if(i)return!0}return!1}function k(e){var n,t,r=[];for(e=v(e),n=0;n<e.length;n+=1)for(t=0;t<e[n].length;t+=1)r=r.concat(e[n][t]);return r}function v(e){var n=e,t=0,r=0,o=!1,a=!1,i=[],c=[],f=[],l="";if("object"==typeof e&&"function"==typeof e.push)return e;if("string"!=typeof e)throw Error('Cannot parse "keyCombo" because its type is "'+typeof e+'". It must be a "string".');for(;" "===n.charAt(t);)t+=1;for(;;){if(" "===n.charAt(t)){for(;" "===n.charAt(t);)t+=1;o=!0}else if(","===n.charAt(t)){if(r||a)throw Error("Failed to parse key combo. Unexpected , at character index "+t+".");a=!0,t+=1}else if("+"===n.charAt(t)){if(l.length&&(f.push(l),l=""),r||a)throw Error("Failed to parse key combo. Unexpected + at character index "+t+".");r=!0,t+=1}else if(">"===n.charAt(t)){if(l.length&&(f.push(l),l=""),f.length&&(c.push(f),f=[]),r||a)throw Error("Failed to parse key combo. Unexpected > at character index "+t+".");r=!0,t+=1}else if(t>=n.length-1||"!"!==n.charAt(t)||">"!==n.charAt(t+1)&&","!==n.charAt(t+1)&&"+"!==n.charAt(t+1)){if(t>=n.length||"+"===n.charAt(t)||">"===n.charAt(t)||","===n.charAt(t)||" "===n.charAt(t)){t+=1;continue}for((r===!1&&o===!0||a===!0)&&(l.length&&(f.push(l),l=""),f.length&&(c.push(f),f=[]),c.length&&(i.push(c),c=[])),r=!1,o=!1,a=!1;t<n.length&&"+"!==n.charAt(t)&&">"!==n.charAt(t)&&","!==n.charAt(t)&&" "!==n.charAt(t);)l+=n.charAt(t),t+=1}else l+=n.charAt(t+1),r=!1,o=!1,a=!1,t+=2;if(t>=n.length){l.length&&(f.push(l),l=""),f.length&&(c.push(f),f=[]),c.length&&(i.push(c),c=[]);break}}return i}function w(e){var n,t,r=[];if("string"==typeof e)return e;if("object"!=typeof e||"function"!=typeof e.push)throw Error("Cannot stringify key combo.");for(n=0;n<e.length;n+=1){for(r[n]=[],t=0;t<e[n].length;t+=1)r[n][t]=e[n][t].join(" + ");r[n]=r[n].join(" > ")}return r.join(" ")}function C(){return[].concat(K)}function E(e){if(e.match(/\s/))throw Error("Cannot add key name "+e+" to active keys because it contains whitespace.");K.indexOf(e)>-1||K.push(e)}function x(e){var n=c(e);"91"===n||"92"===n?K=[]:K.splice(K.indexOf(e),1)}function A(e,n){if("string"!=typeof e)throw Error("Cannot register new locale. The locale name must be a string.");if("object"!=typeof n)throw Error("Cannot register "+e+" locale. The locale map must be an object.");if("object"!=typeof n.map)throw Error("Cannot register "+e+" locale. The locale map is invalid.");n.macros||(n.macros=[]),I[e]=n}function O(e){if(e){if("string"!=typeof e)throw Error("Cannot set locale. The locale name must be a string.");if(!I[e])throw Error("Cannot set locale to "+e+" because it does not exist. If you would like to submit a "+e+" locale map for KeyboardJS please submit it at https://github.com/RobertWHurst/KeyboardJS/issues.");L=I[e].map,T=I[e].macros,j=e}return j}var j,L,T,U,D,S={},I={},K=[],q=[],z=[],F=[];for(e=e||window,D={map:{3:["cancel"],8:["backspace"],9:["tab"],12:["clear"],13:["enter"],16:["shift"],17:["ctrl"],18:["alt","menu"],19:["pause","break"],20:["capslock"],27:["escape","esc"],32:["space","spacebar"],33:["pageup"],34:["pagedown"],35:["end"],36:["home"],37:["left"],38:["up"],39:["right"],40:["down"],41:["select"],42:["printscreen"],43:["execute"],44:["snapshot"],45:["insert","ins"],46:["delete","del"],47:["help"],91:["command","windows","win","super","leftcommand","leftwindows","leftwin","leftsuper"],92:["command","windows","win","super","rightcommand","rightwindows","rightwin","rightsuper"],145:["scrolllock","scroll"],186:["semicolon",";"],187:["equal","equalsign","="],188:["comma",","],189:["dash","-"],190:["period","."],191:["slash","forwardslash","/"],192:["graveaccent","`"],219:["openbracket","["],220:["backslash","\\"],221:["closebracket","]"],222:["apostrophe","'"],48:["zero","0"],49:["one","1"],50:["two","2"],51:["three","3"],52:["four","4"],53:["five","5"],54:["six","6"],55:["seven","7"],56:["eight","8"],57:["nine","9"],96:["numzero","num0"],97:["numone","num1"],98:["numtwo","num2"],99:["numthree","num3"],100:["numfour","num4"],101:["numfive","num5"],102:["numsix","num6"],103:["numseven","num7"],104:["numeight","num8"],105:["numnine","num9"],106:["nummultiply","num*"],107:["numadd","num+"],108:["numenter"],109:["numsubtract","num-"],110:["numdecimal","num."],111:["numdivide","num/"],144:["numlock","num"],112:["f1"],113:["f2"],114:["f3"],115:["f4"],116:["f5"],117:["f6"],118:["f7"],119:["f8"],120:["f9"],121:["f10"],122:["f11"],123:["f12"]},macros:[["shift + `",["tilde","~"]],["shift + 1",["exclamation","exclamationpoint","!"]],["shift + 2",["at","@"]],["shift + 3",["number","#"]],["shift + 4",["dollar","dollars","dollarsign","$"]],["shift + 5",["percent","%"]],["shift + 6",["caret","^"]],["shift + 7",["ampersand","and","&"]],["shift + 8",["asterisk","*"]],["shift + 9",["openparen","("]],["shift + 0",["closeparen",")"]],["shift + -",["underscore","_"]],["shift + =",["plus","+"]],["shift + (",["opencurlybrace","opencurlybracket","{"]],["shift + )",["closecurlybrace","closecurlybracket","}"]],["shift + \\",["verticalbar","|"]],["shift + ;",["colon",":"]],["shift + '",["quotationmark",'"']],["shift + !,",["openanglebracket","<"]],["shift + .",["closeanglebracket",">"]],["shift + /",["questionmark","?"]]]},U=65;90>=U;U+=1)D.map[U]=String.fromCharCode(U+32),D.macros.push(["shift + "+String.fromCharCode(U+32)+", capslock + "+String.fromCharCode(U+32),[String.fromCharCode(U)]]);return A("us",D),O("us"),n(),S.enable=n,S.disable=t,S.activeKeys=C,S.on=h,S.clear=p,S.clear.key=m,S.locale=O,S.locale.register=A,S.macro=f,S.macro.remove=l,S.key={},S.key.name=i,S.key.code=c,S.combo={},S.combo.active=b,S.combo.parse=v,S.combo.stringify=w,S});