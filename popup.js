document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.getElementById('enableExtension')
  const status = document.getElementById('status')

  // Load saved state (default to enabled)
  chrome.storage.sync.get(['extensionEnabled'], function (result) {
    const isEnabled = result.extensionEnabled !== false // Default to true
    checkbox.checked = isEnabled
    updateStatus(isEnabled)
  })

  // Handle checkbox changes
  checkbox.addEventListener('change', function () {
    const isEnabled = checkbox.checked

    // Save state
    chrome.storage.sync.set({ extensionEnabled: isEnabled })

    // Update status
    updateStatus(isEnabled)

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com')) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggleExtension',
          enabled: isEnabled
        })
      }
    })
  })

  function updateStatus(isEnabled) {
    if (isEnabled) {
      status.textContent = 'Extension is enabled'
      status.style.color = '#4CAF50'
    } else {
      status.textContent = 'Extension is disabled'
      status.style.color = '#f44336'
    }
  }
})
