const router = require('express').Router()
const {
    GetUserProfileController
} = require('../controllers/userProfileController')



router.get('/:id', GetUserProfileController)

module.exports = router