export function convertToNormalObject(jsonString) {
  // Remove the backslashes
  const cleanedString = jsonString.replace(/\\/g, "");

  // Parse the JSON string to an object
  const jsonObject = JSON.parse(cleanedString);

  // Return the object
  return jsonObject;
}

// Example usage:
