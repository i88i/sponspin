var storeOne = "";
var storeTwo = "";
var storeThree = "";



function filter(url) {
  if(storeOne == url) {
      storeTwo = storeOne;
      sender(storeTwo);
  }
else {storeOne = url; setTimeout(resetURL, 600);}   
}
function sender(storeTwo) {
    if(storeThree != storeTwo) {storeThree = storeTwo;
                                 chrome.runtime.sendMessage(storeThree);}
}
function resetURL() {storeOne = "";}

$('a').on('mouseenter', function(){ filter(this.href)} )

