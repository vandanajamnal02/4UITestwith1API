const API_URLS = require('./APIConfig')
const fs = require('fs');

require('dotenv').config();

async function getUserInfo(request) {
  const apiKey = process.env.CONVERT_API_KEY;

  const response = await request.get(API_URLS.GetUser, {
    params: { auth: apiKey }
  });

  if (!response.ok()) {
    throw new Error(`Failed to fetch user info: ${response.status()}`);
  }

  return response.json();
}

async function convertDocToPdf(request, filePath) {

    const token = process.env.CONVERT_API_KEY;
    const fileStream = fs.createReadStream(filePath);
  
    const response = await request.post(API_URLS.ConvertDocument, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        multipart: {
          File: fileStream,
          StoreFile: 'true',
        },
      });
    
      if (!response.ok()) {
        throw new Error(`Failed to convert document: ${response.status()}`);
      }
    
      return response.json();
}

async function downloadFile(request, fileUrl, outputPath) {
  const response = await request.get(fileUrl);

  if (!response.ok()) {
    throw new Error(`Failed to download file: ${response.status()} ${response.statusText()}`);
  }

  const buffer = await response.body();
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ File saved to ${outputPath}`);
}
  

module.exports = { getUserInfo , convertDocToPdf, downloadFile};
