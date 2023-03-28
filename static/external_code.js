const CLIENT_VERSION_MAJOR = 1;
const CLIENT_VERSION_MINOR = 1;

poc_log(`Client version: v${CLIENT_VERSION_MAJOR}.${CLIENT_VERSION_MINOR}`)

if (platform.name == "Chrome" || platform.name == "Chrome Mobile"){
    poc_log("Chrome browser detected");
}

async function fingerprint_device(tracker_address, browser, os, selected_option, body) {
    
    if(selected_option.value == `get`){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `http://${tracker_address}`);

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            poc_log(xhr.status);
            poc_log(xhr.responseText);
          }};
        xhr.send();
    }else if(selected_option.value == `post`){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `http://${tracker_address}`);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            poc_log(xhr.status);
            poc_log(xhr.responseText);
          }};

        data = `${body}`;

        xhr.send(data);
    }

    

    let response_json = await response.text();
    console.log(response_json)
    return null;
}

function do_fingerprint() {
    clear_poc_log();
    let tracker_address = document.getElementById("tracker_address").value;
    if (tracker_address == "") {
        poc_log("Missing tracker address");
        return;
    }
    let browser = document.getElementById("browser").value;
    if (browser == "") {
        poc_log("Missing browser");
        return;
    }
    let os = document.getElementById("os").value;
    if (os == "") {
        poc_log("Missing operating system");
        return;
    }

    let select_tag = document.getElementById("request_type_select");
    let selected_option = select_tag.options[select_tag.selectedIndex];

    let body = document.getElementById("request_body").value;
    
    fingerprint_device(tracker_address, browser, os, selected_option, body).then((fingerprint) => {
        if (fingerprint == null) {
            poc_log("failed to produce fingerprint");
            return;
        }
    });
}
