// This file contains additional refinements and improvements for the Temu-like desktop application

// 1. Add keyboard shortcut handler to App.tsx
// Add this to the App component:

const handleKeyboardShortcuts = (e: KeyboardEvent) => {
  // Focus search bar with Ctrl+F / Cmd+F
  if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    e.preventDefault();
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
      (searchInput as HTMLInputElement).focus();
    }
  }
  
  // Toggle sidebar with Ctrl+B / Cmd+B
  if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }
  
  // Close modals with Escape key
  if (e.key === 'Escape' && modalOpen) {
    dispatch({ type: 'CLOSE_MODAL' });
  }
};

// Add this in useEffect:
useEffect(() => {
  window.addEventListener('keydown', handleKeyboardShortcuts);
  return () => {
    window.removeEventListener('keydown', handleKeyboardShortcuts);
  };
}, [dispatch, modalOpen]);

// 2. Add system tray integration to main.ts
// Add this to main.ts:

import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import * as path from 'path';

let tray: Tray | null = null;

function createTray() {
  tray = new Tray(path.join(__dirname, '../assets/tray-icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open Temu Desktop', click: () => { mainWindow?.show(); } },
    { label: 'Check for Updates', click: () => { /* Update check logic */ } },
    { type: 'separator' },
    { label: 'Quit', click: () => { app.quit(); } }
  ]);
  
  tray.setToolTip('Temu Desktop');
  tray.setContextMenu(contextMenu);
  
  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    }
  });
}

// Call createTray() after createWindow()

// 3. Add auto-update functionality
// Add this to main.ts:

import { autoUpdater } from 'electron-updater';

function setupAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();
  
  autoUpdater.on('update-available', () => {
    if (mainWindow) {
      mainWindow.webContents.send('update-available');
    }
  });
  
  autoUpdater.on('update-downloaded', () => {
    if (mainWindow) {
      mainWindow.webContents.send('update-downloaded');
    }
  });
  
  ipcMain.on('install-update', () => {
    autoUpdater.quitAndInstall();
  });
}

// Call setupAutoUpdater() after app is ready

// 4. Add offline support with local storage
// Create a new file src/renderer/services/storageService.ts:

export const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const clearLocalStorage = (key?: string) => {
  try {
    if (key) {
      localStorage.removeItem(key);
    } else {
      localStorage.clear();
    }
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// 5. Add performance optimizations
// Modify webpack.config.js to add code splitting:

optimization: {
  splitChunks: {
    chunks: 'all',
    minSize: 20000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    automaticNameDelimiter: '~',
    enforceSizeThreshold: 50000,
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}

// 6. Add error boundary component
// Create a new file src/renderer/components/ErrorBoundary.tsx:

import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 20px;
  margin: 20px;
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.backgroundLight};
`;

const ErrorHeading = styled.h2`
  color: ${props => props.theme.colors.error};
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  margin-bottom: 15px;
`;

const ResetButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // Here you could log the error to a service
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorHeading>Something went wrong</ErrorHeading>
          <ErrorMessage>
            {this.state.error?.message || 'An unexpected error occurred'}
          </ErrorMessage>
          <ResetButton onClick={this.handleReset}>
            Try Again
          </ResetButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Wrap the App component with ErrorBoundary in index.tsx
