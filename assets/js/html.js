function generateParraf(whoResponse, response, ERROR) {
	var div = document.createElement('div')
	var wrapper = document.createElement('p')
	div.append(wrapper)
	wrapper.className = " chatConver"; //@TODO: Cambiar esto
	wrapper.innerHTML = response;

	switch(whoResponse) {
		case ChatResponses.boot:
			wrapper.className += " left";
			div.className = "chat-left";
		break;
		case ChatResponses.user:
			wrapper.className += " right";
			div.className = "chat-right";
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


function generateCarrusel(array) {
	console.log(array)
	// @TODO: ARREGLAR PROBLEMA DE PEDIR DOS 
	var carrusel = '<div class="bd-example"><div id="carouselExampleCaptions' + array[0].recordIdentifier + '" class="carousel slide" data-interval="false" data-ride="carousel"><ol class="carousel-indicators"><li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li><li data-target="#carouselExampleCaptions" data-slide-to="1"></li><li data-target="#carouselExampleCaptions" data-slide-to="2"></li></ol><div class="carousel-inner">';

	for (var i = 0; i < array.length; i++) {
		if (i == 0) {
			carrusel += '<div class="carousel-item active"><img src="https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png" class="d-block w-100" alt="..."><div class="carousel-caption d-none d-md-block"><a target="_blank" href="' + array[i].link.href + '"><h5>' + array[i]["title"] + '</h5></a></div></div>';
		} else {
			carrusel += '<div class="carousel-item"><img src="https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png" class="d-block w-100" alt="..."><div class="carousel-caption d-none d-md-block"><a target="_blank" href="' + array[i].link.href + '"><h5>' + array[i]["title"] + '</h5></a></div></div>';
		}
	}

	carrusel += '<a class="carousel-control-prev" href="#carouselExampleCaptions' + array[0].recordIdentifier + '" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only"></span></a><a class="carousel-control-next" href="#carouselExampleCaptions' + array[0].recordIdentifier + '" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only"></span></a>'

	carrusel += '</div></div></div>'
	return carrusel;
}

function generateLoading() {
	return '<div id="loading" class="spinner-border" role="status"><span class="sr-only"></span></div>'
}

function deleteLoagind() {
	const element = document.getElementById('loading');

	document.getElementById("loading").parentElement.parentElement.remove()
	// element.remove();
}