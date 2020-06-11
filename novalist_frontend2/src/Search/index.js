import React from 'react';
import axios from 'axios'

export default (props) => {
    const [formData, setFormData] = React.useState(props.initial)

    const [book, setBook] = React.useState("")
    const [results, setResults] = React.useState("")

    const books = React.useState({})

    const [apiBooks, setAPIBooks] = React.useState([])
    const blank = {
        title: '', 
        author: ''
    }

    React.useEffect(() =>{
        setFormData(props.initial);
    }, [props.initial]);


    const handleChange = (event) => {
        const book = event.target.value

        setBook(book)
    }

    const onSubmit = async () => {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&orderBy=newest&key=AIzaSyAQNLb6ohAjiKiv_PIijuizvpZ1gOdSYz4&maxResults=5`)
        console.log('New Books From API: ', response)
        setResults(response.data.items)
    }
    return (
        <div>

            <input 
                type="text"
                name="search"
                placeholder="Search"
                onChange={handleChange}>
            </input>

            <button className="btn" onClick={() => {
                onSubmit(book);
                setFormData(props.initial);
            }}>
                Search Books
            </button>
            <div>
            <ul>
                {results ? results.map((book, index) => {
                    return (
                        <li key={index}>
                        <h1>{book.volumeInfo.title}</h1>
                        <img alt="Google API Image" src={book.volumeInfo.imageLinks.smallThumbnail}></img>
                        <p>{book.volumeInfo.description}</p>
                    </li>
                    )}) 
                : 'LOADING...'} 
            </ul>
        </div>
        </div>
    )
}