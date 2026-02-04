// ENHANCEMENT (Milestone Three): Standardized input validation utilities.
// This creates a consistent way to validate and sanitize user inputs.

function toSafeString(value, maxLen = 50) {
    if (value === undefined || value === null) return "";
    return String(value).trim().slice(0, maxLen);
  }
  
  function toSafeNumber(value, { min = null, max = null } = {}) {
    const num = Number(value);
    if (!Number.isFinite(num)) return null;
    if (min !== null && num < min) return null;
    if (max !== null && num > max) return null;
    return num;
  }
  
  function toAllowedValue(value, allowed = []) {
    const v = toSafeString(value, 20).toLowerCase();
    return allowed.includes(v) ? v : "";
  }
  
  module.exports = { toSafeString, toSafeNumber, toAllowedValue };
  