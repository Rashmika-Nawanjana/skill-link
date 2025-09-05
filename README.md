# SkillLink - Global Live-Skill Learning Platform

SkillLink is a global live-skill platform where learners can book and connect with skilled mentors for real-time interactive sessions in non-academic skills. From cultural arts to martial training, SkillLink creates a space where passion meets practice.

## 🚀 Project Overview

**Problem Solved:**
- Most online learning platforms focus on academics, coding, or career growth
- Limited access to unique, creative, and lifestyle skills like pottery, violin, sword fighting, or archery
- YouTube videos lack live feedback
- No global hub connecting learners with skilled practitioners in real time

**Solution:**
SkillLink connects learners with expert mentors worldwide for live, interactive sessions in unique skills.

## ✨ Features

### Core Features (MVP)
- **Two User Roles:** Learners and Mentors
- **Skill Categories:** Music, Crafts, Martial Arts, Sports, Cultural Arts, Lifestyle
- **Booking & Scheduling:** Pick mentor's available slots and confirm instantly
- **Live Session Integration:** Real-time teaching through video calls
- **Profiles & Reviews:** Mentor bios, skill portfolios, ratings, and feedback

### Target Skills
- 🎵 **Music:** Violin, Guitar, Piano, Vocals, Music Theory
- 🎨 **Arts & Crafts:** Pottery, Painting, Sculpture, Jewelry Making
- 🥋 **Martial Arts:** Kendo, Sword Fighting, Archery, Karate, Boxing
- ⚽ **Sports:** Tennis, Golf, Swimming, Fitness Training
- 🌍 **Cultural Arts:** Traditional Dances, Cultural Ceremonies, Folk Arts
- ✨ **Lifestyle:** Cooking, Gardening, Meditation, Yoga, Personal Development

## 🛠️ Technology Stack

- **Backend:** Node.js with Express.js
- **Frontend:** EJS templating engine
- **Styling:** Custom CSS with Fiverr-inspired design
- **Architecture:** MVC (Model-View-Controller)
- **Responsive Design:** Mobile-first approach

## 📁 Project Structure

```
SkillLink/
├── app.js                 # Main Express application
├── package.json           # Dependencies and scripts
├── public/               # Static assets
│   ├── css/
│   │   └── style.css     # Main stylesheet (Fiverr-inspired)
│   ├── js/
│   │   └── main.js       # Frontend JavaScript
│   └── images/           # Image assets
├── views/                # EJS templates
│   ├── index.ejs         # Homepage
│   ├── layout.ejs        # Main layout template
│   ├── categories.ejs    # Categories listing
│   ├── error.ejs         # Error page
│   ├── partials/         # Reusable components
│   │   ├── header.ejs    # Navigation header
│   │   └── footer.ejs    # Site footer
│   ├── mentors/          # Mentor-related pages
│   │   ├── index.ejs     # Mentors listing
│   │   ├── profile.ejs   # Individual mentor profile
│   │   └── join.ejs      # Become a mentor
│   └── learners/         # Learner-related pages
│       └── login.ejs     # Login page
└── routes/               # Express routes
    ├── index.js          # Main routes (home, categories)
    ├── mentors.js        # Mentor-related routes
    └── learners.js       # Learner-related routes
```

## 🎨 Design System

### Color Palette (Fiverr-inspired)
- **Primary Green:** `#1dbf73` - Main brand color
- **Dark Green:** `#19a463` - Hover states and accents
- **Light Green:** `#e7f7f0` - Backgrounds and highlights
- **Text Dark:** `#222325` - Primary text
- **Text Light:** `#62646a` - Secondary text
- **Orange:** `#ff7640` - Call-to-action accents
- **Yellow:** `#ffb33e` - Star ratings

### Key Design Elements
- Clean, modern layout with card-based components
- Gradient hero sections
- Hover animations and transitions
- Responsive grid layouts
- Professional typography hierarchy

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd SkillLink
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   or for production:
   ```bash
   npm start
   ```

4. **Access the application:**
   Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm start` - Run the production server
- `npm run dev` - Run development server with auto-reload (requires nodemon)

## 📱 Key Pages

### 1. Homepage (`/`)
- Hero section with search functionality
- Popular skill categories
- Featured mentors
- How it works section

### 2. Categories (`/categories`)
- Overview of all skill categories
- Mentor counts and pricing information
- Direct links to category-specific listings

### 3. Mentor Listing (`/mentors`)
- Browse all available mentors
- Search and filter functionality
- Mentor cards with ratings and pricing

### 4. Mentor Profiles (`/mentors/:mentorId`)
- Detailed mentor information
- Reviews and ratings
- Booking interface
- Availability calendar

### 5. Become a Mentor (`/mentors/join`)
- Mentor application form
- Benefits and success stories
- Application requirements

### 6. User Authentication (`/learners/login`)
- Clean login interface
- Social media integration options
- Registration links

## 🎯 Target Audience

- **Learners:** People wanting to explore hobbies, cultural skills, or lifestyle arts
- **Mentors/Experts:** Skilled practitioners seeking global reach and income
- **Communities:** Groups focused on preserving cultural/traditional skills

## 💰 Monetization Model

- Commission per session (10–15%)
- Premium subscription for learners (discounts + unlimited bookings)
- Marketplace revenue from equipment and materials

## 🌟 Future Enhancements

### Phase 2 Features
- AI Skill Discovery - Personalized recommendations
- Gamification - Badges, streaks, and progress levels
- Group Workshops - Multi-learner sessions and events
- Marketplace Integration - Equipment and materials store
- Multi-Language Support - Global accessibility
- Hybrid Mode - In-person lesson booking

### Technical Improvements
- Database integration (MongoDB/PostgreSQL)
- Real-time video integration (WebRTC/Zoom API)
- Payment processing (Stripe/PayPal)
- Advanced search and filtering
- Mobile app development
- AI-powered mentor matching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@skilllink.com or join our Slack channel.

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

---

**SkillLink** - *Connecting passionate learners with skilled mentors worldwide* 🌍✨
