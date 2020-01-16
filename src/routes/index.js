//requerimientos
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=> {
    res.send('Hola mundo... :D');
})
//
module.exports = router;


//


///