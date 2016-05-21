var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/urm");
editor.$blockScrolling = Infinity


$("#compile").on('click', function () {
    openNav();
    var startTime = new Date().valueOf();
    var tokens = tokenize(editor.getSession().getValue());
    tree = parse_tree(tokens);
    window.lowlevel = generate_code(tree);
    var elapsed = (new Date().valueOf() - startTime)/1000;
    printCodeToConsole(window.lowlevel);
    printToConsole('-------------------------------');
    printToConsole("Completed compilation in " + elapsed + " seconds");
});
editor.session.setNewLineMode('windows');


$("#execute").on('click', function() {
    openNav();
    try {
        interpret(window.lowlevel);
    } catch(e) {
        printErrToConsole('Please edit and compile your code.');
        throw new Error('Please edit and compile your code.' + e);
    }
});