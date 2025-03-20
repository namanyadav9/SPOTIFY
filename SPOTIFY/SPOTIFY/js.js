let a = document.getElementById("box1");
a.addEventListener("click", function() {
    window.location.href = "playlist1.html";
});
let b = document.getElementById("box2");
b.addEventListener("click", function() {
    window.location.href = "playlist2.html";
});
// Search songs by name
function searchSongs() {
    const searchTerm = document.getElementById('search-song').value.toLowerCase();
    const filteredPlaylist = playlist.filter(song => song.name.toLowerCase().includes(searchTerm));
    const playlistContainer = document.getElementById('playlist');
    playlistContainer.innerHTML = '';

    filteredPlaylist.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = song.name;
        listItem.classList.add('playlist-item');
        listItem.setAttribute('data-index', playlist.indexOf(song)); // Use original index

        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.classList.add('dots');
        dots.onclick = () => toggleSongOptions(playlist.indexOf(song));
        listItem.appendChild(dots);

        const hideBtn = document.createElement('button');
        hideBtn.textContent = 'Hide Song';
        hideBtn.classList.add('button');
        hideBtn.onclick = () => hideSong(playlist.indexOf(song));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Song';
        deleteBtn.classList.add('button');
        deleteBtn.onclick = () => deleteSong(playlist.indexOf(song));

        const buttonsContainer = document.createElement('div');
        buttonsContainer.appendChild(hideBtn);
        buttonsContainer.appendChild(deleteBtn);
        buttonsContainer.style.display = 'none';

        listItem.appendChild(buttonsContainer);

        if (song.hidden) {
            listItem.classList.add('hidden');
            buttonsContainer.style.display = 'block';
        }

        listItem.onclick = () => {
            loadSong(song);
            audioElement.play();
            resetButtons();
        };
        playlistContainer.appendChild(listItem);
    });
}
