//console.log("H")
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')


app.set('view engine', 'ejs')
// app.set('layout', 'layouts/layout')
// app.use(expressLayouts)
app.use(express.static('public')) //Middleware 
app.use(express.urlencoded({ extended: true })) //access info coming from forms (Middleware)
app.use(express.json()) //Posting jason informations to your server // works whenever we make a json request (Ex: making a fetch from the client to the server when caling an api, it will allow you to parse json information from the body)


//app.use(logger) //use miggleware / printing the Url (top to bottom) /use it at the top to run everywhere / we can use it in the router but it will only define the user page not the home page bcz the route are only defined for the user
app.get('/', logger, (req, res) => {
    console.log('Here')
    res.render('index', { text: 'World'})
    //res.status(500).send("Hi")
    //res.send('Hi')
})

const userRouter = require('./routes/users')

app.use('/users', userRouter)

//Middleware
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.listen(3000)