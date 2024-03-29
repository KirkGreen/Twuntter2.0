const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route GET api/users
//@desc Test route
//@acces Public
router.get('/', auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('-password')
    res.json(user);
  } catch(err) {
    console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message);
    res.status(500).send('Server Error')
  }
});

//@route POST api/auth
//@desc Authenticate user & get token
//@acces Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    };

    const {email, password } = req.body;
 
    try{
      const user = await User.findOne({ email });

      if(!user){
        return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload, 
        config.get('jwtToken'),
        { expiresIn: 360000 },
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        }
      );

    } catch(err) {
      console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message);
      res.status(500).send('Server error')
    }
  }
);

module.exports = router;
