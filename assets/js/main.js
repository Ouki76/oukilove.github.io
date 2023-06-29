const gravityButtons = document.querySelectorAll('.gravityButton');

function handleMouseMove(e) {
  if (!isMobileOrTablet()) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const h = rect.width / 2;

    const x = e.clientX - rect.left - h;
    const y = e.clientY - rect.top - h;

    const r1 = Math.sqrt(x * x + y * y);
    const r2 = (1 - r1 / h) * r1;

    const angle = Math.atan2(y, x);
    const tx = Math.round(Math.cos(angle) * r2 * 100) / 100;
    const ty = Math.round(Math.sin(angle) * r2 * 100) / 100;

    const op = r2 / r1 + 0.25;

    btn.style.setProperty('--tx', `${tx}px`);
    btn.style.setProperty('--ty', `${ty}px`);
    btn.style.setProperty('--opacity', `${op}`);
  }
}

function handleMouseLeave(e) {
  if (!isMobileOrTablet()) {
    const btn = e.currentTarget;
    btn.style.setProperty('--tx', '0px');
    btn.style.setProperty('--ty', '0px');
    btn.style.setProperty('--opacity', '0.25');
  }
}

function isMobileOrTablet() {
  return window.matchMedia('(pointer: coarse)').matches;
}

gravityButtons.forEach((btn) => {
  btn.addEventListener('mousemove', handleMouseMove);
  btn.addEventListener('mouseleave', handleMouseLeave);
});

function onYouTubeIframeAPIReady() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id');

  if (videoId) {
    window.player = new YT.Player('player', {
      videoId: videoId,
      playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': videoId },
      events: {
        onReady: (event) => {
          event.target.setVolume(15);
          document.getElementById('start-button').onclick = _ => {
            event.target.playVideo();
          };
        }
      }
    });
  } else {
    const playerElement = document.getElementById('player');
    playerElement.style.backgroundColor = '#2b2b2b';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const startBackground = document.getElementById('start-background');
  const startButton = document.getElementById('start-button');
  const content = document.getElementById('content');

  startButton.addEventListener('click', function() {
    content.style.opacity = '1';
    content.style.display = 'block';
    startButton.style.opacity = '0';
    startButton.style.pointerEvents = 'none';
    startBackground.style.opacity = '0';
    startBackground.style.pointerEvents = 'none';
  });
});