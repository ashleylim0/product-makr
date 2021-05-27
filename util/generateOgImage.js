const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

async function generateOgImage() {
  const portfolioFilePath = path.join(process.cwd(), '/data/me.json');
  const fileContents = fs.readFileSync(portfolioFilePath, 'utf8');
  const portfolio = JSON.parse(fileContents);

  //Load name, title, and image background color from portfolio json file
  const name = portfolio.name ? portfolio.name : "My";
  const title = portfolio.title ? portfolio.title : "Portfolio"

  // dimension of our image
  const width = 1200;
  const height = 630;

  // create an empty canvas
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // fill our frame with background color
  context.fillStyle = '#212121';
  context.fillRect(0, 0, width, height);

  context.font = '64pt "Open Sans"'
  context.textAlign = 'center'
  context.fillStyle = '#fff'
  context.fillText(name, 600, 280)
  context.fillText(title, 600, 380)

  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('./public/share.png', buffer);
};

generateOgImage();