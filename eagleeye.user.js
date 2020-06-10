// ==UserScript==
// @name         EagleEye widget
// @namespace    https://github.com/knifoon/WorkStuff
// @version      0.36
// @description  Adds eagle eye to fixit
// @author       ricaarre
// @match        https://www.amazonlogistics.com/station-op/problemsolve/fixit*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at   document-start
// ==/UserScript==
GM_addStyle (`
.eagleEye li:first-child {
border-top: solid 1px #e7e7e7;

}
.eagleEye li {
list-style: none;
display: flex;
align-items: center;
padding: 20px;
border-bottom: solid 1px #e7e7e7;
}
.eagleEye .count {
display: inline-block;
width: 10%;
text-align: center;
font-size: 30px;
}
.eagleEye .itemName{
display: inline-block;
width: 90%;
}
`);
(function() {
    var screech = new Audio('https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Eagle+Screech&filename=nz/NzUxNDM5NjA3NTE1Njg_Mu_2ftFc3oj_2bg.mp3');
    document.addEventListener("DOMContentLoaded", function() {
        window.setTimeout(function() {
            const targetNode = document.getElementById('fixit');
            const config = {
                    attributes: false,
                    childList: true,
                    subtree: true
                },
                callback = function(mutationsList, observer) {
                    observer.disconnect();
                    // Run after results load
                    screech.play();
                    window.setTimeout(function() {
                        var details = Array.from(document.getElementsByClassName('detailsBox'));
                        details.forEach((box, index) => {
                            var TBA = "";
                            if (box.querySelector('div').innerHTML.startsWith('TBA')) {
                                TBA = box.querySelector('div');
                            } else {
                                TBA = box.querySelector('div').querySelector('div');
                            };
                            var tbaN = TBA.innerHTML;
                            if (!box.querySelector('.eagleEye')) {
                                TBA.innerHTML = `${tbaN} </div><div class="eagleEye">Fetching Contents`;
                                var encb = "idk";
                                var getEncrypted = new Promise(function(resolve, reject) {
                                    GM_xmlhttpRequest({
                                        method: "GET",
                                        url: "https://eagleeye-na.amazon.com/pkglegdetail/" + tbaN,
                                        headers: {
                                            'Content-type': 'application/json'
                                        },
                                        onload: function(response) {
                                            let res = JSON.parse(response.responseText);
                                            let enc = res[Object.keys(res)[0]][0].scannable;
                                            if (enc) {
                                                resolve(enc)
                                            } else {
                                                reject(Error('fail'))
                                            };
                                        }
                                    })
                                })
                                getEncrypted.then(function(result) {
                                    GM_xmlhttpRequest({
                                        method: "GET",
                                        url: "https://eagleeye-na.amazon.com/itemdetails/" + result,
                                        headers: {
                                            'Content-type': 'application/json'
                                        },
                                        onload: function(response) {
                                            let res = JSON.parse(response.responseText);
                                            let items = res[Object.keys(res)[0]].items.split(';');
                                            let formated = [];
                                            let itemCount = 0;
                                            items.forEach((item, index) => {
                                                let itemSec = item.split(',');
                                                let itemName = "";
                                                for (let i = 2; i < itemSec.length; i++) {
                                                    itemName += itemSec[i]
                                                };
                                                formated.push(`<li><div class="count">${itemSec[1]}</div><div class="itemName">${itemSec[0]} , ${itemName}</div></li>`);
                                                itemCount += parseInt(itemSec[1]);
                                            });
                                            console.log(formated);
                                            box.querySelector('.eagleEye').innerHTML = `Contents (${itemCount}):${formated.join('')}`;
                                        }
                                    })
                                }, function(err) {
                                    console.log(err);
                                });
                            };
                        });
                    }, 1500)
                    observer.observe(targetNode, config)
                };
            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);



        }, 500);
    })
})();
