document.addEventListener("DOMContentLoaded", function() {

  setTimeout(function() {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-content").style.display = "flex";
  }, 4000); 
  // Menu
  document.getElementById("enter-button").addEventListener("click", function() {
    document.getElementById("menu").style.display = "block";  // Mostrar el menú
    this.style.display = "none";  // Ocultar el botón de "Entrar"
  });
  function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
      section.style.display = 'none';
    });
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.display = 'block';
    }
  }
  document.querySelectorAll('.menu-button').forEach(function(button) {
    button.addEventListener("click", function() {
      const sectionId = this.getAttribute('data-section');  // Obtener el 'data-section' del botón
      showSection(sectionId);  // Mostrar la sección correspondiente
    });
  });
  const songsContainer = document.getElementById("songs-container");
  function addSongInput() {
    const songInputs = songsContainer.querySelectorAll("input[type='text']");
    if (songInputs.length < 10) {
      const newSongInput = document.createElement("div");
      newSongInput.classList.add("song-input");
      newSongInput.innerHTML = `
        <label for="song-${songInputs.length + 1}">Canción ${songInputs.length + 1}:</label>
        <input type="text" name="song[]" required>
      `;
      songsContainer.appendChild(newSongInput);
      const addIconDiv = document.createElement("div");
      addIconDiv.innerHTML = `
        <i class="fa fa-plus" id="add-song-icon" style="cursor: pointer;"></i>
      `;
      newSongInput.appendChild(addIconDiv);
      addIconDiv.querySelector("i").addEventListener("click", function() {
        addSongInput();
        const previousSongInput = songsContainer.querySelectorAll(".song-input")[songInputs.length - 1];
        const previousIcon = previousSongInput.querySelector("#add-song-icon");
        if (previousIcon) {
          previousIcon.style.display = "none"; 
        }
      });

      const allSongInputs = songsContainer.querySelectorAll(".song-input");
      allSongInputs.forEach((input, index) => {
        const icon = input.querySelector("#add-song-icon");
        if (icon && index !== allSongInputs.length - 1) {
          icon.style.display = "none"; 
        }
      });
      if (songInputs.length === 9) {
        addIconDiv.querySelector("i").style.display = "none";
      }
    } else {
      alert("¡Solo puedes añadir hasta 10 canciones!");
    }
  }
  songsContainer.innerHTML = ''; 
  addSongInput(); 

});
