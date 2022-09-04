class WebChatController {
    constructor(view, model) {
        this.view = view
        this.model = model

        this._initLocalListeners()
    }


    _initLocalListeners() {
        this.view.document.addEventListener(this.view.KEYUP, function(event) {
            if ((event.code === controller.view.INPUTPADENTER || event.code === controller.view.INPUTENTER) && controller.view.document.querySelector('#' + controller.view.ID_INPUTTEXT) === document.activeElement) {
                // Send Message
                controller.sendMessage()
            }
        });

        this.view.getElementById(this.view.ID_TOOGLE_CHAT).onclick = function () {
            controller.view.toggleWebChat()
        }

        this.view.getElementById(this.view.ID_BUTTON_SEND).onclick = function () {
            controller.sendMessage()
        }
    }

    sendMessage() {
        let text = this.view.getElementById(this.view.ID_INPUTTEXT).value
        if (text == "") { return }
        this.jannetTalk()
        this.view.writeInChat(this.view.chatResponses.user, text)
        this.view.writeInChat(this.view.chatResponses.boot, this.view.generateLoading())
        this.view.disableInputText()
        this.view.clearInput()
    }

    jannetTalk() {
        $('#rawChat').scrollTop($('#rawChat').height()*10);
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://0f44-139-47-73-138.eu.ngrok.io/webhooks/rest/webhook", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        // timer = setTimeout(onTimeOut, SERVER_TIME_OUT);
        xhttp.onreadystatechange = function() {
            controller.model.serverResponse(this)
        };

        let question = this.view.getElementById(this.view.ID_INPUTTEXT).value
        let data = {
            "sender" : this.view.MYID,
            "message" : question
        };

        // console.log(question);
        // questionsCollection.push(question)
        // questionsCollectionCursor = questionsCollection.length;
        xhttp.send(JSON.stringify(data));
    }

    bootWriteChat(text, error = false) {
        this.view.deleteLoagind()
        this.view.enableInputText()
        this.view.writeInChat(this.view.chatResponses.boot, text.replaceAll('-', '<br>- '))
    }
}