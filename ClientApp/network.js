async function getAllBooks() {
  try {
    return await axios.get('/api/books');
  } catch (error) {
    console.log(error)
  }
}

async function getBookById(id) {
  try {
    return await axios.get(`/api/books/${id}`);
  } catch (error) {
    console.log(error)
  }
}