const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit' , (e)=> {
    e.preventDefault()  
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address=' + search.value).then((response)=> {
        response.json().then((data)=> {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                console.log(data)
                messageOne.textContent = data.place 
                messageTwo.textContent = data.forecast  
            }
        })
    })
    // console.log(search.value)
})