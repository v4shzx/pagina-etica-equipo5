function respuesta(correcta) {
  const feedback = document.getElementById('quiz-feedback');
  if (correcta) {
    feedback.innerHTML =
      '<div class="alert alert-success">✅ ¡Excelente! Estás cuidando bien tus contraseñas.</div>';
  } else {
    feedback.innerHTML =
      '<div class="alert alert-danger">⚠️ Cuidado: compartir contraseñas compromete tu seguridad.</div>';
  }
}
