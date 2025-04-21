const { test, expect } = require('@playwright/test');
const { convertDocToPdf,downloadFile } = require('./../Utils/APIMethods')
const { printPdfContent } = require('./../Utils/pdfUtils')

const path = require('path');


test('Convert DOCX to PDF, check Converted file extension and upload converted file and validate response', async ({ request }) => {
  let downloadFileLink;
  const filePath = path.resolve(__dirname, './../TestData/DefaultData/dummyDocumentTest.docx');
  const outPath = path.join(__dirname, './../TestData/CreatedByAutomation/dummyDocumentTest.pdf'); 
  const result = await convertDocToPdf(request, filePath);
  const file = result.Files[0];
    expect(file.FileName).toBe('dummyDocumentTest.pdf');
    expect(file.FileExt).toBe('pdf');
    expect(file.FileSize).toBeGreaterThan(0);
    expect(file.Url).toContain('https://v2.convertapi.com');
    console.log("file .url value   ::::", file.Url)
    downloadFileLink = file.Url
    await downloadFile(request, downloadFileLink, outPath);
    await printPdfContent(outPath);
});

