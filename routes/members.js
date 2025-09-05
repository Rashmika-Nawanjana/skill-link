const express = require('express');
const router = express.Router();

// Mentors listing page
router.get('/', (req, res) => {
    res.render('mentors/index', {
        title: 'Find Mentors - SkillLink',
        currentPage: 'mentors'
    });
});

// Individual mentor profile
router.get('/:id', (req, res) => {
    res.render('mentors/profile', {
        title: 'Mentor Profile - SkillLink',
        currentPage: 'mentors',
        mentorId: req.params.id
    });
});

// Become a mentor page
router.get('/join', (req, res) => {
    res.render('mentors/join', {
        title: 'Become a Mentor - SkillLink',
        currentPage: 'become-mentor'
    });
});

module.exports = router;