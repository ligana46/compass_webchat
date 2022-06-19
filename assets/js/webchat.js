const ChatResponses = {
	boot: "left",
	user: "right",
}


function run() {
	console.log(Math.floor(Date.now() / 1000))
	var text = getTextById('text')
	writeInChat(ChatResponses.user, text)
	jannetTalk()
	clearId('text')
}


function jannetTalkMook() {
	var response2 = JSON.parse('[["name", "Rowling, J. K. 1965-"], ["title", "Harry Potter y el prisionero de Azkaban"], ["link", {"href": "http://worldcat.org/oclc/912488850"}], ["recordIdentifier", "912488850"], ["name", "Rowling, J. K. 1965-"], ["title", "Harry Potter y la piedra filosofal"], ["link", {"href": "http://worldcat.org/oclc/1026350000"}], ["recordIdentifier", "1026350000"], ["name", "Rowling, J. K. 1965-"], ["title", "Harry Potter y la cámara secreta"], ["link", {"href": "http://worldcat.org/oclc/868797710"}], ["recordIdentifier", "868797710"], ["name", "Rowling, J. K. 1965-"], ["title", "Harry Potter y la piedra filosofal"], ["link", {"href": "http://worldcat.org/oclc/431976716"}], ["recordIdentifier", "431976716"], ["name", "Thorne, Jack, 1978-"], ["title", "Harry Potter y el legado maldito."], ["link", {"href": "http://worldcat.org/oclc/962505756"}], ["recordIdentifier", "962505756"], ["name", "Rowling, J. K. 1965-"], ["title", "Harry Potter y la Orden del Fénix"], ["link", {"href": "http://worldcat.org/oclc/434364109"}], ["recordIdentifier", "434364109"], ["name", "Rowling, J. K. 1965-"], ["title", "Harry Potter y las reliquias de la muerte"], ["link", {"href": "http://worldcat.org/oclc/433374664"}], ["recordIdentifier", "433374664"], ["name", "Bassham, Gregory, ed. lit."], ["title", "Harry Potter y la filosofía : Hogwarts para Muggles"], ["link", {"href": "http://worldcat.org/oclc/978358669"}], ["recordIdentifier", "978358669"], ["name", "Bonifatti, Karina, 1967-"], ["title", "Las voces de los clásicos en Harry Potter"], ["link", {"href": "http://worldcat.org/oclc/892857206"}], ["recordIdentifier", "892857206"], ["name", "Regazzoni, Simone."], ["title", "Harry Potter : la filosofía : fenomenología de un mito pop"], ["link", {"href": "http://worldcat.org/oclc/1025687302"}], ["recordIdentifier", "1025687302"]]')

	var a = 0;
	var b = 0;
	var array = [];
	
	while (a < response2.length) {
		var responseHeader = response2[a][0]

		switch (responseHeader) {
			case "name":
				array[b] = {};
				array[b]["name"] = response2[a][1]
			break;
			case "title":
				array[b]["title"] = response2[a][1]
			break;
			case "link":
				array[b]["link"] = response2[a][1]
			break;
			case "recordIdentifier":
				array[b]["recordIdentifier"] = response2[a][1]
				b++;
			break;
		}	
		a++;
	}





	writeInChat(ChatResponses.boot, generateCarrusel(array))
	console.log(array);
}

function jannetTalk() {
	$('#rawChat').scrollTop($('#rawChat').height()*10);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://d599-139-47-72-239.eu.ngrok.io/webhooks/rest/webhook", true); 
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.onreadystatechange = function() {
	   if (this.readyState == 4 && this.status == 200) {
	     // Response
	     
	     var response = JSON.parse(this.responseText);
	     
	     var textResponse = response[0]['text']

	     console.log(textResponse);



	     if (textResponse.substring(0, 1) == "[") {
			var carruselRaw = JSON.parse(textResponse.replaceAll('\'', '\"'));
	     	var carrusel = clearXML(carruselRaw);
	     	writeInChat(ChatResponses.boot, generateCarrusel(carrusel))
	     } else {
			writeInChat(ChatResponses.boot, textResponse.replaceAll(' - ', '<br>- '))
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

function writeInChat(whoResponse, response) {
	var alertPlaceholder = document.getElementById("rawChat")
	alertPlaceholder.append(generateParraf(whoResponse, response))
}
