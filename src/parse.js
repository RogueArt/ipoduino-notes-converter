export default function parse(contents) {
  // Break the song into stanzas
  const stanzas = contents
    .split(/\r\n\s*\r\n/)
    .map((str) => str.replace(/\r\n/gm, ""));

  let outputCode = "";
  for (const stanza of stanzas) {
    // Get octaves & lines of notes from each stanza
    const octaves = stanza.match(/\d{1}/gm);
    const lines = stanza.match(/(?<=\|)([a-zA-Z-]*)(?=\|)/gm);

    // Assuming either format incorrect or ran out of lines
    if (lines == null) {
      // File is not at all in the right format
      if (outputCode === "")
        displayResult(
          "Error",
          "Oops, I could not parse this because the contents of the file are not in the right format."
        );
      // Reached segment in file where we can't process it correctly
      else {
        displayResult(
          "Error",
          "Oops, I had an error parsing this. Here's what I processed so far."
        );
      }
      return outputCode;
    }

    // Store the code in this array
    const notes = Array(lines[0].length);

    // Go through each line for the current stanza
    for (let x = 0; x < lines.length; x++) {
      const [line, octave] = [lines[x], octaves[x]];
      // Notes is passed by reference, gets modified each time
      processLine(line, octave, notes);
    }
    // Accumulate output so far
    outputCode += notes.join("\n") + "\n";
  }
  // Return formatted code
  displayResult(
    "Success",
    `Successfully converted your song into Arduino code!`
  );
  return outputCode;
}

// Process each line of the given file
function processLine(line, octave, notes) {
  for (let index = 0; index < line.length; index++) {
    const ch = line.charAt(index);

    // Normal note if lowercase, sharp note if uppercase
    if (ch !== "-") {
      const note = ch.toUpperCase() + (isUpperCase(ch) ? "S" : "") + octave;
      notes[index] = `play(NOTE_${note}, 1);`;
    } else if (notes[index] === undefined) notes[index] = `delay(NOTE_DUR);`;
  }
}

// Helper that says if an error occurred
function displayResult(status, text) {
  document.getElementById("display-result").innerText = text;
}

// Helper to check if text is uppercase
function isUpperCase(str) {
  return str.toUpperCase() === str;
}
