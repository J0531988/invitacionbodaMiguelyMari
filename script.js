document.addEventListener("DOMContentLoaded", function () {
 

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

  // Secciones seleccionadas
  function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
      section.style.display = 'none';
    });
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
  }

  // botones del menú
  document.querySelectorAll('.menu-button').forEach(function (button) {
    button.addEventListener("click", function () {
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  // Agregar nuevas canciones
  const songsContainer = document.getElementById("songs-container");
   function addSongInput() {
    const songInputs = songsContainer.querySelectorAll("input[type='text']");
    // Verificar si algún campo existente está vacío
    for (let input of songInputs) {
      if (input.value.trim() === "") {
        alert("Por favor, rellena todos los campos antes de añadir una nueva canción.");
        return; 
      }
    }
    if (songInputs.length < 10) {
      const newSongInput = document.createElement("div");
      newSongInput.classList.add("song-input");
      newSongInput.innerHTML = `
        <label for="song-${songInputs.length + 1}">Canción ${songInputs.length + 1}:</label>
        <input type="text" name="song[]" required placeholder="Introduce el nombre de la Canción">
      `;
      songsContainer.appendChild(newSongInput);
    }
  }
  document.getElementById("add-song-icon").addEventListener("click", addSongInput);
});
