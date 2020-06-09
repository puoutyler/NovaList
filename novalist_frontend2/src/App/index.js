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













}

export default App;
