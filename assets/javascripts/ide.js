//    editor.insert(1,reader.readAsText(file));
function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  editor.setValue(contents, 1);
}

document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);