// Array con las palabras que se mostrarán en el texto dinámico
const palabras = ['Protección', 'Privacidad', 'Seguridad', 'Ética'];

// Índice para la palabra actual que se está escribiendo/borrando
let textoIndex = 0;
// Índice para la posición del carácter dentro de la palabra actual
let charIndex = 0;
// Estado que indica si se está escribiendo (true) o borrando (false)
let escribiendo = true;

// Elemento DOM donde se mostrará el texto dinámico
const elemento = document.getElementById('texto-dinamico');

// Velocidades en milisegundos para animación de escritura y borrado
const velocidadEscritura = 150;
const velocidadBorrado = 100;
// Tiempo de pausa entre mostrar una palabra completa y empezar a borrarla
const pausaEntrePalabras = 1500;

/**
 * Genera un color brillante aleatorio
 * @returns {string} Color en formato hexadecimal (ej. #AABBCC)
 */
function colorBrillante() {
  function componenteBrillante() {
    // Valor entre 150 y 255 para asegurar un color brillante
    return Math.floor(Math.random() * 106) + 150;
  }
  const r = componenteBrillante();
  const g = componenteBrillante();
  const b = componenteBrillante();
  // Convierte los valores RGB a hexadecimal y concatena el color
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`;
}

/**
 * Función principal para animar la escritura y borrado del texto dinámico
 */
function escribir() {
  if (escribiendo) {
    // Si aún no terminó de escribir la palabra actual
    if (charIndex < palabras[textoIndex].length) {
      // Agrega la siguiente letra al contenido
      elemento.textContent += palabras[textoIndex].charAt(charIndex);
      charIndex++;
      // Aplica un color brillante a toda la palabra una vez al inicio
      elemento.style.color = elemento.style.color || colorBrillante();
      // Llama recursivamente para continuar escribiendo
      setTimeout(escribir, velocidadEscritura);
    } else {
      // Palabra completa ya escrita, espera un momento antes de borrar
      escribiendo = false;
      setTimeout(escribir, pausaEntrePalabras);
    }
  } else {
    // Está en proceso de borrado de la palabra actual
    if (charIndex > 0) {
      // Elimina una letra al final
      elemento.textContent = palabras[textoIndex].substring(0, charIndex - 1);
      charIndex--;
      // Continúa borrando recursivamente
      setTimeout(escribir, velocidadBorrado);
    } else {
      // Palabra borrada por completo, pasa a la siguiente palabra del array
      escribiendo = true;
      textoIndex = (textoIndex + 1) % palabras.length;
      // Cambia a un nuevo color brillante para la siguiente palabra
      elemento.style.color = colorBrillante();
      // Comienza a escribir la siguiente palabra
      setTimeout(escribir, velocidadEscritura);
    }
  }
}

// Ejecuta la función escribir cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa el color aleatorio para la primera palabra
  elemento.style.color = colorBrillante();
  escribir();
});

/* ======================================================================= */
/* ======================= LÓGICA DEL QUIZ DE PREGUNTAS ================== */
/* ======================================================================= */

// Array de objetos que representan preguntas del quiz
const preguntas = [
  {
    pregunta: '¿Compartes tus contraseñas con otras personas?',
    opciones: ['Sí', 'No'],
    correcta: 'No',
  },
  {
    pregunta: '¿Utilizas autenticación de dos factores?',
    opciones: ['Sí', 'No'],
    correcta: 'Sí',
  },
  {
    pregunta: '¿Actualizas regularmente el software de tus dispositivos?',
    opciones: ['Sí', 'No'],
    correcta: 'Sí',
  },
  {
    pregunta: '¿Reconoces correos electrónicos fraudulentos fácilmente?',
    opciones: ['Sí', 'No'],
    correcta: 'Sí',
  },
  {
    pregunta: '¿Utilizas contraseñas distintas para diferentes cuentas?',
    opciones: ['Sí', 'No'],
    correcta: 'Sí',
  },
];

// Índice para llevar control de la pregunta actual que se muestra
let indicePreguntaActual = 0;
// Variable que guarda el puntaje acumulado de respuestas correctas
let puntaje = 0;

// Elementos DOM donde se mostrarán contenidos y controles del quiz
const quizContent = document.getElementById('quiz-content');
const feedback = document.getElementById('quiz-feedback');
const resultado = document.getElementById('quiz-result');
const btnNext = document.getElementById('btn-next');

/**
 * Función para cargar la pregunta actual y mostrar opciones al usuario
 */
function cargarPregunta() {
  // Limpia mensajes previos y oculta botón siguiente
  feedback.innerHTML = '';
  resultado.innerHTML = '';
  btnNext.style.display = 'none';

  const preguntaObj = preguntas[indicePreguntaActual];
  // Construye HTML con la pregunta y sus opciones
  let html = `<p><strong>Pregunta ${indicePreguntaActual + 1}:</strong> ${
    preguntaObj.pregunta
  }</p>`;
  preguntaObj.opciones.forEach((opcion) => {
    html += `
      <button class="btn btn-outline-light me-2 mb-2 opcion-btn" onclick="seleccionarRespuesta('${opcion}')">${opcion}</button>
    `;
  });
  quizContent.innerHTML = html;
}

/**
 * Función que se ejecuta al seleccionar una opción de respuesta
 * @param {string} opcionSeleccionada - La opción que eligió el usuario
 */
function seleccionarRespuesta(opcionSeleccionada) {
  const correcta = preguntas[indicePreguntaActual].correcta;
  if (opcionSeleccionada === correcta) {
    // Incrementa puntaje si respuesta es correcta
    puntaje++;
    feedback.innerHTML = '<div class="alert alert-success">✅ ¡Buena práctica!</div>';
  } else {
    feedback.innerHTML = '<div class="alert alert-danger">❌ Mala práctica </div>';
  }

  // Deshabilita todos los botones de opciones para impedir nuevos clics
  document.querySelectorAll('.opcion-btn').forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correcta) {
      // Resalta la opción correcta en verde
      btn.classList.add('btn-success');
      btn.classList.remove('btn-outline-light');
    } else {
      // Las demás opciones se ponen gris para indicar incorrectas
      btn.classList.add('btn-outline-secondary');
      btn.classList.remove('btn-outline-light');
    }
  });

  // Muestra el botón para pasar a la siguiente pregunta
  btnNext.style.display = 'inline-block';
}

// Evento click del botón "Siguiente"
btnNext.addEventListener('click', () => {
  indicePreguntaActual++;
  if (indicePreguntaActual < preguntas.length) {
    // Si hay más preguntas, carga la siguiente
    cargarPregunta();
  } else {
    // Si ya no quedan preguntas, muestra el resultado final
    mostrarResultado();
  }
});

/**
 * Muestra el resumen con resultados y mensaje final al usuario
 */
function mostrarResultado() {
  // Limpia el contenido del quiz y mensajes
  quizContent.innerHTML = '';
  feedback.innerHTML = '';
  btnNext.style.display = 'none';

  let mensaje = '';
  if (puntaje === preguntas.length) {
    mensaje = '¡Excelente! Tienes un conocimiento muy bueno en ciberseguridad.';
  } else if (puntaje >= preguntas.length / 2) {
    mensaje = 'Buen esfuerzo, pero puedes mejorar en algunos puntos de ciberseguridad.';
  } else {
    mensaje = 'Necesitas reforzar tus conocimientos en ciberseguridad.';
  }

  // Muestra el puntaje y mensaje personalizado
  resultado.innerHTML = `
    <h3>Resultado final</h3>
    <p>Obtuviste ${puntaje} de ${preguntas.length} respuestas correctas.</p>
    <p>${mensaje}</p>
  `;
}

// Al cargar la página, inicia el quiz cargando la primera pregunta
document.addEventListener('DOMContentLoaded', cargarPregunta);
