# Big Dream Academy

A premium, mobile-first learning platform teaching digital skills — AI, affiliate marketing, e-commerce, ads, and design — built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## Folder structure

- src/app/page.tsx — Landing page
- src/app/login/ — Login
- src/app/register/ — Register
- src/app/dashboard/ — Dashboard (protected)
- src/app/courses/ — Course Library
- src/app/courses/[id]/ — Course Details (dynamic route)
- src/app/lesson/[id]/ — Video Lesson Page (protected)
- src/app/downloads/ — Downloads (protected)
- src/app/profile/ — User Profile (protected)
- src/app/payment/ — Payment Page (protected)
- src/app/contact/ — Contact
- src/app/admin/ — Admin Dashboard (protected + role-gated)
- src/app/layout.tsx — Root layout, fonts, SEO metadata
- src/app/globals.css — Tailwind base + design tokens
- src/components/ — Navbar, Footer, CourseCard, ProgressRing, DashboardShell, ProtectedRoute
- src/lib/firebase.ts — Firebase app/auth/firestore init
- src/lib/auth-context.tsx — React auth provider (useAuth hook)
- src/lib/firestore-helpers.ts — Typed reads/writes for progress & favorites
- src/data/courses.ts — Course catalog (the 7 seed courses)
- firestore.rules — Security rules matching this data model

## Design system

Dark, layered "ink" background (#0C0F10 to #1F2626) with two accents: gold (#D4AF37) for premium/certificate moments, and green (#1FA971) for progress/growth. Display type is Sora, body type is Inter. The signature element is the Growth Ring — a circular progress indicator used on the dashboard, course cards, and profile that turns gold at 100% completion.

## Getting started (on a computer)

npm install
cp .env.local.example .env.local (then fill in your Firebase config)
npm run dev

## Firebase setup

1. Create a project at https://console.firebase.google.com
2. Enable Authentication then Email/Password.
3. Enable Firestore Database (start in production mode).
4. Deploy firestore.rules (firebase deploy --only firestore:rules) — this is what actually enforces the Admin Dashboard's access control.
5. Copy your web app config into .env.local (see .env.local.example).
6. To make a user an admin, manually set role: "admin" on their users/{uid} document in the Firestore console — there's no self-serve admin signup by design.

## Building and deploying from an Android phone (no laptop)

This project is set up so the whole loop — edit, build, deploy — can run from a phone:

1. Push code with GitHub's mobile web interface (or the GitHub app): create a repo, upload/edit these files.
2. Connect the repo to Vercel (vercel.com, works fully in a mobile browser): "Add New Project" then import the GitHub repo. Vercel detects Next.js automatically — no config needed.
3. Add environment variables in the Vercel project's Settings then Environment Variables, using the same names as .env.local.example.
4. Deploy. Vercel builds it on their servers, so your phone never needs to run npm install or npm run build locally.
5. Every push to the main branch auto-redeploys.

## Payment integration

The Payment page (src/app/payment/page.tsx) is wired with a UI and a placeholder handleCheckout() — swap it for a real gateway's hosted checkout (Stripe Checkout Session, Paystack, Flutterwave) called from a server route. Never collect raw card numbers directly in this frontend.

## Video hosting

src/data/courses.ts has empty videoUrl fields. Point them at hosted MP4s, unlisted YouTube embeds, or a service like Mux, then update the player in src/app/lesson/[id]/page.tsx.
