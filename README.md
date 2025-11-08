# Wonders of Our World - Photo Album

A stunning interactive photo album showcasing the most breathtaking wonders of nature and human achievement. Experience a visual journey through time and beauty with this immersive React application.

## 🌟 Features

- **Interactive Photo Album**: Navigate through a beautifully designed book-style interface
- **High-Quality Images**: Curated collection of stunning photographs from Unsplash
- **Smooth Animations**: Page-flipping animations and cinematic effects
- **Responsive Design**: Optimized for desktop and mobile devices
- **Touch & Keyboard Navigation**: Swipe gestures and arrow key controls
- **Bookmark System**: Save your favorite pages for later
- **Progressive Loading**: Optimized image preloading for smooth experience

## 🖼️ Gallery Highlights

### Nature's Wonders
- **Dawn: New Beginnings** - Sunrise over majestic mountains
- **Mountains: Reaching Higher** - Challenging peaks that inspire
- **Forests: Finding Peace** - Ancient trees and emerald canopies
- **Waters: Flowing Forward** - Oceans and serene lakes
- **Golden Hour: Moments of Magic** - Perfect lighting and beauty

### Human Masterpieces
- **Great Wall: Guardians of Time** - 2,000 years of determination
- **Taj Mahal: Monument to Love** - Eternal love in marble
- **Colosseum: Echoes of Glory** - Ancient Roman grandeur
- **Machu Picchu: City in the Clouds** - Incan perfection at 2,430 meters
- **Petra: Rose-Red Mystery** - Carved stone city
- **Christ the Redeemer: Arms Wide Open** - Faith embracing all
- **Chichen Itza: Cosmic Calendar** - Mayan pyramids aligned with stars

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/wonders-of-our-world.git
cd wonders-of-our-world
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

This will create an optimized production build in the `build` folder.

## 🎨 Technologies Used

- **React 19** - Modern React with hooks and concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Unsplash API** - High-quality stock photography
- **PostCSS** - CSS processing and optimization

## 📱 Usage

### Navigation
- **Arrow Keys**: Use ← → to navigate between pages
- **Touch/Swipe**: Swipe left or right on mobile devices
- **Mouse**: Click the navigation arrows

### Features
- **Bookmark**: Click the ribbon bookmark to save pages
- **Hover Effects**: Hover over images for captions and effects
- **Progress Bar**: Track your journey through the album

## 🏗️ Project Structure

```
wonders-of-our-world/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── PhotoAlbum.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎯 Key Components

### PhotoAlbumBook Component
The main component featuring:
- State management for current page and animations
- Image preloading for smooth transitions
- Touch and keyboard event handlers
- Bookmark functionality
- Responsive design with mobile optimizations

## 🌐 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy script to package.json:
```json
"scripts": {
  "deploy": "gh-pages -d build"
}
```
4. Deploy: `npm run deploy`

### Vercel/Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to your hosting platform
3. Configure as a single-page application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for providing beautiful, high-quality images
- **Lucide** for the elegant icon set
- **Tailwind CSS** for the utility-first CSS framework
- **React** for the powerful component library

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.

---

*"The world is a book, and those who do not travel read only one page." - Saint Augustine*

Experience the wonders of our world, one page at a time. 🌍✨
