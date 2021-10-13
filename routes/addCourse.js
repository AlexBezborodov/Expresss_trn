const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Course = require('../models/course')

router.get('/',auth,  (req,res) => {
  res.render('addCourse',{
    title: 'Add course',
    isAdd: true
  })
})
router.post('/', auth,  async (req, res ) =>{
  // console.log(req.body)
  // const course = new Course(req.body.title, req.body.price, req.body.url)
  //  await course.save()
  // res.redirect('/courses')
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    url: req.body.url,
    userId: req.user
  })
  try {
    await course.save()
    res.redirect('/courses')
  } catch (e) {
  console.log(e)
  }

})
module.exports = router
