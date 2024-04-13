const express = require('express') 
const router = express.Router()

const version = '2024.04.13'

router.get('/api/version', (req, res) => {
  return res.status(200).json({ version: version });
})

module.exports = router
