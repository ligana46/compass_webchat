function generateParraf(whoResponse, response, ERROR) {
	var div = document.createElement('div')
	var wrapper = document.createElement('p')
	var parrDate = document.createElement('p')

	var currentdate = new Date(); 
	var datetime = currentdate.getHours() + ":" + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();
    parrDate.innerHTML = datetime;
	div.append(wrapper)
	div.append(parrDate)
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

function getTextById(id) {
	return document.getElementById(id).value
}

function clearId(id) {
	document.getElementById(id).value = "";
}


function generateCarrusel2(array) {
	console.log(array)
	// @TODO: ARREGLAR PROBLEMA DE PEDIR DOS 
	var carrusel = '<div class="bd-example"><div id="carouselExampleCaptions' + array[0].recordIdentifier + '" class="carousel slide" data-interval="false" data-ride="carousel"><ol class="carousel-indicators"><li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li><li data-target="#carouselExampleCaptions" data-slide-to="1"></li><li data-target="#carouselExampleCaptions" data-slide-to="2"></li></ol><div class="carousel-inner">';

	for (var i = 0; i < array.length; i++) {
		if (i == 0) {
			carrusel += '<div class="carousel-item active"><img src="https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png" class="d-block w-100" alt="..."><div style="display: block!important;;" class="carousel-caption d-none d-md-block"><a target="_blank" href="' + array[i].link.href + '"><h5>' + array[i]["title"] + '</h5></a></div></div>';
		} else {
			carrusel += '<div class="carousel-item"><img src="https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png" class="d-block w-100" alt="..."><div class="carousel-caption d-none d-md-block"><a target="_blank" href="' + array[i].link.href + '"><h5>' + array[i]["title"] + '</h5></a></div></div>';
		}
	}

	carrusel += '<a class="carousel-control-prev" href="#carouselExampleCaptions' + array[0].recordIdentifier + '" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only"></span></a><a class="carousel-control-next" href="#carouselExampleCaptions' + array[0].recordIdentifier + '" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only"></span></a>'

	carrusel += '</div></div></div>'
	return carrusel;
}


function generateCarrusel(array) {
	const idName = "accordion-" + Math.floor(Date.now() / 1000)
	console.log(array)
	var carrusel = '<div id="' + idName + '">';

	for (var i = 0; i < array.length; i++) {


		let item = array[i];
		let name = item.name;
		let recordIdentifier = item.recordIdentifier;
		let isbn = "9788498381405"; // @TODO: CAMBIAR ESTO
		let title = item.title;
		let href = item.link.href

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
			'\t\t\t\t\t\t\t\t<div id="collapse' + recordIdentifier + '" class="collapse" aria-labelledby="headingOne" data-parent="#' + idName + '">\n' +
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