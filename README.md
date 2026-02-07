# Casimoney (Realtime casino application)

About:
Casimoney is a real-time, multi-user casino-style web application where users can place bets, trade simulated metals, and manage wallet transactions within strict, time-bound betting windows. The platform is designed to mimic real casino mechanics, ensuring synchronized participation, fairness, and controlled result declaration.

The application supports JWT-based authentication, allowing users to securely register, log in, and manage their sessions. Once logged in, users can participate in betting rounds that follow a fixed cycle — a defined bet placement window (e.g., 50 seconds), followed by a lock-in period, after which results are calculated and winnings are automatically credited to the winners’ wallets.

The backend is built using Node.js, Socket.IO, and MongoDB, enabling real-time communication and synchronized state management across multiple concurrent users. Socket events are used to broadcast countdown timers, bet submissions, lock-in states, and result announcements, ensuring all users remain in sync during each betting round.

The frontend is developed using ReactJS, along with HTML, CSS, and Bootstrap, focusing on a responsive and interactive user experience. Real-time updates are reflected instantly on the UI, including timers, betting states, wallet balance changes, and result notifications.

Metal trading within the platform is simulated and controlled via a separate admin panel application, allowing administrators to manage values and outcomes dynamically. Secure wallet funding is supported through Razorpay integration, enabling users to add funds seamlessly for in-app transactions.

This project was developed as a client-facing solution and handed over upon completion. It served as a practical implementation of real-time systems, event-driven architecture, secure authentication, and transactional workflows in a full-stack environment.

Tech Stack
- Frontend: ReactJS, HTML, CSS, Bootstrap
- Backend: Node.js, Socket.IO
- Database: MongoDB
- Payments: Razorpay

Other repos:
1. Backend server: https://github.com/Hemant-1821/casino-server
2. Admin repo: https://github.com/Hemant-1821/casino-admin

Starting the web app:
1. npm install
2. npm start

