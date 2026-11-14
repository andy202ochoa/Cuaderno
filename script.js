// =====================================================
//  Cuaderno de amor - HTML + CSS + JavaScript puro
// =====================================================

// Cambia el "v5" si modificas las páginas y quieres que se
// ignore lo que quedó guardado de antes en el navegador.
const CLAVE_PAGINAS = 'cuaderno-paginas-v5';
const CLAVE_DATOS = 'cuaderno-datos-v5';

// Páginas iniciales. Cada página tiene un id fijo para que
// sus fotos y textos no se mezclen al añadir hojas nuevas.
// Tipos disponibles: portada, indice, tema, fotoGrande, dosFotos, collage, texto, final
//
// - "tema: true" hace que la página aparezca en el índice.
// - "texto" es lo que aparece escrito por defecto en los renglones.
// - "fotos" (opcional) son fotos fijas desde una carpeta, por ejemplo:
//     fotos: ['img/curso.jpg']
//   Así se verán en cualquier celular, no solo en este navegador.
const paginasIniciales = [
  {
    id: 'portada', tipo: 'portada', icono: '🎂',
    titulo: 'Para ti',
    subtitulo: 'De tu hipermegamejoramigo ♥'
  },
  {
    id: 'indice', tipo: 'indice',
    titulo: 'Índice'
  },
  {
    id: 'gracias', tipo: 'tema', tema: true, fotos: ['imagen1.png'],
    titulo: '1. Gracias por ser mi amiga',
    texto: 'Gracias por ser mi amiga y por acompañarme en las buenas y en las malas. ' +
           'Por escucharme cuando ando hablando puras tonterías, por reírte de mis chistes malos ' +
           'y por estar ahí cuando las cosas no salían bien. Tenerte cerca hace que todo sea ' +
           'más fácil y mucho más bonito.'
  },
  {
    id: 'conoci', tipo: 'tema', tema: true, fotos: ['imagen2.png'],
    titulo: '2. Cómo te conocí',
    texto: 'Te conocí en el curso. Llegaste de la nada y, sin darnos cuenta, empezamos a hablar ' +
           'de mil cosas: teníamos demasiados temas en común y encajamos perfectamente. ' +
           'Todavía me acuerdo de que el primer día me pediste prestado un cargador y terminamos ' +
           'hablando toda la clase de series y memes. Desde ahí ya no paramos.'
  },
  {
    id: 'mejoramigo', tipo: 'tema', tema: true, fotos: ['imagen3.png'],
    titulo: '3. Por qué soy tu hipermegamejoramigo',
    texto: 'Porque siempre hacemos webadas al mismo tiempo, sin ponernos de acuerdo. ' +
           'Nos entendemos con una sola mirada, nos reímos de cosas que nadie más entiende ' +
           'y casi siempre terminamos de migajeros xd. Y aun así, no cambiaría ni una sola de esas veces.'
  },
  {
    id: 'perdon', tipo: 'tema', tema: true, fotos: ['imagen4.png'],
    titulo: '4. Perdón',
    texto: 'Perdóname por las veces que no te metí en mi grupo de trabajo. ' +
           'No era nada personal... bueno, un poquito sí: es que eres vaga xd. ' +
           'Pero prometo que algún día te escogeré primero (si prometes hacer tu parte).'+
           'Tambien perdón por no poner buenas fotos, perdí mi cuenta de google xd.'
  },
  {
    id: 'relleno', tipo: 'final',
    titulo: 'Gracias por todo',
    subtitulo: 'Por cada risa, cada webada y cada momento compartido.'
  },
  {
    id: 'anterior', tipo: 'texto', tema: true,
    titulo: '5. Todo lo anterior es...',
    texto: '...mentira, y lo escribió una IA.\n\n' +
           'Lo anterior es solo porque sé que te gusta mostrar los detalles lindos que te hacen ' +
           'las personas; supongo que lo vas a grabar todo. Lo que te voy a contar a continuación ' +
           'lo escribí yo, y me gustaría que solo grabes hasta el tema 4, porque voy a ser demasiado ' +
           'sincero y no quiero que se arme relajo por mi culpa si otros ven esto.'
  },
  {
    // Aquí se colocan las páginas de la carta (archivo carta.js).
    // Se crean tantas páginas como hagan falta según el tamaño de la pantalla.
    id: 'carta', tipo: 'carta'
  },
  {
    // Contraportada: cada hoja tiene 2 caras, así que el total de páginas debe ser par
    id: 'cierre', tipo: 'final',
    titulo: 'Fin',
    subtitulo: 'Con cariño, Andy :p'
  }
];

// ---------- Guardado en el navegador ----------
function leer(clave, porDefecto) {
  try {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : porDefecto;
  } catch {
    return porDefecto;
  }
}

function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    alert('Ya no hay espacio para guardar más. Prueba con menos fotos o fotos más pequeñas.');
    return false;
  }
}

let paginas = leer(CLAVE_PAGINAS, structuredClone(paginasIniciales));
let datos = leer(CLAVE_DATOS, {});   // { 'cita-f0': 'data:image...', 'cita-t': 'texto', ... }
let actual = 0;                      // cuántas hojas se han pasado
let fotoActiva = null;               // qué espacio de foto se está llenando

const libro = document.getElementById('libro');
const contador = document.getElementById('contador');
const selectorFoto = document.getElementById('selectorFoto');

// ---------- Utilidades ----------
function escapar(texto = '') {
  return String(texto)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function contenidoFoto(src) {
  return src
    ? `<span class="cinta"></span><img src="${src}" alt="Foto del recuerdo">`
    : `<span class="cinta"></span><span class="icono">📷</span><span>Toca o arrastra una foto</span>`;
}

function foto(pagina, n, clasesExtra = '') {
  const clave = `${pagina.id}-f${n}`;
  const src = datos[clave] ?? pagina.fotos?.[n];
  const conImagen = src ? 'con-imagen' : '';
  return `<div class="foto ${clasesExtra} ${conImagen}" data-foto="${clave}"
               role="button" tabindex="0" aria-label="Agregar foto">${contenidoFoto(src)}</div>`;
}

function titulo(pagina) {
  const clave = `${pagina.id}-titulo`;
  return `<h2 class="titulo" contenteditable="true" spellcheck="false"
              data-editable="${clave}">${escapar(datos[clave] ?? pagina.titulo)}</h2>`;
}

function descripcion(pagina, placeholder = 'Escribe aquí este recuerdo...') {
  const clave = `${pagina.id}-t`;
  return `<textarea class="descripcion" data-texto="${clave}"
                    placeholder="${placeholder}">${escapar(datos[clave] ?? pagina.texto ?? '')}</textarea>`;
}

// Lista de temas para el índice (páginas con "tema: true")
function indice() {
  return paginasRender
    .map((p, numero) => ({ p, numero }))
    .filter(({ p }) => p.tema)
    .map(({ p, numero }) => `
      <li>
        <button data-ir="${numero}">
          <span>${escapar(datos[`${p.id}-titulo`] ?? p.titulo)}</span>
          <span class="puntos"></span>
          <span>${numero}</span>
        </button>
      </li>`)
    .join('');
}

// ---------- Plantillas de cada tipo de página ----------
function plantilla(pagina, numero) {
  const num = `<span class="numero">${numero}</span>`;

  switch (pagina.tipo) {
    case 'portada':
    case 'final': {
      const etiqueta = pagina.tipo === 'portada' ? 'h1' : 'h2';
      const claveT = `${pagina.id}-titulo`;
      const claveS = `${pagina.id}-sub`;
      return `
        <div class="contenido portada">
          <div class="corazon-grande">${pagina.icono ?? '♥'}</div>
          <${etiqueta} contenteditable="true" spellcheck="false" data-editable="${claveT}">${escapar(datos[claveT] ?? pagina.titulo)}</${etiqueta}>
          <p contenteditable="true" spellcheck="false" data-editable="${claveS}">${escapar(datos[claveS] ?? pagina.subtitulo ?? '')}</p>
        </div>`;
    }

    case 'indice':
      return `
        <div class="contenido indice">
          ${titulo(pagina)}
          <ol class="lista-indice">${indice()}</ol>
          <div class="corazon-chico">♥</div>
        </div>${num}`;

    case 'tema':
      return `
        <div class="contenido">
          ${titulo(pagina)}
          ${foto(pagina, 0, 'mediana')}
          ${descripcion(pagina)}
        </div>${num}`;

    case 'fotoGrande':
      return `
        <div class="contenido">
          ${titulo(pagina)}
          ${foto(pagina, 0, 'grande' + (pagina.arco ? ' arco' : ''))}
          ${descripcion(pagina)}
        </div>${num}`;

    case 'dosFotos':
      return `
        <div class="contenido">
          ${titulo(pagina)}
          <div class="grid-2">
            ${foto(pagina, 0, 'inclinada-izq')}
            ${foto(pagina, 1, 'inclinada-der')}
          </div>
          ${descripcion(pagina, 'Fecha, lugar y lo que sentimos...')}
        </div>${num}`;

    case 'collage':
      return `
        <div class="contenido">
          ${titulo(pagina)}
          <div class="collage">
            ${foto(pagina, 0)}${foto(pagina, 1)}${foto(pagina, 2)}${foto(pagina, 3)}
          </div>
          ${descripcion(pagina)}
        </div>${num}`;

    case 'cartaPagina':
      return `
        <div class="contenido carta">
          <div class="carta-cuerpo">${pagina.html}</div>
        </div>${num}`;

    case 'blanco':
      return `<div class="contenido carta"><div class="carta-cuerpo"></div></div>${num}`;

    default: // 'texto'
      return `
        <div class="contenido">
          ${titulo(pagina)}
          ${descripcion(pagina, 'Escribe una carta, un poema o lo que quieras...')}
        </div>${num}`;
  }
}

// ---------- Repartir la carta en páginas ----------
// Llena una página de prueba invisible bloque por bloque; cuando algo ya no
// entra, pasa a una página nueva. Los párrafos largos se cortan entre palabras.
function crearBloque(b) {
  let el;
  if (b.tipo === 'titulo') {
    el = document.createElement('h2');
    el.className = 'carta-titulo';
    el.textContent = b.texto;
  } else if (b.tipo === 'subtitulo') {
    el = document.createElement('h3');
    el.className = 'carta-subtitulo';
    el.textContent = b.texto;
  } else if (b.tipo === 'lista') {
    el = document.createElement('ul');
    b.items.forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      el.appendChild(li);
    });
  } else if (b.tipo === 'enlace') {
    el = document.createElement('p');
    el.className = 'sigue';
    const a = document.createElement('a');
    a.href = b.texto;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = b.texto;
    el.appendChild(a);
  } else {
    el = document.createElement('p');
    if (b.sigue) el.className = 'sigue';
    el.textContent = b.texto;
  }
  el._bloque = b;
  return el;
}

function paginarSeccion(bloques, cuerpo) {
  const desborda = () => cuerpo.scrollHeight > cuerpo.clientHeight + 1;
  const resultado = [];
  const cola = [...bloques];
  cuerpo.innerHTML = '';

  const cerrarPagina = () => {
    // Un subtítulo no se queda solo al final de una página
    const ultimo = cuerpo.lastElementChild;
    if (ultimo && ultimo.tagName === 'H3' && cuerpo.children.length > 1) {
      cola.unshift(ultimo._bloque);
      ultimo.remove();
    }
    resultado.push(cuerpo.innerHTML);
    cuerpo.innerHTML = '';
  };

  while (cola.length) {
    const b = cola.shift();
    const el = crearBloque(b);
    cuerpo.appendChild(el);
    if (!desborda()) continue;

    if (b.tipo === 'p') {
      // Buscar cuántas palabras entran en esta página
      const partes = b.texto.split(/(\s+)/);
      let min = 0, max = partes.length;
      while (min < max) {
        const medio = Math.ceil((min + max) / 2);
        el.textContent = partes.slice(0, medio).join('');
        if (desborda()) max = medio - 1; else min = medio;
      }
      if (min > 0 && cuerpo.children.length > 0) {
        el.textContent = partes.slice(0, min).join('');
        const resto = partes.slice(min).join('').replace(/^\s+/, '');
        if (resto) cola.unshift({ tipo: 'p', texto: resto, sigue: true });
      } else {
        el.remove();
        cola.unshift(b);
      }
    } else {
      el.remove();
      cola.unshift(b);
    }

    // Si ni siquiera entra en una página vacía, se coloca igual para no trabarse
    if (!cuerpo.children.length) cuerpo.appendChild(crearBloque(cola.shift()));
    cerrarPagina();
  }
  if (cuerpo.children.length) cerrarPagina();
  return resultado;
}

function paginasDeCarta() {
  if (typeof CARTA === 'undefined') return [];

  // Página de prueba con el mismo tamaño y estilos que una página real
  const medidor = document.createElement('div');
  medidor.className = 'cara frente medidor';
  medidor.innerHTML = '<div class="contenido carta"><div class="carta-cuerpo"></div></div>';
  libro.appendChild(medidor);
  const cuerpo = medidor.querySelector('.carta-cuerpo');

  const lista = [];
  CARTA.forEach(seccion => {
    paginarSeccion(seccion, cuerpo).forEach(html => lista.push({ tipo: 'cartaPagina', html }));
  });

  medidor.remove();
  return lista;
}

// ---------- Dibujar el libro ----------
let paginasRender = [];   // las páginas reales, con la carta ya repartida

function render() {
  libro.querySelectorAll('.hoja').forEach(h => h.remove());

  paginasRender = [];
  paginas.forEach(p => {
    if (p.tipo === 'carta') paginasRender.push(...paginasDeCarta());
    else paginasRender.push(p);
  });

  // Cada hoja tiene 2 páginas, así que el total debe ser par:
  // si sobra una, se agrega una página en blanco antes de la contraportada
  if (paginasRender.length % 2 !== 0) {
    paginasRender.splice(paginasRender.length - 1, 0, { tipo: 'blanco' });
  }

  const totalHojas = paginasRender.length / 2;
  for (let i = 0; i < totalHojas; i++) {
    const frente = paginasRender[i * 2];
    const atras = paginasRender[i * 2 + 1];

    const hoja = document.createElement('div');
    hoja.className = 'hoja';
    hoja.innerHTML = `
      <div class="cara frente">
        ${plantilla(frente, i * 2)}
        <button class="esquina esquina-der" aria-label="Pasar hoja"></button>
      </div>
      <div class="cara atras">
        ${plantilla(atras, i * 2 + 1)}
        <button class="esquina esquina-izq" aria-label="Regresar hoja"></button>
      </div>`;
    libro.appendChild(hoja);
  }

  actual = Math.min(actual, totalHojas);
  actualizar();
}

// Gira las hojas según 'actual' y ordena cuál queda encima
function actualizar() {
  const hojas = [...libro.querySelectorAll('.hoja')];
  hojas.forEach((hoja, i) => {
    const pasada = i < actual;
    hoja.classList.toggle('volteada', pasada);
    hoja.style.zIndex = pasada ? 10 + i : hojas.length - i;
  });

  if (actual === 0) contador.textContent = 'Portada';
  else if (actual === hojas.length) contador.textContent = 'Fin ♥';
  else contador.textContent = `Hoja ${actual} de ${hojas.length}`;
}

function siguiente() {
  const total = libro.querySelectorAll('.hoja').length;
  if (actual < total) { actual++; actualizar(); }
}

function anterior() {
  if (actual > 0) { actual--; actualizar(); }
}

// Abre el libro en un número de página (los pares quedan a la derecha)
function irAPagina(numero) {
  actual = numero % 2 === 0 ? numero / 2 : (numero + 1) / 2;
  actualizar();
}

// ---------- Fotos ----------
// Reduce la foto para que ocupe poco espacio al guardarla
function comprimir(archivo, maximo = 1000, calidad = 0.8) {
  return new Promise((resolver, rechazar) => {
    const img = new Image();
    const url = URL.createObjectURL(archivo);
    img.onload = () => {
      const escala = Math.min(1, maximo / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * escala);
      canvas.height = Math.round(img.height * escala);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolver(canvas.toDataURL('image/jpeg', calidad));
    };
    img.onerror = () => { URL.revokeObjectURL(url); rechazar(); };
    img.src = url;
  });
}

async function ponerFoto(clave, archivo) {
  if (!archivo || !archivo.type.startsWith('image/')) return;

  let imagen;
  try {
    imagen = await comprimir(archivo);
  } catch {
    alert('No se pudo leer esa imagen.');
    return;
  }

  const anteriorFoto = datos[clave];
  datos[clave] = imagen;
  if (!guardar(CLAVE_DATOS, datos)) {
    if (anteriorFoto) datos[clave] = anteriorFoto; else delete datos[clave];
    return;
  }

  const espacio = libro.querySelector(`[data-foto="${clave}"]`);
  espacio.innerHTML = contenidoFoto(imagen);
  espacio.classList.add('con-imagen');
}

selectorFoto.addEventListener('change', () => {
  ponerFoto(fotoActiva, selectorFoto.files[0]);
  selectorFoto.value = '';   // permite elegir la misma foto otra vez
});

// ---------- Eventos dentro del libro ----------
libro.addEventListener('click', e => {
  if (e.target.closest('.esquina-der')) return siguiente();
  if (e.target.closest('.esquina-izq')) return anterior();

  const enlace = e.target.closest('[data-ir]');
  if (enlace) return irAPagina(Number(enlace.dataset.ir));

  const espacio = e.target.closest('.foto');
  if (espacio) {
    fotoActiva = espacio.dataset.foto;
    selectorFoto.click();
  }
});

// Si una imagen no está en la carpeta, se muestra un aviso en vez de una imagen rota
libro.addEventListener('error', e => {
  if (e.target.tagName !== 'IMG') return;
  const espacio = e.target.closest('.foto');
  const archivo = e.target.getAttribute('src');
  espacio.classList.remove('con-imagen');
  espacio.innerHTML = `<span class="cinta"></span><span class="icono">📷</span>
                       <span>Falta ${escapar(archivo)}<br>en la carpeta</span>`;
}, true);

libro.addEventListener('keydown', e => {
  const espacio = e.target.closest('.foto');
  if (espacio && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    fotoActiva = espacio.dataset.foto;
    selectorFoto.click();
  }
});

// Guardar textos y títulos mientras se escribe
libro.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.texto) datos[t.dataset.texto] = t.value;
  else if (t.dataset.editable) datos[t.dataset.editable] = t.textContent;
  else return;
  guardar(CLAVE_DATOS, datos);
});

// Evitar saltos de línea en los títulos
libro.addEventListener('keydown', e => {
  if (e.target.dataset.editable && e.key === 'Enter') {
    e.preventDefault();
    e.target.blur();
  }
});

// Arrastrar y soltar fotos
libro.addEventListener('dragover', e => {
  const espacio = e.target.closest('.foto');
  if (!espacio) return;
  e.preventDefault();
  espacio.classList.add('arrastrando');
});

libro.addEventListener('dragleave', e => {
  const espacio = e.target.closest('.foto');
  if (espacio) espacio.classList.remove('arrastrando');
});

libro.addEventListener('drop', e => {
  const espacio = e.target.closest('.foto');
  if (!espacio) return;
  e.preventDefault();
  espacio.classList.remove('arrastrando');
  ponerFoto(espacio.dataset.foto, e.dataTransfer.files[0]);
});

// Deslizar con el dedo en el celular
let inicioX = null;
libro.addEventListener('touchstart', e => {
  const enEditable = e.target.closest('textarea, [contenteditable]');
  inicioX = enEditable ? null : e.touches[0].clientX;
}, { passive: true });

libro.addEventListener('touchend', e => {
  if (inicioX === null) return;
  const distancia = e.changedTouches[0].clientX - inicioX;
  if (distancia < -50) siguiente();
  if (distancia > 50) anterior();
  inicioX = null;
});

// Flechas del teclado (si no se está escribiendo)
document.addEventListener('keydown', e => {
  if (e.target.closest('textarea, [contenteditable]')) return;
  if (e.key === 'ArrowRight') siguiente();
  if (e.key === 'ArrowLeft') anterior();
});

// ---------- Botones ----------
document.getElementById('siguiente').addEventListener('click', siguiente);
document.getElementById('anterior').addEventListener('click', anterior);

document.getElementById('agregar').addEventListener('click', () => {
  const id = 'p' + Date.now();
  paginas.push(
    { id: id + 'a', tipo: 'dosFotos',   titulo: 'Un nuevo recuerdo' },
    { id: id + 'b', tipo: 'fotoGrande', titulo: 'Otro momento juntos' }
  );
  guardar(CLAVE_PAGINAS, paginas);
  render();
  actual = libro.querySelectorAll('.hoja').length - 1;
  actualizar();
});

document.getElementById('borrar').addEventListener('click', () => {
  if (!confirm('¿Seguro? Se borrarán todas las fotos, textos y hojas añadidas.')) return;
  localStorage.removeItem(CLAVE_PAGINAS);
  localStorage.removeItem(CLAVE_DATOS);
  paginas = structuredClone(paginasIniciales);
  datos = {};
  actual = 0;
  render();
});

// ---------- Corazones flotando de fondo ----------
function crearCorazones(cantidad = 16) {
  const contenedor = document.getElementById('corazones');
  for (let i = 0; i < cantidad; i++) {
    const c = document.createElement('span');
    c.textContent = '♥';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.fontSize = 12 + Math.random() * 22 + 'px';
    c.style.animationDuration = 10 + Math.random() * 12 + 's';
    c.style.animationDelay = -Math.random() * 20 + 's';
    contenedor.appendChild(c);
  }
}

crearCorazones();
render();

// Volver a repartir la carta cuando cargan las fuentes o cambia el tamaño de la pantalla
if (document.fonts) document.fonts.ready.then(render);
let esperaResize;
window.addEventListener('resize', () => {
  clearTimeout(esperaResize);
  esperaResize = setTimeout(render, 250);
});
