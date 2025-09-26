# Horsepower Electrical Website

A modern, responsive website for Horsepower Electrical business built with React/TypeScript frontend and Express/Node.js backend.

## Features

- **Modern Design**: Clean, professional design with responsive layout
- **Service Showcase**: Comprehensive electrical services display
- **Contact Form**: Functional contact form with backend integration
- **Mobile Responsive**: Optimized for all device sizes
- **Professional UI**: Modern components with smooth animations
- **TypeScript**: Full type safety across frontend and backend

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Lucide React for icons
- CSS3 with modern styling
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript for type safety
- CORS enabled for cross-origin requests
- Helmet for security
- Morgan for logging

## Project Structure

```
horsepower-electrical/
├── frontend/                 # React/TypeScript frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Header.css
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.css
│   │   ├── pages/          # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Home.css
│   │   │   ├── Services.tsx
│   │   │   ├── Services.css
│   │   │   ├── Contact.tsx
│   │   │   └── Contact.css
│   │   ├── App.tsx         # Main app component
│   │   ├── App.css         # Global styles
│   │   ├── index.tsx       # React entry point
│   │   └── index.css       # Base styles
│   ├── package.json
│   └── tsconfig.json
├── backend/                 # Express/Node.js backend
│   ├── src/
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── package.json            # Root package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd horsepower-electrical
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (React) and backend (Express) servers concurrently.

### Individual Server Commands

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm install
npm start
```

## Development

### Frontend Development
- React development server runs on `http://localhost:3000`
- Hot reload enabled for development
- Proxy configured to backend API

### Backend Development
- Express server runs on `http://localhost:5000`
- TypeScript compilation with nodemon
- API endpoints available at `/api/*`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/services` - Retrieve electrical services
- `POST /api/contact` - Submit contact form

## Building for Production

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Build the backend**
   ```bash
   cd backend
   npm run build
   ```

3. **Start production server**
   ```bash
   cd backend
   npm start
   ```

## Features Overview

### Homepage
- Hero section with call-to-action
- Company features and benefits
- Service overview cards
- Customer testimonials
- Contact call-to-action

### Services Page
- Detailed service descriptions
- Service feature lists
- Why choose us section
- Professional benefits showcase

### Contact Page
- Contact information display
- Functional contact form
- Emergency contact section
- Business hours and location

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly navigation
- Accessible design patterns

## Customization

### Styling
- CSS custom properties for easy theming
- Modular CSS architecture
- Responsive breakpoints
- Modern CSS features

### Content
- Update company information in components
- Modify services in backend API
- Customize contact information
- Add/remove service offerings

## Deployment

### Frontend Deployment
- Build the React app: `npm run build`
- Deploy the `build` folder to your hosting service
- Configure environment variables if needed

### Backend Deployment
- Build the TypeScript: `npm run build`
- Deploy the `dist` folder to your server
- Install production dependencies
- Configure environment variables

### Environment Variables
Create a `.env` file in the backend directory:
```
PORT=5000
NODE_ENV=production
```

## License

This project is licensed under the MIT License.

## Support

For support or questions about this website, please contact Horsepower Electrical at (555) 123-4567 or info@horsepowerelectrical.com.

