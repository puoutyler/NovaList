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
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/novalist/${id}`, {
      method: 'DELETE',
    })
    getBooks()
  }

  const handleSelect = async (book) => {
    setEditBook(book)
  };











}

export default App;
