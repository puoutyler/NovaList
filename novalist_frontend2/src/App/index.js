import React from "react";
import "./style.css";
import Form from '../form/index.js'


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
    const response = await fetch ('http://localhost:8000/novalist')
    const result = await response.json()
    console.log(result)
    console.log(response)
    setBook(result)
  }
  React.useEffect(() => {
    getBooks()
  }, [])

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
  

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8000/novalist/${id}`, {
      method: 'DELETE',
      
    })
    console.log(response)
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
  <div>
    <h1>Add a book to your list</h1>
    <Form initial={blank} handleSubmit = {handleCreate}/>
    <h1>Edit Selected Book</h1>
    <Form initial={editBook} handleSubmit={handleEdit}/>
  </div>
</div>

  


}

export default App;




