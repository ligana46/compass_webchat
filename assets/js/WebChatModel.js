class WebChatModel {
    constructor() {
        this.JANNET_RESPONSE_TEXT = "plain_text";
        this.JANNET_RESPONSE_CARRUSEL = "xml_text";
    }

    serverResponse(response) {
        if (response.readyState === 4 && response.status === 200) {
            this.getType(JSON.parse(response.responseText))
        }
    }

    getType(response) {
        for (var i = 0; i <= Object.keys(response[0].custom).length - 1; i++) {

            if (i == Object.keys(response[0].custom).length - 1) { controller.view.isTheLastMessage = true } else { controller.view.isTheLastMessage = false}
            let element = response[0].custom[i]
            let text = element.text
            switch (element.payload) {
                case this.JANNET_RESPONSE_TEXT:
                    controller.bootWriteChat(text)
                    break;
                case this.JANNET_RESPONSE_CARRUSEL:
                    controller.bootWriteChat(controller.generateCarrusel(this.carruselCard(text)))
                    break;
                default:
                    controller.bootWriteChat("Respuesta sin categoria", true)
                    break;
            }
        }
    }

    carruselCard(text) {
        let textClean = text.replaceAll('\'', '\"')
        textClean = textClean.replaceAll('\"{', '{')
        textClean = textClean.replaceAll('\}"', '}')
        let carrusel = JSON.parse(textClean);
        return this.clearXML(carrusel);
    }

    clearXML(response) {
        var array = [];

        for (var i = 0; i <= response.length-1; i++) {
            let item = response[i];
            if (item.name) {
                array.push(item)
            }
        }

        return array;
    }
}