const request = require('request')

const googleSearch = (search, postal_code, city, callback) => {
    const searchString = `${search} ${postal_code} ${city}`
    const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyBsb9AM3N82PvbTSnL4g1OIJuAG2918jbg&input='+ encodeURIComponent(searchString) +'&inputtype=textquery'

    request({ url, json: true}, (error, {body:response}) => {
        if(error){
            callback('Unable to connect to Google API service !')
        }else if(response.status === 'ZERO_RESULTS'){
            callback('Unable to find company. Try another search.')
        }else{
            callback(undefined, {
                place_id: response.candidates[0].place_id,
            })
        }
    })
}

module.exports = googleSearch