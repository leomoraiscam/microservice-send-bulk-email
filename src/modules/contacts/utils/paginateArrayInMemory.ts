function paginateInMemory(array, perPage, page) {
  return array.slice((page - 1) * perPage, page * perPage);
}

export default paginateInMemory;
