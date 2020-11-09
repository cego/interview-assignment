/* Formål: "Padder" en streng til en længde, så læsbarheden øges.
 * Input:  @strIn den streng som skal paddes
 *         @newStrLen kan både være positiv og negativ
 *         - Hvis længden er positiv justere den til venstre.
 *         - Er længden derimod negativ, justere den til højre.
 *         @padChar den karakter som skal udfylde de tomme pladser i strengen
 * Output: Returnere den "paddede" streng
 */
function pad(strIn, newStrLen, padChar) {
  const str = `${strIn}`; // All input gets converted to string.
  let newStr = ``;
  const paddingLength = Math.abs(newStrLen) - str.length;
  // Error checking
  if (paddingLength <= 0 || newStrLen === 0) {
    newStr = str;
  }
  // This means that there's padding which has to be applied
  else {
    const padding = Array(paddingLength + 1).join(padChar); // Adding 1 is needed because we're joining empty array spaces
    newStr = newStrLen > 0 ? str + padding : padding + str;
  }
  return newStr;
}

module.exports = pad;
