chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

    // element picker (color div to red)
    if(msg.action){
        let query = msg.action;
        qarr = query.split(":");

        if(qarr[1]){
          el = $(qarr[0])[qarr[1]];
        }else{
          el = $(qarr[0])[0];   //[0] query obj to DOM element.
        }

        selectedElementPos = el.getBoundingClientRect();
        elementPicker.show();
        elementPicker.css({
            top:   (selectedElementPos.top),
            left: (selectedElementPos.left),
            width: (selectedElementPos.width),
            height: (selectedElementPos.height)
        });
    }

    // get element picker code
    if(msg.source){
        // e.g. msg.source = .class:3 or #id
        qarr = msg.source.split(":");
        if(qarr[1]){
          el = $(qarr[0])[qarr[1]];
        }else{
          el = $(qarr[0])[0];   //[0] jquery obj to DOM element.
        }

        // get css in <head>
        let allLinkElement = window.document.getElementsByTagName('link');
        let sourceCode = '<head>\n';
        for(let link of allLinkElement){
            let linkhref = $(link).attr("href");
            if(linkhref.search("http") < 0){
              let url = window.location.href + linkhref;
              $(link).attr("href",url);
            }
            sourceCode += link.outerHTML;
            sourceCode += "\n";
        }
        sourceCode += "</head>\n";
        console.log(sourceCode);

        let copySourceCode = $(el).clone();
        imgArr = $(copySourceCode).find('img');
        for(let img of imgArr){
           //change img path to url
           imgHostNameSrc = window.location.protocol + "//" + window.location.hostname + $(img).attr('src');
           $(img).attr('src',imgHostNameSrc);
        }
        sourceCode += $(copySourceCode).get(0).outerHTML;
        
        // send selected div code to popup.js
        sendResponse(sourceCode); 

    }

});

if(elementPicker){
    console.log('elementPicker is exist');
}else{
    var elementPicker = $("<div id='elementrect'></div>").appendTo("body");
    elementPicker.css({"border":"solid 1px red", "background": "rgba(255, 0, 0, .3)",
                       "position":"fixed", "transition":"all 200ms ease", "z-index": "10000"});
}

$(window).scroll(function(){
	//hide elementPicker when scrolling.
	elementPicker.hide();
});

