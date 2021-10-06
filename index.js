const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const homeRoutes = require('./routes/home')
const addCourseRoutes = require('./routes/addCourse')
const coursesRoutes = require('./routes/courses')
const settingsRoutes = require('./routes/settings')
const basketRoutes = require('./routes/card')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add-course', addCourseRoutes)
app.use('/courses', coursesRoutes)
app.use('/settings', settingsRoutes)
app.use('/card', basketRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
})

