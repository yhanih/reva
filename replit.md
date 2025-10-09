# Reva - Performance Marketing Platform

## Overview

Reva is a web-based performance marketing platform that connects marketers with promoters through trackable links. Marketers create campaigns with defined budgets and payout rates, while promoters generate unique tracking links to share these campaigns. The platform tracks clicks, verifies their legitimacy, and rewards promoters for valid engagement. Think of it as a simplified Temu-style affiliate system focused on the core loop: create campaign → generate link → track clicks → verify → reward.

**Current Status**: Completed MVP with full functionality for demo and testing. Has documented security limitation (client-side IP capture) that requires Edge Function implementation before production deployment with real money.

**Latest Update (October 9, 2025)**: Converted entire application from dark theme to clean, professional light theme to match the landing page design. All dashboard pages, authentication pages, and internal pages now use a consistent light color scheme with white/gray backgrounds, dark text, and cyan/purple gradient accents.

## User Preferences

Preferred communication style: Simple, everyday language.
Dynamic hero section with dual customer messaging is the preferred approach.
UI Design: Clean, professional light theme with white backgrounds and cyan/purple gradient accents throughout the entire application.

## System Architecture

### Frontend Architecture

**Framework**: React 19 with Vite as the build tool and development server.

**Routing**: React Router DOM v7 for client-side navigation between marketer and promoter dashboards.

**Styling**: Tailwind CSS v4 with custom gradient utilities (cyan-to-purple theme). Uses clean, professional light theme with white/light gray backgrounds, dark text, and vibrant gradient accents for buttons and highlights. Consistent design language across all pages.

**Component Structure**: The application separates concerns between marketer and promoter experiences, with each having dedicated dashboard views and analytics displays.

**Build System**: Vite configuration includes the Tailwind CSS Vite plugin for optimal CSS processing and serves on port 5000 with host binding to 0.0.0.0 for container/remote access.

### Backend Architecture

**Primary Backend**: Supabase (Backend-as-a-Service) providing PostgreSQL database, authentication, and real-time capabilities.

**Database Security**: Row Level Security (RLS) enabled on all tables with role-based access control separating marketer and promoter data access. Users can only access their own data through Supabase policies.

**Click Verification**: Hybrid client-server model:
- Client-side captures basic click data (IP address, user agent, referrer)
- Server-side database trigger validates clicks before marking as valid
- Validation checks include: rate limiting (same IP cannot click same link within 1 hour), user agent validation for bot detection, budget verification, and duplicate prevention
- Uses PostgreSQL SECURITY DEFINER functions to ensure clients cannot manipulate validation status or payout amounts

**Known Architectural Limitation**: IP addresses are currently captured client-side, which can be spoofed. Production deployment requires migrating to Supabase Edge Functions to capture real IP addresses from request headers server-side.

### Authentication & Authorization

**Authentication Provider**: Supabase Auth handles user registration, login, and session management.

**Role System**: Two user roles - marketers and promoters - with distinct capabilities and data access patterns enforced through database RLS policies.

**Session Management**: Supabase client handles token refresh and session persistence automatically.

### Data Model

**Core Entities**:
- **Campaigns**: Created by marketers with budget, payout rate, and status
- **Tracking Links**: Unique links generated per promoter per campaign
- **Clicks**: Individual click events with IP, user agent, validation status
- **Earnings**: Promoter earnings records linked to validated clicks
- **Users**: Account data with role designation (marketer/promoter)

**Verification Flow**: Click → Database Trigger → Validate (rate limit + bot check + budget check) → Create Earning Record (if valid) → Update Campaign Spend

### Anti-Fraud System

**Rate Limiting**: IP-based rate limiting prevents the same IP from clicking the same link multiple times within a 1-hour window.

**Bot Detection**: Basic user agent validation filters out common bot patterns (crawlers, spiders, scrapers, curl, wget, etc.).

**Budget Control**: Server-side validation ensures campaigns have sufficient budget before approving clicks.

**Duplicate Prevention**: Database constraints prevent multiple earnings from the same click event.

**Future Enhancements Needed**: Advanced bot detection (CAPTCHA/hCAPTCHA), device fingerprinting, behavioral analysis, and server-side IP capture via Edge Functions.

## External Dependencies

### Supabase (Primary Backend)

**Purpose**: Full backend infrastructure including PostgreSQL database, authentication, real-time subscriptions, and future Edge Functions for production click tracking.

**Integration**: `@supabase/supabase-js` client library (v2.58.0) configured via environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).

**Key Features Used**:
- PostgreSQL database with Row Level Security
- User authentication and session management
- Database triggers for server-side click verification
- (Future) Edge Functions for secure server-side IP capture

### Tailwind CSS v4

**Purpose**: Utility-first CSS framework for rapid UI development with custom design system.

**Integration**: Vite plugin (`@tailwindcss/vite`) with PostCSS configuration for build-time CSS processing.

**Customization**: Extended color palette with cyan-500 (#06b6d4) and purple-500 (#a855f7) for gradient effects matching brand identity.

### Development Tools

**Vite**: Fast build tool and dev server with hot module replacement.

**ESLint**: Code linting with React-specific plugins (react-hooks, react-refresh) for code quality.

**React Router DOM**: Client-side routing for single-page application navigation.

### Environment Configuration

Required environment variables:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous/public API key

These are loaded via Vite's `import.meta.env` at build time.