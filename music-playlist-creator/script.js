document.addEventListener('DOMContentLoaded', () => {
    playlistLoader();
})






function playlistLoader() {
    const playlistSet = document.getElementById('playlist-cards');
    data.playlists.forEach(playlist => {
        const playlistElement = createPlaylistCard(playlist);
        playlistSet.appendChild(playlistElement);
    });

}

function createPlaylistCard(playlist) { 
    const div = document.createElement('div')
    div.className = 'playlist-card'
    div.innerHTML = `
    <img id="playlist-img" src = ${playlist.playlist_art}/>
    <h3 id="playlist-title">${playlist.playlist_name}</h3> 
    <p id="playlist-name">${playlist.playlist_creator}</p>
    <img id="likebtn" src="assets/img/like.png"/>
    <p id="count">${playlist.likeCount}</p?>
    `;
    return div;
}

