// ==UserScript==
// @name         CampusShip1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.campusship.ups.com/cship/create?ActionOriginPair=CreateAShipment___StartSession
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById('enterNewAddressLink').click();
    document.getElementById('SchedulePickupOnCallPickupRequest').checked = true;
    document.getElementById('reviewDetails').checked = false;
})();
