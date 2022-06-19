const myID = Math.floor(Date.now() / 1000)


function toogleChat() {
	var element = document.getElementById("chatContainer");
	if (element.style.display == "none" || element.style.display == "") {
		element.style.display = "block";
	} else {
		element.style.display = "none";
	}
}