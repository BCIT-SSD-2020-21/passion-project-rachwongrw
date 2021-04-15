import axios from 'axios';
const baseUrl = ''

// Use this URL when running the debugger in order to hit breakpoints.
// const baseUrl = 'https://localhost:44303'

// Retrieves all books from librivox API.
export async function getAllBooks(limit, offset) {
  try {
    return await axios.get(`${baseUrl}/api/books/limit=${limit}&offset=${offset}`);
  } catch (error) {
    console.log(error)
  }
}

// Retrieves book by ID from librivox API.
export async function getBookById(id) {
  try {
    return await axios.get(`${baseUrl}/api/books/${id}`);
  } catch (error) {
    console.log(error)
  }
}

// Registers a new user.
export async function registerUser(data) {
  try {
    const response = await axios.post(`${baseUrl}/Auth/Register`, data);
    return response.data.token;
  } catch (error) {
    console.log(error)
  }
}

// Logs existing user in.
export async function loginUser(data) {
  try {
    const response =  await axios.post(`${baseUrl}/Auth/Login`, data);
    return response.data.token;
  } catch (error) {
    console.log(error)
  }
}

// Uses Librivox searcg endpoint to search for books.
export async function searchBooks(searchTerm) {
  try {
    const response = await axios.get(`${baseUrl}/api/books/search/${searchTerm}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAudioFiles(id) {
  try {
    return await axios.get(`${baseUrl}/api/tracks/${id}`)
  } catch (error) {
    console.log(error)
  }
}