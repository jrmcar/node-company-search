const path = require('path')
const express = require('express')
const hbs = require('hbs')
const googleSearch = require('./utils/googleSearch')
const googlePlace = require('./utils/googlePlace')
const entrepriseSearch = require('./utils/entrepriseSearch')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Company search',
        name: 'Jérémy Carpentier'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the app',
        name: 'Jérémy Carpentier'
    })
})

app.get('/infos', (req, res) => {

    // SEARCH BY SIREN CODE
    if(req.query.siren){

        entrepriseSearch(req.query.siren, (error, entrepriseData = {}) => {
            if(error){
                return res.send({ error })
            }

            googleSearch(entrepriseData.denomination, entrepriseData.code_postal, entrepriseData.libelle_commune, (error, googleSearchData = {}) => {
                if(error){
                    return res.send({ error })
                }

                googlePlace(googleSearchData.place_id, (error, googlePlaceData = {}) => {
                    if(error){
                        return res.send({ error })
                    }

                    return res.send({
                        address: googlePlaceData.address,
                        phone_number: googlePlaceData.phone_number,
                        name: googlePlaceData.name
                    })
                })
            })
        })
    }else{
        // NO COMPANY NAME
        if(!req.query.search){
            return res.send({
                error: 'Company name must be provided'
            })
        }

        // COMPANY NAME SEARCH
        googleSearch(req.query.search, req.query.postal, '', (error, googleSearchData = {}) => {
            if(error){
                return res.send({ error })
            }

            googlePlace(googleSearchData.place_id, (error, googlePlaceData = {}) => {
                if(error){
                    return res.send({ error })
                }

                return res.send({
                    address: googlePlaceData.address,
                    phone_number: googlePlaceData.phone_number,
                    name: googlePlaceData.name
                })
            })
        })
    }

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Jérémy Carpentier',
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})