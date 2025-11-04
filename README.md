# 📄 AI Resume Analyzer

An intelligent resume analysis tool that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) and improve their chances of landing interviews. Powered by AI and built with React Router and Puter.js.

![AI Resume Analyzer](https://img.shields.io/badge/React-19.1.1-blue)
![React Router](https://img.shields.io/badge/React_Router-7.9.2-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38bdf8)

## ✨ Features

- **AI-Powered Analysis** - Get detailed feedback on your resume using Claude AI
- **ATS Score** - Check how well your resume performs with Applicant Tracking Systems
- **Job-Specific Feedback** - Tailored suggestions based on job title and description
- **Multi-Category Scoring** - Analyze tone & style, content, structure, and skills
- **Resume Management** - Track multiple resume versions for different job applications
- **Secure Storage** - Cloud storage powered by Puter.js with authentication
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern UI** - Clean, intuitive interface built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Routing**: React Router 7.9.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.13
- **State Management**: Zustand 5.0.8
- **File Upload**: React Dropzone 14.3.8
- **PDF Processing**: PDF.js 5.4.296
- **Backend Services**: Puter.js (Cloud Storage, AI, Auth, KV Store)
- **Build Tool**: Vite 7.1.7

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/keirace/ai-resume-analyzer.git
cd ai-resume-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📖 Usage

### 1. Sign In
- Click "Sign In" to authenticate with Puter.js
- Your resumes and data will be securely stored in your Puter cloud account

### 2. Upload Resume
- Navigate to the "Upload" page
- Enter the company name, job title, and job description
- Drag and drop your resume PDF or click to select
- Click "Analyze Resume"

### 3. View Analysis
- Wait for the AI to analyze your resume (this may take a few moments)
- Review your overall score and detailed feedback across multiple categories:
  - **ATS Compatibility** - How well your resume works with tracking systems
  - **Tone & Style** - Professional language and formatting
  - **Content** - Quality and relevance of information
  - **Structure** - Organization and layout
  - **Skills** - Technical and soft skills presentation

### 4. Track Applications
- View all your analyzed resumes on the home page
- Click on any resume card to see detailed feedback
- Compare scores across different versions

## 📁 Project Structure

```
ai-resume-analyzer/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── ATS.tsx         # ATS score display
│   │   ├── Details.tsx     # Detailed feedback sections
│   │   ├── FileUploader.tsx # Drag & drop file upload
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── ResumeCard.tsx  # Resume list item
│   │   ├── ScoreCircle.tsx # Circular score indicator
│   │   └── Summary.tsx     # Score summary
│   ├── lib/                # Utility functions
│   │   ├── puter.ts        # Puter.js integration (Zustand store)
│   │   ├── utils.ts        # Helper functions
│   │   └── pdfToImage.ts   # PDF to image conversion
│   ├── routes/             # Application routes
│   │   ├── auth.tsx        # Authentication page
│   │   ├── home.tsx        # Dashboard/home page
│   │   ├── upload.tsx      # Resume upload page
│   │   └── resume.tsx      # Resume detail page
│   ├── welcome/            # Welcome screen assets
│   ├── app.css             # Global styles
│   ├── root.tsx            # Root component
│   └── routes.ts           # Route configuration
├── constants/
│   └── index.ts            # App constants and AI prompts
├── public/
│   ├── icons/              # SVG icons
│   ├── images/             # Static images
│   ├── favicon.ico
│   └── pdf.worker.min.mjs  # PDF.js worker
├── types/
│   ├── index.d.ts          # TypeScript type definitions
│   └── puter.d.ts          # Puter.js type definitions
├── Dockerfile              # Docker configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🔑 Core Features

### Puter.js Integration
The app uses Puter.js for:
- **Authentication** - Secure user sign-in/sign-out
- **File Storage** - Upload and store PDF resumes
- **AI Analysis** - Claude 3.7 Sonnet for resume feedback
- **KV Store** - Store resume metadata and analysis results

### AI Analysis
The AI provides detailed feedback on:
- ATS compatibility and optimization tips
- Tone and professional language usage
- Content quality and relevance to job description
- Structure and formatting best practices
- Skills presentation and keyword optimization

### PDF Processing
- Converts uploaded PDFs to images for preview
- Extracts text for AI analysis
- Maintains original PDF for download

## 🏗️ Building for Production

Create a production build:
```bash
npm run build
```

Run the production server:
```bash
npm start
```

## 🐳 Docker Deployment

Build the Docker image:
```bash
docker build -t ai-resume-analyzer .
```

Run the container:
```bash
docker run -p 3000:3000 ai-resume-analyzer
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typecheck` - Type check TypeScript code

## 🙏 Acknowledgments

- [JS Mastery](https://jsmastery.com/) - Tutorial
- [Puter.js](https://puter.com) - Cloud platform and AI services
- [React Router](https://reactrouter.com/) - Routing framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF rendering
- [React Dropzone](https://react-dropzone.js.org/) - File upload


---
