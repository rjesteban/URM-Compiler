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



document.onkeydown = function (event) {
      event = (event || window.event);
      if (event.keyCode == 118) {
          //alert('No F-keys');
          openNav();
      }
      else if (event.keyCode == 119) {
          //alert('No F-keys');
          closeNav();
      }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "35%";
    document.getElementById("editor").style.marginRight = "35%";
    document.getElementById("head").style.marginRight = "35%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("editor").style.marginRight= "0";
    document.getElementById("head").style.marginRight = "0";
    document.body.style.backgroundColor = "white";
}

function openCloseNav(){
    if(document.getElementById("mySidenav").style.width == 0 ||
    document.getElementById("mySidenav").style.width == "0px" ){
        openNav();
    }
    else if(document.getElementById("mySidenav").style.width != 0){

        closeNav();
    }

}

$("#side").on('click', function(){ openCloseNav(); });

$(function(){
$("#upload").on('click', function(e){
    e.preventDefault();
    $("#file-input:hidden").trigger('click');
});
});

$('#assign').on('click', function(){
    var registers = null;
    window.urm = null;
    while(window.urm==null || window.urm.length == 0) {
        var registers = prompt('Assign values of registers. 1st register is at index 1, then so on and so forth.\n please separate integer values by commas','');
        registers = registers.split(',');
        console.log(registers);
        window.urm = [""];
        for(i = 0; i < registers.length; i++){
            var reg = registers[i].match(/\D+/);
            if(reg != null){
                window.urm = null;
                break;
            } else {
                window.urm.push(parseInt(registers[i]));
            }
        }
    }
    window.urm = window.urm.concat([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    console.log(window.urm);
});