// ==UserScript==
// @name         EagleEye 2.0
// @namespace    https://github.com/knifoon/WorkStuff
// @version      1.5
// @description  Better EagleEye
// @author       ricaarre
// @match        https://knifoon.github.io/eagleeye/
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle (`
.eagleEye li:first-child {
border-top: solid 1px #e7e7e7;

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
}
`);
(function() {
    console.log('loaded');
        const targetNode = document.getElementById('list');
            const config = {
                    attributes: true,
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
                        let pkgDetails = package.querySelector('div');
                        if(pkgDetails.getAttribute('tba') != TBA.innerHTML){
                            var tbaN = TBA.innerHTML;
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
                                            let enc = [res[0].package.label];
                                            package.getElementsByTagName('h3')[0].innerHTML = res[0].package.trackingId;
                                            enc.push(res[0].package.details[res[0].package.details.length - 1].leg.compStatus)
                                            enc.push(res[0].package.details[res[0].package.details.length - 1].leg.compShipmentId)
                                            enc.push({warehouse:res[0].package.details[0].leg.nodeId,id:res[0].package.orderingShipmentId})
                                            console.log(enc[2])
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
                                        url: "https://eagleeye-na.amazon.com/itemdetails/" + result[0],
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
                                            pkgDetails.innerHTML = `<span class="meta"><a href="https://compwebsite-na.amazon.com/comp/shipmentDetail?id=${result[2]}&shipmentType=Delivery" target="_blank">${result[1]}</a> | <a href="https://fc-hitch.iad.proxy.amazon.com/gp/fc-application-services/hitch-report/shipment-display.html?warehouseId=${result[3].warehouse}&shipmentId=${result[3].id}" target="_blank">Hitch</a></span></br>Contents (${itemCount}):${formated.join('')}`;
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
