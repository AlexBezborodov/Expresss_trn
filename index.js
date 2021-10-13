const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const addCourseRoutes = require('./routes/addCourse')
const coursesRoutes = require('./routes/courses')
const settingsRoutes = require('./routes/settings')
const basketRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const User =require('./models/user')
const loginRoutes = require('./routes/auth')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
  try{
    const user = await User.findById('615ff5d6c718abef863ec747')
    req.user = user
    next()
  }catch(e) {
    console.log(e)
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add-course', addCourseRoutes)
app.use('/courses', coursesRoutes)
app.use('/settings', settingsRoutes)
app.use('/card', basketRoutes)
app.use('/orders', ordersRoutes)
app.use('/login', loginRoutes)

const PORT = process.env.PORT || 5000
const PASSWORD = 'yWw1Rr3feu6Do9FE'
const URL = `mongodb+srv://abe:${PASSWORD}@cluster0.3m1uj.mongodb.net/shop`
async function start() {
  try {
    await mongoose.connect( URL, {
      useNewUrlParser: true,
      // useFindAndModify: false
    })
    const candidate = await User.findOne()
    if (!candidate) {
      const user = new User({
        email: 'abe@test.ua',
        name: 'Alex',
        cart: {items: []}
      })
      await user.save()
    }
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()




