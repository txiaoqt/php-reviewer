# Compete with Friends - Feature Documentation

## Overview

The "Compete with Friends" feature adds real-time multiplayer coding challenges to the PHP Code Reviewer app. Users can create coding challenges, invite friends to compete, and track their performance on global leaderboards.

## Features Implemented

### ✅ Core Features
- **User Authentication**: Sign up/sign in with Supabase Auth
- **Challenge Creation**: Create custom coding challenges with multiple questions
- **Challenge Participation**: Join active challenges created by other users
- **Real-time Updates**: Live challenge status and participant tracking
- **Scoring System**: Automatic scoring based on correct answers and time
- **User Profiles**: Track user statistics and achievements
- **Database Schema**: Complete PostgreSQL schema with Row Level Security

### 🎯 Key Components

#### Authentication System
- **AuthModal**: Handles user registration and login
- **Supabase Integration**: Secure authentication with email/password

#### Challenge Management
- **CreateChallengeModal**: Form for creating new challenges with questions
- **ChallengeCard**: Displays challenge information and join functionality
- **ChallengesService**: API layer for all challenge-related operations

#### Database Schema
- **challenges**: Stores challenge metadata
- **challenge_participants**: Tracks who joined which challenges
- **challenge_questions**: Stores questions for each challenge
- **challenge_submissions**: Records user answers and scores
- **user_profiles**: Extended user information
- **leaderboards**: Ranking system for different time periods

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup
Run the SQL migration in your Supabase SQL editor:

```sql
-- Copy and paste the contents of supabase/migrations/001_initial_schema.sql
```

### 3. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 4. Module Configuration
The "Compete with Friends" module is already added to `src/data/modules.js` but is locked by default. To unlock it:

```javascript
// In src/data/modules.js
{
  id: 'compete-friends',
  // ... other properties
  isLocked: false, // Change to false to unlock
}
```

## Usage Guide

### For Users

1. **Sign Up/Login**: Click "Sign In" or "Sign Up" to create an account
2. **Create Challenge**:
   - Click "New Challenge" button
   - Fill in challenge details (title, description, difficulty, etc.)
   - Add multiple questions with correct answers
   - Set time limits and participant limits
3. **Join Challenges**:
   - Browse active challenges in the "Active Challenges" section
   - Click "Join Challenge" on challenges you want to participate in
4. **Compete**: Answer questions within the time limit to earn points

### For Developers

#### Creating a New Challenge
```javascript
import { ChallengesService } from '../services/challengesService';

const challengeData = {
  title: 'PHP Basics Challenge',
  description: 'Test your PHP fundamentals',
  challengeType: 'coding',
  difficulty: 'medium',
  maxParticipants: 10,
  timeLimitMinutes: 30,
};

const challenge = await ChallengesService.createChallenge(challengeData);
```

#### Joining a Challenge
```javascript
await ChallengesService.joinChallenge(challengeId);
```

#### Submitting Answers
```javascript
await ChallengesService.submitAnswer(challengeId, questionId, userAnswer);
```

## API Reference

### ChallengesService Methods

#### `createChallenge(challengeData)`
Creates a new challenge.
- **Parameters**: `challengeData` object with title, description, etc.
- **Returns**: Created challenge object

#### `getActiveChallenges()`
Fetches all active challenges.
- **Returns**: Array of challenge objects with participant counts

#### `joinChallenge(challengeId)`
Joins a user to a challenge.
- **Parameters**: `challengeId` (UUID)
- **Returns**: Participant record

#### `submitAnswer(challengeId, questionId, submissionText)`
Submits an answer for grading.
- **Parameters**: challenge ID, question ID, user's answer text
- **Returns**: Submission record

#### `getLeaderboard(period, limit)`
Fetches leaderboard rankings.
- **Parameters**: `period` ('daily', 'weekly', 'monthly', 'all_time'), `limit` (number)
- **Returns**: Array of leaderboard entries

## Database Schema Details

### Tables Overview

1. **challenges**: Main challenge information
2. **challenge_participants**: Users participating in challenges
3. **challenge_questions**: Questions belonging to challenges
4. **challenge_submissions**: User answers and scoring
5. **user_profiles**: Extended user information
6. **leaderboards**: Ranking system

### Row Level Security (RLS)

All tables have RLS enabled with policies ensuring:
- Users can only see challenges they're participating in or created
- Users can only submit answers for challenges they're part of
- Creators can manage their own challenges
- Public leaderboards are readable by all authenticated users

## Future Enhancements

### Planned Features
- [ ] **Real-time Gameplay**: Live coding sessions with timers
- [ ] **Friend Invitations**: Direct friend invites via email/links
- [ ] **Challenge Templates**: Pre-built challenge templates
- [ ] **Advanced Scoring**: Bonus points for speed and streaks
- [ ] **Tournament Mode**: Multi-round competitions
- [ ] **Mobile Support**: Responsive design for mobile devices

### Technical Improvements
- [ ] **WebSocket Integration**: Real-time notifications
- [ ] **Caching**: Redis for leaderboard caching
- [ ] **Analytics**: Detailed challenge analytics
- [ ] **Moderation**: Content moderation for challenges
- [ ] **API Rate Limiting**: Prevent abuse

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check Supabase URL and anon key in `.env.local`
   - Ensure Supabase project is properly configured

2. **Database Errors**
   - Run the SQL migration in Supabase SQL editor
   - Check RLS policies are correctly applied

3. **Challenge Creation Fails**
   - Ensure user is authenticated
   - Check all required fields are provided
   - Verify questions have both text and correct answers

### Development Tips

- Use the Supabase dashboard to monitor database queries
- Check browser console for JavaScript errors
- Test authentication flow thoroughly
- Verify RLS policies with different user roles

## Contributing

When adding new features:
1. Update the database schema if needed
2. Add corresponding service methods
3. Create/update UI components
4. Update this documentation
5. Test thoroughly with different user scenarios

## Support

For issues or questions about the "Compete with Friends" feature:
1. Check this documentation first
2. Review the code comments in the service files
3. Check Supabase documentation for database issues
4. Create an issue in the project repository
