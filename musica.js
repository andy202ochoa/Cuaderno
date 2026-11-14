// =====================================================
//  Música de fondo
// =====================================================
// Pon los archivos de audio (.mp3) en la misma carpeta que index.html
// y escribe aquí sus datos. Puedes poner una o varias canciones.
const CANCIONES = [
  { archivo: 'musica1.mp3', titulo: 'We Are The People', artista: 'Empire Of The Sun' },
  // { archivo: 'cancion2.mp3', titulo: 'Otra canción', artista: 'Otro artista' },
];

const VOLUMEN = 0.5;   // de 0 (silencio) a 1 (máximo)

// ---------- Elementos ----------
const audio = document.getElementById('audio');
const reproductor = document.getElementById('reproductor');
const disco = document.getElementById('disco');
const repTitulo = document.getElementById('repTitulo');
const repArtista = document.getElementById('repArtista');
const repProgreso = document.getElementById('repProgreso');
const repActual = document.getElementById('repActual');
const repTotal = document.getElementById('repTotal');
const repPlay = document.getElementById('repPlay');

const ICONO_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const ICONO_PAUSA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';

let indiceCancion = 0;
let arrastrando = false;
audio.volume = VOLUMEN;

// ---------- Utilidades ----------
function formatoTiempo(segundos) {
  if (!isFinite(segundos)) return '0:00';
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function mostrarEstado() {
  const sonando = !audio.paused;
  repPlay.innerHTML = sonando ? ICONO_PAUSA : ICONO_PLAY;
  repPlay.setAttribute('aria-label', sonando ? 'Pausar' : 'Reproducir');
  disco.classList.toggle('girando', sonando);
}

// ---------- Controles ----------
function cargar(i) {
  indiceCancion = (i + CANCIONES.length) % CANCIONES.length;
  const c = CANCIONES[indiceCancion];
  audio.src = c.archivo;
  audio.loop = CANCIONES.length === 1;
  repTitulo.textContent = c.titulo;
  repArtista.textContent = c.artista;
  repProgreso.value = 0;
  repActual.textContent = '0:00';
  repTotal.textContent = '0:00';
}

function reproducir() {
  audio.play().catch(() => {});   // el navegador puede bloquearlo hasta que el usuario toque algo
}

function alternar() {
  if (audio.paused) reproducir(); else audio.pause();
}

function cambiar(direccion) {
  const estabaSonando = !audio.paused;
  cargar(indiceCancion + direccion);
  if (estabaSonando) reproducir();
}

function mover(segundos) {
  if (!isFinite(audio.duration)) return;
  audio.currentTime = Math.min(Math.max(audio.currentTime + segundos, 0), audio.duration);
}

repPlay.addEventListener('click', alternar);
document.getElementById('repAtras').addEventListener('click', () => mover(-10));
document.getElementById('repAdelante').addEventListener('click', () => mover(10));
document.getElementById('repSiguiente').addEventListener('click', () => cambiar(1));
document.getElementById('repAnterior').addEventListener('click', () => {
  // Si ya avanzó un poco, vuelve al inicio; si no, va a la canción anterior
  if (audio.currentTime > 3) audio.currentTime = 0;
  else cambiar(-1);
});

// Barra de progreso: se puede arrastrar para adelantar o retroceder
repProgreso.addEventListener('input', () => {
  arrastrando = true;
  if (isFinite(audio.duration)) {
    repActual.textContent = formatoTiempo(repProgreso.value / 100 * audio.duration);
  }
});

repProgreso.addEventListener('change', () => {
  if (isFinite(audio.duration)) audio.currentTime = repProgreso.value / 100 * audio.duration;
  arrastrando = false;
});

// ---------- Eventos del audio ----------
audio.addEventListener('loadedmetadata', () => {
  repTotal.textContent = formatoTiempo(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  if (arrastrando || !isFinite(audio.duration)) return;
  repProgreso.value = audio.currentTime / audio.duration * 100;
  repActual.textContent = formatoTiempo(audio.currentTime);
});

audio.addEventListener('play', mostrarEstado);
audio.addEventListener('pause', mostrarEstado);
audio.addEventListener('ended', () => { if (!audio.loop) cambiar(1); reproducir(); });

audio.addEventListener('error', () => {
  repTitulo.textContent = `Falta ${CANCIONES[indiceCancion].archivo}`;
  repArtista.textContent = 'Ponla en la misma carpeta';
  mostrarEstado();
});

// ---------- Minimizar (solo se ve el disco) ----------
document.getElementById('repMin').addEventListener('click', () => {
  reproductor.classList.add('minimizado');
});

disco.addEventListener('click', () => {
  if (reproductor.classList.contains('minimizado')) reproductor.classList.remove('minimizado');
  else alternar();
});

disco.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); disco.click(); }
});

// En celulares empieza minimizado para no tapar el cuaderno
if (window.innerWidth < 600) reproductor.classList.add('minimizado');

// ---------- Empezar con el primer toque ----------
// Los navegadores no dejan que la música suene sola al abrir la página,
// así que empieza en cuanto la persona toca o presiona algo.
function primerToque(e) {
  if (e.target.closest && e.target.closest('#reproductor')) return;  // ahí ya hay botones
  document.removeEventListener('pointerdown', primerToque);
  document.removeEventListener('keydown', primerToque);
  if (audio.paused) reproducir();
}
document.addEventListener('pointerdown', primerToque);
document.addEventListener('keydown', primerToque);

cargar(0);
mostrarEstado();