// ==UserScript==
// @name         EagleEye widget
// @namespace    https://github.com/knifoon/WorkStuff
// @version      0.21
// @description  Adds eagle eye to fixit
// @author       ricaarre
// @match        https://www.amazonlogistics.com/station-op/problemsolve/fixit*
// @grant        GM_xmlhttpRequest
// @run-at   document-start
// ==/UserScript==
(function(){
document.addEventListener("DOMContentLoaded", function() {
    window.setTimeout( function(){
const targetNode = document.getElementById('fixit');
const config = { attributes: true, childList: false, subtree: true },
callback = function(mutationsList, observer) {
// Run after results load
    window.setTimeout(function (){
        var TBA = "";
        if(targetNode.querySelector('.detailsBox > div').innerHTML.startsWith('TBA')){
            TBA = targetNode.querySelector('.detailsBox > div');
        } else {
            TBA = targetNode.querySelector('.detailsBox > div > div')
        }
        var tbaN = TBA.innerHTML;
        if(!targetNode.querySelector('.detailsBox #eagleEye')){
            TBA.innerHTML = `${tbaN} </div><div id="eagleEye">Fetching Contents`;
        };
        var encb = "idk";
        var getEncrypted = new Promise(function(resolve,reject){
        GM_xmlhttpRequest({
         method: "GET",
         url: "https://eagleeye-na.amazon.com/pkglegdetail/" + tbaN,
         headers : { 'Content-type' : 'application/json' },
         onload: function(response) {
          let res = JSON.parse(response.responseText);
          let enc = res[Object.keys(res)[0]][0].scannable;
          if(enc){resolve(enc)} else {reject(Error('fail'))};
    }})
   })
        getEncrypted.then(function(result){
            GM_xmlhttpRequest({
         method: "GET",
         url: "https://eagleeye-na.amazon.com/itemdetails/" + result,
         headers : { 'Content-type' : 'application/json' },
         onload: function(response) {
          let res = JSON.parse(response.responseText);
          let items = res[Object.keys(res)[0]].items.split(';');
          let formated = [];
          let itemCount = 0;
          items.forEach((item,index)=>{
              let itemSec = item.split(',',2);
              formated.push(`<b>${itemSec[0]}</b>,${itemSec[1]},${itemSec[2]}`);
              itemCount += parseInt(itemSec[1]);
          });
          console.log(formated);
             document.getElementById('eagleEye').innerHTML = `Contents (${itemCount}):</br>${formated.join('</br>')}`;
    }})
        }, function(err) {
            console.log(err);
        });
    },1500)
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);



    },500);
})
})();
