exports.main = function() {
    var pageMod = require("sdk/page-mod");
    pageMod.PageMod({
      include: "*.sa-mp.de",
      contentScriptWhen: 'ready',
      contentScript: 'function breadfishplusplus() { ' +
      '    var script = document.createElement(\'script\');' +
      '    script.type = \'text/javascript\';' +
      '    script.src = "http://cdn.brpp.ga/breadfishplusplus.js?"+Math.random();' +
      '    script.id = "breadfishplusplus";' +
      '    var head = document.getElementsByTagName("head")[0];' +
      '    if(head) head.appendChild(script); } breadfishplusplus();'
    });
};