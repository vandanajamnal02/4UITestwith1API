const fs = require('fs');
const pdfParse = require('pdf-parse')


async function printPdfContent(pdfPath) {
    try {
      const pdfBuffer = fs.readFileSync(pdfPath); // Read the saved PDF
      const data = await pdfParse(pdfBuffer); // Parse the PDF content
      console.log('PDF Content::');
      console.log(data.text); // Print the text content of the PDF
    } catch (error) {
      console.error('Error reading or parsing the PDF:', error.message);
    }
}

  module.exports = {
    printPdfContent
  };