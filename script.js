document.addEventListener("DOMContentLoaded", function () {
  // Pantalla de carga
  setTimeout(function () {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.classList.add("fade-out");
    loadingScreen.addEventListener("transitionend", function () {
      loadingScreen.style.display = "none";
      document.getElementById("main-content").style.display = "flex";
    }, { once: true });
  }, 3000);

  // Mostrar Menú
  document.getElementById("enter-button").addEventListener("click", function () {
    document.getElementById("menu").style.display = "block";
    this.style.display = "none";
  });

  // Mostrar secciones
  function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
  }

  document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener("click", function () {
      showSection(this.getAttribute('data-section'));
    });
  });

  // Confirmación: Mostrar/ocultar campos
  const confirmationForm = document.getElementById("confirmation-form");
  const additionalFields = document.getElementById("additional-fields");
  const companionNameField = document.getElementById("companion-name-field");
  const allergiesField = document.getElementById("allergies-field");
  const commentsField = document.getElementById("comments-field");

  confirmationForm.addEventListener("change", function (event) {
    const attendingYes = document.getElementById("yes").checked;
    const attendingNo = document.getElementById("no").checked;
    const accompaniedYes = document.getElementById("accompanied-yes").checked;
    if (attendingNo) {
      alert("Sentimos que no puedas venir...");
    }

    // Boda SI
    additionalFields.style.display = attendingYes ? "block" : "none";

    // Acompañado SI
    companionNameField.style.display = accompaniedYes ? "block" : "none";

    // Viene, alergia, etc
    const showExtraFields = attendingYes;
    allergiesField.style.display = showExtraFields ? "block" : "none";
    commentsField.style.display = showExtraFields ? "block" : "none";
  });

  // Agregar canciones
  const songsContainer = document.getElementById("songs-container");

  // Función para validar el último campo de canción
  function validateLastSongInput() {
    const songInputs = songsContainer.querySelectorAll("input[type='text']");
    const lastInput = songInputs[songInputs.length - 1];

    // Verificar si el último campo está vacío
    if (!lastInput.value.trim()) {
      alert("Por favor, introduce el nombre de la canción antes de añadir otra.");
      lastInput.focus();
      return false;
    }
    return true;
  }

  // Función para manejar la lógica de añadir canciones
  function addSongInput() {
    // Verificar si el campo actual está vacío antes de añadir uno nuevo
    if (!validateLastSongInput()) return;

    const songInputs = songsContainer.querySelectorAll("input[type='text']");
    // Si ya hay 10 canciones, no añadir más
    if (songInputs.length >= 10) {
      alert("Máximo 10 canciones permitidas.");
      return;
    }

    // Crear el nuevo campo de canción
    const newSongInput = document.createElement("div");
    newSongInput.classList.add("song-input");
    newSongInput.innerHTML = `
      <label for="song-${songInputs.length + 1}">Canción:</label>
      <input type="text" name="song[]" required placeholder="Introduce el nombre de la Canción">
      <i class="fa fa-plus add-song-icon"></i>
    `;

    // Añadir el nuevo campo de canción al contenedor
    songsContainer.appendChild(newSongInput);

    // Ocultar el botón de añadir canción si ya se han añadido canciones
    if (songInputs.length + 1 >= 10) {
      newSongInput.querySelector(".add-song-icon").style.display = "none";
    }

    // Hacer que el botón de añadir canción desaparezca en los campos anteriores
    const allIcons = songsContainer.querySelectorAll(".add-song-icon");
    allIcons.forEach(icon => {
      icon.style.display = "none";
    });

    // Si aún no se ha llegado al límite de 10 canciones, mostrar el botón en el último input
    if (songInputs.length + 1 < 10) {
      newSongInput.querySelector(".add-song-icon").style.display = "inline-block";
    }
  }

  // Delegar evento en el contenedor para detectar clicks en el botón de añadir
  songsContainer.addEventListener("click", function (event) {
    // Verificar si el click es sobre el icono de añadir canción
    if (event.target.classList.contains("add-song-icon")) {
      addSongInput();
    }
  });
});
