import {eventFire,showOutputMessage} from './utils.mjs';

let allWeatherDataElem = {
    summary: document.querySelector('#weather_data-summary'),
    place: document.querySelector('#weather_data-location'),
    temperature: document.querySelector('#weather_data-temperature'),
    rainChance: document.querySelector('#weather_data-rainChance'),
}

document.querySelector('input[type="button"').addEventListener('click',function(event){
    event.stopPropagation()
    let address = document.querySelector('input[type="text"').value
    if(address!==''){
        document.querySelector('input[type="text"').value = ''
        this.value = 'Wait!'
        this.disabled = true
        fetch(`http://localhost:3000/weather?address=${address}`)
        .then((res)=>{
            res.json().then(data=>{
                this.disabled = false
                this.value = 'GO!'
                if(!data.error){
                    for(let key in allWeatherDataElem){
                        allWeatherDataElem[key].innerText = data[key]
                    }
                    showOutputMessage('Success!')
                }else{
                    showOutputMessage(data.error);
                }
            })
        }).catch(err=>{
            showOutputMessage(err);
        })
    }else{
        showOutputMessage('Please provide a location');
    }
})

document.querySelector('input[type="text"').addEventListener('input',function(e){
    for(let key in allWeatherDataElem){
        allWeatherDataElem[key].innerText = ''
        showOutputMessage('No outcome yet!')
    }
})

document.querySelector('body').addEventListener('keydown',(event)=>{
    if(event.keyCode==13){
        eventFire(document.querySelector('input[type="button"'),'click')
    }
})