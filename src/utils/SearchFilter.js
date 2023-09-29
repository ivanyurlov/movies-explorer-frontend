function searchFilter(array, keyword, short) {
  if (!array) {
    return [];
  }
  let filtered = [...array];
  if (keyword) {
    filtered = filtered.filter((item) => item.nameRU.toLowerCase().includes(keyword.toLowerCase(keyword)));
  }
  if (short) {
    return filtered.filter((item) => item.duration <= 40);
  }
  return filtered;
}

export default searchFilter;