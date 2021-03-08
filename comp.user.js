// ==UserScript==
// @name         compPro
// @namespace    https://github.com/knifoon/WorkStuff
// @version      0.81
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
    .tableHeaderSort:nth-child(4),
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
    .tableHeaderSort:nth-child(25),
    .tableHeaderSort:nth-child(26),
    .tableBody tr td:nth-child(5),
    .tableBody tr td:nth-child(6),
    .tableBody tr td:nth-child(4),
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
    .tableBody tr td:nth-child(24),
    .tableBody tr td:nth-child(25),
    .tableBody tr td:nth-child(26)
{
      display:none!important;
}
.logo {
display: flex;
align-items: center;
font-size: 22px;
` );
(function(){
    var highlight = function(target,check){
        if(target.innerHTML != check){
            target.style.background = '#ff5c7a'
        }
    };
// Wait for page load
    document.addEventListener("DOMContentLoaded", function() {
document.querySelector('.greeter-user-info>td').innerHTML = '<h1 class="logo"><span>COMP</span><div style="background:#cc6600; color:white;font-size: 15px;display: inline-block;vertical-align: middle;padding: 2px; margin: 1px 0;border-radius: 3px;height: 22px;line-height: 22px; z-index: 2;">PRO</div><img src="https://media.giphy.com/media/7lsw8RenVcjCM/giphy.gif" height=20px style="margin: 0 -1px; z-index: 1;"></h1>'
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
