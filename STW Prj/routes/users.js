const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    //auerry parameter
    console.log(req.query.name)
    res.send('User List')
})

router.get('/new', (req, res) => {
    //res.send("User New Form")
    res.render("users/new", { firstName: "Test" })
})

router.post('/', (req, res) => {
    //res.send('Create User')
    const isValid = true
    if (isValid){
        users.push({firstName: req.body.firstName })
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("Errore")
        res.render('users/new', { firstName: req.body.firstName })
    }
    console.log(req.body.firstName)
    res.send("Hi")
})

//update version / mohre easier that creating get.put.delete seperatlly/ chaine down every thing/ gather every thing / define our route in only one location 
router
.route("/:id")
.get((req, res) => {
    console.log(req.user)
    res.send(`GET User With ID ${req.params.id}`)
})
.put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`)
})
.delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`)
})

//define params/ run every time it finds a param that matches the name you pass in 
  const users = [{ name: "Nouha"}, { name: "Afaf"}]
router.param("id", (req, res, next, id) =>{
   req.user = users[id]
    next()
})

module.exports =  router