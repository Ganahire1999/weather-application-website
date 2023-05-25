const express = require('express');
const hbs = require ("hbs");
const path = require("path");

const weatherData = require('../utils/weatherData');
const app = express();

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, '../public')

/*create verible*/
/* standart way to getting  the particular path of partical
directory in our code */

const viewsPath = path.join(__dirname, '../templetes/views');
const partialsPath = path.join(__dirname,'../templetes/partials');

/* standart way to getting  the particular path of partical
directory in our code */

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));




app.use(express.static(publicStaticDirPath)); /*  declere publicStaticDirPath*/


/* first api  end points*/
app.get('',(req, res) =>{
    res.render('index',{
        title:'Weather Application #Ganesh '
    })

})



/* second api end points */
/*localhost:3000/weather?address=nashik  */
app.get('/weather',(req, res) => {
    const address= req.query.address

    //if we search with out name then show output
    if(!address){
        return res.send({
            error:"You must enter address in text box"
        })
    }
 


    weatherData(address,(error,{temperature , description ,cityName}) => {
        if(error){
            return res.send({        // we are not write else statement
                error                 // for that reason I write return statements
            })
        }

        console.log(temperature,description,cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});





/* third api */
app .get("*",(req, res) =>{
    res.render('404',{
        title:" page not found."
    })
})



/* fourth api */

app.listen(port, () => {
    console.log("server is up and running on port: ", port);

})
