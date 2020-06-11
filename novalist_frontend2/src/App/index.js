/////////////////////////-*
//    IMPORTS
/////////////////////////-*
import React from "react";
import "./style.css";
import Form from '../form/index.js'
import Search from '../Search/index.js'
import axios from 'axios'
//------------------------*

const App = (props) => {

  /////////////////////////-*
  //   SET/USE STATES
  /////////////////////////-*
  const [book, setBook] = React.useState(null)
  const [editBook, setEditBook] = React.useState({
    title: '',
    author: ''
  })
  const books = React.useState({})
  const [apiBooks, setAPIBooks] = React.useState([])
  const blank = {
    title: '', 
    author: ''
  }

  /////////////////////////-*
  //   GET BOOKS METHOD
  /////////////////////////-*
  const getBooks = async () => {
    const response = await fetch ('http://localhost:8000/novalist')
    const result = await response.json()
    console.log('Books I Want To Read: ', result)
    setBook(result)
  }

  /////////////////////////-*
  //     USE EFFECT
  /////////////////////////-*
  React.useEffect(() => {
    getBooks()
    newBooks()
  }, [])
  
  /////////////////////////-*
  //    NEW BOOKS ARRAY
  /////////////////////////-*
  const newBooks = (async () => {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=programming&orderBy=newest&key=AIzaSyAQNLb6ohAjiKiv_PIijuizvpZ1gOdSYz4&maxResults=5')
      console.log('New Books From API: ', response)
      setAPIBooks(response.data.items)
  })

  /////////////////////////-*
  //    HANDLE CREATE
  /////////////////////////-*
  const handleCreate = async (data) => {
    const response = await fetch('http://localhost:8000/novalist' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(response)
    getBooks()
  }

  /////////////////////////-*
  //    HANDLE EDIT
  /////////////////////////-*
  const handleEdit = async (data) => {
    const response = await fetch(`http://localhost:8000/novalist/${data._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(response)
    getBooks()
  }
  
  /////////////////////////-*
  //    HANDLE DELETE
  /////////////////////////-*
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8000/novalist/${id}`, {
      method: 'DELETE',
    })
    console.log(response)
    getBooks()
  }

  /////////////////////////-*
  //    HANDLE SELECT
  /////////////////////////-*
  const handleSelect = async (book) => {
    setEditBook(book)
  };
  return <div className="App">
    <div className="App-nav">
      <h1 className="App-title">NovaList</h1>
    </div>
  {/* GOOGLE API MAP BEGINS */}
    <div>
      <ul>
        {apiBooks.map((newBook, index) => {
          return (
                  <li key={index}>
                    <h1>{newBook.volumeInfo.title}</h1>
                    <img alt="Google API Image" src={newBook.volumeInfo.imageLinks.smallThumbnail}></img>
                    <p>{newBook.volumeInfo.description}</p>
                  </li>
                )
              } 
            ) 
          } 
      </ul>
    </div>
  {/* GOOGLE API MAP ENDS */}
    <h1> Books I Want to Read </h1>
    {/* USER BOOK MAP BEGINS */}
    <div>
      <ul>
        {book
          ? book.map((book) => {
            return (
              <li key={book._id}>
                <h1>{book.title}</h1>
                <h2>{book.author}</h2>
                <button onClick= { () => {
                  handleDelete(book._id)
                }}>
                  Delete
                </button>
                <button onClick= { () => {
                  handleSelect(book)
                }}>
                  Edit
                </button>
              </li>
            )
          })
          : 'LOADING...'}
      </ul>
    </div>
    {/* USER BOOK MAP ENDS */}
  <div>
    <h1>Add a book to your list</h1>
    <Form initial={blank} handleSubmit = {handleCreate}/>
    <h1>Edit Selected Book</h1>
    <Form initial={editBook} handleSubmit={handleEdit}/>
  </div>
</div>
}

/////////////////////////-*
//     EXPORT APP
/////////////////////////-*
export default App;




