let sourceCode = localStorage.getItem('source');
document.querySelector("#sourceCodeArea").innerHTML = sourceCode;
let codeArea = document.getElementById("sourceCodeArea");
let firstDivElement = $(codeArea).find('div,footer').get(0);
let cleanHTMLSocurce = $('#sourceCodeArea').clone();

function download(filename, source){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(source));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
//click download HTML event.
$('#downloadHTML').click(function(){
    let HTMLSource = cleanHTMLSocurce.get(0).outerHTML;
    download('element.html', HTMLSource);
});

//======================
//   global variables.
//======================
let target;    // click element
let data = {}; //after edit label&attr and click save, save them to data.
let replaceable = true;
//======================
//   event handler.
//======================
$(firstDivElement).click(function(e){
    target = e.srcElement || e.target;
    $('#ElementName').text(target.tagName);
    switch(target.tagName){
        case "IMG": case "UL": case "LI":
            $("#elementValue").hide();
            $('#popup').modal('show');
            replaceable = false;
            break;
        case "BUTTON": case "P": case "SPAN": case "I": case "B":
        case "H1": case "H2": case "H3": case "H4": case "H5": case "H6":
            $("#elementValue").show();
            $("#popupInput").val($(target).contents().get(0).nodeValue);
            $('#popup').modal('show');
            replaceable =  true;
            break;    
        default:
            alert("Unknwon tag name.")
    }
})
//when click modal(popup) save event.
$("#save").click(function(e){
    e.stopPropagation();
    //get val
    let val = $("#popupInput").val();
     
    //replace value with new input value (img isn't replaceable.)
    if(replaceable){
        $(target).contents().get(0).nodeValue = val;
    }

    //get attribute save to attrObj.
    let attrObj = {};
    let attrNameArr  = $('#attr-group').find("input:text:even").map(function(){return this.value;}).get()
    let attrValueArr = $('#attr-group').find("input:text:odd").map(function(){return this.value;}).get()
    attrNameArr.map((name, idx) => {if(name != ''){attrObj[name] = attrValueArr[idx]}})

    //get label.
    let lableSelected = $('#labelSelected').find(":selected").val();

    // if element is LI, change target to UL.
    if(target.tagName == "LI"){
        target = $(target).parent().get(0);
    }

    //save data to global variable: data
    let key = Object.keys(data).length + 1;  //assign primary key to save obj.
    //check if element's pos is already in data. if not: create new data, if yes: update data.
    let exist = {'isExist': false, 'pos': ''};
    for(let k of Object.keys(data)){
        if(data[k].pos == target){
            exist.isExist = true;
            exist.pos = k;
        }
    }
    if(exist.isExist){
        console.log('update');
        data[exist.pos] = {'pos': target, 'element': target.tagName, 'label':lableSelected, 'attr': attrObj, 'val': val};
    }else{
        console.log('create data');
        data[key] = {'pos': target, 'element': target.tagName, 'label':lableSelected, 'attr': attrObj, 'val': val};
    }
    console.log(data);

    //hide modal and clear input.
    $('#popup').modal('hide');
    $('#popupInput').val("");
    cleanAttrInput();

})

//add attribute input field
$("#addAttr").click(function(){
    $(".input-group:first").clone().find("input:text").val("").end().insertAfter('div.input-group:last');    
})
//remove attibute input field
$('#subAttr').click(function(){
    if($(".input-group").siblings().length > 1){
        $(".input-group").last().remove();
    }
})
$('#downloadPreformat').click(function(){
    console.log('download preformat.');
    createPreformat();
    download('index.html', firstDivElement.outerHTML)
})
let jsframework = '';
$('#downloadAngular').click(function(){
    jsframework = 'angular';
    createPreformat();
    $('#componentNameModal').modal('show');

})
$('#downloadReact').click(function(){
    jsframework = 'react';
    createPreformat();
    $('#componentNameModal').modal('show');
})
$('#downloadVue').click(function(){
    jsframework = 'vue';
    createPreformat();
    $('#componentNameModal').modal('show');
})

$('#componentNameModalSave').click(function(){
    $('#componentNameModal').modal('hide');
    if(jsframework == 'angular'){
        downloadAngular();
    }else if(jsframework == 'react'){
        downloadReact();
    }else if(jsframework == 'vue'){
        downloadVue();
    }else{
        console.log('error.');
    }
})
function downloadAngular(){
    CName = $('#CName').val();
    //iterate data obj.
    let varObj = {};
    let ulObj = {};
    for(let k of Object.keys(data)){
        if(data[k].label == "jt-v"){ //collect jt-v
            varObj[k] = data[k];
        }else if(data[k].label == "jt-ul"){
            ulObj[k] = data[k];
        }else{
            console.log("other.");
        }
    }

    //replace <jt-v></jt-v> to {{var#num}}
    $.each(varObj, function(i, v){
        //remove jt-v element
        if($(v.pos).parent().is("jt-v")){
            $(v.pos).unwrap();
        }
        replaceText = "{{var" +i + "}}";
        $(v.pos).contents().last().replaceWith(replaceText);
    })
    //replace <jt-ul> to ul template.
    let uldata = [];
    $.each(ulObj, function(i, obj){
        //remove jt-ul
        if($(obj.pos).parent().is("jt-ul")){
            $(obj.pos).unwrap();
        }
        let ul = $(obj.pos);
        let liArr = ul.find('li').get();
        //collect elements data.
        for(let i = 0; i < liArr.length; i++){
            console.log(liArr[i]);
            let lidata = [];
            $('img,span,p', liArr[i]).each(function(){
                if(this.tagName == "IMG"){
                    lidata.push(this.src);
                }else{
                    lidata.push(this.textContent);
                }
            })
            uldata.push(lidata);
        }
        ul.empty().append(liArr[0]);
        ul.find('li').attr('_ngDirectivefor_', "let d of data");
        let c = 0;
        $('img,span', ul).each((idx,item) => {
            if(item.tagName == "IMG"){
                item.src = `{{d[${c}]}}`;
            }else{
                item.textContent = `{{d[${c}]}}`;
            }
            c += 1;
        })
        console.log(uldata);
    })
    //create angular file.
    let source = `import { Component, OnInit } from '@angular/core';
    @Component({
      selector: 'app-${CName}',
      template: \`  
        ${codeArea.outerHTML}
      \`
    })
    export class ${CName} implements OnInit {
      ${Object.keys(varObj).map((k,i) => ('var'+(i+1)+' = "'+varObj[k].val +'";')).join('\n\t  ')}
      data = ${JSON.stringify(uldata)};
      constructor() { }
      ngOnInit() { 
      }
    }`;

    //change __ngdirective__ to *ngFor , * is not avaliable at element attribute.
    source = source.replace(new RegExp("_ngdirectivefor_", 'g'), "*ngFor");
    download(CName+'.component.ts', source);
    // console.log(codeArea);
    location.reload();
}
function downloadReact(){
    CName = $('#CName').val();
    //call ./lib/htmltojsx.js htmltojsx() function to translate html to jsx.
    // let jsxcode = htmltojsx(codeArea.innerHTML);
    // codeArea.innerHTML = jsxcode;
    //iterate data obj.
    let varObj = {};
    let ulObj = {};
    for(let k of Object.keys(data)){
        if(data[k].label == "jt-v"){ //collect jt-v
            varObj[k] = data[k];
        }else if(data[k].label == "jt-ul"){
            ulObj[k] = data[k];
        }else{
            console.log("other.");
        }
    }
    //replace <jt-v></jt-v> to {{var#num}}
    $.each(varObj, function(i, v){
        //remove jt-v element
        if($(v.pos).parent().is("jt-v")){
            $(v.pos).unwrap();
        }
        replaceText = "_reactvariable_var" + i;
        $(v.pos).contents().last().replaceWith(replaceText);
    })
    //replace <jt-ul> to ul template.
    let uldata = [];
    $.each(ulObj, function(i, obj){
        //remove jt-ul
        if($(obj.pos).parent().is("jt-ul")){
            $(obj.pos).unwrap();
        }
        let ul = $(obj.pos);
        // ul.attr('class', 'myul');
        let liArr = ul.find('li').get();
        //collect elements data.
        for(let i = 0; i < liArr.length; i++){
            let lidata = [];
            $('img,span,p', liArr[i]).each(function(){
                if(this.tagName == "IMG"){
                    lidata.push(this.src);
                }else{
                    lidata.push(this.textContent);
                }
            })
            uldata.push(lidata);
        }
        ul.empty().append(liArr[0]);
        // ul.find('li').attr('_ngDirectivefor_', "let d of data");
        let c = 0;
        $('img,span', ul).each((idx,item) => {
            if(item.tagName == "IMG"){
                item.src = `_reactvariable_ul${c}`;
            }else{
                item.textContent = `_reactvariable_ul${c}`;
            }
            c += 1;
        })
        // codeArea.innerHTML = htmltojsx(codeArea.outerHTML);
        // let copytmp = htmltojsx(ul.get(0).outerHTML);
        // $('ul').get(0).innerHTML =  `{this.data.map(d _reactvariable_arrow ${copytmp})}`;
        ul.find('li').attr('_reactkey_','');
        let li_text = ul.find('li').get(0).outerHTML;
        ul.find('li').replaceWith("_reactfor_start" + li_text + "_reactfor_end");
    })

    let source = `
    import React, { Component } from 'react';
    export default class ${CName} extends Component {
        ${Object.keys(varObj).map((k,i) => ('var'+(i+1)+' = "'+varObj[k].val +'";')).join('\n\t  ')}
        data = ${JSON.stringify(uldata)};
        render() {
            return (
                ${htmltojsx(codeArea.outerHTML)}
            )
        }
    }
    `;
    // black magic?
    source = source.replace(/_reactvariable_var(\d{1})/g, "{this.var$1}");
    source = source.replace(/"_reactvariable_ul(\d{1})"/g, "_reactvariable_ul$1");
    source = source.replace(/_reactvariable_ul(\d{1})/g, "{d[$1]}");
    source = source.replace(/_reactkey_/g, "key={i}");
    source = source.replace(/_reactfor_start/, "{this.data.map((d,i) => ");
    source = source.replace(/_reactfor_end/, ")}");

    download(CName+'.js', source);
    // console.log(source);
    location.reload();
}
function downloadVue(){
    CName = $('#CName').val();
    //iterate data obj.
    let varObj = {};
    let ulObj = {};
    for(let k of Object.keys(data)){
        if(data[k].label == "jt-v"){ //collect jt-v
            varObj[k] = data[k];
        }else if(data[k].label == "jt-ul"){
            ulObj[k] = data[k];
        }else{
            console.log("other.");
        }
    }
    //replace <jt-v></jt-v> to {{var#num}}
    $.each(varObj, function(i, v){
        //remove jt-v element
        if($(v.pos).parent().is("jt-v")){
            $(v.pos).unwrap();
        }
        replaceText = "{{var" +i + "}}";
        $(v.pos).contents().last().replaceWith(replaceText);
    })
    //replace <jt-ul> to ul template.
    let uldata = [];
    $.each(ulObj, function(i, obj){
        //remove jt-ul
        if($(obj.pos).parent().is("jt-ul")){
            $(obj.pos).unwrap();
        }
        let ul = $(obj.pos);
        let liArr = ul.find('li').get();
        //collect elements data.
        for(let i = 0; i < liArr.length; i++){
            console.log(liArr[i]);
            let lidata = [];
            $('img,span,p', liArr[i]).each(function(){
                if(this.tagName == "IMG"){
                    lidata.push(this.src);
                }else{
                    lidata.push(this.textContent);
                }
            })
            uldata.push(lidata);
        }
        ul.empty().append(liArr[0]);
        ul.find('li').attr('v-for', "d in data");
        let c = 0;
        $('img,span', ul).each((idx,item) => {
            if(item.tagName == "IMG"){
                // item.src = `{{d[${c}]}}`;
                $(item).removeAttr('src');
                $(item).attr(':src', `d[${c}]`);
            }else{
                item.textContent = `{{d[${c}]}}`;
            }
            c += 1;
        })
        console.log(uldata);
    })
    let source = `
    <template lang="html">
      ${codeArea.outerHTML}
    </template>
    
    <script lang="js">
        export default  {
        name: '${CName}',
        props: [],
        mounted() {
    
        },
        data() {
            return {
                ${Object.keys(varObj).map((k,i) => ('var'+(i+1)+' : "'+varObj[k].val +'",')).join('\n\t  ')}
                data : ${JSON.stringify(uldata)}
            }
        },
        methods: {
    
        },
        computed: {
    
        }
    }
    </script>
    <style scoped lang="css">
    </style>
    `
    download(CName+'.vue', source);
    // console.log(source);
    location.reload();
}
//======================
//     function.
//======================
function cleanAttrInput(){
    //clone first template and then empty old, append clone.
    let cleanInputField = $(".input-group:first").clone().find("input:text").val("").end();
    $('#attr-group').empty();
    $('#attr-group').append(cleanInputField);
}