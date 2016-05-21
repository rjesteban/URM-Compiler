/*
A tokenizer breaks a stream of text into tokens, usually by looking for whitespace (tabs, spaces, new lines).

A lexer is basically a tokenizer, but it usually attaches extra context to the tokens -- this token is a number, that token is a string literal, this other token is an equality operator.
(jump(1,2,5));
A parser takes the stream of tokens from the lexer and turns it into an abstract syntax tree representing the (usually) program represented by the original text.


*/

reserved_word = ['successor', 'copy', 'zero', 'jump', 'print', 'decrement', '(', ')', ';', ','];
keyword_table = {
    func: ['successor', 'copy', 'zero', 'jump', 'print', 'decrement'], //func
    open: ['('], //open
    data_type: ['number', 'string'], //data type
    closed: [')'], // closed
    end: [';'], //end
};

keyword_table['func']
    

function tokenize(input) {
    var code = input.split(/\r\n+/g);
    var tokens = [];
    for (i = 0; i < code.length; i++) {
        tokens.push(code[i].match(/\d+|[_a-zA-Z][_a-zA-Z0-9]{0,30}|;|\(|\)|"[^"]*"|\/\/.*/g));
    }
    return tokens;
}

function parse_tree(tokens) {

    var tree = { root: [] };

    for (i = 0; i < tokens.length; i++) {
        var line = tokens[i];
        var stack = [];
        var dict = { data_type: [] };

        if (line == null) {
            printErrToConsole('Invalid Syntax at line: ' + (i + 1));
            throw new Error('Invalid Syntax at line ' + (i + 1));
        }

        if (keyword_table['func'].includes(line[0]) && keyword_table['open'].includes(line[1])) {
            stack.push(line[0]);
            stack.push(line[1]);
            dict['func'] = line[0];
            dict['open'] = line[1]
        } else {
            printErrToConsole('Invalid Syntax at line: ' + (i + 1));
            throw new Error('invalid syntax at line: ' + (i + 1));

        }
        for (j = 2; j < line.length; j++) {
            if (keyword_table['closed'].includes(line[j]) && keyword_table['end'].includes(line[j + 1])) {
                dict['closed'] = line[j];
                dict['end'] = line[j + 1];
                try {
                    stack.pop();
                    stack.pop();
                    break;
                } catch (e) {
                    printErrToConsole('Invalid Syntax at line: ' + (i + 1));
                    throw new Error('invalid syntax at line: ' + (i + 1));
                }
            } else if (isNaN(parseInt(line[j]))) {
                dict['data_type'].push(line[j]);
            } else if (keyword_table['data_type'].includes(typeof(parseInt(line[j])))) {
                dict['data_type'].push(parseInt(line[j]));

            } else {
                printErrToConsole('Invalid Syntax at line: ' + (i + 1));
                throw new Error('invalid syntax at line: ' + (i + 1));
            }
        }

        if (stack.length != 0) {
            printErrToConsole('Invalid Syntax at line: ' + (i + 1));
            throw new Error('invalid Syntax at line: ' + (i + 1));
        } else {
            tree['root'].push(dict);
        }
    }
    return tree;
}

function generate_code(tree) {
    var children = tree['root'];
    var output = '';
    for (i = 0; i < children.length; i++) {
        if (children[i]['func'] == reserved_word[0] || children[i]['func'] == reserved_word[2] || children[i]['func'] == reserved_word[5]) { //Successor, Zero, Decrement
            if (children[i]['data_type'].length != 1) {
                printErrToConsole('ArgumentExeption : Expected 1 given ' + children[i]['data_type'].length);
                throw new Error('ArgumentExeption : Expected 1 given ' + children[i]['data_type'].length);
            } else if (typeof(children[i]['data_type'][0]) != keyword_table['data_type'][0]) {
                printErrToConsole('ArgumentTypeExeption : Expected number, given ' + typeof(children[i]['data_type'][0]));
                throw new Error('ArgumentTypeExeption : Expected number, given ' + typeof(children[i]['data_type'][0]));
            }
            output = output + children[i]['func'].toUpperCase() + ' ' + children[i]['data_type'][0] + '\n';
        } else if (children[i]['func'] == reserved_word[1]) { //Copy
            if (children[i]['data_type'].length != 2) {
                printErrToConsole('ArgumentExeption : Expected 2 given ' + children[i]['data_type'].length);
                throw new Error('ArgumentExeption : Expected 2 given ' + children[i]['data_type'].length);
            } else if (typeof(children[i]['data_type'][0]) != keyword_table['data_type'][0] ||
                typeof(children[i]['data_type'][1]) != keyword_table['data_type'][0]) {
                printErrToConsole('ArgumentTypeExeption : Expected number, given string');
                throw new Error('ArgumentTypeExeption : Expected number, given string');
            }
            output = output + children[i]['func'].toUpperCase() + ' ' +
                children[i]['data_type'][0] + ' ' +
                children[i]['data_type'][1] + '\n';
        } else if (children[i]['func'] == reserved_word[3]) { //Jump
            if (children[i]['data_type'].length != 3) {
                printErrToConsole('ArgumentExeption : Expected 3 given ' + children[i]['data_type'].length);
                throw new Error('ArgumentExeption : Expected 3 given ' + children[i]['data_type'].length);
            } else if (typeof(children[i]['data_type'][0]) != keyword_table['data_type'][0] ||
                typeof(children[i]['data_type'][1]) != keyword_table['data_type'][0] ||
                typeof(children[i]['data_type'][2]) != keyword_table['data_type'][0]) {
                printErrToConsole('ArgumentTypeExeption : Expected number, given string');
                throw new Error('ArgumentTypeExeption : Expected number, given string');
            }
            output = output + children[i]['func'].toUpperCase() + ' ' +
                children[i]['data_type'][0] + ' ' +
                children[i]['data_type'][1] + ' ' +
                children[i]['data_type'][2] + '\n';
        } else if (children[i]['func'] == reserved_word[4]) { //Print
            if (children[i]['data_type'].length != 1) {
                printErrToConsole('ArgumentExeption : Expected 1 given ' + children[i]['data_type'].length);
                throw new Error('ArgumentExeption : Expected 1 given ' + children[i]['data_type'].length);
            }
            output = output + children[i]['func'].toUpperCase() + ' ' +
                children[i]['data_type'][0] + '\n';
        }
    }
    return output;
}
