var express = require('express');
var router = express.Router();
const multer  = require('multer')
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extension = path.extname(file.originalname); //fitxategiaren luzapena
      cb(null, 'avatar-'+ uniqueSuffix + extension)
    }
  })

  const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true); // Fitxategia png denean onartu
    } else {
        cb(new Error('png edo jpg izan behar da'), false);//cb(null, false);
    }
  };

  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB tamaina limitea
    fileFilter: fileFilter //beste filtroa aplikatu
   })


router.post('/', upload.single('avatar'), function (req, res, next) {
    const userName = req.body.name;
    const protocol = req.protocol; 
    const host = req.get('host');
    const fileUrl = `/uploads/${req.file.filename}`; 
    res.send(`
    <p>Zure izena: ${userName}</p>
    <p>Fitxategia: <a href="${fileUrl}" target="_blank">${fileUrl}</a></p>
  `);
})


module.exports = router;
