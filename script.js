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

  // FSelección section
  function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
      section.style.display = 'none';
    });
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
  }

  // Bbotones del menú
  document.querySelectorAll('.menu-button').forEach(function (button) {
    button.addEventListener("click", function () {
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  // Playlist
  const songsContainer = document.getElementById("songs-container");

  let songCount = 1; 

  // Agregar una nueva canción
  function addSongInput() {
    const songInputs = songsContainer.querySelectorAll("input[type='text']");
    for (let input of songInputs) {
      if (input.value.trim() === "") {
        alert("Por favor, rellena el nombre de la canción antes de añadir una nueva canción.");
        return;
      }
    }
    if (songInputs.length < 10) {
      const lastAddButton = songsContainer.querySelector(".add-song-icon");
      if (lastAddButton) {
        lastAddButton.style.display = "none";
      }
      const newSongInput = document.createElement("div");
      newSongInput.classList.add("song-input");
      const songId = `song-${songCount}`;

      newSongInput.innerHTML = `
        <label for="${songId}">Canción:</label>
        <input type="text" id="${songId}" name="song[]" required placeholder="Introduce el nombre de la Canción">
        <i class="fa fa-plus add-song-icon" style="cursor: pointer;"></i>
      `;

      songsContainer.appendChild(newSongInput);

      songCount++; 
    } else {
      alert("Solo puedes añadir hasta 10 canciones.");
    }
  }
  songsContainer.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("add-song-icon")) {
      addSongInput();
    }
  });
});
