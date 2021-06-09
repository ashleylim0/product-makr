const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

async function generateShareFavImages() {
  const portfolioFilePath = path.join(process.cwd(), '/data/me.json');
  const fileContents = fs.readFileSync(portfolioFilePath, 'utf8');
  const portfolio = JSON.parse(fileContents);

  //Load name, title, and image background color from portfolio json file
  const name = portfolio.name ? portfolio.name : '';
  const title = portfolio.title ? portfolio.title : '';
  const nameArr = portfolio.name ? portfolio.name.split(' ') : null;
  const initials = nameArr && nameArr.length > 0 ? `${nameArr[0].split('')[0]}${nameArr[1].split('')[0]}` : 'PM';

  // dimension of our image
  const shareWidth = 1200;
  const shareHeight = 630;
  // create an empty canvas
  const shareCanvas = createCanvas(shareWidth, shareHeight);
  const shareContext = shareCanvas.getContext('2d');
  // fill our frame with background color
  shareContext.fillStyle = '#212121';
  shareContext.fillRect(0, 0, shareWidth, shareHeight);
  shareContext.font = '64pt "Open Sans"';
  shareContext.textAlign = 'center';
  shareContext.fillStyle = '#fff';
  shareContext.fillText(name, 600, 280);
  shareContext.fillText(title, 600, 380);

  const shareBuffer = shareCanvas.toBuffer('image/png');


  // dimension of our image
  const favWidth = 100;
  const favHeight = 100;
  // create an empty canvas
  const favCanvas = createCanvas(favWidth, favHeight);
  const favContext = favCanvas.getContext('2d');

  // fill our frame with background color
  favContext.arc(favWidth / 2, favHeight / 2, 50, 0, Math.PI * 2);
  favContext.fillStyle = '#FCF5E5';
  favContext.fill();

  favContext.font = 'bold 36pt "Open Sans"';
  favContext.textAlign = 'center';
  favContext.fillStyle = '#C58555';
  favContext.fillText(initials, 50, 68);

  const favBuffer = favCanvas.toBuffer('image/png');


  fs.writeFileSync('./public/share.png', shareBuffer);
  fs.writeFileSync('./public/favicon.png', favBuffer);
};

generateShareFavImages();