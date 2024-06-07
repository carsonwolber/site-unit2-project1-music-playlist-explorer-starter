document.addEventListener('DOMContentLoaded', () => {
  playlistLoader();
})

function playlistLoader() {
  const playlistSet = document.getElementById('playlist-cards');
  data.playlists.forEach(playlist => {
    const playlistElement = createPlaylistCard(playlist);
    playlistSet.appendChild(playlistElement);
    playlistElement.addEventListener('click', () => populateModal(playlist)); 
  });
}

function createPlaylistCard(playlist) {
  const div = document.createElement('div')
  div.className = 'playlist-card'
  div.innerHTML = `
  <img id="playlist-img" src = ${playlist.playlist_art}/>
  <h3 id="playlist-title">${playlist.playlist_name}</h3> 
  <p id="playlist-name">${playlist.playlist_creator}</p>
  <img id="likebtn" src="assets/img/like.png" onclick="toggleLike(this)"/>
  <p id="count">${playlist.likeCount}</p>
  `;
  div.addEventListener('click', () => console.log('clicked'))
  return div;
}

function toggleLike(likeBtn) {
  const filledSrc = 'assets/img/likefill.png';
  const unfilledSrc = 'assets/img/like.png';
  const likeCountElement = likeBtn.nextElementSibling;
  let likeCount = parseInt(likeCountElement.textContent);

  if (likeBtn.src.includes(unfilledSrc)) {
    likeBtn.src = filledSrc;
    likeCount++;
  } else {
    likeBtn.src = unfilledSrc;
    likeCount--;
  }

  likeCountElement.textContent = likeCount;
}

function populateModal(playlist) {
  const modal = document.querySelector('.modal-overlay');
  const modalContent = modal.querySelector('.modal-content');

  modal.querySelector('#modal-album-img').src = playlist.playlist_art;
  modal.querySelector('#modal-playlist-title').textContent = playlist.playlist_name;
  modal.querySelector('#playlist-info p').textContent = playlist.playlist_creator;

  const songList = modal.querySelector('.song-section ul');
  songList.innerHTML = '';

  for (let i = 0; i < playlist.songs.length; i++) {
    const song = playlist.songs[i];
    const li = document.createElement('li');
    li.classList.add('song');
    li.innerHTML = `
      <img src="${song.cover_art}" id="modal-song-img" />
      <p>${song.title}</p>
      <p>${song.artist}</p>
    `;
    songList.appendChild(li);
  }

  modal.style.display = 'block';

  modal.querySelector('#modal-close-btn').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}


