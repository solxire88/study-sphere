export function formatTime(isoString) {
    // parse the ISO, then show only 2‑digit hour & minute in local timezone
    return new Date(isoString).toLocaleTimeString([], {
      hour:   '2-digit',
      minute: '2-digit'
    });
  }