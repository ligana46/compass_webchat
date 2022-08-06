let READY_STATE = 4;
let STATUS = 200;


function isServerUp(server) {
    return server.readyState == READY_STATE && server.status == STATUS
}

function isResponseEmpty(response) {
    return response.length == 0
}