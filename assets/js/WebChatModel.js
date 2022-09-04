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

            // if (i == Object.keys(response[0].custom).length - 1) { isTheLastMessage = true } else { isTheLastMessage = false}
            let element = response[0].custom[i]
            let text = element.text
            switch (element.payload) {
                case this.JANNET_RESPONSE_TEXT:
                    // simpleCard(text);
                    controller.responseSimpleCard(text)
                    break;
                case this.JANNET_RESPONSE_CARRUSEL:
                    // carruselCard(text)
                    console.log(this.JANNET_RESPONSE_CARRUSEL)
                    console.log(text)
                    break;
                default:
                    console.log("Error")
                    // writeInChat(ChatResponses.boot, "ERROR: Respuesta sin categoria", error = true)
                    break;
            }
        }
    }
}