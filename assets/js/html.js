function generateParraf(whoResponse, response, ERROR) {
	var div = document.createElement('div')
	var wrapper = document.createElement('p')
	var parrDate = document.createElement('p')

	var currentdate = new Date(); 
	var datetime = currentdate.getHours() + ":" + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();
    parrDate.innerHTML = datetime;
	div.append(wrapper)
	if (isTheLastMessage) { div.append(parrDate) }
	wrapper.className = " chatConver"; //@TODO: Cambiar esto
	wrapper.innerHTML = response;

	switch(whoResponse) {
		case ChatResponses.boot:
			wrapper.className += " left";
			div.className = "chat-left";
			parrDate.className = "message-date-boot";
		break;
		case ChatResponses.user:
			wrapper.className += " right";
			div.className = "chat-right";
			parrDate.className = "message-date-user";
		break;
	}

	if (ERROR) {
		wrapper.className += ' error-message';
	}



	return div
}

function enableText() {
	document.getElementById("text").readOnly = true;
	document.getElementById("text").placeholder = "Esperando respuesta";
}

function disableText() {
	document.getElementById("text").readOnly = false;
	document.getElementById("text").placeholder = "Escribe aqui...";
}

function getTextById(id) {
	return document.getElementById(id).value
}

function clearId(id) {
	document.getElementById(id).value = "";
}

function generateCarrusel(array) {
	const idName = "accordion-" + Math.floor(Date.now() / 1000);
	var show = "show";
	console.log(array)
	var carrusel = '<div id="' + idName + '">';
	for (var i = 0; i < array.length; i++) {
		if (i >= 1) { show = "" }
		let item = array[i];
		let name = item.name;
		let recordIdentifier = item.recordIdentifier;
		let isbn = "9788498381405"; // @TODO: CAMBIAR ESTO
		let title = item.title;
		let href = item.link.href;

		let imageURL = "https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg";
		carrusel += '';
		carrusel += '\t\t\t\t\t\t\t<div class="card">\n' +
			'\t\t\t\t\t\t\t\t<div class="card-header" id="headingOne">\n' +
			'\t\t\t\t\t\t\t\t\t<h5 class="mb-0">\n' +
			'\t\t\t\t\t\t\t\t\t\t<button class="btn btn-link" data-toggle="collapse" data-target="#collapse' + recordIdentifier + '" aria-expanded="true" aria-controls="collapse' + recordIdentifier + '">\n' +
			'\t\t\t\t\t\t\t\t\t\t\t ' + title + '  \n' +
			'\t\t\t\t\t\t\t\t\t\t</button>\n' +
			'\t\t\t\t\t\t\t\t\t</h5>\n' +
			'\t\t\t\t\t\t\t\t</div>\n' +
			'\n' +
			'\t\t\t\t\t\t\t\t<div id="collapse' + recordIdentifier + '" class="collapse ' + show + '" aria-labelledby="headingOne" data-parent="#' + idName + '">\n' +
			'\t\t\t\t\t\t\t\t\t<div class="card-body" style="padding: 0rem 1rem;background: url(' + imageURL + ') no-repeat center #eee;">\n' +
			'\t\t\t\t\t\t\t\t\t\t<div class="card-deck">\n' +
			'\t\t\t\t\t\t\t\t\t\t\t<div class="card" style="background-color: rgb(255 255 255 / 85%);">\n' +
			'\t\t\t\t\t\t\t\t\t\t\t\t<div class="card-body">\n' +
			'\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class="card-title">' + name + '</h5>\n' +
			'\t\t\t\t\t\t\t\t\t\t\t\t\t<p class="card-text"><small>OCLC ID : ' + recordIdentifier + '</small></p>\n' +
			'\t\t\t\t\t\t\t\t\t\t\t\t\t<a target="_blank" href="' + href + '" class="card-text"><small class="text-muted">ver en catalogo</small></a>\n' +
			'\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
			'\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
			'\t\t\t\t\t\t\t\t\t\t</div>\n' +
			'\t\t\t\t\t\t\t\t\t</div>\n' +
			'\t\t\t\t\t\t\t\t</div>\n' +
			'\t\t\t\t\t\t\t</div>';
	}
	carrusel += "</div>";
	return carrusel;
}

function generateLoading() {
	return '<div id="loading" class="spinner-border" role="status"><span class="sr-only"></span></div>'
}

function deleteLoagind() {
	const element = document.getElementById('loading');
	if (element == null) { return }
	document.getElementById("loading").parentElement.parentElement.remove()
	// element.remove();
}