$('#downloadVue').click(function(){
    downloadHTML = $('#sourceCodeArea').clone();
    downloadHTMLContent = $(downloadHTML).find("div,footer").get(0); // get code areaa first div.
    let allSub = $(downloadHTMLContent).find("*");
    for(let subele of allSub){
        // remove contentEditable attritube.
        $(subele).removeAttr("contentEditable");
    }
    // replace <jt-v> to {{jtv#}}
    let jt_v =  $(downloadHTMLContent).find("jt-v");
    let count_jtv = 0, count_jtfor = 0;
    let data_jtv = {};
    for(let jtv of jt_v){
        let varName = "jtv" + count_jtv;
        jtv.outerHTML = "{{" + varName + "}}";
        data_jtv[varName] = $(jtv).text();
        count_jtv += 1;
    }
    //replace <jt-for> to <tag v-for="jtfor in jtforData#">{{jtfor}}</tag>
    let jt_for = $(downloadHTMLContent).find("jt-for");
    
    let data_jtfor = {};
    for(let jtfor of jt_for){
        let jtforArr = "jtforData"+ count_jtfor;
        data_jtfor[jtforArr] = forLoopData[$(jtfor).text()];
        $(jtfor).parent().attr("v-for", "jtfor in " + jtforArr);
        jtfor.outerHTML = "{{jtfor}}";
        count_jtfor += 1;
    }
    console.log(data_jtfor);

    // related css file 
    let downloadHTMLCSS = $(downloadHTML).find('link');
    let link = [];
    for(let linkhref of downloadHTMLCSS){
        link.push($(linkhref).attr('href'));
    }
    let vueCode = `
    <template lang="html">
    ${downloadHTMLContent.outerHTML}
    </template>
    <script lang="js">
    export default  {
        name: 'extract-template',
        props: [],
        mounted() {},
        data() {
        return {
          ${Object.keys(data_jtv).map((valName, val) => valName + ":'" + data_jtv[valName] + "'")} ${!$.isEmptyObject(data_jtv) ? ',' : ''} 
          ${Object.keys(data_jtfor).map((valName, val) => valName + ":['" + data_jtfor[valName].join("','") + "']")}
        }  
        },
        methods: {},
        computed: {}
    }
    </script>
    <style scoped lang="css">
        ${link.map((lnk,i) => '@import "' + lnk + '";').join("\n")}
    </style>
    `
    download('extractTemplate.vue',vueCode); // download()
    // console.log(vueCode);
});


let data = {};
let forLoopData = {};
// if it is attribute with contneteditable add click listener.
$('[contenteditable]').on('click', function(){
    data.selectedDiv = this;
    data.selectedText = window.getSelection ? "" + window.getSelection() : document.selection.createRange().text;
    $('#popupTitle').text(data.selectedText); // put selected text to popup title.
    if(data.selectedText != ''){
        $('#popup').modal('show');
    }
    data.matchFullText = $(this).text() == data.selectedText;
    console.log(data);
})
// click save and wrap edited element with selected label.
$('#save').on('click', function(){
    let selectedLabel = $('#labelSelected').find(':selected').text();

    if(data.matchFullText){ // all selected text are matching selected div text.
        if(selectedLabel == "Variable" && checkSameLabel("jt-v")){
            $(data.selectedDiv).wrapInner("<jt-v></jt-v>");
        }else if(selectedLabel == "For Loop" && checkSameLabel("jt-for")){
            $(data.selectedDiv).wrapInner("<jt-for></jt-for>");
            let dataArr = $('#insertFor input').map(function(){return $(this).val();}).get();
            // data['forLoopData'][data.selectedText] = forLoopData;
            forLoopData[data.selectedText] = dataArr;
            console.log(forLoopData);
        }else{
            alert('already have label.');
        }
    }else{ //selected sub text in selected div.
        if(selectedLabel == "Variable" && checkSameLabel("jt-v")){
            $(data.selectedDiv).html(function(_,html){
                let afterLabel = "<jt-v>" + data.selectedText + "</jt-v>";
                return html.replace(data.selectedText,afterLabel);
            })
        }else if(selectedLabel == "For Loop" && checkSameLabel("jt-for")){
            $(data.selectedDiv).html(function(_,html){
                let afterLabel = "<jt-for>" + data.selectedText + "</jt-for>";
                return html.replace(data.selectedText,afterLabel);
            })
        }else{
            alert("already have label.");
        }
    }

    $('#popup').modal('hide'); // hide the modal.
})
//return if there are <label> outsize selectedDiv.
function checkSameLabel(label){ 
    // if already have label return false.
    return $(data.selectedDiv).has(label).length == 0;
}

$('#for-data-wrapper').hide();
// popup label selected control
$('#labelSelected').on('change',function(){
    $('#for-data-wrapper').hide();
    let selected = $(this).val();
    if(selected == "var"){
        console.log('var');
    }else if(selected == "for"){
        $('#for-data-wrapper').show();
        
    }else{
        console.log('else');
    }
})

// for loop data array event.
$(document).on('click', '.btn-add-row', function(){
    $('#insertFor').append(`
    <div class="input-group mb-3 for-data-row">
      <div class="input-group-prepend">
        <button class="btn btn-outline-secondary btn-remove-row" type="button">X</button>
      </div>
      <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
    </div>`);
})
$(document).on('click', '.btn-remove-row', function(){
    let idx = $('.btn-remove-row').index(this);
    $('.for-data-row').eq(idx).remove();
})