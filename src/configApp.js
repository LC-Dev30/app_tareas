 // Obtén el elemento de contenido y la barra de desplazamiento
 var content = document.getElementById('content');
 var scrollbar = document.documentElement;

 // Se agrega un evento de desplazamiento al elemento de contenido
 content.addEventListener('scroll', function() {
   // Calcula el progreso de desplazamiento
   var scrollTop = content.scrollTop;
   var scrollHeight = content.scrollHeight - content.clientHeight;
   var progress = (scrollTop / scrollHeight) * 100;

   // Actualiza el estilo de la barra de desplazamiento
   scrollbar.style.setProperty('--scroll-progress', progress + '%');
 });