/////////////////////////-*
//    IMPORTS
/////////////////////////-*
import React from "react";
import "./style.scss";
import Form from '../form/index.js'
import Search from '../Search/index.js'

// import Search from '../Search/index.js'
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
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=programming&orderBy=newest&key=AIzaSyAQNLb6ohAjiKiv_PIijuizvpZ1gOdSYz4&maxResults=6')
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
      <h3 className="featured-header">Featured Books</h3>
    </div>
  {/* GOOGLE API MAP BEGINS */}
    <div className="Api_container">
      <div>
      <ul className="App_row">
        {apiBooks.map((newBook, index) => {
          return (
                  <li key={index} className="API-li">
                    {/* <h1 className="card-title">{newBook.volumeInfo.title}</h1> */}
                    <a target="_blank" href={newBook.volumeInfo.canonicalVolumeLink}><img alt="Google API Image" src={newBook.volumeInfo.imageLinks.smallThumbnail} className="card-image"/></a>
                    <p className="card-content">Author: {newBook.volumeInfo.authors[0]}</p>
                  </li>
                )
              } 
            ) 
          } 
      </ul>
      </div>
    </div>
  {/* GOOGLE API MAP ENDS */}
    <div className="search-container">
      <Search className="search"/>
    </div>
    <h1 className="read-books-list-title"> Books I Want to Read </h1>
    {/* USER BOOK MAP BEGINS */}
    <div>
    <div className="read-books-conatiner">
        <ul>
          {book
            ? book.map((book) => {
              return (
                <li key={book._id} className="read-books-list-div">
                  <h1 className="book-title">{book.title}</h1>
                  <h2 className="book-author">{book.author}</h2>
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
    </div>
    {/* USER BOOK MAP ENDS */}

    

  <div className="add-book-div" >
    <div className="new-book-div">
    <h1>Add a book to your list</h1>
      <Form initial={blank} handleSubmit = {handleCreate} />
    </div>
    <div className="edit-section">
    <div className="edit-book-div">
    <h1>Edit Selected Book</h1>
      <Form initial={editBook} handleSubmit={handleEdit}/>
    </div>
    </div>
  </div>

  <footer>
    <h2>Copyright 2020 TTC</h2>

     <div className="social-icons">
      <img className="social" src="https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Facebook_svg-512.png" alt="social media links"/>
      <img className="social" src="https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Tumblr5_svg-512.png" alt="social media links"/>
      <img className="social" src="https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Instagram_svg-512.png" alt="social media links"/>
      <img className="social" src="https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Linkedin2_svg-512.png" alt="social media links"/>
    </div>

  </footer>


</div>
}

/////////////////////////-*
//     EXPORT APP
/////////////////////////-*
export default App;




