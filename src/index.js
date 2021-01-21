import { copyToClipboard } from "./clipboard.js";
import { processFile } from "./file.js";
import { parse } from "./parse.js";

document.getElementById("copy-to-clipboard").addEventListener("click", () => {
  // Get processed code's latest value
  const processedCode = document.getElementById("output").value;
  copyToClipboard(processedCode);
});

// Listen for file uploads
const fileInput = document.getElementById("file-input");
fileInput.addEventListener(
  "change",
  async () => {
    // Get contents of uploaded file
    const file = fileInput.files[0];
    const contents = await processFile(file);
    // Turn the contents into code
    const processedCode = parse(contents);
    displayOutput(processedCode);
  },
  false
);

// Helper to display contents to the page
function displayOutput(outputCode) {
  document.getElementById("output").value = outputCode;
}
