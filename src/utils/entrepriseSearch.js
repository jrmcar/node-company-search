const request = require('request')

const entrepriseSearch = (siren, callback) => {

    const url = 'https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/'+ encodeURIComponent(siren)

    request({ url, json: true}, (error, {body:response}) => {
        if(error){
            callback('Unable to connect to entreprise.data.gouv API service !')
        }else if(response.message === 'no results found'){
            callback('Unable to find company by SIREN code. Try another search.')
        }else{
            callback(undefined, {
                denomination: response.unite_legale.denomination,
                code_postal: response.unite_legale.etablissement_siege.code_postal,
                libelle_commune: response.unite_legale.etablissement_siege.libelle_commune
            })
        }
    })
}

module.exports = entrepriseSearch