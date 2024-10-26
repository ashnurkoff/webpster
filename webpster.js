const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

// Function to parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const argObj = {};

  args.forEach((arg) => {
    const [key, value] = arg.split('=');
    argObj[key] = value;
  });

  return argObj;
}

// Parse command-line arguments with default values
const args = parseArgs();
const inputFolderName = args.i || 'input';
const outputFolderName = args.o || 'output';
const quality = args.q ? parseInt(args.q, 10) : 50;

// Define full paths
const inputFolder = path.join(__dirname, inputFolderName);
const outputFolder = path.join(__dirname, outputFolderName);

async function ensureFolderExists(folder) {
  try {
    await fs.access(folder);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(folder);
    } else {
      throw err;
    }
  }
}

async function convertImages() {
  try {
    await ensureFolderExists(outputFolder);

    const files = await fs.readdir(inputFolder);
    const validExtensions = ['.jpg', '.jpeg', '.png'];

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const filePath = path.join(inputFolder, file);

      if (validExtensions.includes(ext)) {
        const outputFilePath = path.join(
          outputFolder,
          path.basename(file, ext) + '.webp'
        );

        try {
          await sharp(filePath)
            .webp({ quality })
            .toFile(outputFilePath);
          console.log(`Successfully converted ${file} to WEBP.`);
        } catch (err) {
          console.error(`Error converting ${file}:`, err);
        }
      }
    }
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

convertImages();
