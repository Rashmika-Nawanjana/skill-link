const express = require('express');
const router = express.Router();

// Homepage
router.get('/', (req, res) => {
    res.render('index', { 
        title: 'SkillLink - Learn Unique Skills Live with Global Mentors',
        currentPage: 'home'
    });
});

// Categories page
router.get('/categories', (req, res) => {
    const categories = [
        {
            id: 'music',
            name: 'Music & Sound',
            icon: 'fas fa-music',
            description: 'Master musical instruments and sound production',
            skills: ['Violin', 'Guitar', 'Piano', 'Drums', 'Vocals', 'Music Production'],
            mentorCount: 85,
            avgPrice: 45
        },
        {
            id: 'crafts',
            name: 'Arts & Crafts',
            icon: 'fas fa-palette',
            description: 'Create beautiful art and handmade crafts',
            skills: ['Pottery', 'Painting', 'Sculpture', 'Jewelry Making', 'Woodworking'],
            mentorCount: 67,
            avgPrice: 38
        },
        {
            id: 'martial-arts',
            name: 'Martial Arts',
            icon: 'fas fa-fist-raised',
            description: 'Learn self-defense and martial disciplines',
            skills: ['Karate', 'Kendo', 'Boxing', 'Sword Fighting', 'Tai Chi'],
            mentorCount: 52,
            avgPrice: 55
        },
        {
            id: 'sports',
            name: 'Sports & Fitness',
            icon: 'fas fa-running',
            description: 'Improve your athletic performance and fitness',
            skills: ['Tennis', 'Golf', 'Swimming', 'Archery', 'Rock Climbing'],
            mentorCount: 73,
            avgPrice: 42
        },
        {
            id: 'lifestyle',
            name: 'Lifestyle & Wellness',
            icon: 'fas fa-seedling',
            description: 'Enhance your daily life and well-being',
            skills: ['Cooking', 'Gardening', 'Meditation', 'Yoga', 'Nutrition'],
            mentorCount: 91,
            avgPrice: 35
        },
        {
            id: 'cultural',
            name: 'Cultural Arts',
            icon: 'fas fa-globe-asia',
            description: 'Explore traditional and cultural practices',
            skills: ['Traditional Dance', 'Calligraphy', 'Cultural Ceremonies', 'Folk Arts'],
            mentorCount: 34,
            avgPrice: 48
        }
    ];

    res.render('categories', { 
        title: 'Skill Categories - SkillLink',
        currentPage: 'categories',
        categories: categories  // Make sure to pass the categories data
    });
});

// How it works page
router.get('/how-it-works', (req, res) => {
    res.render('how-it-works', {
        title: 'How SkillLink Works - Learn Live Skills',
        currentPage: 'how-it-works'
    });
});

module.exports = router;