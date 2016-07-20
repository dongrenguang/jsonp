function invoke(url, method, args, callback) {
    var script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    var callbackName = "__jsonp_callback_" + Math.round(Math.random() * 10000);
    window[callbackName] = function(res) {
        if (window[callbackName]) {
            window[callbackName] = null;
            delete window[callbackName];
            callback(res);
            document.body.removeChild(script);
        }
    }
    console.log(url + "?method=" + method + "&args=" + encodeURIComponent(JSON.stringify(args)) + "&callbackName=" + callbackName);

    script.src = url + "?method=" + method + "&args=" + encodeURIComponent(JSON.stringify(args)) + "&callbackName=" + callbackName;
    document.body.appendChild(script);
}
