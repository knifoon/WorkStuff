// ==UserScript==
// @name         FC Label Default
// @namespace    https://github.com/knifoon/WorkStuff
// @version      0.3
// @description  PrintLabel off by default
// @author       ricarre
// @match        https://compwebsite-na.amazon.com/comp/packageScan*
// @match        https://compwebsite-na.amazon.com/mn/comp/packageScan*
// @grant        none
// ==/UserScript==

(function() {
document.getElementById('printLabel').checked = false;
document.getElementById('displayRoutingCode').checked = true;
var changeDate = (date,offset) => {
    date = new Date(date);
    date.setDate(date.getDate() + offset);
    return `0${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
};
if (document.getElementById('deliveryStartDate')){
    document.getElementById('deliveryStartDate').value = changeDate(document.getElementById('deliveryEndDate').value,-15);
}else{
    document.getElementById('shipStartDate').value = changeDate(document.getElementById('shipEndDate').value,-15);
}
document.getElementById("startScanBtn").click();
})();
