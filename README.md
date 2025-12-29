# Cerebryx

Cerebryx is a modern study companion application that transforms reading into active learning through timed reading sessions and AI-generated comprehension quizzes. Built with Next.js 15 and cutting-edge web technologies, it helps students and professionals improve their reading comprehension and retention.

## Overview

Cerebryx provides a focused, distraction-free environment for studying written content. Users can upload PDF documents or paste text, and the application calculates an optimal reading time based on content length. During the reading session, a countdown timer keeps users focused, and upon completion, an AI-powered quiz is generated to assess comprehension with mixed question types and difficulty levels.

The application features a beautiful dark-mode interface, comprehensive session history tracking, and supports both anonymous and authenticated user experiences. Registered users can save documents, set reading goals, and track their progress over time.

## Technologies Used

- **Next.js 15** - Modern React framework with App Router and server components
- **TypeScript** - Type-safe development with strict mode enabled
- **Tailwind CSS** - Utility-first CSS framework for responsive, dark-mode-first design
- **shadcn/ui** - High-quality, accessible UI component library
- **OpenAI API** - GPT-4o-mini for intelligent quiz question generation
- **PDF.js** - Client-side PDF parsing and text extraction
- **Supabase** - Authentication (Google OAuth, OTP) and database backend
- **Microsoft Clarity** - User behavior analytics and insights
- **React Context** - Client-side state management
- **Lucide React** - Modern icon library

## Setup Instructions

1. Create a new Next.js 15 project with TypeScript and Tailwind CSS
2. Install shadcn/ui and add the following components: button, input, textarea, label, card, badge
3. Install dependencies: npm install lucide-react pdfjs-dist
4. Configure PDF.js worker in lib/pdf.ts (no CDN needed)
5. Install localization library: `npm install next-intl`
6. Create messages directory with a placeholder: `messages/en.json` containing `{}`
7. Add an `i18n.ts` placeholder exporting `defaultLocale: 'en'` and `locales: ['en']`
8. Defer provider wiring and string translations to the Roadmap instructions below

## Environment Setup

Create a `.env.local` file in the project root with your OpenAI API key:

```bash
# OpenAI API Key
# Get your API key from: https://platform.openai.com/api-keys
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

**Important**: Replace `your_openai_api_key_here` with your actual OpenAI API key. The application will automatically use this environment variable instead of requiring manual input.

## Key Features

### Reading Session Management
- **Multiple Input Methods**: Upload PDF files or paste text directly
- **Smart Reading Time Calculation**: Automatically estimates reading time based on word count (200 words per minute)
- **Interactive Timer**: Countdown timer with start/pause controls that runs in the background
- **Time Management**: Modal notification when reading time expires, with option to continue or proceed

### AI-Powered Quiz Generation
- **Intelligent Question Generation**: Uses OpenAI's GPT-4o-mini to create contextually relevant questions
- **Mixed Question Types**: Multiple-choice (4 options), true/false, and short-answer questions
- **Difficulty Levels**: Each question is categorized as easy, medium, or hard
- **Adaptive Question Count**: Generates 1 question per ~100 words (minimum 5, maximum 20 questions)
- **Customizable Range**: Users can configure the number of questions within the adaptive range

### Scoring and Feedback
- **Weighted Scoring System**: 
  - Easy questions = 1 point
  - Medium questions = 2 points
  - Hard questions = 3 points
- **Comprehensive Results**: Displays percentage score, points earned vs. total points, and success indicators
- **Answer Analysis**: Shows correct answers, user responses, and explanations for incorrect answers

### User Experience
- **Dark Mode Only**: Beautiful dark gradient interface (zinc-950 to neutral-950) designed for focused study sessions
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation, proper ARIA labels, and high contrast ratios
- **Session History**: Track past study sessions with timestamps, sources, scores, and outcomes
- **Dashboard**: Overview of recent sessions, statistics, and progress tracking

### Authentication & Data Management
- **Dual-Mode Operation**: Works anonymously or with user accounts
- **Supabase Authentication**: Secure login with Google OAuth and OTP (phone/email)
- **Saved Documents**: Registered users can save documents with tags for later reading
- **Reading Goals**: Set and track time-based, document-based, and per-document reading goals
- **Search & Filter**: Find saved documents quickly with tags and search functionality

### Analytics & Insights
- **Microsoft Clarity Integration**: Comprehensive user behavior tracking and analytics
- **Session Tracking**: Monitor reading patterns, quiz performance, and engagement metrics

## Architecture Highlights

- **Server Components by Default**: Leverages Next.js 15 App Router for optimal performance
- **Client-Side Processing**: PDF parsing and quiz generation happen entirely in the browser
- **No Backend Required (Anonymous Mode)**: Core functionality works without server infrastructure
- **Type Safety**: Strict TypeScript configuration ensures robust, maintainable code
- **Component-Based Design**: Modular, reusable components following shadcn/ui conventions
- **State Management**: React Context API for efficient client-side state handling

## Technical Implementation

### PDF Processing
- Uses PDF.js for client-side PDF text extraction
- Handles various PDF formats and edge cases gracefully
- Provides user feedback for parsing failures

### AI Integration
- Robust JSON parsing with markdown code fence stripping
- Error handling for API failures with retry mechanisms
- Strict prompt engineering for consistent question quality

### Timer System
- Accurate countdown with `useEffect` and `setInterval`
- Proper cleanup to prevent memory leaks
- Background operation that continues even when tab is inactive

### Data Persistence
- Session-only storage for anonymous users
- Supabase PostgreSQL for authenticated user data
- Row Level Security (RLS) policies for data protection

## Design Philosophy

Cerebryx is built with a focus on:
- **Simplicity**: Clean, uncluttered interface that doesn't distract from studying
- **Performance**: Fast, responsive interactions with minimal loading times
- **Accessibility**: Inclusive design that works for all users
- **Privacy**: User data is handled securely, with session-only API key storage
- **User Control**: Flexible options for reading time, question count, and study preferences

## Styling

- Use Tailwind with dark gradient background (zinc-950 to neutral-950)
- Dark cards with shadows for main content
- Use lucide-react icons: Upload, Clock, Play, BookOpen, CheckCircle
- Responsive design, max-width container
- Color scheme: Blue/Indigo primary, Green for success, Red for urgency
- Dark mode only - no theme toggle (dark is the default and only theme)

## Error Handling

- Alert if PDF upload fails
- Alert if no text provided
- Alert if API key missing
- Alert if OpenAI API call fails
- Parse JSON response carefully (handle markdown code blocks if present)

## Roadmap: Upcoming Phases

These are planned additions. Current app behavior remains as documented above until these are implemented.

- Reader: Early stop + celebration
  - Add an "End reading & start quiz" button in the reading step.
  - If stopped before the estimated time ends, celebrate with a confetti animation and a success toast, then proceed to the quiz.

- Results and Feedback
  - For incorrect answers, show the user's answer, the correct answer, and a brief explanation.
  - If your score is less than 10, offer a retake dialog: "Reuse the same questions" or "Generate a new set".

- Optional History (localStorage)
  - Add an opt-in history of past sessions stored locally (no backend), including timestamp, source (PDF/text/selection), timing, per-question outcomes, and the final score out of 100.
  - Provide a History page to list sessions and a Settings page to enable/disable, clear, or export the history.

- Browser Extension (Chrome MV3)
  - Context menu action: "Practice selected text" to send selected text to the app, pre-filling the input.
  - Popup quick-quiz with question count scaled to selection length (min 3, max 10).
  - "Open App to Upload PDF" action; PDF uploads continue in the web app (not in the extension).

- Localization (i18n) implementation
  - Add supported locales: start with `en` (default), then add others (e.g., `es`).
  - Create message files per locale: `messages/en.json`, `messages/es.json`.
  - Wrap UI with `next-intl` provider in `app/layout.tsx` (client boundary in a child component as needed).
  - Replace hardcoded strings with translation calls (e.g., `useTranslations`).
  - Add a language selector using shadcn/ui (e.g., `Select`) and persist preference in a cookie (e.g., `NEXT_LOCALE`).
  - Optional: introduce a `/[locale]` route segment and middleware to handle default-locale routing and detection from the browser.

## Future Enhancements

- Browser extension for quick text selection and practice
- Enhanced quiz feedback with detailed explanations
- Advanced analytics and progress visualization
- Multi-language support (i18n)
- Collaborative study features
- Export capabilities for study reports

## Conclusion

Cerebryx demonstrates how modern web technologies can be combined to create a powerful, user-friendly study tool. By leveraging AI for intelligent quiz generation, providing flexible input methods, and maintaining a focus on user experience, it transforms passive reading into active learning. The application showcases best practices in Next.js 15 development, TypeScript type safety, and accessible UI design.
