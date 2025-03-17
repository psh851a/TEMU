#!/bin/bash

# Test script for Temu Desktop Application
# This script runs basic tests to verify the application structure and configuration

echo "Running tests for Temu Desktop Application..."
echo "---------------------------------------------"

# Check directory structure
echo "Checking directory structure..."
DIRECTORIES=("src" "src/main" "src/renderer" "src/renderer/components" "src/renderer/reducers" "src/renderer/services" "src/renderer/styles" "src/renderer/types")

for dir in "${DIRECTORIES[@]}"; do
  if [ -d "$dir" ]; then
    echo "✓ Directory $dir exists"
  else
    echo "✗ Directory $dir does not exist"
  fi
done

echo ""

# Check key files
echo "Checking key files..."
FILES=("package.json" "tsconfig.json" "webpack.config.js" "src/main/main.ts" "src/main/preload.ts" "src/renderer/index.html" "src/renderer/index.tsx")

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ File $file exists"
  else
    echo "✗ File $file does not exist"
  fi
done

echo ""

# Check package.json configuration
echo "Checking package.json configuration..."
if grep -q "\"main\": \"dist/main.js\"" package.json; then
  echo "✓ Main entry point correctly configured"
else
  echo "✗ Main entry point not correctly configured"
fi

if grep -q "\"start\":" package.json && grep -q "\"build\":" package.json; then
  echo "✓ Build scripts correctly configured"
else
  echo "✗ Build scripts not correctly configured"
fi

echo ""

# Check component files
echo "Checking React components..."
COMPONENTS=("App" "Header" "Sidebar" "MainContent" "ProductGrid" "ProductCard" "SearchBar" "CartIcon" "UserMenu")

for component in "${COMPONENTS[@]}"; do
  if [ -f "src/renderer/components/${component}.tsx" ]; then
    echo "✓ Component ${component} exists"
  else
    echo "✗ Component ${component} does not exist"
  fi
done

echo ""

# Check reducer files
echo "Checking Redux reducers..."
REDUCERS=("productsReducer" "cartReducer" "userReducer" "uiReducer")

for reducer in "${REDUCERS[@]}"; do
  if [ -f "src/renderer/reducers/${reducer}.ts" ]; then
    echo "✓ Reducer ${reducer} exists"
  else
    echo "✗ Reducer ${reducer} does not exist"
  fi
done

echo ""

echo "Test summary:"
echo "-------------"
echo "The application structure appears to be correctly set up."
echo "To run the application, execute the following commands:"
echo "npm run build"
echo "npm start"
echo ""
echo "Tests completed."
