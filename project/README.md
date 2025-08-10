# MemeForge - AI-Powered Meme Generator

A full-stack web application for creating viral memes using AI image generation, templates, and custom uploads with professional editing tools.

## 🚀 Features

- **AI-Powered Generation**: Create memes from text descriptions using Hugging Face's FLUX model
- **Template Library**: Choose from trending meme templates
- **Custom Uploads**: Upload your own images and videos
- **Professional Editor**: Advanced text controls with fonts, colors, and positioning
- **Video Support**: Generate memes on videos with FFmpeg
- **High-Quality Export**: Download in HD resolution
- **Responsive Design**: Works on all devices

## 📁 Project Structure

```
meme_forge/
├── client/                      # React/Vite frontend
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # UI components
│   │   ├── constants/           # Static config/data
│   │   ├── pages/               # Page-level components
│   │   ├── utils/               # Frontend helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                      # Node.js/Express backend
│   ├── uploads/                 # File uploads
│   ├── routes/                  # Express routes
│   ├── controllers/             # Request handlers
│   ├── services/                # External integrations
│   ├── utils/                   # Backend helpers
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Hugging Face API key (for AI generation)

### 1. Clone the repository
```bash
git clone <repository-url>
cd meme_forge
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env and add your Hugging Face API key
npm start
```

### 3. Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

### 4. Environment Variables
Create a `.env` file in the `server` directory:
```env
HF_API_KEY=your_huggingface_api_key_here
PORT=3001
```

## 🎯 Usage

1. **Start the backend server**: `cd server && npm start`
2. **Start the frontend**: `cd client && npm run dev`
3. **Open your browser**: Navigate to `http://localhost:5173`

### Creating Memes

1. **Choose your method**:
   - Upload your own image/video
   - Select from trending templates
   - Generate with AI using text descriptions

2. **Customize**:
   - Add top and bottom text
   - Adjust fonts, colors, and positioning
   - Preview in real-time

3. **Export & Share**:
   - Download in high quality
   - Share on social media

## 🔧 API Endpoints

### Backend Server (Port 3001)

- `GET /health` - Health check
- `POST /generate-image` - AI image generation
- `POST /generate-video` - Video meme generation

## 🎨 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **FFmpeg.wasm** - Client-side video processing

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Multer** - File uploads
- **FFmpeg** - Video processing
- **Hugging Face API** - AI image generation

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd client
npm run build
# Deploy the dist/ folder
```

### Backend (Railway/Heroku)
```bash
cd server
# Set environment variables
# Deploy with your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.