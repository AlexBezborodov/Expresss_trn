const {Router} = require('express')
const router = Router()
const Course = require('../models/course')


router.get('/', async (req,res) => {
  const courses = await Course.find()
  res.render('courses',{
    title: 'Courses',
    isCourse: true,
    courses
  })
})
router.get('/:id/edit', async ( req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
   const course = await Course.findById(req.params.id)
  res.render('editPage', {
    title: ` Edit course ${course.title}`,
    course
  })
})
router.post('/edit', async (req, res) => {
  const {id} = req.body
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
router.post('/remove', (req, res) => {

})

module.exports = router
