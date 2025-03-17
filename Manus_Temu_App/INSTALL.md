// This file contains the installation and usage instructions for the Temu-like desktop application

# Temu-like Desktop Application - Installation Guide

## Overview
This document provides instructions for installing, running, and using the Temu-like desktop application prototype. The application is built using Electron.js, React, Redux, and TypeScript, following the architecture and functionality of the Temu mobile application but optimized for desktop environments.

## Installation Requirements
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git (for cloning the repository)

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/temu-desktop.git
cd temu-desktop
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Build the Application
```bash
npm run build
```

### 4. Start the Application
```bash
npm start
```

### 5. Package the Application (Optional)
To create installable packages for different operating systems:
```bash
npm run package
```
This will create packages in the `dist` directory for Windows, macOS, and Linux.

## Usage Guide

### Main Features

1. **Product Browsing**
   - Browse products by category using the sidebar navigation
   - View featured products on the home page
   - Click on products to view details

2. **Search Functionality**
   - Use the search bar in the header to find products
   - Results update in real-time as you type

3. **Shopping Cart**
   - Add products to cart with the "Add to Cart" button
   - View cart contents by clicking the cart icon
   - Adjust quantities or remove items in the cart view

4. **User Account**
   - Sign in or create an account via the user menu
   - View order history and manage profile settings
   - Save favorite products to your wishlist

5. **Theme Settings**
   - Toggle between light and dark mode in the settings menu

### Keyboard Shortcuts
- `Ctrl+F` / `Cmd+F`: Focus search bar
- `Ctrl+B` / `Cmd+B`: Toggle sidebar
- `Ctrl+H` / `Cmd+H`: Return to home page
- `Esc`: Close modals or dialogs

## Troubleshooting

### Common Issues

1. **Application fails to start**
   - Ensure Node.js and npm are properly installed
   - Try deleting the `node_modules` folder and running `npm install` again
   - Check console output for specific error messages

2. **Blank screen after startup**
   - Check if your antivirus is blocking the application
   - Try running with administrator/root privileges

3. **Images not loading**
   - Ensure your internet connection is active
   - Check console for network-related errors

### Getting Help
For additional assistance, please create an issue in the GitHub repository or contact support at support@example.com.

## License
This application is provided as a prototype and is not intended for commercial use without proper licensing.
