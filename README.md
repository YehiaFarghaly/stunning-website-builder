# Stunning - AI Website Generator

A full-stack application that generates stunning websites using AI. Built with Next.js frontend and NestJS backend, powered by Groq AI for intelligent content generation.

## 🚀 Features

- **AI-Powered Content Generation**: Uses Groq AI to generate website content based on business descriptions
- **Real-time Preview**: See your generated website instantly with live preview
- **Modern UI**: Glassmorphism design with smooth animations and responsive layout
- **TypeScript**: Full TypeScript support across frontend and backend
- **RESTful API**: Clean API architecture with NestJS

## 📁 Project Structure
stunning/
├── stunning-backend/     # NestJS backend API
│   ├── src/
│   │   ├── constants/    # Application constants
│   │   ├── dto/          # Data transfer objects
│   │   ├── schemas/      # Database schemas
│   │   ├── sections/     # Sections module
│   │   └── services/     # Business logic services
│   └── ...
└── stunning-form/        # Next.js frontend
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Utility libraries
├── types/            # TypeScript type definitions
└── utils/            # Helper functions


## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React

**Backend:**
- NestJS
- TypeScript
- Groq AI API
- Express

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Groq API key (get it from [Groq Console](https://console.groq.com/))

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/stunning.git
cd stunning
```

### 2. Backend Setup

```bash
cd stunning-backend
npm install
```

#### Create environment file:

```bash
cp .env.example .env
```

Or create `.env` file manually with the following variables:

```env
# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key_here

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

#### Start the backend server:

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The backend will be available at `http://localhost:3001`

### 3. Frontend Setup

```bash
cd stunning-form
npm install
```

#### Start the frontend development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔧 Environment Variables

### Backend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|----------|
| `GROQ_API_KEY` | Your Groq API key for AI content generation | ✅ Yes | - |
| `PORT` | Backend server port | ❌ No | 3001 |
| `FRONTEND_URL` | Frontend URL for CORS configuration | ❌ No | http://localhost:3000 |

### Getting Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env` file

## 🚀 Usage

1. **Start both servers**: Make sure both backend (port 3001) and frontend (port 3000) are running
2. **Open the application**: Navigate to `http://localhost:3000`
3. **Generate content**: 
   - Enter your business name
   - Provide a business description
   - Click "Generate Website"
4. **Preview**: View the generated website with AI-created content
5. **Iterate**: Modify your description and regenerate as needed

## 📝 API Endpoints

### POST /sections
Generates website sections based on business description.

**Request Body:**
```json
{
  "businessName": "Your Business Name",
  "businessDescription": "Description of your business..."
}
```

**Response:**
```json
{
  "sections": [
    {
      "type": "hero",
      "content": "Generated hero content..."
    },
    {
      "type": "main",
      "content": "Generated main content..."
    },
    {
      "type": "contact",
      "content": "Generated contact content..."
    }
  ]
}
```

### GET /sections
Returns the last generated sections.

## 🎨 Customization

### Styling
- Modify `stunning-form/app/globals.css` for global styles
- Update Tailwind classes in components for design changes
- Customize animations and effects in component files

### AI Prompts
- Edit `stunning-backend/src/constants/llm.constants.ts` to modify AI prompts
- Adjust `temperature` and `max_tokens` in LLM service for different content styles

## 🔍 Troubleshooting

### Common Issues

1. **"Module not found" errors**: Run `npm install` in both directories
2. **CORS errors**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
3. **AI generation fails**: Verify your `GROQ_API_KEY` is valid and has sufficient credits
4. **Port conflicts**: Change `PORT` in backend `.env` if 3001 is occupied

### Development Tips

- Use `npm run start:dev` for backend hot-reload during development
- Check browser console and terminal for error messages
- Ensure both servers are running before testing the application

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.