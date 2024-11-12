document.addEventListener("DOMContentLoaded", function() {

  // Esperar 3 segundos antes de ocultar la pantalla de carga y mostrar el contenido principal
  setTimeout(function() {
    // Ocultar la pantalla de carga
    document.getElementById("loading-screen").style.display = "none";
    // Mostrar el contenido principal
    document.getElementById("main-content").style.display = "flex";
  }, 4000); // Ajusta el tiempo si es necesario

  // Mostrar el menú de opciones cuando se haga clic en "Entrar al Menú"
  document.getElementById("enter-button").addEventListener("click", function() {
    document.getElementById("menu").style.display = "block";  // Mostrar el menú
    this.style.display = "none";  // Ocultar el botón de "Entrar"
  });

  // Función para mostrar las secciones seleccionadas
  function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
      section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.display = 'block';
    }
  }

  // botones del menú
  document.querySelectorAll('.menu-button').forEach(function(button) {
    button.addEventListener("click", function() {
      const sectionId = this.getAttribute('data-section');  // Obtener el 'data-section' del botón
      showSection(sectionId);  // Mostrar la sección correspondiente
    });
  });

  // Agregar canción cuando se hace clic en el icono
  const songsContainer = document.getElementById("songs-container");

  // Función para crear una nueva canción y añadir el icono solo en la última fila
  function addSongInput() {
    const songInputs = songsContainer.querySelectorAll("input[type='text']");
    
    // Limitar a 10 canciones
    if (songInputs.length < 10) {
      // Crear nueva entrada de canción
      const newSongInput = document.createElement("div");
      newSongInput.classList.add("song-input");
      newSongInput.innerHTML = `
        <label for="song-${songInputs.length + 1}">Canción ${songInputs.length + 1}:</label>
        <input type="text" name="song[]" required>
      `;

      // Agregar la nueva entrada de canción al contenedor
      songsContainer.appendChild(newSongInput);

      // Solo agregar el icono a la última fila
      const addIconDiv = document.createElement("div");
      addIconDiv.innerHTML = `
        <i class="fa fa-plus" id="add-song-icon" style="cursor: pointer;"></i>
      `;
      newSongInput.appendChild(addIconDiv);

      // Añadir evento al icono de añadir canción
      addIconDiv.querySelector("i").addEventListener("click", function() {
        addSongInput(); // Llama a la función para añadir una nueva canción
        // Ocultar el icono en la fila anterior
        const previousSongInput = songsContainer.querySelectorAll(".song-input")[songInputs.length - 1];
        const previousIcon = previousSongInput.querySelector("#add-song-icon");
        if (previousIcon) {
          previousIcon.style.display = "none"; // Ocultar el icono en la fila anterior
        }
      });

      // Esconder los iconos en todas las filas excepto la última
      const allSongInputs = songsContainer.querySelectorAll(".song-input");
      allSongInputs.forEach((input, index) => {
        const icon = input.querySelector("#add-song-icon");
        if (icon && index !== allSongInputs.length - 1) {
          icon.style.display = "none"; // Ocultar icono si no es la última fila
        }
      });

      // Si ya tenemos 10 canciones, ocultar el icono de añadir
      if (songInputs.length === 9) {
        addIconDiv.querySelector("i").style.display = "none"; // Ocultar el icono de añadir al llegar a 10
      }
    } else {
      alert("¡Solo puedes añadir hasta 10 canciones!");
    }
  }

  // Inicializa el primer campo de canción y el icono, solo uno al principio
  songsContainer.innerHTML = ''; // Limpiar contenido previo (si lo hubiera)
  addSongInput(); // Crear el primer campo de canción

});
