let unwanted_os = ["windows", "os x", "ios"];

for (var os of unwanted_os) {
    if (platform.os.toString().toLowerCase().includes(os)) {
        document.getElementById("do_fingerprint_btn").disabled = true;
        poc_log("ERROR: Tracking can be made with Linux-based devices only");
        break;
    }
}

async function fill_in_form() {
    document.getElementById("browser").value = platform.name;
    document.getElementById("os").value = platform.os;
}

fill_in_form();

function tracker_address_select_onchange() {
    let select_tag = document.getElementById("tracker_address_select");
    let selected_option = select_tag.options[select_tag.selectedIndex];
    let tracker_address_input = document.getElementById("tracker_address");
    if (selected_option.text == "Custom") {
        tracker_address_input.value = "";
    } else if (selected_option.text == "Self") {
        tracker_address_input.value = window.location.hostname;
    } else {
        tracker_address_input.value = selected_option.value;
    }
}

function request_type_select_onchange() {
    let select_tag = document.getElementById("request_type_select");
    let selected_option = select_tag.options[select_tag.selectedIndex];
    poc_log(selected_option.value);
}

tracker_address_select_onchange();

const LOOPBACK_IPV4_ADDR = '127.0.0.1';

function poc_log(text) {
    let today = new Date();
    let date = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    let time = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')},${String(today.getMilliseconds()).padStart(3,'0')}`;
    let elem = document.getElementById("poc_log");
    elem.innerText += `${date} ${time}  ${text}\n`;
    console.log(`${date} ${time}  ${text}\n`);
    elem.scrollTop = elem.scrollHeight;
}

function clear_poc_log() {
    let elem = document.getElementById("poc_log");
    elem.innerText = "";
}

function set_intersection(a, b) {
    return new Set([...a].filter(x => b.has(x)));
}

function set_union(a, b) {
    return new Set([...a, ...b]);
}

function set_length(a) {
    return a.size;
}

function randstring(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



