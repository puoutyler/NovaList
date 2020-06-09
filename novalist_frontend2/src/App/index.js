import React, { Component } from "react";
import "./style.css";
import Form from '../form/form.js'


const App = (props) => {

  const [book, setBook] = React.useState(null)

  const [editBook, setEditBook] = React.useState({
    title: '',
    author: ''
  })

  const blank = {
    title: '',
    author: ''
  }

  const getBooks = async () => {
    const response = await fetch ('http://localhost:3000/novalist')
    const result = await response.json()
    console.log(result)
    getBooks(result)
  }
  React.useEffect(() => {
    getBooks()
  }, [])

  const handleCreate = async (data) => {
    const response = await fetch('http://localhost:3000/novalist' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    getBooks()
  }

  const handleEdit = async (data) => {
    const response = await fetch('http://localhost:3000/novalist', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    getBooks()
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/novalist/${id}`, {
      method: 'DELETE',
    })
    getBooks()
  }

  const handleSelect = async (book) => {
    setEditBook(book)
  };

  return <div className="App">
    <div className="App-nav">
      <h1>NovaList</h1>
    </div>
    <p> Books I want to Read </p>
    <div>
      <ul>
        {book
          ? book.map((book) => {
            return (
              <li key={novaList._id}>
                <h1>{novaList.title}</h1>
                <h2>{novaList.author}</h2>
                <button onClick= { () => {
                  handleDelete(novaList._id)
                }}>
                  Delete
                </button>
                <button onClick= { () => {
                  handleSelect(novaList)
                }}>
                  Edit
                </button>
              </li>
            )
          })
          : 'LOADING...'}
      </ul>
    </div>
  <div>
    <h1>Add a book to your list</h1>
    <Form initial={blank} handleSubmit = {handleCreate}/>
    <h1>Edit Selected Book</h1>
    <Form initial={editBook} handleSubmit={handleEdit}/>
  </div>
</div>

  


}

export default App;
