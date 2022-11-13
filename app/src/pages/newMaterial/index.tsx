import React, {useState, useEffect} from 'react';


const NewMaterial: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
      const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch('https://fabien.iamroot.fr/api/material/create',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: name, description: description})
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
      };

    return (
        <>
            <h1>New Material</h1>

            <div className='form'>
            <label>Material Name: </label>
            <input type='text' name='materialName' onChange={(e)=> {
                setName(e.target.value) 
            }}/>
            <label>Description: </label>
            <input type='text' name='materialDescription' onChange={(e)=> {
                setDescription(e.target.value) 
            }}/>
            <button onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
};
export default NewMaterial;