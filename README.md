<p align="center">
  <img src="https://i.ibb.co/4Zcf8XmN/leetcode-pattern-tracker.png" alt="LeetCode Pattern Tracker" width="600" />
</p>

<h1 align="center">LeetCode Pattern Tracker</h1>

<p align="center">
  <strong>Stop memorizing solutions. Start mastering patterns.</strong><br/>
  A modern, pattern-based DSA learning platform for serious coding interview preparation.
</p>

<p align="center">
  <a href="https://leetcode-pattern-tracker.vercel.app">🌐 Live Demo</a> &nbsp;·&nbsp;
  <a href="https://github.com/AnkitRajCode/leetcode-pattern-tracker/issues">🐛 Report Bug</a> &nbsp;·&nbsp;
  <a href="https://github.com/AnkitRajCode/leetcode-pattern-tracker/issues">✨ Request Feature</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/AnkitRajCode/leetcode-pattern-tracker?style=for-the-badge&color=blue" alt="Stars" />
  <img src="https://img.shields.io/github/forks/AnkitRajCode/leetcode-pattern-tracker?style=for-the-badge&color=green" alt="Forks" />
  <img src="https://img.shields.io/github/license/AnkitRajCode/leetcode-pattern-tracker?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel" />
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Pattern-Based Learning** | Problems organized by DSA patterns — Arrays & Hashing, Strings, Linked Lists, Dynamic Programming, Graphs, Trees |
| ✅ **Progress Tracking** | Mark questions as Solved, Revision, or Unsolved with persistent state |
| 🔗 **LeetCode Sync** | Connect your LeetCode profile and auto-sync solved problems |
| 📈 **Dashboard Analytics** | Visual progress stats — overall completion %, difficulty breakdown (Easy / Medium / Hard) |
| 🔐 **Firebase Authentication** | Google sign-in to save and sync progress across devices |
| 🌗 **Dark / Light Theme** | System-aware theme toggle with smooth transitions |
| 📝 **Markdown Solutions** | Rich solutions with syntax-highlighted code blocks |
| 🎯 **Smart Filtering** | Filter by difficulty, status, and pattern within each topic |
| 🏷️ **Interview Tips** | Memory tricks and interview-focused notes for each problem |
| 📱 **PWA Ready** | Installable as a Progressive Web App with manifest and icons |
| 🔍 **SEO Optimized** | Dynamic meta tags, Open Graph, Twitter cards, sitemap, and robots.txt |
| 📊 **Analytics** | Firebase Analytics + Vercel Analytics for usage insights |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) · [Lucide Icons](https://lucide.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Auth & Database** | [Firebase](https://firebase.google.com/) (Auth + Firestore) |
| **Markdown** | [react-markdown](https://github.com/remarkjs/react-markdown) · [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) · Firebase Analytics |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Firebase project with Auth & Firestore enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/AnkitRajCode/leetcode-pattern-tracker.git
cd leetcode-pattern-tracker

# Install dependencies
npm install

# Create environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
leetcode-pattern-tracker/
├── app/
│   ├── page.tsx              # Homepage — topic cards & hero section
│   ├── layout.tsx            # Root layout with providers & metadata
│   ├── dashboard/            # Dashboard with progress stats & LeetCode sync
│   ├── topics/[topic]/       # Dynamic topic pages with question tables
│   ├── api/                  # API routes
│   ├── robots.ts             # SEO robots configuration
│   └── sitemap.ts            # Dynamic sitemap generation
├── components/
│   ├── table/                # Interactive question table with filters
│   ├── topic/                # Topic page components
│   ├── ui/                   # Reusable UI primitives (Button, Dialog, etc.)
│   ├── LeetcodeSync.tsx      # LeetCode profile sync component
│   ├── FirebaseSync.tsx      # Firebase data sync on auth state
│   ├── FirebaseAnalytics.tsx # Analytics tracking
│   ├── MarkdownRenderer.tsx  # Syntax-highlighted markdown rendering
│   ├── ThemeToggle.tsx       # Dark / Light mode toggle
│   ├── UserNav.tsx           # User navigation & auth controls
│   └── Footer.tsx            # Global footer
├── context/
│   └── AuthContext.tsx       # Firebase auth context provider
├── data/
│   ├── arrays.json           # Arrays & Hashing problems
│   ├── strings.json          # String Manipulation problems
│   ├── linkedlist.json       # Linked Lists problems
│   ├── dp.json               # Dynamic Programming problems
│   ├── graph.json            # Graph problems
│   └── tree.json             # Tree problems
├── store/
│   └── questionStore.ts      # Zustand store for question state
├── lib/                      # Firebase config & utilities
├── public/                   # Static assets, icons, manifest
└── types/                    # TypeScript type definitions
```

---

## 📸 Screenshots

| Home Page | Topic Page |
|---|---|
| Pattern-based topic cards with stats | Interactive table with filters & solutions |

| Dashboard | Dark Mode |
|---|---|
| Progress analytics & LeetCode sync | Full dark theme support |

---

## 📚 Curated Resources

### LeetCode Lists & Problem Sets

#### Comprehensive Lists
- [LeetCode Lists — Blind 75, Grind 75, Grind 169, Neetcode 150, SQL 45](https://leetcode.com/discuss/post/3691891/leetcode-lists-for-blind-75-grind-75-gri-drdb/)

#### Grind 75
- [Grind 75 — Tech Interview Handbook](https://www.techinterviewhandbook.org/grind75/)
- [Grind 75 CSV List](https://gist.github.com/cgjosephlee/c67f3810cf1e7efde0d9a32dd976f400#file-grind75-csv)

#### Blind 75
- [Blind 75 Problem List](https://leetcode.com/problem-list/oizxjoit/)
- [Blind 75 Spreadsheet](https://docs.google.com/spreadsheets/d/1snAXQazLrrr1URiYOZGUG6gmwloa3BkMhS9d1oL2x2E/edit?gid=0#gid=0)
- [Top 75 LeetCode Questions — GitHub](https://github.com/SamirPaulb/top-75-leetcode-questions)
- [Top 75 LeetCode Questions — Web Version](https://samirpaulb.github.io/top-75-leetcode-questions/)

#### Neetcode 150
- [Neetcode 150 Spreadsheet](https://docs.google.com/spreadsheets/d/1Og4eTkHr4hzELXcM3TSUU9jXJoo2nnjZAtV7XypWTRI/edit?gid=0#gid=0)
- [Neetcode 150 Practice](https://neetcode.io/practice/practice/neetcode150)

---

### DSA Sheets & Roadmaps

- [DSA Sheet by Arsh (45–60 Days Plan)](https://docs.google.com/spreadsheets/d/1MGVBJ8HkRbCnU6EQASjJKCqQE8BWng4qgL0n3vCVOxE/edit?gid=0#gid=0)
- [DSA by Shradha Ma'am](https://docs.google.com/spreadsheets/d/1hXserPuxVoWMG9Hs7y8wVdRCJTcj3xMBAEYUOXQ5Xag/edit?gid=0#gid=0)
- [DSA Sheet by Love Babbar](https://www.geeksforgeeks.org/dsa/dsa-sheet-by-love-babbar/#arrays)
- [Striver's SDE Sheet](https://takeuforward.org/dsa/strivers-sde-sheet-top-coding-interview-problems)
- [Striver's 79 Last Moment DSA Sheet](https://takeuforward.org/dsa/strivers-79-last-moment-dsa-sheet-ace-interviews)
- [DSA Patterns Roadmap — KushalVijay](https://github.com/KushalVijay/DSA-patterns-Roadmap)
- [AlgoMaster DSA Course Roadmap](https://algomaster.io/learn/dsa/course-roadmap)
- [SDE Sheets Collection](https://sdesheets.bio.link/)

---

### Interview Preparation

- [Tech Interview Handbook — GitHub](https://github.com/yangshun/tech-interview-handbook)
- [Interview Master 100 — Instabyte](https://instabyte.io/p/interview-master-100)
- [DSA Master — Instabyte](https://instabyte.io/p/dsa-master)
- [FAANG Coding Interview Questions](https://github.com/ombharatiya/FAANG-Coding-Interview-Questions)
- [Design Patterns Catalog — Refactoring Guru](https://refactoring.guru/design-patterns/catalog)

### Data Structures Visualization

- [CSVIZ Tool — ArrayList](https://csvistool.com/ArrayList)
- [VisuAlgo — Data Structures & Algorithms](https://visualgo.net/en)

---

### System Design

- [InterviewReady — System Design Course](https://interviewready.io/course-page/system-design-course)
- [Complete System Design Roadmap — takeUforward](https://takeuforward.org/system-design/complete-system-design-roadmap-with-videos-for-sdes)
- [Introduction to NoSQL Databases](https://corewise.video/extraction/4fbc22d3-5e1c-4b8f-92d0-73976abda193)
- [What is Consistent Hashing and Where is it Used?](https://corewise.video/extraction/ee7dd85a-8659-4036-98aa-52d4eeebd393)

---

### Backend Development

#### Spring & Spring Boot
- [Spring Boot Tutorial](https://www.javatpoint.com/spring-boot-tutorial)
- [Spring Tutorial](https://www.javatpoint.com/spring-tutorial)
- [Spring Boot Roadmap](https://roadmap.sh/spring-boot)
- [Java Roadmap](https://roadmap.sh/java)

#### Backend Fundamentals
- **Backend from First Principles** by Sriniously — [YouTube Playlist](https://www.youtube.com/watch?v=0Rwb4Xmlcwc&list=PLui3EUkuMTPgZcV0QhQrOcwMPcBCcd_Q1&index=2)

---

### GitHub Repositories

| Area | Repository |
|---|---|
| **Java** | [Java Code Examples — navinreddy20](https://github.com/navinreddy20/Javacode) |
| **Spring 6** | [Spring 6 Course — navinreddy20](https://github.com/navinreddy20/spring6-course) |
| **Microservices** | [Microservices Tutorials — navinreddy20](https://github.com/navinreddy20/MicroserviceTutorials) |
| **AI/ML** | [LangChain and Ollama — laxmimerit](https://github.com/laxmimerit/LangChain-and-Ollama) |
| **Angular** | [Angular Interview Questions — sudheerj](https://github.com/sudheerj/angular-interview-questions) |

---

### Additional References

- [Copy of Aryan DSA-169 Series](https://docs.google.com/spreadsheets/d/1RfA06xazIWlBKr5tJrgN5rGdbaH_Oxs_VSyddjgOyuU/edit?gid=0#gid=0)
- [AlgoPrep's 151 Problems Sheet](https://docs.google.com/spreadsheets/d/1kyHfGGaLTzWspcqMUUS5Httmip7t8LJB0P-uPrRLGos/edit?gid=0#gid=0)
- [CodinGame — Container Terminal](https://www.codingame.com/ide/puzzle/container-terminal)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Ankit Raj**

<p>
  <a href="https://ankitraj.pages.dev">🌐 Portfolio</a> &nbsp;·&nbsp;
  <a href="https://github.com/AnkitRajCode">GitHub</a> &nbsp;·&nbsp;
  <a href="https://twitter.com/AnkitRajCode">Twitter</a> &nbsp;·&nbsp;
  <a href="https://linkedin.com/in/AnkitRajCode">LinkedIn</a>
</p>

---

<p align="center">
  ⭐ Star this repo if it helped your interview prep!
</p>