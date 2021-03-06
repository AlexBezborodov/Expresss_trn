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
const csrf = require('csurf');
const flash =require('connect-flash')
const keys = require('./keys')
const errorHandler = require('./middleware/error')
const profileRoutes = require('./routes/profile')


const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
// const req = require('express/lib/request')
const fileMiddleware = require('./middleware/file')
// const PASSWORD = 'yWw1Rr3feu6Do9FE'
// const MONGODB_URI = `mongodb+srv://abe:${PASSWORD}@cluster0.3m1uj.mongodb.net/shop`

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.MONGODB_URI

})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(fileMiddleware.single('avatar'))
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/add-course', addCourseRoutes)
app.use('/courses', coursesRoutes)
app.use('/settings', settingsRoutes)
app.use('/card', basketRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', loginRoutes)
app.use('/profile', profileRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await mongoose.connect( keys.MONGODB_URI, {
      useNewUrlParser: true,
      //useFindAndModify: false
    })
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()




