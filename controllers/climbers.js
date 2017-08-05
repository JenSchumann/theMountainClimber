const express = require('express');
const router = express.Router();

router/get('/', (req, res)=>{
      res.render('climbers/index.ejs');
});


router.get('/new', (req, res)=>{
      res.render('climbers/new.ejs');
});

























module.exports = router;
