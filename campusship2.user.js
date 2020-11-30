// ==UserScript==
// @name         CampusShip2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.campusship.ups.com/cship/create
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById('telephone').value = "(323) 757-2543";
    document.getElementById('pickupReferenceNumber').value = "OUTBOUND CAMPUS SHIP UPS";
})();
