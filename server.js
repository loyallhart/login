const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

const users = []


app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', async (req, res) => {
  const user = users.find(user => user.email === req.body.email)
  if (user == null) {
    return res.status(400).send('User not found')
  }
  try {
   if(await bcrypt.compare(req.body.password, user.password)) {
   res.render('dashboard.ejs')
   }
  } catch {
    res.status(500).send('error')
  }
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        //res.status(200).send('Good')
        res.redirect('login')
    } catch {
        res.redirect('register.ejs')
    }
    console.log(users)
})

//app.get('/dashboard', (req, res) => {
 //   res.render('dashboard.ejs')
//})

app.listen(3000)
console.log("listening on port 3000")

