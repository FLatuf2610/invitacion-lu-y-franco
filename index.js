// 21 de noviembre de 2026, 17:30 hora Argentina (UTC-3)
const FECHA_CASAMIENTO = new Date('2026-11-21T17:30:00-03:00');

const elementos = {
  dias: document.querySelector('[data-contador="dias"]'),
  horas: document.querySelector('[data-contador="horas"]'),
  minutos: document.querySelector('[data-contador="minutos"]'),
  segundos: document.querySelector('[data-contador="segundos"]'),
};

const sinAnimacion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const dosDigitos = (n) => String(n).padStart(2, '0');

function crearValor(digito, clase) {
  const valor = document.createElement('span');
  valor.className = clase ? `contador__valor ${clase}` : 'contador__valor';
  valor.textContent = digito;
  return valor;
}

function crearDigito(digito) {
  const slot = document.createElement('span');
  slot.className = 'contador__digito';
  slot.append(crearValor(digito));
  return slot;
}

// El dígito actual baja y sale mientras el nuevo entra desde arriba
function actualizarDigito(slot, digito) {
  const actual = slot.lastElementChild;
  if (actual.textContent === digito) return;

  if (sinAnimacion) {
    actual.textContent = digito;
    return;
  }

  // Si quedó alguna animación sin terminar (ej: pestaña en segundo plano), se descarta
  slot.querySelectorAll('.contador__valor--sale').forEach((el) => el.remove());

  actual.classList.remove('contador__valor--entra');
  actual.classList.add('contador__valor--sale');
  actual.addEventListener('animationend', () => actual.remove(), { once: true });

  slot.append(crearValor(digito, 'contador__valor--entra'));
}

function renderNumero(elemento, valor) {
  const texto = dosDigitos(valor);

  if (elemento.children.length !== texto.length) {
    elemento.replaceChildren(...[...texto].map(crearDigito));
    return;
  }

  [...texto].forEach((digito, i) => actualizarDigito(elemento.children[i], digito));
}

function actualizarContador() {
  const restante = Math.max(0, FECHA_CASAMIENTO - Date.now());
  const totalSegundos = Math.floor(restante / 1000);

  renderNumero(elementos.dias, Math.floor(totalSegundos / 86400));
  renderNumero(elementos.horas, Math.floor(totalSegundos / 3600) % 24);
  renderNumero(elementos.minutos, Math.floor(totalSegundos / 60) % 60);
  renderNumero(elementos.segundos, totalSegundos % 60);

  if (restante === 0) clearInterval(intervalo);
}

const intervalo = setInterval(actualizarContador, 1000);
actualizarContador();

// Apertura: una vez cargada la página, la imagen se abre al medio y se libera el scroll
const apertura = document.querySelector('.apertura');

// Evita que el navegador restaure el scroll de una visita anterior detrás de la imagen
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

const logoFirma = document.querySelector('.inicio__logo--firma');
const logoFecha = document.querySelector('.inicio__logo--fecha');

// Primero aparece la firma y, cuando termina, la fecha
function mostrarLogo() {
  logoFirma.addEventListener('transitionend', () => {
    logoFecha.classList.add('inicio__logo--visible');
  }, { once: true });
  logoFirma.classList.add('inicio__logo--visible');
}

function terminarApertura() {
  if (!apertura.isConnected) return;
  apertura.remove();
  document.documentElement.classList.remove('scroll-bloqueado');
  mostrarLogo();
}

const DEMORA_APERTURA = 600;

window.addEventListener('load', () => {
  setTimeout(() => {
    apertura.classList.add('apertura--abierta');
    apertura.addEventListener('transitionend', terminarApertura, { once: true });
    // Respaldo por si transitionend no se dispara: el scroll nunca queda bloqueado
    setTimeout(terminarApertura, 2000);
  }, DEMORA_APERTURA);
});
