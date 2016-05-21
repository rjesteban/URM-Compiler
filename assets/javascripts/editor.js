var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/urm");
editor.$blockScrolling = Infinity
$("#alertcontent-btn").on('click', function () {
    alert(editor.getSession().getValue());
    var tokens = tokenize(editor.getSession().getValue());
    console.log(tokens);
    var tree = parse_tree(tokens);
    var output = generate_code(tree);
    console.log(output);
    interpret(output);
});
