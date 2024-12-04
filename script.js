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

  function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    // Mostrar la sección
    document.querySelectorAll('.section').forEach(section => {
      section.style.display = 'none';
    });
    section.style.display = 'block';
  }

  document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener("click", function () {
      showSection(this.getAttribute('data-section'));
    });
  });

  const confirmationForm = document.getElementById("confirmation-form");
  const additionalFields = document.getElementById("additional-fields");
  const companionNameField = document.getElementById("companion-name-field");
  const stayOptions = document.getElementById("stay-options");
  const allergiesField = document.getElementById("allergies-field");
  const commentsField = document.getElementById("comments-field");

  confirmationForm.addEventListener("change", function (event) {
    const attendingYes = document.getElementById("yes").checked;
    const attendingNo = document.getElementById("no").checked;
    const accompaniedYes = document.getElementById("accompanied-yes").checked;
    if (attendingNo) {
      alert("Sentimos que no puedas venir...");
    }

    additionalFields.style.display = attendingYes ? "block" : "none";

    companionNameField.style.display = accompaniedYes ? "block" : "none";

    // Mostrar opciones de estancia, alergias y comentarios si asiste
    const showExtraFields = attendingYes;
    stayOptions.style.display = showExtraFields ? "block" : "none";
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
  function addSongInput() {
    if (!validateLastSongInput()) return;

    const songInputs = songsContainer.querySelectorAll("input[type='text']");
    // max 10 canciones
    if (songInputs.length >= 10) {
      alert("Máximo 10 canciones permitidas.");
      return;
    }
    const newSongInput = document.createElement("div");
    newSongInput.classList.add("song-input");
    newSongInput.innerHTML = `

      <label for="song-${songInputs.length + 1}">Canción:</label>
      <input type="text" name="song[]" required placeholder="Introduce el nombre de la Canción">
      <i class="fa fa-plus add-song-icon"></i>
    `;
    songsContainer.appendChild(newSongInput);
    if (songInputs.length + 1 >= 10) {
      newSongInput.querySelector(".add-song-icon").style.display = "none";
    }
    const allIcons = songsContainer.querySelectorAll(".add-song-icon");
    allIcons.forEach(icon => {
      icon.style.display = "none";
    });
    if (songInputs.length + 1 < 10) {
      newSongInput.querySelector(".add-song-icon").style.display = "inline-block";
    }
  }

  songsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-song-icon")) {
      addSongInput();
    }
  });
});
