document.addEventListener('DOMContentLoaded', () => {
  featurePlaylist();
});

function featurePlaylist() {
  let idTracker = 0;
  let playDict = {};
  data.playlists.forEach(playlist => {
    let id = playlist.playlistID;
    playDict[id] = playlist;
    idTracker++;
  });
  idTracker--;
  let featuredId = Math.floor(Math.random() * (idTracker + 1));
  const div = document.createElement('div');
  div.className = 'featuredPlaylist';
  div.innerHTML = `
    <img id="feat-img" src="${playDict[featuredId].playlist_art}"/>
    <h2 id="feat-name">${playDict[featuredId].playlist_name}</h2>
  `;
  
  const main = document.querySelector('main');
  main.insertBefore(div, document.getElementById('songs'));

  featureSongList(playDict[featuredId].songs);
}

function featureSongList(songs) {
  const sList = document.querySelector('#songs ul'); 
  sList.innerHTML = '';
  for (let i = 0; i < songs.length; i++) {
    const currSong = songs[i];
    const li = document.createElement('li');
    li.classList.add('currSong');
    li.innerHTML = `
      <img src="${currSong.cover_art}" id="song-img" alt="Song Art"/>
      <p id="songtitle" class="song-info songbar">${currSong.title}</p>
      <p id="song-artist" class="song-info songbar">${currSong.artist}</p>
      <p id="duration" class="song-info">${currSong.duration}</p>
      <p class="song-info" id="song-album" class="songbar">${currSong.album}</p>
    `;
    sList.appendChild(li);
  }
}
