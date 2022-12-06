import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { config } from "../../config.js";
import styled from 'styled-components';

const UpdateMaterial: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    let id = useParams()["id"];

    console.log(id);

    useEffect(() => {
        fetch(`${config.serverBaseURL}/api/material/get/`+id,{
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
        fetch(`${config.serverBaseURL}/api/lend/delete`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id})
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

        fetch(`${config.serverBaseURL}/api/material/delete`,{
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

        fetch(`${config.serverBaseURL}/api/material/update`,{
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
        <Container>
            <h1>Update Material</h1>

            <div className='card'>
                <button onClick={() => {deleteForm(id)}}>Delete</button>
                <p>Nom</p>
                <input type='text' id='updateInput' placeholder={name} onChange={(e)=> {
                    setName(e.target.value)
                }}/>
                <p>Description</p>
                <input type='text' id='updateInput' placeholder={description} onChange={(e)=>{
                    setDescription(e.target.value);
                }}/>
                <button onClick={() => {updateForm(id)}}>Update</button>
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50vh;
        width: 50vw;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
        #updateInput {
            width: 50%;
            height: 30px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 0 10px;
            margin: 10px 0;
        }
        button {
            width: 50%;
            height: 30px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 0 10px;
            margin: 10px 0;
        }
    }
`;

export default UpdateMaterial;
