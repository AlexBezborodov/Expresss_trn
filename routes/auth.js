const { Router } = require("express");
const User = require("../models/user");
const nodemaailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const bcrypt = require('bcryptjs')
const router = Router();
const keys = require('../keys')
const regEmail = require('../routes/emails/registration')

const transporter = nodemaailer.createTransport(sendgrid({
  auth: {
    api_key: keys.SENDGRID_API_KEY
  }
}))


router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    isLogin: true,
    logError: req.flash('logError'),
    regError: req.flash('regError')
  });
});
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {

      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        // const user = await User.findById('615ff5d6c718abef863ec747')
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) {
            throw err;
          }
          res.redirect("/");
        });
      } else {
        req.flash('logError', 'Wrong login or password')
        res.redirect("/auth/login#login");
      }
    } else {
      req.flash('logError', 'There is no such user')
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e)
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, confirm, name } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      req.flash('regError', ' User with this email already exist')
      res.redirect("/auth/login#registration");
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({ email, name, password: hashPassword, cart: { items: [] } });
      await user.save();
      await transporter.sendMail(regEmail(email))
      res.redirect("/auth/login#login");
      
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
