document.addEventListener('DOMContentLoaded', () => {
  playlistLoader();
})

function playlistLoader() {
  const playlistContainer = document.getElementById('playlist-cards');
  data.playlists.forEach(playlist => {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'playlist-card-container';
    const playlistElement = createPlaylistCard(playlist);
    const bottomElement = createBottomCard(playlist);
    cardContainer.appendChild(playlistElement);
    cardContainer.appendChild(bottomElement);
    playlistContainer.appendChild(cardContainer);
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
    `;
  return div;
}

function createBottomCard(playlist) {
  const div = document.createElement('div')
  div.className = 'bottom-section'
  div.innerHTML = ` 
    <img id="likebtn" src="assets/img/like.png" onclick="toggleLike(this)"/>
    <p id="count">${playlist.likeCount}</p>
    `;
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
      <img src="${song.cover_art}" id="song-img"/>
      <p id="songtitle" class="song-info" class="songbar">${song.title}</p>
      <p id="song-artist" class="song-info" class="songbar">${song.artist}</p>
      <p class="song-info" id="song-album" class="songbar">${song.album}</p>
      <p id="duration" class="song-info">${song.duration}</p>
    `;
    songList.appendChild(li);
  }

  modal.style.display = 'block';

  modal.querySelector('#modal-close-btn').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.querySelector('#shuffle-btn').addEventListener('click', () => {
    let songBlock = document.querySelector('ul');
    for (let i = songBlock.children.length; i >= 0; i--) {
      songBlock.appendChild(songBlock.children[Math.random() * i | 0])
    }
  })

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
