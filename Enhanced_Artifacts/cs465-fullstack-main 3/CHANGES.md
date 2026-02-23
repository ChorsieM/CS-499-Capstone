# Enhancements Summary (Module 3 / Milestone Two)

This zip contains the *enhanced* version of the CS465 full-stack artifact.  
I kept the changes small and purposeful (no over-engineering).

## What changed
### 1) Software Design & Engineering
- Added a small **service layer** (`services/homeService.js`) so routes stay focused on request/response.
- Updated the home route to pull view data from the service (cleaner separation of concerns).

### 2) Algorithms & Data Structures
- Added a simple **rooms dataset** (`data/roomsData.js`) and **filter/sort/search** logic in `services/roomsService.js`.
- Added a `/rooms` route and a basic Handlebars page to display results.

### 3) Databases + Security (foundation)
- Added optional **MongoDB (Mongoose)** support with a Room schema (`models/Room.js`) and connection helper (`db/connection.js`).
- Added `.env.example` for safe configuration.
- Added basic input validation/allow-listing in the rooms service to reduce injection and abuse risk.

## How to run
1. `npm install`
2. `npm start`
3. Visit:
   - `http://localhost:3000/`
   - `http://localhost:3000/rooms`

Optional DB:
- Create a `.env` file and set `MONGODB_URI=...`
