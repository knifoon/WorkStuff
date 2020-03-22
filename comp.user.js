// ==UserScript==
// @name         compPro
// @namespace    https://github.com/knifoon/WorkStuff
// @version      0.4
// @description  Comp Improvements
// @author       Ricaarre
// @match        https://compwebsite-na.amazon.com/mn/comp/packageSearch
// @match        https://compwebsite-na.amazon.com/comp/packageSearch
// @grant        GM_addStyle
// @run-at   document-start
// ==/UserScript==

GM_addStyle ( `
    .is-it-down-stripe,
    .tableHeaderSort:nth-child(5),
    .tableHeaderSort:nth-child(6),
    .tableHeaderSort:nth-child(7),
    .tableHeaderSort:nth-child(8),
    .tableHeaderSort:nth-child(9),
    .tableHeaderSort:nth-child(10),
    .tableHeaderSort:nth-child(11),
    .tableHeaderSort:nth-child(12),
    .tableHeaderSort:nth-child(13),
    .tableHeaderSort:nth-child(14),
    .tableHeaderSort:nth-child(15),
    .tableHeaderSort:nth-child(21),
    .tableHeaderSort:nth-child(22),
    .tableHeaderSort:nth-child(24),
    .tableBody tr td:nth-child(5),
    .tableBody tr td:nth-child(6),
    .tableBody tr td:nth-child(7),
    .tableBody tr td:nth-child(8),
    .tableBody tr td:nth-child(9),
    .tableBody tr td:nth-child(10),
    .tableBody tr td:nth-child(11),
    .tableBody tr td:nth-child(12),
    .tableBody tr td:nth-child(13),
    .tableBody tr td:nth-child(14),
    .tableBody tr td:nth-child(15),
    .tableBody tr td:nth-child(21),
    .tableBody tr td:nth-child(22),
    .tableBody tr td:nth-child(24)
{
      display:none!important;
}
` );
(function(){
    var highlight = function(target,check){
        if(target.innerHTML != check){
            target.style.background = '#ff5c7a'
        }
    };
// Wait for page load
    document.addEventListener("DOMContentLoaded", function() {
document.querySelector('.greeter-user-info>td').innerHTML = '<h1 style="font-size:22px">COMP<div style="background:#cc6600; color:white;font-size: 15px;display: inline-block;vertical-align: middle;padding: 2px; margin: 1px 0;border-radius: 3px;height: 22px;line-height: 22px;">PRO</div><img src="https://media.giphy.com/media/7lsw8RenVcjCM/giphy.gif" height=20px style="margin: -3px 0;"></h1>'
// watch for results
const targetNode = document.getElementById('shipmentListTableDiv');
const config = { attributes: true, childList: true, subtree: true },
callback = function(mutationsList, observer) {
// Run after results load
    if(targetNode.querySelector('.tableBody tr')){
        var col = {
            station: targetNode.querySelectorAll('.tableBody tr td:nth-child(16)'),
            route: targetNode.querySelectorAll('.tableBody tr td:nth-child(17)'),
            shipmentStatus: targetNode.querySelectorAll('.tableBody tr td:nth-child(19)')
        }
        console.log(col.station);
        col.station.forEach(td => highlight(td,'DLA8'));
        col.route.forEach(td => highlight(td,'&nbsp;'));
        col.shipmentStatus.forEach(td => highlight(td,'At Station'));
       }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
    });
})();
