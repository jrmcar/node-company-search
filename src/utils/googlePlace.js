const request = require('request')

const googlePlace = (place_id, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id='+ encodeURIComponent(place_id) +'&fields=name,formatted_phone_number,formatted_address&key=AIzaSyBsb9AM3N82PvbTSnL4g1OIJuAG2918jbg'

    request({ url, json: true}, (error, {body:response}) => {
        if(error){
            callback('Unable to connect to Google API service !')
        }else if(response.status === 'INVALID_REQUEST'){
            callback('Error place_id. Contact your local administrator')
        }else{
            callback(undefined, {
                address: response.result.formatted_address,
                phone_number: response.result.formatted_phone_number,
                name: response.result.name,
            })
        }
    })
}

module.exports = googlePlace