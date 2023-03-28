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
    const userTData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Teach, Learn }],
    });
    const userLData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Learn }],
    });


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

    const Tuser = userTData.get({ plain: true });
    const Luser = userLData.get({ plain: true });
    const canTeach = teachData.map((teach) => teach.get({ plain: true }));
    const canLearn = learnData.map((learn) => learn.get({ plain: true }));

    console.log(Tuser);
    console.log(Luser);
    console.log(canTeach);
    console.log(canLearn)

    console.log(canTeach[0].name);
    console.log(canLearn.length)
    let teachOBJ = [];
    let learnOBJ = [];
    let matchedTeachObj = [];
    let matchedLearnObj = [];
    let wanttoLearn = [];
    let wanttoTeach = [];


    if (Tuser.teaches) {
      teachOBJ = Tuser.teaches;
    }

    if (Luser.learns) {
      learnOBJ = Luser.learns;
    }

    console.log(learnOBJ)
    console.log(learnOBJ[0].name)
    console.log(canTeach[1].name)

    for (i = 0; i < teachOBJ.length; i++) {
      wanttoTeach.push(teachOBJ[i].name)
    }

    for (i = 0; i < learnOBJ.length; i++) {
      wanttoLearn.push(learnOBJ[i].name)
    }
    console.log(wanttoTeach);
    console.log(wanttoLearn);

    for (i = 0; i < canTeach.length; i++) {
      for (j = 0; j < wanttoLearn.length; j++) {
        if (canTeach[i].name === wanttoLearn[j]) {
          matchedLearnObj.push(canTeach[i]);
        }
      }
    }
    console.log(matchedLearnObj)
    
   

    for (i = 0; i < canLearn.length; i++) {
      for (j = 0; j < wanttoTeach.length; j++) {
        if (canLearn[i].name === wanttoTeach[j]) {
          matchedTeachObj.push(canLearn[i]);
        }
      }
    }
    console.log(matchedTeachObj);

    res.render('match', {
      matchedLearnObj,
      matchedTeachObj,
      logged_in: req.session.logged_in,
    });
    console.log(req.session.logged_in);
    console.log('================================================');
    console.log(matchedLearnObj);
    console.log('================================================');
    console.log(matchedTeachObj);
    console.log('================================================');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
