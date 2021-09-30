const {Router} = require('express')
const router = Router()
const Course = require('../models/course')

router.get('/', async (req,res) => {
  const courses = await Course.getAll()
  res.render('courses',{
    title: 'Courses',
    isCourse: true,
    courses
  })
})
router.get('/:id', async (req, res) => {
  const course = await Course.getById(req.params.id)
  res.render('course', {
    layout: 'empty',
    title: ` Course ${course.title}`,
    course
  })
})

module.exports = router
