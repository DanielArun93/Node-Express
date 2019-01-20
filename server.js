const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine','hbs');

//code reusability of HTML
hbs.registerPartials(__dirname + '/views/partials');

//code reusability of functions
hbs.registerHelper('getyear',() => {
    return new Date().getFullYear()
})

hbs.registerHelper('upperCase',(text) => {
    return text.toUpperCase()
})

app.use((req,res,next) => {
    debugger;
    var log = new Date();
    fs.appendFile('request.log',`${log} - ${req.method} - ${req.url}` + '\n',(error) => {
        if(error){
            console.log("Unable to create Log");
        }
        else{
            console.log("Log created Successfully");
        }
    })
    console.log(`${log} - ${req.method} - ${req.url}`);
    next();
})

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send("Hi express");

    res.render('home.hbs',{
        Title:"Help Page",
        Content:"This is Home Page"
        //GetYear: new Date().getFullYear()
    });
})

app.get('/about', (req, res) => {
    //res.send("Hi About");

    res.render('about.hbs',{
        Title:"About Page",
        Content:"This is About Page"
        //GetYear: new Date().getFullYear()
    });
})

app.listen(port,(err) => {
if(err){
    console.log(err);
}
else{
    console.log(`Server opened at Port ${port}`);
}
});

