# BIRD Lab

A modern, responsive website for the Bio-Inspired Robotics Design Lab built with React and Vite.

## Features

- 🚀 Modern React with Vite for fast development
- 📱 Fully responsive design
- 🎨 Smooth animations with GSAP
- 📊 Dynamic team data from Google Sheets
- 🔍 Interactive components and galleries
- ♿ Accessible design patterns

## Google Sheets Integration

The People section dynamically fetches team data from a Google Sheets document. To set this up:

### 1. Google Sheets API Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

### 2. Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Recommended) Restrict the API key:
   - Click on the API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Sheets API"
   - Under "Website restrictions", add your domain

### 3. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your API key to `.env`:
   ```
   VITE_GOOGLE_SHEETS_API_KEY=your_actual_api_key_here
   ```

### 4. Google Sheets Format

Your Google Sheet should have a "People" sheet with the following columns:

| Title | Name | Photo | Research Interests/Project | Email | Post & Current Affiliation | Education (PhD) | Institution | Year | Education (MTech/MS) | Institution | Year | Education (BTech/BE) | Institution | Year |

**Example Sheet:** [View Sample Sheet](https://docs.google.com/spreadsheets/d/1rfeP7ny6xYqEe-5fVLqKpXLHGI2rGeQ8oZK0us6ADtE/edit?usp=sharing)

### 5. Make Sheet Public

1. Open your Google Sheet
2. Click "Share" button
3. Change access to "Anyone with the link can view"
4. Copy the sheet ID from the URL (the long string between `/d/` and `/edit`)

## Installation & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (see Google Sheets Integration above)

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── People/         # Team members section
│   ├── Header/         # Navigation header
│   └── ...
├── services/           # API services
│   └── googleSheets.js # Google Sheets integration
├── utils/              # Utility functions
│   ├── constants.js    # App constants
│   └── gsapAnimations.js # Animation helpers
└── assets/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **GSAP** - Animations
- **Framer Motion** - Additional animations
- **Google Sheets API** - Dynamic data source

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
