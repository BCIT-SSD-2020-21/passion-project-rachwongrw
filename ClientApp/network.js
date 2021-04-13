async function getAllBooks() {
  try {
    return await axios.get('https://localhost:5001/api/books');
  } catch (error) {
    console.log(error)
  }
}

async function getBookById(id) {
  try {
    return await axios.get(`https://localhost:5001/api/books/${id}`);
  } catch (error) {
    console.log(error)
  }
}