const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
const msg3 = document.querySelector('#message-3')

function GoToHomePage(){
  window.location = '/';   
}

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    document.getElementById('message-1i').style.display = "inline";
    document.getElementById('message-2i').style.display = "inline";
    fetch('/weather?search='+location).then((response) => {
        response.json().then((data)=>{
            if (data.error) {
                msg1.textContent=data.error
                console.log(data.error)
            } else {
                msg1.textContent= data.Location
                msg2.textContent=data.Forecast.temperature
                msg3.textContent=data.Forecast.summary
                
               
                
            }
        })
    })
})