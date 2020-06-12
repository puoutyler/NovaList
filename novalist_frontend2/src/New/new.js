import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.initial)

    React.useEffect(() =>{
        setFormData(props.initial);
    }, [props.initial]);


    const handleCreate = async (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return (
        <div>
        <input 
        type="text"
        name="title"
        value={formData.title}
        placeholder="Title"
        onChange={handleCreate}>
        </input>

        <input 
        type="text"
        name="author"
        value={formData.author}
        placeholder="Author"
        onChange={handleCreate}>
        </input>

        <button className="btn" onClick={() => {
            props.handleSubmit(formData);
            setFormData(props.initial);
        }}>
            Add Book
        </button>

        </div>


    )
}