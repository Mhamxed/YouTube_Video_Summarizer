// Function to convert ISO 8601 duration to readable format
function convertIsoDuration(isoDuration) {
    // Remove PT from the beginning
    let duration = isoDuration.replace('PT', '');
    
    // Initialize hours, minutes, seconds
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    
    // Extract hours if present
    if (duration.includes('H')) {
      const parts = duration.split('H');
      hours = parseInt(parts[0]);
      duration = parts[1];
    }
    
    // Extract minutes if present
    if (duration.includes('M')) {
      const parts = duration.split('M');
      minutes = parseInt(parts[0]);
      duration = parts[1];
    }
    
    // Extract seconds if present
    if (duration.includes('S')) {
      seconds = parseInt(duration.split('S')[0]);
    }
    
    // Format the result
    let result = '';
    if (hours > 0) {
      result += `${hours}:`;
      result += minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    } else {
      result += `${minutes}:`;
    }
    result += seconds < 10 ? `0${seconds}` : seconds;
    
    return result;
  }

export default convertIsoDuration;