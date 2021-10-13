const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
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

const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const PASSWORD = 'yWw1Rr3feu6Do9FE'
const MONGODB_URI = `mongodb+srv://abe:${PASSWORD}@cluster0.3m1uj.mongodb.net/shop`

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI

})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// app.use(async (req, res, next) => {
//   try{
//     const user = await User.findById('615ff5d6c718abef863ec747')
//     req.user = user
//     next()
//   }catch(e) {
//     console.log(e)
//   }
// })


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/add-course', addCourseRoutes)
app.use('/courses', coursesRoutes)
app.use('/settings', settingsRoutes)
app.use('/card', basketRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', loginRoutes)

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await mongoose.connect( MONGODB_URI, {
      useNewUrlParser: true,
      // useFindAndModify: false
    })
    // const candidate = await User.findOne()
    // if (!candidate) {
    //   const user = new User({
    //     email: 'abe@test.ua',
    //     name: 'Alex',
    //     cart: {items: []}
    //   })
    //   await user.save()
    // }
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()




