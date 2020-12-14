// ==UserScript==
// @name         CampusShip1
// @namespace    https://github.com/knifoon/WorkStuff
// @version      0.2
// @description  Address drop down, plus check marks
// @author       Ricaarre
// @match        https://www.campusship.ups.com/cship/create?ActionOriginPair=CreateAShipment___StartSession
// @match        https://www.campusship.ups.com/cship/create?loc=en_US
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById('enterNewAddressLink').click();
    document.getElementById('SchedulePickupOnCallPickupRequest').checked = true;
    document.getElementById('reviewDetails').checked = false;
})();
