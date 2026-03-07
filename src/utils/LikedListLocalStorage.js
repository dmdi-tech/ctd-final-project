function getList() {
    try {
        console.log("got list from storage");
        return JSON.parse(localStorage.getItem('likedList')) || [];
    } catch(e) {
        console.error('likedListLocalStorage: error fetching liked list.')
        return [];
    }
};


function saveList(list) {
    try {   
        localStorage.setItem('likedList', JSON.stringify(list));
        console.log("set list from storage");
    } catch(e) {
        console.error('likedListLocalStorage: error setting liked list.')
        return [];
    }
};

function addSongToFavorites(item) {
    const songId = item.trackId ?? item.id;
    const list = getList().filter(favSong => (favSong.trackId ?? favSong.id) !== songId);
    saveList([
        ...list,
        {...item, isFavorite: true},
    ]);
};

function removeSong(songId) {
    const list = (getList().filter((favSong => (favSong.trackId ?? favSong.id)!== songId)));
    saveList(list);
};

export default { getList, saveList, addSongToFavorites, removeSong };