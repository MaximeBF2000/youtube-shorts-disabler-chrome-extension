# YouTube Shorts Disabler

A simple Chrome extension that removes YouTube Shorts from the home page and sidebar.

## Features

- Removes Shorts links from the YouTube sidebar
- Removes Shorts sections from the YouTube home page
- Simple popup with enable/disable toggle
- Works on all YouTube pages
- Extension is enabled by default

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the folder containing these files
5. The extension should now appear in your extensions list

## Usage

1. Click the extension icon in your Chrome toolbar
2. Use the checkbox to enable or disable the extension
3. The extension will automatically remove Shorts elements when enabled
4. Changes take effect immediately on YouTube pages

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Popup interface
- `popup.js` - Popup functionality
- `content.js` - Content script that removes Shorts elements
- `icon16.png`, `icon48.png`, `icon128.png` - Extension icons (replace with actual PNG files)

## How it works

The extension uses a content script that:

1. Removes elements with `a[title="Shorts"]` from the sidebar
2. Removes `.ytd-rich-shelf-renderer` sections that contain Shorts content
3. Uses MutationObserver to handle dynamic content loading
4. Responds to navigation changes in YouTube's SPA
