import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";

const UpdateMaterial: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    let id = useParams()["id"];

    console.log(id);

    useEffect(() => {
        fetch('http://localhost:3001/api/material/get/'+id,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(function (response) {
            setName(response[0].name);
            setDescription(response[0].description);
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);


      
    const deleteForm = (id : any) => {
        fetch('http://localhost:3001/api/material/delete',{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id})
        }).then(function (response) {
            console.log(response);
            navigate('/');
        }).catch(function (error) {
            console.log(error);
        });
        
    };

    const updateForm = (id : any) => {
        fetch('http://localhost:3001/api/material/update',{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id, name: name, description: description})
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    };
    return (
        <>
            <h1>Update Material</h1>

            <div className='card'>
                <button onClick={() => {deleteForm(id)}}>Delete</button>
                <p>{name}</p>
                <input type='text' id='updateInput' placeholder={name} onChange={(e)=> {
                    setName(e.target.value)
                }}/>
                <p>{description}</p>
                <input type='text' id='updateInput' placeholder={description} onChange={(e)=>{
                    setDescription(e.target.value);
                }}/>
                <button onClick={()=>{updateForm(id)}}>Edit Review</button>
            </div>;
        </>
    );
};
export default UpdateMaterial;
