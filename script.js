var textFile = null
let makeTextFile = function (text) {
var data = new Blob([text], {type: 'text/plain'});

// If we are replacing a previously generated file we need to
// manually revoke the object URL to avoid memory leaks.
if (textFile !== null) {
window.URL.revokeObjectURL(textFile);
}

textFile = window.URL.createObjectURL(data);

return textFile;
};

var finalSeq = ""

document.getElementById("generateDeBruijn").addEventListener('click', function () {
  const alphabet = document.getElementById("alphabet").value.split(" ")
  const strLen = parseInt(document.getElementById("setSize").value)
  let currentSeq = []
  let knownSeq = []
  for (var i=0;i<strLen-1;i++){
    currentSeq.push(alphabet[alphabet.length-(strLen-i-1)])
  }
  //currentSeq.push((alphabet.slice(alphabet.length-strLen, alphabet.length-1)).join)
  console.log(currentSeq)
  for (var i=0;i<Math.pow(alphabet.length, strLen);i++){
    for (var j=0;j<alphabet.length;j++){
      if (!knownSeq.includes((currentSeq.slice(currentSeq.length-(strLen-1), currentSeq.length)).join("") + alphabet[j])){
        knownSeq.push((currentSeq.slice(currentSeq.length-(strLen-1), currentSeq.length)).join("") + alphabet[j])
        currentSeq.push(alphabet[j])
        //console.log(currentSeq.slice(currentSeq.length-(strLen-1), currentSeq.length) + " " + currentSeq)
        break;
      }
    }
  }
  console.log(knownSeq)
  console.log(currentSeq)
var link = document.getElementById('downloadlink');
link.href = makeTextFile(currentSeq.join(""));
link.style.display = 'block';
}, false);
