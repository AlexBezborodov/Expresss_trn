const {Router} = require('express')
const router = Router()
const Course = require('../models/course')
const auth = require('../middleware/auth')
const { validationResult } = require('express-validator');
const { courseValidators } = require('../utils/validators')

router.get('/', async (req,res) => {
  const courses = await Course.find()
    .populate('userId', 'email name')
    .select('price title url')

  res.render('courses',{
    title: 'Courses',
    isCourse: true,
    courses
  })
})
router.get('/:id/edit', auth , async ( req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
  const errors = validationResult(req)
   const course = await Course.findById(req.params.id)
  res.render('editPage', {
    title: ` Edit course ${course.title}`,
    course,
    error: req.flash('error', errors.array()[0].msg)
  })
})
router.post('/edit', auth, courseValidators , async (req, res) => {
  const errors = validationResult(req)
  const {id} = req.body

  if( !errors.isEmpty()) {
    return res.status(422).redirect(`/courses/${id}/edit?allow=true`)
  }
  delete req.body.id
 await Course.findByIdAndUpdate(id, req.body)
  res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)
  res.render('course', {
    layout: 'empty',
    title: ` Course ${course.title}`,
    course
  })
})
router.post('/remove', auth , async (req, res) => {
 try {
   await Course.deleteOne({_id: req.body.id})
   res.redirect('/courses')
 } catch(e) {
  console.log(e)
 }

})

module.exports = router
