import React from 'react';
import axios from 'axios'
import "../App/style.scss";

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
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&printType=books&intitle&key=AIzaSyAQNLb6ohAjiKiv_PIijuizvpZ1gOdSYz4&maxResults=6`)
        console.log('New Books From API: ', response)
        setResults(response.data.items)
    }
    return (
        <div className="search">

            <input 
                type="text"
                name="search"
                placeholder="Search"
                onChange={handleChange}
                className="search-input"
                placeholder="Search Books"
                >
                
            </input>

            <button className="search-button" onClick={() => {
                onSubmit(book);
                setFormData(props.initial);
            }}>
                Search Books
            </button>

            <div className="Api_container2">
            
                <ul className="App_row">
                    {results ? results.map((book, index) => {
                        return (
                            <li key={index} className="API-li">
                                 <a target="_blank" href={book.volumeInfo.canonicalVolumeLink}><img alt="Google API Image" src={book.volumeInfo.imageLinks.smallThumbnail} className="card-image2"/></a>
                                
                                <p className="card-content">Author: {book.volumeInfo.title}</p>
                            </li>
                        )}) 
                    : ''} 
                </ul>
                
            </div>

        </div>
    )
}