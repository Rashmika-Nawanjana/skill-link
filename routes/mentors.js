const express = require('express');
const router = express.Router();

// All mentors page
router.get('/', function(req, res) {
  res.render('mentors/index', { title: 'Find Mentors' });
});

// Individual mentor profile
router.get('/:mentorId', function(req, res) {
  const mentorId = req.params.mentorId;
  
  // Mock mentor data - in real app this would come from database
  const mentors = {
    'sarah-violin': {
      name: 'Sarah Chen',
      skill: 'Violin & Music Theory',
      rating: 4.9,
      reviews: 127,
      price: 35,
      bio: 'Professional violinist with 15+ years of experience. Graduated from Juilliard School of Music.',
      languages: ['English', 'Mandarin'],
      availability: ['Mon 2-6 PM', 'Wed 1-5 PM', 'Fri 3-7 PM'],
      icon: '🎻'
    },
    'miguel-pottery': {
      name: 'Miguel Rodriguez',
      skill: 'Pottery & Ceramics',
      rating: 4.8,
      reviews: 89,
      price: 40,
      bio: 'Master potter with expertise in traditional and modern ceramic techniques.',
      languages: ['English', 'Spanish'],
      availability: ['Tue 10-2 PM', 'Thu 2-6 PM', 'Sat 9-1 PM'],
      icon: '🏺'
    },
    'kenji-martial': {
      name: 'Kenji Tanaka',
      skill: 'Kendo & Sword Fighting',
      rating: 5.0,
      reviews: 156,
      price: 50,
      bio: '6th Dan Kendo master and certified instructor with 20+ years of experience.',
      languages: ['English', 'Japanese'],
      availability: ['Mon 6-9 PM', 'Wed 6-9 PM', 'Sat 10-2 PM'],
      icon: '⚔️'
    }
  };
  
  const mentor = mentors[mentorId];
  
  if (!mentor) {
    return res.status(404).render('error', { 
      title: 'Mentor Not Found',
      message: 'The mentor you are looking for does not exist.'
    });
  }
  
  res.render('mentors/profile', { 
    title: mentor.name,
    mentor: mentor,
    mentorId: mentorId
  });
});

// Mentor join/signup page
router.get('/join', function(req, res) {
  res.render('mentors/join', { title: 'Become a Mentor' });
});

// Book session page
router.get('/:mentorId/book', function(req, res) {
  const mentorId = req.params.mentorId;
  res.render('mentors/book', { 
    title: 'Book Session',
    mentorId: mentorId
  });
});

module.exports = router;
