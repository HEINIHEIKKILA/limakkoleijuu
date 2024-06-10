let kuvat = [];
let kuvatData = [];
let alphaValues = [20, 100, 110, 170, 160, 120, 140, 210, 170, 50, 15, 19];
let video;
let speedFactor = 2;
let noiseOffsetX = 10;
let noiseOffsetY = 150; // Eri offset arvo Y-akselille

function preload() {
  kuvat[0] = loadImage('Image 10.6.2024 at 12.44.jpg');
  kuvat[1] = loadImage('Screenshot 2024-06-09 at 14.00.33.png');
  kuvat[2] = loadImage('Bubblegum-coral-Paragorgia-sp-from-Atlantis-Bank-Seamount-South-West-Indian-Ridge.ppm');
  kuvat[3] = loadImage('Image 9.6.2024 at 10.36.jpg');
  kuvat[4] = loadImage('Image 9.6.2024 at 10.39.jpg');
  kuvat[5] = loadImage('Image 9.6.2024 at 7.47.jpg');
  kuvat[6] = loadImage('Screenshot 2024-06-09 at 14.00.33.png');
  kuvat[7] = loadImage('Image 10.6.2024 at 12.44.jpg');
  kuvat[8] = loadImage('Image 10.6.2024 at 12.44.jpg');
  kuvat[9] = loadImage('Image 9.6.2024 at 10.41.jpg');
  kuvat[10] = loadImage('Screenshot 2024-06-09 at 14.00.33.png');
  kuvat[11] = loadImage('Image 9.6.2024 at 10.39.jpg');
  video = createVideo(['untitled.mov']); // Vaihda 'untitled.mov' videon polkuun omalla koneellasi
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video.hide(); // Piilota alkuperäinen videoelementti
  video.loop(); // Toista video automaattisesti
  video.speed(1000 / speedFactor); // Hidasta videon toistoa

  // Alustetaan kuvatiedot
  for (let i = 0; i < kuvat.length; i++) {
    kuvat[i].resize(550, 0); // Skaalaa kuvat samanlevyisiksi, mutta säilyttää suhteen
    kuvatData.push({
      x: random(2),
      y: random(1),
      img: kuvat[i],
      noiseOffsetX: random(200), // Eri noise offset jokaiselle kuvalle
      noiseOffsetY: random(9000) + 1000, // Eri noise offset jokaiselle kuvalle
      alpha: alphaValues[i]
    });
  }
}

function draw() {
  background(100, 0, 0, 0); // Vaaleansininen tausta

  // Piirretään ja liikutetaan kuvia sumuisella aaltoliikkeellä
  for (let i = 0; i < kuvat.length; i++) {
    let imgData = kuvatData[i];
    let img = imgData.img;
    
    let offsetX = map(noise(imgData.noiseOffsetX), 0, 2, -500, 30);
    let offsetY = map(noise(imgData.noiseOffsetY), 0, 2, -500, 30);
    
    let alpha = imgData.alpha; // Käytetään ennalta määriteltyä alfa-arvoa
    
    tint(150, alpha); // Sumuisuus ja läpinäkyvyys
    image(img, imgData.x * 600 + offsetX, imgData.y * 600 + offsetY);
    
    imgData.noiseOffsetX += 0.001;
    imgData.noiseOffsetY += 0.001;
  }

  // Näytetään video sumuisena ja blendataan kuviin
  blendMode(ADD); // Valitse sopiva blend mode
  tint(255, 128, 100, 25); // Puoliläpinäkyvyys videolle
  image(video, 0, 0, width, height);
  blendMode(BLEND); // Palauta normaali blend mode
}
