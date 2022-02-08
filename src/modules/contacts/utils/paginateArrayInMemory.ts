function paginateInMemory(array, perPage, pageNumber) {
  return array.slice((pageNumber - 1) * perPage, pageNumber * perPage);
}

export default paginateInMemory;
