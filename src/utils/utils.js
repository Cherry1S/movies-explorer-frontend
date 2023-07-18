export const filterSearch = (cards, searchValue, isShorts, callback, localValues) => {
  const filteredByWord = cards.filter(item => item.nameRU.toLowerCase().includes(searchValue.toLowerCase()))
  const filteredByDuration = filteredByWord.filter(item => item.duration <= 40)

  const saveInLocalStorage = (filteredCards) => {
    if (localValues) {
      localStorage.setItem(localValues.searchValue, searchValue);
      localStorage.setItem(localValues.filteredCards, JSON.stringify(filteredCards));
    }
  }

  if (isShorts) {
    callback(filteredByDuration)
    saveInLocalStorage(filteredByDuration)
    return
  }
  callback(filteredByWord)
  saveInLocalStorage(filteredByWord)
}


export const toHoursAndMinutes = (totalMinutes) => {

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}ч${minutes}м`;
}
