// ==UserScript==
// @name         EagleEye 2.0
// @namespace    https://github.com/knifoon/WorkStuff
// @version      1.77
// @description  Better EagleEye
// @author       ricaarre
// @match        https://knifoon.github.io/eagleeye/
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle (`
#list h3{
display: inline-block;
margin: 5px 5px 5px 0;
}
.eagleEye li:first-child {
border-top: solid 1px #e7e7e7;

}
.status, .station{
margin: 5px;
vertical-align: top;
display: inline-block;
}
.status div, .station div {
height: 100%;
display: inline-block;
font-size: 12px;
vertical-align: middle;
padding: 3px 9px;
background: #e3e3e3;
color: #555;
border-radius: 4px;
}

.red div{
background: rgb(255, 92, 122);
color: #fff;
}
.green div{
background: #00d1b2;
color: #fff;
}
.yellow div{
background-color: #ffdd57;
color: rgba(0,0,0,.7);
}
.blue div{
background-color: #9b9cf0;;
color: #fff;
}
.pkgdetails li {
list-style: none;
display: flex;
align-items: center;
padding: 20px;
border-bottom: solid 1px #e7e7e7;
}
.pkgdetails .count {
display: inline-block;
width: 10%;
text-align: center;
font-size: 30px;
}
.pkgdetails .itemName{
display: inline-block;
width: 90%;
}
.meta {
font-size: 12px;
vertical-align: top;
margin-left: 5px;
}
`);
(function() {
    console.log('loaded');
    document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible') {
      document.getElementById('tbaInput').focus();
  }
});
        const targetNode = document.getElementById('list');
            const config = {
                    attributes: false,
                    childList: true,
                    subtree: true
                },
                callback = function(mutationsList, observer) {
                    observer.disconnect();
                    window.setTimeout(function() {
                    //Main Script
                var list = Array.from(document.querySelectorAll('#list>li'));
                    list.forEach((package, index) => {
                        let TBA = package.getElementsByTagName('h3')[0];
                        let pkgDetails = package.getElementsByClassName('pkgdetails')[0];
                        if(pkgDetails.getAttribute('tba') != TBA.innerHTML){
                            var tbaN = TBA.innerHTML;
                            TBA.insertAdjacentHTML('afterend',`<span class="status"></span>`);
                            pkgDetails.setAttribute('tba',tbaN);
                            pkgDetails.innerHTML = `Fetching Contents`;
                            var getEncrypted = new Promise(function(resolve, reject) {
                                    GM_xmlhttpRequest({
                                        method: "GET",
                                        url: "https://eagleeye-na.amazon.com/scanable/" + tbaN,
                                        headers: {
                                            'Content-type': 'application/json'
                                        },
                                        onload: function(response) {
                                            let res = JSON.parse(response.responseText);
                                            let enc = {}
                                            enc.code = [res[0].package.label];
                                            package.getElementsByTagName('h3')[0].innerHTML = res[0].package.trackingId;
                                            pkgDetails.setAttribute('tba',res[0].package.trackingId);
                                            enc.compStatus = res[0].package.details[res[0].package.details.length - 1].leg.compStatus;
                                            enc.shipmentId = res[0].package.details[res[0].package.details.length - 1].leg.compShipmentId;
                                            enc.stackingFilter = res[0].package.details[res[0].package.details.length - 1].leg.stackingFilter;
                                            enc.station = res[0].package.details[res[0].package.details.length - 1].leg.nodeId;
                                            enc.hitch ={warehouse:res[0].package.details[0].leg.nodeId,id:res[0].package.orderingShipmentId};
                                            console.log(res)
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
                                        url: "https://eagleeye-na.amazon.com/itemdetails/" + result.code,
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
                                                formated.push(`<li><div class="count">${count}</div><div class="itemName"><a href="https://www.amazon.com/dp/${prodId}" target="_blank">${prodId}</a> , ${itemName.replace(';','\n')}</div></li>`);
                                                itemCount += parseInt(count);
                                            });
                                            pkgDetails.innerHTML = `<span class="meta"><a href="https://fc-hitch.iad.proxy.amazon.com/gp/fc-application-services/hitch-report/shipment-display.html?warehouseId=${result.hitch.warehouse}&shipmentId=${result.hitch.id}" target="_blank">Hitch</a></span></br>Contents (${itemCount}):${formated.join('')}`;
                                            // Status Tag
                                           // If AMZ Package
                                            if (!result.compStatus.includes('Not in COMP')){
                                                let stationText = "";
                                                if (result.station == result.compStatus.slice(-5,-1)){
                                                    stationText = result.station;
                                                    } else {
                                                        stationText = `${result.compStatus.slice(-5,-1)} > ${result.station}`
                                                    }
                                                result.compStatus = result.compStatus.slice(0,-7);
                                                TBA.insertAdjacentHTML('afterend',`<span class="station"><div>${stationText}</div></span>`);
                                            // Station Color
                                                let milk = ['DLA3','DLA4','DLA5','DLA7','DLA9','DPS1','DPS3','DPS5','DPS6','DSD1','DSD2','DSD3','DSD8','DCX1','DCX2','DCX8','DAX3','DAX7','DAX8','DLX9','DOT4'
];
                                                if (result.station.startsWith('DLA8')){
                                             package.getElementsByClassName('station')[0].classList.add('green')
                                                } else if (milk.some(el => result.station.includes(el))){
                                             package.getElementsByClassName('station')[0].classList.add('yellow')
                                                } else {
                                             package.getElementsByClassName('station')[0].classList.add('red')
                                                }
                                            }
                                            // Status Color
                                            package.getElementsByClassName('status')[0].innerHTML = `<a href="https://compwebsite-na.amazon.com/comp/shipmentDetail?id=${result.shipmentId}&shipmentType=Delivery" target="_blank"><div>${result.compStatus}</div></a>`;
                                            if (result.compStatus.includes('READY_FOR_FC_RETURN') || result.compStatus.includes('DISPOSED') || result.compStatus.includes('Not in COMP')){
                                                package.getElementsByClassName('status')[0].classList.add('red')
                                            } else if (result.compStatus.startsWith('AT_STATION')){
                                             package.getElementsByClassName('status')[0].classList.add('green')
                                            } else if (result.compStatus.includes('READY_FOR') | result.compStatus.includes('AT_WRONG_STATION')){
                                             package.getElementsByClassName('status')[0].classList.add('yellow')
                                            } else if (result.compStatus.includes('MISSING') || result.compStatus.includes('BETWEEN_FC') || result.compStatus.includes('DELAYED') ){
                                             package.getElementsByClassName('status')[0].classList.add('blue')
                                            }
                                            // check stacking filter
                                            if (result.stackingFilter.length < 8){
                                            package.getElementsByClassName('meta')[0].insertAdjacentHTML('afterbegin',`<strong>${result.stackingFilter}</strong> | `);
                                            }
                                        }
                                    })
                                }, function(err) {
                                    console.log(err);
                                });
                        }
                        //package.getElementsByClassName('pkgdetails')[0].innerHTML = `TBA = ${TBA}`;
                    })
                    }, 0);
                    observer.observe(targetNode, config)
                };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

})();
