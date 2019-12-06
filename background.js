var counter = 0;

var Senf = "";
var globalSenf = "";
var globalSenfTitle = "";

chrome.browserAction.onClicked.addListener(function(tab) {

    if (Senf == "") {
    letsDoThis("Bitte weiter suchen!", "Leider gibt's hier keinen Senf!");    
    }
  else { chrome.tabs.create({
        url: Senf
   }); }
})

 chrome.runtime.onMessage.addListener(function(message) {Ajax(message)})



 function Ajax(currentURL) {
   console.log(currentURL);     
    if (currentURL == Senf) {
        return;
    }
    
//     Assemble and Submit JSON here:
var urls = []; 	
 urls[0] = currentURL;
// console.log(currentURL);
//  console.log(JSON.stringify(urls));							
 doAjax();		
    
	function doAjax() {
			var array, ajax;
		
          array = JSON.stringify(urls);
			//object = JSON.stringify({first: 'obj_item1', second: 'obj_item2', third: 'obj_item3'});
		//			
		////Pass the values to the AJAX request and specify function arg for 'done' callback
		ajax = theAjax(array);
		ajax.done(processData);
		ajax.fail(function( jqXHR, textStatus, errorThrown) {
				//Output error information
		});
}

function theAjax(arr) {
	return $.ajax({
      url: 'https://i88i.org/Senf/retrieve.php',
 //  contentType: 'application/json',
 //  dataType: 'json',
    processData: false,
	 data: arr,
// data: JSON.stringify(urls),
//    data: { js_array: arr },
	  type: "POST",
	  cache: false,
      error: function(xhr, desc, err) {
 //     console.log(err);                                        ///////////////////////////////////////////////////
  //      console.log("Details: " + desc + "\nError:" + err);      ///////////////////////////////////////////////////
      },
	  success: function(msg) {
   // console.log("got it done!");
	  }
    }); // end $.ajax return call
}         // end of theAjax
}   //end of Ajax()
    
 // This takes care of data once returned from Server:
	function processData(returnedstuff /*}textStatus, jqXHR*/) {
console.log(returnedstuff);
//	var response = returnedstuff;
var response = JSON.parse(returnedstuff);
//	console.log("this here is the JSONparsed response:");
   //console.log(response.data.senfData);
//  var senfURL = response.data.senfData;
var senfURL = response.data.senfURLData;
var senfTitle = response.data.senfTitleData;
// console.log(senfURL);
// console.log(senfTitle);

// console.log(senfURL);
   //     senfData = returnedstuff.data[0];
  if (senfURL) {
      
  //    console.log(senfURL);
     globalSenf=senfURL;
      globalSenfTitle=senfTitle;
  }
  if (Senf != globalSenf) {
      Senf = globalSenf;     
      updateIcon(Senf);
      letsDoThis(Senf, senfTitle);
     
  }  // end if/senfURL    
 }   // end ProcessData

 //////////////////////////////////////////////////////////////////////////////////////////////////////

var currentTab; 

function updateIcon(senfURL) {
    chrome.browserAction.setIcon({
  path: senfURL ? {
      19: "icons/senf19.png",
      48: "icons/senf48.png"
    } : {
      19: "icons/senf19empty.png",
      48: "icons/senf48empty.png"
    },
    tabId: currentTab.id
  });
  chrome.browserAction.setTitle({     
    // Screen readers can see the title
     title: senfURL ? Senf : globalSenfTitle,
    tabId: currentTab.id
  }); 
}    ////////////////////////////// end updateIcon

function letsDoThis(Senf, globalSenfTitle) {
	chrome.notifications.create(Senf, {
        "type": "basic",
        "title": globalSenfTitle,
        "message": Senf,
        "iconUrl": "icons/senf48.png"
    }, function(Senf) { });
	
}

chrome.notifications.onClicked.addListener(function(Senf)  {
	chrome.tabs.create({url: Senf});
	})
/*

var list = document.querySelectorAll( "a" );
// console.log("I am here");
for ( var i = 0; i < list.length; i ++)
list.item(i).onmouseover = function() { console.log(this.href ) };
*/


var currentURL;
function retrieveVar1() {Ajax(currentURL)}

function updateActiveTab(tabs) {

  function sitesOfInterest(urlString) {
    var domains = ["spiegel.de/", "bento.de/", "sponspin.org/"];
        
    return domains.indexOf(urlString);
  }
     var currentURL1;
 ////////////////////////////////////////////////////////////////////////////////////////
     
///////////////////////////////////////////////////////////////////////////////////////////   
      
 function retrieveVar() {currentURL = currentURL1; retrieveVar1(currentURL);}
 function updateTab(tabs) {   
    if (tabs[0]) {
      currentTab = tabs[0];
  //      console.log(currentTab.id);
   //      console.log(currentTab.index);  
     
      if (sitesOfInterest(currentTab.url)) {
  //  console.log("SENF works great with the " + currentTab.url + " URL.")
          currentURL1 = currentTab.url;
           var currentTitle = currentTab.title;  
          retrieveVar(currentURL1);
   updateIcon();
   
     } else {
       // console.log("SENF does not support the " + currentTab.url + " URL.")
      }
    }
  }

 chrome.tabs.query({active: true, currentWindow: true}, updateTab );

}

// listen to tab URL changes
 chrome.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
 chrome.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
  chrome.windows.onFocusChanged.addListener(updateActiveTab);

// update when the extension loads initially
 updateActiveTab();
  // console.log(currentURL);  

