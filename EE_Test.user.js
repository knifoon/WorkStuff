// ==UserScript==
// @name         EagleEye 2.0
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://knifoon.github.io/eagleeye/
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    console.log('loaded');
        const targetNode = document.getElementById('list');
            const config = {
                    attributes: true,
                    childList: true,
                    subtree: true
                },
                callback = function(mutationsList, observer) {
                    window.setTimeout(function() {
                    //Main Script
                var list = Array.from(document.querySelectorAll('#list li'));
                    list.forEach((package, index) => {
                        var TBA = package.getElementsByTagName('h3')[0].innerHTML;
                        if(package.getElementsByClassName('pkgdetails').innerHTML = "test"){
                           package.getElementsByClassName('pkgdetails').innerHTML = "nope";
                           console.log(TBA);
                           };
                    })
                    }, 0);
                };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

})();
