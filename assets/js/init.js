const myID = Math.floor(Date.now() / 1000)


function toogleChat() {
	var element = document.getElementById("chatContainer");
	var close = document.getElementById("button-open-chat-close");
	var open = document.getElementById("button-open-chat-open");
	if (element.style.display == "none" || element.style.display == "") {
		// element.style.display = "block";
		close.style.display = "inline-block";
		open.style.display = "none";
		unfade(element)
        document.getElementById("text").focus();
	} else {
		close.style.display = "none"
		open.style.display = "inline-block";
		fade(element)
		// element.style.display = "none";
	}
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 10);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}


document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13 && document.querySelector('#text') === document.activeElement) {
        run()
    }
});