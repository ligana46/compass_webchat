const ChatResponses = {
	boot: "left",
	user: "right",
}

const JANNET_RESPONSE_TEXT = "plain_text";
const JANNET_RESPONSE_CARRUSEL = "xml_text";
const SERVER_TIME_OUT = 30000; // Lo estaba poniendo a 10 segundos pero el servidor tardaba mucho en contestar

var timer, xhttp, questionsCollection = ['harry potter'], questionsCollectionCursor = questionsCollection.length, isTheLastMessage;


function run() {
	var text = getTextById('text')
	if (text == "") { return }
	isTheLastMessage = true;
	writeInChat(ChatResponses.user, text)
	writeInChat(ChatResponses.boot, generateLoading())
	enableText();
	jannetTalk()
	clearId('text')
}

function serverResponse(response) {
	if (isServerUp(response)) {
		disableText()
		clearTimeout(timer);
		deleteLoagind();
		jannetResponse(JSON.parse(response.responseText))
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
	for (var i = 0; i <= Object.keys(response[0].custom).length - 1; i++) {

		if (i == Object.keys(response[0].custom).length - 1) { isTheLastMessage = true } else { isTheLastMessage = false}
		let element = response[0].custom[i]
		let text = element.text
		switch (element.payload) {
			case JANNET_RESPONSE_TEXT:
				simpleCard(text);
				break;
			case JANNET_RESPONSE_CARRUSEL:
				carruselCard(text)
				break;
			default:
				writeInChat(ChatResponses.boot, "ERROR: Respuesta sin categoria", error = true)
				break;
		}
	}
}

function carruselCard(text) {
	let textClean = text.replaceAll('\'', '\"')
	textClean = textClean.replaceAll('\"{', '{')
	textClean = textClean.replaceAll('\}"', '}')
	var carrusel = JSON.parse(textClean)
	console.log(carrusel);
	carrusel = clearXML(carrusel);
	writeInChat(ChatResponses.boot, generateCarrusel(carrusel))
}

function simpleCard(text) {
	// TODO: ESTO VA A DAR PROBLEMAS....
	writeInChat(ChatResponses.boot, text.replaceAll('-', '<br>- '))
}

function onTimeOut() {
	xhttp.abort();
	deleteLoagind()
	disableText()
	writeInChat(ChatResponses.boot, "ERROR: Server is not responding...", error = true)
}

function jannetTalk() {
	$('#rawChat').scrollTop($('#rawChat').height()*10);
	xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://4b43-139-47-73-138.eu.ngrok.io/webhooks/rest/webhook", true); 
	xhttp.setRequestHeader("Content-Type", "application/json");
	timer = setTimeout(onTimeOut, SERVER_TIME_OUT);
	xhttp.onreadystatechange = function() {
		serverResponse(this)
	};

	var question =  getTextById('text');
	var data = {
		"sender" : myID,
		"message" : question
	};



	console.log(question);
	questionsCollection.push(question)
	questionsCollectionCursor = questionsCollection.length;
	xhttp.send(JSON.stringify(data));
}

function clearXML(response) {
	var a = 0;
	var b = 0;
	var array = [];


	for (var i = 0; i <= response.length-1; i++) {
		let item = response[i];
		if (item.name) {
			array.push(item)
		}
	}

	return array;
}

function writeInChat(whoResponse, response, ERROR = false) {
	var alertPlaceholder = document.getElementById("rawChat")
	alertPlaceholder.append(generateParraf(whoResponse, response, ERROR))
	$('#rawChat').scrollTop($('#rawChat').height()*10);
}
