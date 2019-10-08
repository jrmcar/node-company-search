const searchForm = document.querySelector('form')
const search = document.querySelector('#search')
const postal_code = document.querySelector('#postal_code')
const siren_code = document.querySelector('#siren_code')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchString = search.value
    const postalString = postal_code.value
    const sirenString = siren_code.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('/infos?search='+searchString+'&postal='+postalString+'&siren='+sirenString).then((response) => {
    response.json().then((data= {}) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.name
            messageTwo.textContent = data.address
            messageThree.textContent = data.phone_number
        }
    })
})
})

