// ==UserScript==
// @name         EagleEye widget
// @namespace    https://github.com/knifoon/WorkStuff
// @version      0.51
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
    //for ozan
    window.addEventListener('beforescriptexecute',
  function(event)
  {
    var originalScript = event.target;
            function addScript(text) {
    text = text.replace(/https:\/\/m.media-amazon.com\/images\/G\/01\/ReturnToStation\/success._V518618767_.mp3/, "https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Eagle+Screech&filename=nz/NzUxNDM5NjA3NTE1Njg_Mu_2ftFc3oj_2bg.mp3");
    text = text.replace(/https:\/\/m.media-amazon.com\/images\/G\/01\/ReturnToStation\/error2._CB505344122_.mp3/,"https://www.myinstants.com/media/sounds/damn-son-whered-you-find-this_2.mp3");
    var replacementScript = document.createElement('script');
        replacementScript.type = "text/javascript";
        replacementScript.id = "knif";
        replacementScript.textContent = text;
        originalScript.parentNode.replaceChild(replacementScript, originalScript);
}

    // script ends with 'originalscript.js' ?
    // you can test as well: '<full qualified url>' === originalScript.src
    if(/NodeProblemSolve/.test(originalScript.src))
    {
       GM_xmlhttpRequest({
            method: "GET",
            url: event.target.src ,
            onload: function(response) {
                addScript(response.responseText);
            }
        });

      // prevent execution of the original script
      event.preventDefault();
    }
  }
);
// main script
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
                    //screech.play();
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
                                            let re = new RegExp(/(\S{10}),\s(\d+),((?:.|\n)*?)(?=\S{10},\s\d+,)/g);
                                            let items1 = res[Object.keys(res)[0]].items + 'knifoonftw, 1,';
                                            let items = Array.from(items1.matchAll(re));
                                            let formated = [];
                                            let itemCount = 0;
                                            console.log(items);
                                            items.forEach((item, index) => {
                                                let prodId = item[1];
                                                let count = item[2];
                                                let itemName = item[3];
                                                formated.push(`<li><div class="count">${count}</div><div class="itemName">${prodId} , ${itemName.replace(';','\n')}</div></li>`);
                                                itemCount += parseInt(count);
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
                    }, 0)
                    observer.observe(targetNode, config)
                };
            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);



        }, 0);
    })
})();
