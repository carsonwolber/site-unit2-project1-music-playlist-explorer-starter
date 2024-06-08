document.addEventListener('DOMContentLoaded', () => {
  featurePlaylist();
})

/* function to choose a playlist to feature at random. 
Works by creating a dictionary with an id:playlist dict 
so a random number in range of IDs can be matched with a playlist*/
function featurePlaylist() {
  // const albumPic = document.getElementById('feat-img');
  // const albumName = document.getElementById('playlistname');
  let idTracker = 0;
  let playDict = {};
  data.playlists.forEach(playlist => {
      let id = playlist.playlistID;
      playDict[id] = playlist;
      idTracker++;
});
  idTracker--;
  let featuredId = Math.floor(Math.random()*(idTracker+1)) //gens random in range [0, max playlist id]
  const div = document.createElement('div')
  console.log(idTracker);
  console.log(featuredId);
  console.log(playDict[featuredId]);
  div.className = 'featuredPlaylist'
  div.innerHTML = `
      <img id="feat-img" src= ${playDict[featuredId].playlist_art}/>
      <h2 id = feat-name>${playDict[featuredId].playlist_name} </h2>
  `;
  featureSongList(playDict[featuredId].songs);
  return div;
}


function featureSongList(songs) {
  const sList = document.querySelector('.songs ul'); 
  sList.innerHTML = ``;
  for(let i=0 ; i<songs.length; i++){
      const currSong = songs[i];
      const li = document.createElement('li');
      li.classList.add('currSong');
      li.innerHTML = `
          <img src="${song.cover_art}" id="song-img"/>
          <p id="songtitle" class="song-info" class="songbar">${song.title}</p>
          <p id="song-artist" class="song-info" class="songbar">${song.artist}</p>
          <p id="duration" class="song-info">${song.duration}</p>
          <p class="song-info" id="song-album" class="songbar">${song.album}</p>
      `;
      sList.appendChild(li);
  }

} 
