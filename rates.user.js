// ==UserScript==
// @name         ScanRates Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  improvements
// @author       ricaarre
// @match        https://fclm-portal.amazon.com/ppa/inspect/*
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle ( `
.tabs li{
  display: inline-block;
  padding: 10px;
  background: #dcdcdc;
  color: #818085;
  font-weight: bold;
  border-radius: 5px;
  list-style: none;
}
.tabs a {
    margin: 0 5px;
}
.tabs .active {
  background: #dcefff;
  color: #1791fe;
}
`);
(function() {
var curDate = new Date();
var fDate = function(offset=0){
	let hh = curDate.getHours();
	let dd = curDate.getDate()+offset;
	if (hh < 5 ){dd = dd-1};
	let mm = curDate.getMonth()+1;
	let yyyy = curDate.getFullYear();
    return `${yyyy}/${mm}/${dd}`;
};
var day1 = fDate();
var day2 = fDate(1);
var test = document.querySelector('.cp-line');
var link = function(day,start,end){
    return `https://fclm-portal.amazon.com/ppa/inspect/process?primaryAttribute=CONTAINER_TYPE&secondaryAttribute=CONTAINER_TYPE&nodeType=DS&warehouseId=DLA8&processId=100021&startDateDay=2019%2F05%2F15&startDateWeek=2020%2F01%2F14&startDateMonth=2020%2F01%2F01&maxIntradayDays=1&spanType=Intraday&startDateIntraday=${day[0]}&startHourIntraday=${start[0]}&startMinuteIntraday=${start[1]}&endDateIntraday=${day[1]}&endHourIntraday=${end[0]}&endMinuteIntraday=${end[1]}`
};
var time = {
   q1:{start:[18,30],end:[20,0]},
   q2:{start:[20,30],end:[23,15]},
   q3:{start:[23,45],end:[2,0]},
   q4:{start:[2,30],end:[4,0]},
   overall:{start:[18,30],end:[4,0]}
};
var curUrl= window.location.href;
var active = function(url){
    if(curUrl == url) {
      return 'class= "active"'
    }
};
    test.innerHTML= `<ul class="tabs">
          <a href="${link([day1,day1],time.q1.start,time.q1.end)}">
            <li ${active(link([day1,day1],time.q1.start,time.q1.end))}>Q1</li></a>
          <a href="${link([day1,day1],time.q2.start,time.q2.end)}">
            <li ${active(link([day1,day1],time.q2.start,time.q2.end))}>Q2</li></a>
          <a href="${link([day1,day2],time.q3.start,time.q3.end)}">
            <li ${active(link([day1,day2],time.q3.start,time.q3.end))}>Q3</li></a>
          <a href="${link([day2,day2],time.q4.start,time.q4.end)}">
            <li ${active(link([day2,day2],time.q4.start,time.q4.end))}>Q4</li></a>
          <a href="${link([day1,day2],time.overall.start,time.overall.end)}">
            <li ${active(link([day1,day2],time.overall.start,time.overall.end))}>Overall</li></a>
        </ul>`;
})();
