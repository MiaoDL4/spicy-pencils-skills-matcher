const router = require('express').Router();
const { Teach, User, Learn } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('homepage');
});
// ---------------------------------------------------------DELETE LATER
router.get('/teach', async (req, res) => {
  try {
    const teachData = await Teach.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const canTeach = teachData.map((teach) => teach.get({ plain: true }));

    res.render('teachRequestAll', {
      canTeach,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/teach/:id', async (req, res) => {
  try {
    const teachData = await Teach.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const teach = teachData.get({ plain: true });

    res.render('teachRequest', {
      ...teach,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// ---------------------------------------------------------DELETE LATER
router.get('/learn', async (req, res) => {
  try {
    const learnData = await Learn.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const canLearn = learnData.map((learn) => learn.get({ plain: true }));

    res.render('learnRequestAll', {
      canLearn,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/learn/:id', async (req, res) => {
  try {
    const learnData = await Learn.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const learn = learnData.get({ plain: true });

    res.render('learnRequest', {
      ...learn,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ---------------------------------------------------------DELETE LATER
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userTData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Teach, Learn }],
    });
    const userLData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model:  Learn }],
    });

    const Tuser = userTData.get({ plain: true });
    const Luser = userLData.get({ plain: true });

    res.render('profile', {
      ...Tuser,
      ...Luser,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// ---------------------------------------------------------DELETE LATER
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});



//===== match page============//

router.get('/matches', withAuth, async (req, res) => {
  try {
    const teachData = await Teach.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const learnData = await Learn.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const canTeach = teachData.map((teach) => teach.get({ plain: true }));
    const canLearn = learnData.map((learn) => learn.get({ plain: true }));

    console.log(canTeach[0].name);

    let sortedCSSObj = [];
    let sortedHTMLObj = [];
    let sortedJSObj = [];


    for (let i = 0; i < canTeach.length; i++) {
      if (canTeach[i].name === "CSS" && canLearn[i].name === "CSS") {
        sortedCSSObj.push(canTeach[i]);
        sortedCSSObj.push(canLearn[i]);
      } else if (canTeach[i].name === "HTML" && canLearn[i].name === "HTML") {
        sortedHTMLObj.push(canTeach[i]);
        sortedHTMLObj.push(canLearn[i]);
      } else {
        sortedJSObj.push(canTeach[i]);
        sortedJSObj.push(canLearn[i]);
      }
    }
    console.log('================================================');
    console.log(sortedCSSObj);
    console.log('================================================');
    console.log(sortedHTMLObj);
    console.log('================================================');
    console.log(sortedJSObj);
    console.log('================================================');

  
    res.render('match', {
      sortedCSSObj,
      sortedHTMLObj,
      sortedJSObj,
      logged_in: req.session.logged_in,
    });
    console.log(req.session.logged_in);
    console.log('================================================');
    console.log(sortedCSSObj);
    console.log('================================================');
    console.log(sortedHTMLObj);
    console.log('================================================');
    console.log(sortedJSObj);
    console.log('================================================');
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
