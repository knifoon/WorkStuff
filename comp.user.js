// ==UserScript==
// @name         compPro
// @namespace    https://github.com/knifoon/WorkStuff
// @version      0.1
// @description  Comp Improvements
// @author       Ricaarre
// @match        https://compwebsite-na.amazon.com/mn/comp/packageSearch
// @match        https://compwebsite-na.amazon.com/comp/packageSearch
// @grant        GM_addStyle`
// @run-at   document-start
// ==/UserScript==

GM_addStyle ( `
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