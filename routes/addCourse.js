const {Router} = require('express')
const router = Router()
const { validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const Course = require('../models/course')
const { courseValidators} = require('../utils/validators')

router.get('/',auth,  (req,res) => {
  res.render('addCourse',{
    title: 'Add course',
    isAdd: true
  })
})

router.post('/', auth, courseValidators,   async (req, res ) =>{
  const errors = validationResult(req)

  if( !errors.isEmpty()) {
  return res.status(422).render('addCourse', {
    title: 'Add course',
    isAdd: true,
    error: errors.array()[0].msg,
    data: {
      title: req.body.title,
      price: req.body.price,
      url: req.body.url,
    }
  })
  }
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
