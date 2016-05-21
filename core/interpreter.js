function interpret(input) {
    //put to array ang code
    //var urm = [16, 36, 0, 0, 0, 0, 0, 0, 0, 0];
    var urm = window.urm;
   // var input = 'JUMP 2 3 5\nSUCCESSOR 1\nSUCCESSOR 3\nJUMP 1 1 1\nZERO 2\nZERO 3\nPRINT "YO L   ,,  , O"';
    var code = input.split(/\n+/g);
    code.unshift('');
    var startExecutionTime = new Date().valueOf();
    printToLog('urm-start: ' + urm.slice(1));

    for (pc = 1; pc < code.length - 1; pc++) {

        var line = code[pc].match(/"[^"]*"|\S+/g);
        if (line[0] == "SUCCESSOR") {
            if (parseInt(line[1]) <= 0) {
                printErrToConsole('IndexOutOfBoundsException: Index is out of range.');
                throw new Error('IndexOutOfBoundsException: Index is out of range.');
                break;
            }
            else {
                urm[parseInt(line[1])]++;
            }
        }

        else if (line[0] == "ZERO") {
            if (parseInt(line[1]) <= 0) {
                printErrToConsole('IndexOutOfBoundsException: Index is out of range.');
                throw new Error('IndexOutOfBoundsException: Index is out of range.');
                break;
            }

            else {
                urm[parseInt(line[1])] = 0;
            }
        }

        else if (line[0] == "COPY") {
            if (parseInt(line[1]) <= 0 || parseInt(line[2]) <= 0) {
                printErrToConsole('IndexOutOfBoundsException: Index is out of range.');
                throw new Error('IndexOutOfBoundsException: Index is out of range.');
                break;
            }
            else {
                urm[parseInt(line[2])] = urm[parseInt(line[1])];
            }
        }

        else if (line[0] == "JUMP") {
            if (parseInt(line[1]) <= 0 || parseInt(line[2]) <= 0 || parseInt(line[3]) <= 0) {
                printErrToConsole('IndexOutOfBoundsException: Index is out of range.');
                throw new Error('IndexOutOfBoundsException: Index is out of range.');
                break;
            }
            else {
                if (urm[parseInt(line[1])] == urm[parseInt(line[2])]) {
                    pc = parseInt(line[3]) - 1;
                }
            }
        }
        
        else if (line[0] == "PRINT") {
            var index = parseInt(line[1]);
            
            if(isNaN(index)) {
                var word = ''.concat(line.slice(1).join(' '));
                printCodeToConsole(word.substr(1,word.length - 2));
            } else {
                var word = ''.concat(line.slice(1).join(' '));
                printCodeToConsole(urm[parseInt(line[1])]);
            }
        }
        
        else if (line[0] == "DECREMENT") {
            if (parseInt(line[1]) <= 0) {
                printErrToConsole('IndexOutOfBoundsException: Index is out of range.');
                throw new Error('IndexOutOfBoundsException: Index is out of range.');
                break;
            }
            else {
                urm[parseInt(line[1])]--;
            }
        }
            console.log(urm.slice(1)); // logs
            printToLog('urm: ' + urm.slice(1));
    }
    var elapsed = ((new Date().valueOf()) - startExecutionTime)/1000;
    printToLog(urm.slice(1));
    printSuccessToConsole('Execution finished after: ' + elapsed + 'seconds.');
    printToLog('----------------------------');
}