// ==UserScript==
// @name         FC Label Default
// @namespace    https://github.com/knifoon/WorkStuff
// @version      0.1
// @description  PrintLabel off by default
// @author       ricarre
// @match        https://compwebsite-na.amazon.com/comp/packageScan*
// @grant        none
// ==/UserScript==

(function() {
document.getElementById('printLabel').checked = false;
document.getElementById('displayRoutingCode').checked = true;
})();
