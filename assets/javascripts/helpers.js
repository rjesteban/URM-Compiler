function printToConsole(msg){
    $("#console").append("<p>" + msg + "</p>");
}

function printErrToConsole(msg){
    $("#console").append("<div class='exception'>" + msg + "</div>");
}

function printSuccessToConsole(msg){
    $("#console").append("<div class='success_console'><p>" + msg + "</p></div>" );
}

function printToLog(msg){
    $("#logs").append("<p>" + msg + "</p>");
}

function printCodeToConsole(msg) {
    $("#console").append("<pre><code>" + msg + "</code></pre>");
}