const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const Post = require('../../models/Posts');
const { check, validationResult } = require('express-validator');

//@route GET api/profile/me
//@desc Get curren users profile
//@acces Private

router.get('/me', auth , async(req, res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id}).populate(
      'user',
      ['name', 'avatar']
    );

    if(!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user'})
    }

    res.json(profile);
  } catch(err) {
    console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/profile/me
//@desc Create or Update user profile
//@acces Private

router.post('/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is pequired')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const{
      company,
      website,
      location,
      status,
      skills,
      bio,
      telegram,
      twitter,
      facebook,
      instagram
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(bio) profileFields.bio = bio;
    if(skills){
      profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    //build social object
    profileFields.social = {}
    if(telegram) profileFields.social.telegram = telegram;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(instagram) profileFields.social.instagram = instagram;

    try { 
      let profile = await Profile.findOne({ user: req.user.id })

      if(profile){
        // Update 
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id }, 
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch( err ){
      console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message);
      res.status(500).send('Server Error')
    }

  }
)

//@route GET api/profile/
//@desc Get all profiles
//@acces Public

router.get('/', async (req,res) => {
  try{
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch(err) {
    console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message);
    res.status(500).send('Server Error')
  }
});

//@route GET api/profile/user/user_id
//@desc Get profile by user ID
//@acces Public

router.get('/user/:user_id', async (req, res) => {
  try{
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
    
    if(!profile) {
      return res.status(400).json({ msg: 'Profile not found'})
    }
    res.json(profile);
  } catch(err) {
    console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message);
    if(err.kind === 'ObjectID'){
      return res.status(400).json({ msg: 'Profile not found' })
    }
    res.status(500).send('Server Error')
  }
});

//@route DELETE api/profile
//@desc Delete profile, user & posts
//@acces Private

router.delete('/', auth, async (req,res) => {
  try{
    // Remove user posts
    await Post.deleteMany({ user: req.user.id })
    // Remove profile
    await Profile.findOneAndRemove({user: req.user.id});
    // Remove user
    await User.findOneAndRemove({_id: req.user.id});
 
    res.json({msg: 'User deleted'});
  } catch(err) {
    console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message);
    res.status(500).send('Server Error')
  }
});

//@route PUT api/profile/experience
//@desc Add profile experience
//@acces Private

router.put('/experience', [
  auth,
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('company', 'Company is required')
      .not()
      .isEmpty(),
    check('from', 'From date is required')
      .not()
      .isEmpty()
  ]
],async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }

  try{
    const profile = await Profile.findOne({ user: req.user.id })

    profile.experience.unshift(newExp);

    await profile.save();

    res.json(profile);
  } catch(err){
    console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message);
    res.status(500).send('Server Error')
  }

})

//@route DELETE api/profile/experience/:exp_id
//@desc Delete experience 
//@acces Private

router.delete('/experience/:exp_id', auth, async(req, res)=>{
  try{
    const profile = await Profile.findOne({ user: req.user.id })

    //Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch(err){
    console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message);
    res.status(500).send('Server Error')
  }
})

module.exports = router;
