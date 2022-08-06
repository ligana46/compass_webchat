const ChatResponses = {
	boot: "left",
	user: "right",
}

const JANNET_RESPONSE_TEXT = "plain_text";
const JANNET_RESPONSE_CARRUSEL = "";


function run() {
	var text = getTextById('text')
	if (text == "") { return }
	writeInChat(ChatResponses.user, text)
	writeInChat(ChatResponses.boot, generateLoading())
	jannetTalk()
	clearId('text')
}

function serverResponse(response) {
	if (isServerUp(response)) {
		deleteLoagind();
		jannet	Response(JSON.parse(response.responseText))
	}
}

function jannetResponse(response) {
	if (!isResponseEmpty(response)) {
		eachCard(response)
	} else {
		writeInChat(ChatResponses.boot, "ERROR: Response is Empty", true)
	}
}

function eachCard(response) {
	for (var i = 0; i <= response.length - 1; i++) {
		let element = response[i].custom
		let text = element.text

		switch (element.type) {
			case JANNET_RESPONSE_TEXT:
				simpleCard(text);
				break;
			case JANNET_RESPONSE_CARRUSEL:
				carruselCard(text)
				break;
		}
	}
}

function carruselCard(text) {

}

function simpleCard(text) {
	console.log(text);
	writeInChat(ChatResponses.boot, text.replaceAll(' - ', '<br>- '))
}

function jannetTalk() {
	$('#rawChat').scrollTop($('#rawChat').height()*10);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://4b43-139-47-73-138.eu.ngrok.io/webhooks/rest/webhook", true); 
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.onreadystatechange = function() {
		serverResponse(this)
		/*
	   if (this.readyState == 4 && this.status == 200) {
	     // Response
	     deleteLoagind();
	     var response = JSON.parse(this.responseText);

	     console.log(response);
	     
	     if (response.length == 0) {
	     	writeInChat(ChatResponses.boot, "ERROR: Response is Empty", true)
	     	return;
	     }
	     
	     var textResponse = response[0]['text']

	     console.log(textResponse);


	     if (textResponse.substring(0, 1) == "[") {
	     	console.log(textResponse); 
	     	var carruselRaw = textResponse.replaceAll('\'s', 's');
			carruselRaw = JSON.parse(carruselRaw.replaceAll('\'', '\"'));
			console.log(carruselRaw)
	     	var carrusel = clearXML(carruselRaw);
	     	console.log(carrusel)
	     	writeInChat(ChatResponses.boot, generateCarrusel(carrusel))
	     } else if (textResponse != "") {
			writeInChat(ChatResponses.boot, textResponse.replaceAll(' - ', '<br>- '))
	     } else {
	     	writeInChat(ChatResponses.boot, "ERROR: Response is Empty")
	     }

	     $('#rawChat').scrollTop($('#rawChat').height()*10);
	   }*/
	};
	var data = {
		"sender" : myID,
		"message" : getTextById('text')
	};

	console.log(getTextById('text'));
	xhttp.send(JSON.stringify(data));
}

function clearXML(response) {
	var a = 0;
	var b = 0;
	var array = [];
	
	while (a < response.length) {
		var responseHeader = response[a][0]

		switch (responseHeader) {
			case "name":
				array[b] = {};
				array[b]["name"] = response[a][1]
			break;
			case "title":
				array[b]["title"] = response[a][1]
			break;
			case "link":
				array[b]["link"] = response[a][1]
			break;
			case "recordIdentifier":
				array[b]["recordIdentifier"] = response[a][1]
				b++;
			break;
		}	
		a++;
	}

	return array;
}

function writeInChat(whoResponse, response, ERROR = false) {
	var alertPlaceholder = document.getElementById("rawChat")
	alertPlaceholder.append(generateParraf(whoResponse, response, ERROR))
}
