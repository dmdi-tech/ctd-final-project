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

function addSong(song) {
    const list = getList();
    const alreadyLiked = list.some(s => (s.trackId ?? s.id) === (song.trackId ?? song.id));

    if(alreadyLiked) return;

    const songWithTime = {...song, createdTime: Date.now() };

    saveList([...list, songWithTime]);
};

function addSongToFavorites(song) {
    const songId = song.trackId ?? song.id;
    const list = getList().filter(favSong => (favSong.trackId ?? favSong.id) !== songId);
    saveList([
        ...list,
        {...song, isFavorite: true},
    ]);
};

function getFavorites(sortField, sortDirection){
    return getSortedList(sortField, sortDirection).filter(s => s.isFavorite);
}

function removeSong(songId) {
    const list = (getList().filter((favSong => (favSong.trackId ?? favSong.id)!== songId)));
    saveList(list);
};

function getSortedList(sortField, sortDirection) {
    const list = getList();
    return [...list].sort((a, b) => {
        let aVal = sortField === 'title' ? a.trackName?.toLowerCase() ?? '' : a.createdTime ?? 0;
        let bVal = sortField === 'title' ? b.trackName?.toLowerCase() ?? '' : b.createdTime ?? 0;

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

export default { getList, saveList, addSong, addSongToFavorites, getFavorites, removeSong, getSortedList };