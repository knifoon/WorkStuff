//Use Keys (1-4) for zooniverse
(function() {
    let prefs = {};
    prefs.divider = ' > ';
    prefs.pad = '0px';
    let counter = 0;
    document.getElementsByClassName("task-container")[0].insertAdjacentHTML('beforeBegin', `<div id="k-crumbs" class = "site-nav__link" style="padding: 0; background: black; display: block; margin:0;"><span style="background: #eee; font: black bold; padding: 10px; margin-right:10px;">0</span></div>`)

    let answer = a => {
        a.click()
        document.getElementById("k-crumbs").insertAdjacentHTML('beforeEnd', `<span style="padding: 0px ${prefs.pad}">${a.innerText}${prefs.divider}</span>`)
        if(document.querySelectorAll(".task-nav button")[document.querySelectorAll(".task-nav button").length - 1].innerText == "Done") {
            counter++;
            document.getElementById("k-crumbs").innerHTML = '<span style="background: #eee; font: black bold; padding: 10px; margin-right:10px;">' + counter + '</span>';
        }
        document.querySelectorAll(".task-nav button")[document.querySelectorAll(".task-nav button").length - 1].click()
    }
    const command = {
        "Digit1": () => answer(document.getElementsByClassName("answer")[0]),
        "Digit2": () => answer(document.getElementsByClassName("answer")[1]),
        "Digit3": () => answer(document.getElementsByClassName("answer")[2]),
        "Digit4": () => answer(document.getElementsByClassName("answer")[3]),
        "Backquote": () => {
            if(document.querySelectorAll(".task-nav button")[0].innerText == "Back") {
                document.querySelectorAll(".task-nav button")[0].click()
                document.querySelectorAll("#k-crumbs span")[document.querySelectorAll("#k-crumbs span").length - 1].remove()
            }
        }
}

    document.body.addEventListener('keydown', (e) => command[e.code]());
})();
