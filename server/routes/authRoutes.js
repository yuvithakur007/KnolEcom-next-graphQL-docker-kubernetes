const express = require('express');
const router = express.Router();

const {loginOrCreateUser,getUserDetails} = require('../controllers/authController');

router.post('/login', loginOrCreateUser);
router.get('/userDetails',getUserDetails);

module.exports = router;
