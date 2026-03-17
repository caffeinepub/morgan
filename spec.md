# Morgan Giveaway

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Homepage (/) with hero section, headline, CTA "Get Started" button, short giveaway explanation, and contact support button
- Signup (/signup) and Login (/login) pages with email + password fields; redirect to /dashboard on success
- Dashboard (/dashboard) showing welcome message, giveaway info card, AI assistant access, and chat support access
- Giveaway Info Page (/giveaway) with compensation description, eligibility rules, participation steps, timeline, and disclaimer
- AI Assistant section with text input, scripted/predefined responses for MVP questions
- Live support chat widget (floating bottom-right) for all pages; users send messages; admin can reply
- Admin Panel (/admin) listing all registered users, all support messages, and ability to reply to chats
- Contact/Support Page (/support) with buttons for WhatsApp, Telegram, and Signal (placeholder links)
- Terms & Conditions page (/terms)
- Role-based access: regular users vs admin

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend (Motoko):
   - User registration and login with email/password, using authorization component for roles (user, admin)
   - Store support chat messages (userId, message, timestamp, adminReply)
   - Query: get all users (admin only), get messages by user, get all messages (admin only)
   - Mutations: send message, admin reply to message

2. Frontend:
   - React Router for pages: /, /signup, /login, /dashboard, /giveaway, /support, /terms, /admin
   - Auth context to manage logged-in state and role
   - Homepage with hero, CTA, giveaway summary
   - Signup/Login forms wired to backend
   - Dashboard cards for giveaway info, AI assistant, chat support
   - Giveaway page with structured content and disclaimer
   - AI assistant with scripted responses
   - Floating chat widget on all authenticated pages
   - Admin panel with user list and message inbox with reply capability
   - Support page with messaging app links
   - Terms & Conditions page
   - Professional clean theme, "Morgan" branding throughout
