// Curseur personnalisé 
const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;
const ctx = canvas.getContext('2d');

let rotation = 0;
const cursorImg = new Image();

// Fonction pour dessiner le curseur avec rotation
cursorImg.onload = () => {
  const animateCursor = () => {
    ctx.clearRect(0, 0, 32, 32);
    ctx.save();
    ctx.translate(16, 16);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(cursorImg, -13, -13, 26, 26);
    ctx.restore();
    
    const cursorUrl = `url('${canvas.toDataURL()}') 16 16, auto`;
    document.documentElement.style.cursor = cursorUrl;
    
    rotation = (rotation + 2) % 360;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();
};

cursorImg.src = import.meta.env.BASE_URL + 'image/pixel-art-sakura-flower.png';
