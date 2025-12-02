# Activity Feed Design

## Overview

This is a React-based Activity Feed application for Yappy, designed to display a timeline of events for target accounts. The application shows campaign changes, content performance milestones, and key role engagement activities in a clean, chronological feed format. It's part of the Yappy product ecosystem, alongside the Monthly Report and Client Portal applications.

The project is built with React 18, TypeScript, and Vite, using Tailwind CSS for styling and Radix UI components for accessible UI primitives. The design system follows Yappy's brand guidelines with a focus on clarity, white space, and consistent typography.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**React + TypeScript + Vite Stack**
- Single-page application built with React 18.3 and TypeScript
- Vite as the build tool for fast development and optimized production builds
- Component-based architecture with clear separation of concerns

**Component Structure**
- Main `App.tsx` manages state and filtering logic for the activity feed
- Reusable UI components stored in `src/components/` directory
- Custom components: `FilterBar`, `TimelineEvent`, `CompanyLogo`
- Extensive Radix UI component library integrated via `src/components/ui/`

**State Management**
- Local state using React hooks (useState, useMemo)
- Filter state for event categories (all, role, content, campaign)
- Campaign type filter state (all, always_on, tactical)
- No external state management library; relies on React's built-in capabilities

### Design System

**Typography**
- Headings: Poppins font family (500-700 weight)
- Body text: Inter font family (400-600 weight)
- CSS custom properties defined in `src/styles/globals.css`

**Color Palette**
- Primary brand color: `#FF7C22` (Yappy orange)
- Text colors: `#272525` (primary), `#6B6661` (secondary), `#A9A9A9` (tertiary)
- Background: `#F5F5F5`
- Surface/cards: `#FFFFFF`
- Borders: `#EAEBEC`
- Accent colors for various UI elements (green, yellow, blue, red)

**Component Design Patterns**
- Card-based layout with consistent spacing (8-12px border radius)
- Filter pills with rounded corners and clear active/inactive states
- Timeline visualization with vertical line and icon-based events
- Responsive layout considerations with mobile breakpoints

### Data Layer

**Type Definitions**
- Strong TypeScript typing via `src/types/activity.ts`
- Event categories: campaign, content, engagement, role
- Comprehensive event types covering various activity scenarios
- Metadata structure for campaign names, types, roles, engagement counts

**Mock Data**
- Static event data defined in `src/data/mockEvents.ts`
- Includes diverse event types with realistic timestamps and metadata
- No backend integration or API calls in current implementation

**Filtering Logic**
- Client-side filtering using useMemo for performance
- Dual filtering: event category + campaign type
- Filter combinations work together (AND logic)

### Styling Architecture

**Tailwind CSS**
- Tailwind v4 integration with custom configuration
- Utility-first approach with custom CSS variables
- Dark mode support via `next-themes` package
- Custom utility classes and design tokens

**CSS Custom Properties**
- Centralized color and spacing variables
- Consistent theming across all components
- Support for light/dark mode switching

### Build Configuration

**Vite Configuration**
- SWC plugin for fast React compilation
- Path aliases for cleaner imports (`@/` maps to `./src`)
- Extensive module resolution aliases for versioned dependencies
- TypeScript path resolution

## External Dependencies

**UI Component Libraries**
- Radix UI: Complete suite of accessible, unstyled UI primitives
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu, Popover, Select, Tabs, Tooltip, and many more
  - Version-locked imports for stability

**Utility Libraries**
- `lucide-react`: Icon library for consistent iconography
- `class-variance-authority`: Type-safe variant-based component styling
- `clsx` + `tailwind-merge`: Class name management utilities
- `react-hook-form`: Form state management
- `date-fns` via `react-day-picker`: Date handling and calendar components

**Additional UI Enhancements**
- `embla-carousel-react`: Carousel/slider functionality
- `recharts`: Charting library (available but not actively used)
- `sonner`: Toast notification system
- `vaul`: Drawer component
- `cmdk`: Command palette component
- `input-otp`: OTP input handling

**Development Tools**
- TypeScript for type safety
- Vite for build tooling
- React Developer Tools support

**Font Integration**
- Google Fonts: Inter and Poppins families
- Preconnect optimization for faster font loading

**Note on Database**
This is currently a frontend-only application with no database integration. All data is stored as static mock data in TypeScript files. Future implementations may add a database layer (potentially PostgreSQL with Drizzle ORM based on organizational patterns).