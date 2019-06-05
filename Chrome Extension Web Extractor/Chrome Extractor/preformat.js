//when click download pre-format
//$('#downloadPreformat').click

function createPreformat(){
    //read data and replace original element with custom defined label, like <jt-v></jt-v> ...
    for(let k of Object.keys(data)){
        let pos = $(data[k].pos);
        let ifWrap = $(data[k].pos).parent(data[k].label).length; // 0 -> n , 1 -> y
        let tagName = "<" + data[k].label + "/>";
        let attr = data[k].attr;

        //create custom defined element <jt-v attr1=val1></jt-v>
        let label = $(tagName, {
            attr
        }).get(0);
        if(!ifWrap){
            $(data[k].pos).wrap(label);
        }else{
            console.log('already have label');
        }
        
    }
}