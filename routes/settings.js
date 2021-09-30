const { Router } = require ('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('settings', {
    title: 'Settings',
    isSet: true
  })
})

module.exports = router
