import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.initial)

    React.useEffect(() =>{
        setFormData(props.initial);
    }, [props.initial]);


    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return (
        <div>
        <input 
        type="text"
        name="title"
        value={formData.title}
        placeholder="Title"
        onChange={handleChange}>
        </input>

        <input 
        type="text"
        name="author"
        value={formData.author}
        placeholder="Author"
        onChange={handleChange}>
        </input>

        <button className="btn" onClick={() => {
            props.handleSubmit(formData);
            setFormData(props.initial);
        }}>
            Submit
        </button>

        </div>


    )


}
