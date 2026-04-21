# Nocturnal Architect

[Русская версия](./README_ru.md)

A collaborative planning space for teams and friends — a dark, glassmorphism-inspired web app for boards, tasks, todos, tags, deadlines, and realtime collaboration.

## About

Nocturnal Architect is a web application for collaborative planning. Users can create boards, add tasks, break them into todos, assign deadlines and tags, and work together in real time.

Core idea:

* dark UI
* realtime collaboration
* canvas-oriented planning workflow
* fast CRUD for tasks and todos
* analytics and deadline calendar

## Features

* Email/password authentication
* OAuth login
* Board creation and editing
* Tasks with nested todos
* Drag and drop for cards and todos
* Deadlines
* Tags
* Invite links
* Calendar page for deadlines
* Basic board analytics
* Responsive UI
* Realtime updates

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Supabase
* lucide-react
* Zustand
* Recharts
* FullCalendar
* Pragmatic Drag and Drop

## Project Structure

```txt
app/
  app/
    boards/
      [id]/
        page.tsx
        calendar/page.tsx
        stats/page.tsx
    invite/
      [token]/page.tsx
    onboarding/page.tsx
    settings/page.tsx
  auth/
    callback/
    login/
    register/
  info/
    check-email/
    error/
  onboarding/page.tsx
  page.tsx
components/
  App/
  Auth/
  Landing/
  Onboarding/
  ui/
actions/
store/
hooks/
helpers/
types/
consts/
utils/
```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Running Locally

```bash
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Main Flows

### 1. Create a board

A user creates a new board and enters the working area where tasks and todos can be added.

### 2. Manage tasks

Each task can include:

* title
* color
* due date
* canvas position
* todos
* tags

### 3. Collaborate

Users can generate an invite link and share it with friends. After joining, members gain access to the board.

### 4. Analytics

The app collects basic board stats:

* total tasks
* active tasks
* completion rate
* team size
* tag distribution
* activity chart

## API / Actions

The project uses server actions and Supabase actions for:

* creating boards
* creating and updating tasks
* creating and deleting todos
* handling invite links
* fetching analytics data
