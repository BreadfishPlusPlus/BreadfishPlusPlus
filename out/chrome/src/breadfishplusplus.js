function bpp_init() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "http://cdn.brpp.ga/breadfishplusplus.js?"+Math.random();
    var head = document.getElementsByTagName('head')[0];
    if(head) head.appendChild(script);
}

bpp_init();
