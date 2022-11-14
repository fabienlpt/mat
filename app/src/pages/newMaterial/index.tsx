import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { config } from "../../config.js";


const NewMaterial: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const navigate = useNavigate();
    
      const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`${config.serverBaseURL}/api/material/create`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: name, description: description})
        }).then(function (response) {
            console.log(response);
            navigate('/');
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