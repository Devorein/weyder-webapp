const eventFire = function(el, etype){
    if (el.fireEvent) {
            el.fireEvent('on' + etype);
    } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
    }
}

const showOutputMessage = function(msg){
    const outputElem = document.getElementById('outputMessage');
    if(msg == 'Success!'){
        outputElem.textContent = msg
        outputElem.style.color = '#04cc04'
    }else if(typeof(message)=='object'){
        outputElem.textContent = msg.error
        outputElem.style.color = '#e80e0e'
    }else if(msg == 'No outcome yet!'){
        outputElem.textContent = msg
        outputElem.style.color = '#b3b3b3'
    }
    else{
        outputElem.textContent = msg
        outputElem.style.color = '#e80e0e'
    }
}

export {eventFire,showOutputMessage};