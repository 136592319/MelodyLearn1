const https = require('https');
const fs = require('fs');
const path = require('path');

const sounds = [
  {
    name: 'C4.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/C4.mp3'
  },
  {
    name: 'D4.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/D4.mp3'
  },
  {
    name: 'E4.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/E4.mp3'
  },
  {
    name: 'F4.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/F4.mp3'
  },
  {
    name: 'G4.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/G4.mp3'
  },
  {
    name: 'white-keys.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/C5.mp3'
  },
  {
    name: 'black-keys.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/Cs5.mp3'
  },
  {
    name: 'basic-fingering.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/E5.mp3'
  },
  {
    name: 'posture.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/G5.mp3'
  },
  {
    name: 'breathing.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/A4.mp3'
  },
  {
    name: 'singing-posture.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/B4.mp3'
  },
  {
    name: 'vocal-warmup.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/D5.mp3'
  },
  {
    name: 'pitch.mp3',
    url: 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/F5.mp3'
  }
];

// 确保目录存在
const soundsDir = path.join(__dirname, 'public', 'sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// 下载函数
function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(soundsDir, filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

// 下载所有文件
async function downloadAll() {
  for (const sound of sounds) {
    try {
      await downloadFile(sound.url, sound.name);
    } catch (error) {
      console.error(`Error downloading ${sound.name}:`, error);
    }
  }
}

downloadAll(); 