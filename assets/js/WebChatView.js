class WebChatView {
    constructor(document) {
        this.ID_INPUTTEXT = 'text'
        this.ID_TOOGLE_CHAT = 'button-open-chat'
        this.ID_CHATCONTAINER = "chatContainer"
        this.ID_BUTTON_CLOSE = "button-open-chat-close"
        this.ID_BUTTON_OPEN = "button-open-chat-open"
        this.ID_RAW_CHAT = "rawChat"



        this.KEYUP = "keyup"
        this.INPUTARROWDOWN = "ArrowDown"
        this.INPUTENTER = "Enter"
        this.INPUTPADENTER = "NumpadEnter"
        this.INPUTARROWUP = "ArrowUp"

        this.document = document
        this.MYID = Math.floor(Date.now() / 1000)


        this.chatResponses = {
            boot: "left",
            user: "right",
        }
    }


    sendMessage() {
        console.log("Enciado")
    }

    printSimpleCard(text) {

    }

    toggleWebChat() {
        let element = this.getElementById(this.ID_CHATCONTAINER);

        if (element.style.display === "none" || element.style.display === "") {
            this.unFadeWebChat(element)
        } else {
           this.fadeWebChat(element)
        }
    }

    fadeWebChat(element) {
        let close = this.getElementById(this.ID_BUTTON_CLOSE);
        let open = this.getElementById(this.ID_BUTTON_OPEN);

        close.style.display = "none"
        open.style.display = "inline-block";
        element.style.display = "none";

        let op = 1;  // initial opacity
        let timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 10);
    }

    unFadeWebChat(element) {
        let close = this.getElementById(this.ID_BUTTON_CLOSE);
        let open = this.getElementById(this.ID_BUTTON_OPEN);

        close.style.display = "inline-block";
        open.style.display = "none";

        this.getElementById(this.ID_INPUTTEXT).focus()

        let op = 0.1;  // initial opacity
        element.style.display = 'block';
        let timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }

    getElementById(id) {
        return this.document.getElementById(id)
    }

    writeInChat(whoResponse, response, ERROR = false) {
        let alertPlaceholder = document.getElementById(this.ID_RAW_CHAT)
        alertPlaceholder.append(this.generateParraf(whoResponse, response, ERROR))
        $('#' + this.ID_RAW_CHAT).scrollTop($('#' + this.ID_RAW_CHAT).height()*10);
    }

    generateParraf(whoResponse, response, ERROR) {
        var div = document.createElement('div')
        var wrapper = document.createElement('p')
        var parrDate = document.createElement('p')

        var currentdate = new Date();
        var datetime = currentdate.getHours() + ":" + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();
        parrDate.innerHTML = datetime;
        div.append(wrapper)
        // if (isTheLastMessage) { div.append(parrDate) }
        div.append(parrDate)
        wrapper.className = " chatConver"; //@TODO: Cambiar esto
        wrapper.innerHTML = response;

        switch(whoResponse) {
            case this.chatResponses.boot:
                wrapper.className += " left";
                div.className = "chat-left";
                parrDate.className = "message-date-boot";
                break;
            case this.chatResponses.user:
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

    generateLoading() {
        return '<div id="loading" class="spinner-border" role="status"><span class="sr-only"></span></div>'
    }


    disableInputText() {
        document.getElementById("text").readOnly = true;
        document.getElementById("text").placeholder = "Esperando respuesta";
    }

    enableInputText() {
        document.getElementById("text").readOnly = false;
        document.getElementById("text").placeholder = "Escribe aqui...";
    }
}