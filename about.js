const bgCanvas = document.getElementById('bgCanvas');
const ctx = bgCanvas.getContext('2d');
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
bgCanvas.width = canvasWidth;
bgCanvas.height = canvasHeight;

window.addEventListener('resize', () => {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  bgCanvas.width = canvasWidth;
  bgCanvas.height = canvasHeight;
  maxScroll = scrollContainer.scrollHeight - window.innerHeight;
});

let ripples = [];
let lastRippleTime = 0;
const RIPPLE_MAX_RADIUS = 300;

function addRipple(x, y) {
  ripples.push({ x, y, radius: 0, maxRadius: RIPPLE_MAX_RADIUS });
}

let targetX = canvasWidth / 2, targetY = canvasHeight / 2,
    cursorX = targetX, cursorY = targetY;
const customCursor = document.getElementById('customCursor');

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

const opacityMultiplier = 0.05;

function animateCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = '#0b1622';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const lerpFactor = 0.1;
  cursorX += (targetX - cursorX) * lerpFactor;
  cursorY += (targetY - cursorY) * lerpFactor;
  customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  
  if (Date.now() - lastRippleTime > 5) {
    addRipple(cursorX, cursorY);
    lastRippleTime = Date.now();
  }
  
  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i];
    const alpha = 0.5 * (1 - (ripple.radius / ripple.maxRadius)) * opacityMultiplier;
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, ripple.radius * 0.1,
      ripple.x, ripple.y, ripple.radius
    );
    gradient.addColorStop(0, `rgba(0,191,255,${alpha})`);
    gradient.addColorStop(0.5, `rgba(0,191,255,${alpha * 0.6})`);
    gradient.addColorStop(1, 'rgba(0,191,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.fill();
    ripple.radius += 3;
    if (ripple.radius >= ripple.maxRadius) {
      ripples.splice(i, 1);
    }
  }
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  const inner = card.querySelector('.card-inner');
  let holdTimer;
  
  card.addEventListener('mouseenter', () => {
    if (holdTimer) clearTimeout(holdTimer);
    inner.classList.add('flipped');
  });
  
  card.addEventListener('mouseleave', () => {
    let transitionCompleted = false;
    const onTransitionEnd = () => {
      transitionCompleted = true;
      holdTimer = setTimeout(() => {
        if (transitionCompleted) inner.classList.remove('flipped');
      }, 300);
    };
    inner.addEventListener('transitionend', onTransitionEnd, { once: true });
  });
});
