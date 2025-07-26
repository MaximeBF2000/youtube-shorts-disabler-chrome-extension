// Function to remove YouTube Shorts elements
function removeShortsElements() {
  // Remove sidebar Shorts links
  const shortsLinks = document.querySelectorAll('a[title="Shorts"]')
  shortsLinks.forEach(link => {
    const listItem =
      link.closest('ytd-guide-entry-renderer') || link.closest('li')
    if (listItem) {
      listItem.remove()
    } else {
      link.remove()
    }
  })

  // Remove homepage Shorts sections
  const shortsSections = document.querySelectorAll('.ytd-rich-shelf-renderer')
  shortsSections.forEach(section => {
    // Check if this section contains Shorts content
    const sectionText = section.textContent.toLowerCase()
    if (sectionText.includes('shorts') || sectionText.includes('short')) {
      section.remove()
    }
  })
}

// Function to check if extension is enabled
function isExtensionEnabled() {
  return new Promise(resolve => {
    chrome.storage.sync.get(['extensionEnabled'], function (result) {
      const isEnabled = result.extensionEnabled !== false // Default to true
      resolve(isEnabled)
    })
  })
}

// Main function to handle Shorts removal
async function handleShortsRemoval() {
  const enabled = await isExtensionEnabled()
  if (enabled) {
    removeShortsElements()
  }
}

// Initial removal
handleShortsRemoval()

// Set up observer for dynamic content
const observer = new MutationObserver(async function (mutations) {
  const enabled = await isExtensionEnabled()
  if (enabled) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Small delay to ensure elements are fully rendered
        setTimeout(() => {
          removeShortsElements()
        }, 100)
      }
    })
  }
})

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
})

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'toggleExtension') {
    if (request.enabled) {
      // Extension enabled - remove existing Shorts
      removeShortsElements()
    } else {
      // Extension disabled - page will reload naturally to show Shorts again
      // No action needed as user will need to refresh to see Shorts
    }
  }
})

// Handle page navigation (YouTube is a SPA)
let currentUrl = location.href
new MutationObserver(() => {
  const url = location.href
  if (url !== currentUrl) {
    currentUrl = url
    // Small delay to ensure new page content is loaded
    setTimeout(() => {
      handleShortsRemoval()
    }, 500)
  }
}).observe(document, { subtree: true, childList: true })
