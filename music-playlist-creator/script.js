document.addEventListener('DOMContentLoaded', () => {
  playlistLoader();
  document.getElementById('playlistForm').addEventListener('submit', submitPlaylist);
})

let playlistIdTracker = 0;

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
    playlistIdTracker++;
    
    const div = document.createElement('div');
    div.className = 'playlist-card';
    
    const img = document.createElement('img');
    img.id = "playlist-img";
    
    if (playlist.playlist_art !== '') {
      img.src = playlist.playlist_art;
    } else {
      img.src = 'assets/img/playlist.png';
    }
    
    div.appendChild(img);
    
    const title = document.createElement('h3');
    title.className = "playlist-title";
    title.textContent = playlist.playlist_name;
    
    div.appendChild(title);
    
    const creator = document.createElement('p');
    creator.className = "playlist-creator"; 
    creator.textContent = playlist.playlist_creator;
    
    div.appendChild(creator);
    
    return div;
}

function createBottomCard(playlist) {
    const div = document.createElement('div');
    div.className = 'bottom-section';
    
    if (playlist.songs && playlist.songs.length > 0) {
      div.innerHTML = `
        <img id="likebtn" src="assets/img/like.png" onclick="toggleLike(this)"/>
        <p id="count">${playlist.likeCount}</p>
        <img id="deletebtn" src="assets/img/delete.png" onclick="deletePlaylist(this, ${playlist.playlistID})"/>
      `;
    } else {
      div.innerHTML = `
        <img id="likebtn" src="assets/img/like.png" onclick="toggleLike(this)"/>
        <p id="count">${playlist.likeCount}</p>
        <img id="deletebtn" src="assets/img/delete.png" onclick="deletePlaylist(this, ${playlist.playlistID})"/>
      `;
    }
  
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

}

function submitPlaylist(event) {
    event.preventDefault();
    const modal = document.getElementById("addForm");
    const imageFile = document.getElementById("playlistimage").files[0]; 
    const title = document.getElementById("playlist-name").value;
    const name = document.getElementById("playlist-creator-name").value;
    playlistIdTracker++;
    
    const imageURL = imageFile ? URL.createObjectURL(imageFile) : 'assets/img/playlist.png'; 
    const newPlaylist = {
      playlistID: playlistIdTracker,
      playlist_name: title,
      playlist_creator: name,
      playlist_art: imageURL, 
      likeCount: 0,
      songs: [] 
    };

    const playlists = document.getElementById("playlist-cards");
    const cardContainer = document.createElement('div');
    cardContainer.className = 'playlist-card-container';
    const playlistElement = createPlaylistCard(newPlaylist);
    const bottomElement = createBottomCard(newPlaylist);
    cardContainer.appendChild(playlistElement);
    cardContainer.appendChild(bottomElement);
    playlists.appendChild(cardContainer);

    cardContainer.addEventListener('click', () => populateModal(newPlaylist));

    bottomElement.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    event.target.reset();
    modal.style.display = "none";
}


function deletePlaylist(deleteBtn, playlistID) {
    data.playlists = data.playlists.filter(playlist => playlist.playlistID !== playlistID);
    const playlistCardContainer = deleteBtn.closest('.playlist-card-container');
    playlistCardContainer.remove();
}