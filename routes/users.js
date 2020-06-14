const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

// TODO
router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.status(200).json({ success: true, msg: 'You are authorized!' });
  }
);

// TODO
router.post('/login', function (req, res, next) {
  const { username, password } = req.body;

  User.findOne({ username }).then((user) => {
    if (!user) {
      res.status(401).json({
        success: false,
        msg: 'could not find user',
      });
    }

    const { hash, salt } = user;
    const isValid = utils.validPassword(password, hash, salt);

    if (isValid) {
      const { token, expires: expiresIn } = utils.issueJWT(user);
      res.status(200).json({
        success: true,
        user,
        token,
        expiresIn,
      });
    } else {
      res.status(401).json({
        success: false,
        msg: 'you entered the wrong password',
      });
    }
  });
});

// TODO
router.post('/register', function (req, res, next) {
  const { username, password } = req.body;
  console.log(username, password);
  const { salt, hash } = utils.genPassword(password);

  const newUser = new User({
    username,
    hash,
    salt,
  });

  newUser
    .save()
    .then((user) => {
      const { token, expires: expiresIn } = utils.issueJWT(user);
      res.json({
        success: true,
        user,
        token,
        expiresIn,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
