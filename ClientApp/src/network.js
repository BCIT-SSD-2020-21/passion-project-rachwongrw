import axios from 'axios';
const baseUrl = 'https://localhost:5001'

// Retrieves all books from librivox API.
export async function getAllBooks() {
  try {
    return await axios.get(`${baseUrl}/api/books`);
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