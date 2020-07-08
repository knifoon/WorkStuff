// ==UserScript==
// @name         EagleEye widget(test)
// @namespace    https://github.com/knifoon/WorkStuff
// @version      0.40
// @description  Adds eagle eye to fixit
// @author       ricaarre
// @match        https://www.amazonlogistics.com/station-op/problemsolve/fixit*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at   document-start
// ==/UserScript==
GM_addStyle(`
  .eagleEye li: first-child {
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
  .eagleEye .itemName {
    display: inline-block;
    width: 90% ;
  }
`);
(function() {
  //Change Sound
  window.addEventListener('beforescriptexecute',
    function(event) {
      var originalScript = event.target;

      function addScript(text) {
        text = text.replace(/https:\/\/m.media-amazon.com\/images\/G\/01\/ReturnToStation\/success._V518618767_.mp3/, "https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Eagle+Screech&filename=nz/NzUxNDM5NjA3NTE1Njg_Mu_2ftFc3oj_2bg.mp3");
        text = text.replace(/https:\/\/m.media-amazon.com\/images\/G\/01\/ReturnToStation\/error2._CB505344122_.mp3/, "https://www.myinstants.com/media/sounds/damn-son-whered-you-find-this_2.mp3");
        var replacementScript = document.createElement('script');
        replacementScript.type = "text/javascript";
        replacementScript.id = "knif";
        replacementScript.textContent = text;
        originalScript.parentNode.replaceChild(replacementScript, originalScript);
      }
      if (/NodeProblemSolve/.test(originalScript.src)) {
        GM_xmlhttpRequest({
          method: "GET",
          url: event.target.src,
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
          window.setTimeout(function() {
            var details = Array.from(document.getElementsByClassName('detailsBox'));
            details.forEach((box, index) => {
              var TBA = "";
              var info = {};
              if (!box.querySelector('.eagleEye')) {
                var package = {};
                if (box.querySelector('div').innerHTML.startsWith('TBA')) {
                  TBA = box.querySelector('div');
                  info.layout = 'default';
                } else{
                  TBA = box.querySelector('div').querySelector('div');
                  if(/Wrong/.test(TBA.parentNode.children[1].innerHTML)){
                   info.layout = 'wrongStation';
                  } else {
                  info.layout = 'stowDamaged';
                  }
                };
                var tbaN = TBA.innerHTML;
                var parent = TBA.parentNode;
                // get info based on layout
                var trim =(el,start) => el.innerHTML.slice(start);
                info.default = () => {
                  package.TBA = parent.children[0];
                  package.driver = parent.children[1];
                  package.route = parent.children[2];
                  package.addType = parent.children[3];
                  package.status = parent.children[4];
                  package.sortZone = parent.children[5];
                  package.cycle = parent.children[6];
                  package.EAD = parent.children[7];
                  package.location = parent.children[8];
                  package.timestamp = parent.children[9];
                  var newInfo = {};
                  // remove original
                    Object.keys(package).forEach(function (item){
                      newInfo[item] = package[item].innerHTML;
                      package[item].remove();
                  })
                  parent.innerHTML = `
<div>${newInfo.TBA}</div>
<div>${newInfo.status}</div>
<div class="eagleEye">Fetching Contents</div> ${parent.innerHTML}`
                };
                info.stowDamaged = () => {
                  package.TBA = parent.children[0].innerHTML;
                  package.probCat = parent.children[2].innerHTML.slice(25);
                  package.driver = parent.children[3].innerHTML.slice(9);
                  package.route = parent.children[4].innerHTML.slice(7);
                  package.operator = parent.children[5].innerHTML.slice(12);
                  package.status = parent.children[6].innerHTML.slice(17);
                  package.addType = parent.children[7].innerHTML.slice(13);
                  package.sortZone = parent.children[8].innerHTML.slice(11);
                  package.cycle = parent.children[9].innerHTML.slice(5);
                  package.EAD = parent.children[10].innerHTML.slice(5);
                  package.location = parent.children[11].innerHTML.slice(10);
                  package.timestamp = parent.children[13].innerHTML.slice(11);
                };
                info.wrongStation = () => {
                  package.TBA = parent.children[0].innerHTML;
                  package.probCat = parent.children[1].innerHTML;
                  package.status = parent.children[2].innerHTML;
                  package.addType = parent.children[3].innerHTML;
                  package.EAD = parent.children[4].innerHTML;
                  package.currentStation = parent.children[5].innerHTML;
                  package.correctStation = parent.children[6].innerHTML;
                  package.timestamp = parent.children[8].innerHTML;
                };
                info[info.layout]();
                console.log(package);
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
                      // To Do if ; not followed by itemSerial replace with empty space
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
          }, 0)
          observer.observe(targetNode, config)
        };
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);



    }, 0);
  })
})();
