const fs = require('fs');
const path = require('path');

// 确保目录存在
const soundsDir = path.join(__dirname, 'public', 'sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// 生成简单的音阶音频
function generateScale(startNote, endNote, filename) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(startNote, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  
  oscillator.start();
  
  // 生成音阶
  for (let i = startNote; i <= endNote; i += 100) {
    oscillator.frequency.setValueAtTime(i, audioContext.currentTime + (i - startNote) / 100);
  }
  
  // 停止音频
  oscillator.stop(audioContext.currentTime + (endNote - startNote) / 100 + 1);
  
  // 保存音频文件
  const audioData = audioContext.createMediaStreamDestination();
  const mediaRecorder = new MediaRecorder(audioData.stream);
  const chunks = [];
  
  mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'audio/mp3' });
    const reader = new FileReader();
    reader.onload = () => {
      fs.writeFileSync(path.join(soundsDir, filename), Buffer.from(reader.result));
    };
    reader.readAsArrayBuffer(blob);
  };
  
  mediaRecorder.start();
  setTimeout(() => mediaRecorder.stop(), (endNote - startNote) / 100 + 2000);
}

// 生成所有需要的音频文件
const sounds = [
  {
    name: 'white-keys.mp3',
    startNote: 261.63, // C4
    endNote: 523.25,   // C5
  },
  {
    name: 'black-keys.mp3',
    startNote: 277.18, // C#4
    endNote: 554.37,   // C#5
  },
  {
    name: 'basic-fingering.mp3',
    startNote: 261.63, // C4
    endNote: 392.00,   // G4
  },
  {
    name: 'posture.mp3',
    startNote: 261.63, // C4
    endNote: 349.23,   // F4
  },
  {
    name: 'breathing.mp3',
    startNote: 261.63, // C4
    endNote: 293.66,   // D4
  },
  {
    name: 'singing-posture.mp3',
    startNote: 261.63, // C4
    endNote: 329.63,   // E4
  },
  {
    name: 'vocal-warmup.mp3',
    startNote: 261.63, // C4
    endNote: 523.25,   // C5
  },
  {
    name: 'pitch.mp3',
    startNote: 261.63, // C4
    endNote: 440.00,   // A4
  },
];

// 生成所有音频文件
sounds.forEach(sound => {
  generateScale(sound.startNote, sound.endNote, sound.name);
}); 