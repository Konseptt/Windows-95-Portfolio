# 🪟 Windows 95 Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **A nostalgic journey through modern web development with the charm of Windows 95**

Step into a time machine and experience the golden era of personal computing! This unique portfolio website recreates the beloved Windows 95 interface using cutting-edge modern web technologies. Complete with authentic UI elements, sound effects, working applications, and a fully functional desktop environment.

## 🎯 Live Demo

🌐 **[Visit the Portfolio →](https://95.ranjansharma.info.np)**

![Windows 95 Portfolio Screenshot](https://github.com/user-attachments/assets/c324c064-cb31-4c26-8080-454f2d6908f3)

## ✨ Features

### 🖥️ **Authentic Windows 95 Experience**
- **Boot Sequence**: Complete with startup sounds and loading animations
- **Desktop Environment**: Fully interactive desktop with draggable icons
- **Taskbar**: Start button, system tray, and clock functionality
- **Window Management**: Resizable, draggable windows with minimize/maximize/close
- **Screensaver**: Activates after 5 minutes of inactivity

### 📱 **Portfolio Applications**
- **🏠 About Me**: Personal information and professional bio
- **📁 My Projects**: Interactive project showcase with detailed views
- **⚡ Skills & Tech**: Technical skills with proficiency levels
- **📄 Resume**: Downloadable resume and experience timeline
- **📧 Contact**: Professional contact information and social links
- **🏆 Achievements**: Certifications, awards, and accomplishments

### 🎮 **Interactive Applications**
- **💻 MS-DOS Prompt**: Functional terminal with portfolio commands
- **🎨 Paint**: Classic paint application (coming soon)
- **🧮 Calculator**: Working calculator application
- **🎮 Games**: Includes Minesweeper and other retro games
- **🎵 Media Player**: Audio player interface
- **📁 File Explorer**: Navigate through portfolio content

### 🎵 **Audio & Visual Effects**
- **Startup Sounds**: Authentic Windows 95 boot sounds
- **UI Sound Effects**: Click sounds, window operations
- **Smooth Animations**: CSS animations for window operations
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **pnpm** package manager
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Konseptt/Windows-95-Portfolio.git
   cd Windows-95-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` and enjoy the nostalgic experience!

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Technology Stack

### **Frontend Framework**
- **[Next.js 15.2.4](https://nextjs.org/)** - React framework with SSR/SSG
- **[React 19](https://reactjs.org/)** - UI library with hooks and context
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### **Styling & UI**
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icons
- **Custom CSS** - Windows 95 authentic styling

### **State Management & Context**
- React Context API for global state
- Custom hooks for window management
- Portfolio data management

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript Config** - Type checking

## 📁 Project Structure

```
Windows-95-Portfolio/
├── 📁 app/                    # Next.js App Router
│   ├── globals.css           # Global styles & Windows 95 theme
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page component
├── 📁 components/            # React components
│   ├── 📁 apps/              # Application components
│   │   ├── file-explorer.tsx # File explorer app
│   │   ├── terminal.tsx      # MS-DOS terminal
│   │   ├── project-details.tsx # Project viewer
│   │   └── ...               # Other apps
│   ├── 📁 ui/                # Reusable UI components
│   ├── boot-sequence.tsx     # Windows 95 boot animation
│   ├── desktop.tsx           # Desktop environment
│   ├── taskbar.tsx           # Bottom taskbar
│   ├── window-manager.tsx    # Window management system
│   ├── portfolio-context.tsx # Portfolio data provider
│   └── ...                   # Other core components
├── 📁 hooks/                 # Custom React hooks
├── 📁 lib/                   # Utility functions
├── 📁 public/                # Static assets
├── 📁 styles/                # Additional stylesheets
└── 📋 Configuration files    # Next.js, TypeScript, Tailwind
```

## 🎮 Usage Guide

### **Navigation**
- **Double-click** desktop icons to open applications
- **Right-click** for context menus
- **Drag** windows to move them around
- **Click Start** button for the main menu

### **Terminal Commands**
Open the MS-DOS Prompt and try these commands:
```bash
help        # Show available commands
about       # Display personal information
skills      # List technical skills
projects    # Show project portfolio
experience  # Work experience timeline
contact     # Contact information
dir         # List directory contents
clear       # Clear terminal screen
```

### **Window Operations**
- **Minimize**: Click the minimize button (−)
- **Maximize**: Click the maximize button (□)
- **Close**: Click the close button (×)
- **Resize**: Drag window corners/edges

## 🎨 Customization

### **Personal Information**
Edit the portfolio data in `components/portfolio-context.tsx`:

```typescript
const portfolioData: PortfolioData = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your biography...",
  email: "your.email@domain.com",
  // ... other personal information
}
```

### **Projects**
Add your projects to the `projects` array:

```typescript
{
  id: "unique-id",
  name: "Project Name",
  description: "Project description...",
  technologies: ["React", "TypeScript", "Next.js"],
  githubUrl: "https://github.com/username/repo",
  demoUrl: "https://your-demo-url.com",
  category: "Web Development",
  featured: true,
  duration: "Jan 2024 – Present"
}
```

### **Styling**
The Windows 95 theme is defined in `app/globals.css`. Customize colors, fonts, and animations while maintaining the retro aesthetic.

## 🤝 Contributing

Contributions are welcome! Whether you want to fix bugs, add new features, or improve documentation.

### **How to Contribute**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain Windows 95 aesthetic consistency
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ranjan Sharma**
- 🌐 Website: [ranjansharma.info.np](https://ranjansharma.info.np)
- 💼 LinkedIn: [linkedin.com/in/ranjansharma](https://linkedin.com/in/ranjansharma)
- 🐙 GitHub: [@konseptt](https://github.com/konseptt)
- 🐦 Twitter: [@thekonsept](https://twitter.com/thekonsept)
- 📧 Email: hello@ranjansharma.info.np

## 🎯 Inspiration

This project was inspired by the nostalgia of Windows 95 and the desire to showcase modern web development skills through a unique, interactive portfolio experience. It demonstrates that creativity and technical expertise can transform a simple portfolio into an engaging journey through computing history.

## 🚀 Performance & Optimization

- **Static Site Generation** with Next.js for fast loading
- **Image Optimization** with Next.js Image component
- **Code Splitting** for efficient resource loading
- **Responsive Design** for all device types
- **SEO Optimized** with proper meta tags and structured data

## 🔮 Future Enhancements

- [ ] Additional retro applications (Notepad, Paint)
- [ ] Multiplayer Minesweeper
- [ ] File system with actual file operations
- [ ] Network functionality simulation
- [ ] Sound customization options
- [ ] More interactive desktop widgets
- [ ] Windows 98/XP theme variants

---

<div align="center">

**⭐ Star this repository if you found it interesting!**

Made with ❤️ and a lot of ☕ by [Ranjan Sharma](https://github.com/konseptt)

*Bringing the 90s back, one pixel at a time!* 🖥️✨

</div>
