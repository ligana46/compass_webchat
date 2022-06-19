const ChatResponses = {
	boot: "left",
	user: "right",
}


function run() {
	var text = getTextById('text')
	if (text == "") { return }
	writeInChat(ChatResponses.user, text)
	writeInChat(ChatResponses.boot, generateLoading())
	jannetTalk()
	clearId('text')
}

function jannetTalk() {
	$('#rawChat').scrollTop($('#rawChat').height()*10);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://d599-139-47-72-239.eu.ngrok.io/webhooks/rest/webhook", true); 
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.onreadystatechange = function() {
	   if (this.readyState == 4 && this.status == 200) {
	     // Response
	     deleteLoagind();
	     var response = JSON.parse(this.responseText);
	     
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
	   }
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
