import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.initial)

    const [book, setBook] = React.useState("")
    const [result, setResult] = React.useState("")

    React.useEffect(() =>{
        setFormData(props.initial);
    }, [props.initial]);


    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onSubmit = async () => {
        try {
          const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=AIzaSyAQNLb6ohAjiKiv_PIijuizvpZ1gOdSYz4&maxResults=5`)
          const response = await request.json()
          console.log(response)
        } catch (error){
          console.error(error)
        }
      }

    return (
        <div>

        <button className="btn" onClick={() => {
            onSubmit(formData);
            setFormData(props.initial);
        }}>
            New Book
        </button>

        </div>
    )
}