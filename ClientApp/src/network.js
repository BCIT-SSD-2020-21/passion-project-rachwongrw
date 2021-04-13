import axios from 'axios';

export async function getAllBooks() {
  try {
    return await axios.get('https://localhost:5001/api/books');
  } catch (error) {
    console.log(error)
  }
}

export async function getBookById(id) {
  try {
    return await axios.get(`https://localhost:5001/api/books/${id}`);
  } catch (error) {
    console.log(error)
  }
}

export async function getAudioFiles(id) {
  try {
    return await axios.get(`https://localhost:5001/api/tracks/${id}`)
  } catch (error) {
    console.log(error)
  }
}