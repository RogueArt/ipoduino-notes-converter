export async function processFile(file) {
  // Check if uploaded file is text file
  if (!isTextFile(file.name)) return alert("Only .txt files are supported!");

  // Validate the contents of the file
  const contents = await file.text();
  if (!contentsValid(contents)) return alert("Contents are invalid");

  return contents;
}

// Helper to check if file is a text file
function isTextFile(filename) {
  return filename.endsWith(".txt");
}

// Helper to check if contents are valid
function contentsValid(contents) {
  return true;
}
