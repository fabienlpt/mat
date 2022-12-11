import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { config } from "../../config.js";
import styled from 'styled-components';

const UpdateLend: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [LendId, setLendId] = useState("");
    const [email, setEmail] = useState("");
    const [lend_date, setLend_date] = useState("");
    const [return_date, setReturn_date] = useState("");
    const [is_returned, setIs_returned] = useState(0);

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

    useEffect(() => {
        fetch(`${config.serverBaseURL}/api/lend/get/`+id,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(function (response) {
            setLendId(response[0].id);
            setEmail(response[0].email);
            setLend_date(response[0].lend_date);
            setReturn_date(response[0].return_date);
            setIs_returned(response[0].is_returned);
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);
    

      
    const deleteForm = (id : any) => {
        fetch(`${config.serverBaseURL}/api/material/delete`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id})
        }).then(function (response) {
            console.log(response);
            navigate(-1);
        }).catch(function (error) {
            console.log(error);
        });
        
    };

    const updateForm = (id : any) => {
        fetch(`${config.serverBaseURL}/api/lend/update`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: LendId, email: email, lend_date: lend_date, return_date: return_date, is_returned: is_returned})
        }).then(function (response) {
            console.log(response);
            navigate('/');
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

                <input type='text' id='updateInput' placeholder={name} disabled />
                <p>Description</p>
                <input type='text' id='updateInput' placeholder={description} disabled />
                <p>Email</p>
                <input type='text' id='updateInput' placeholder={email} onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
                <p>Date de prêt</p>
                <input type='date' id='updateInput' placeholder={lend_date} onChange={(e)=>{
                    setLend_date(e.target.value);
                }}/>
                <p>Date de retour</p>
                <input type='date' id='updateInput' placeholder={return_date} onChange={(e)=>{
                    setReturn_date(e.target.value);
                }}/>
                <p>Est retourné :</p>
                {is_returned === 0 ? <input type='checkbox' id='updateInput' onChange={(e)=>{
                    setIs_returned(1);
                }}/> : <input type='checkbox' id='updateInput' checked onChange={(e)=>{
                    setIs_returned(0);
                }}/>}
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
        height: 100vh;
        width: 100vw;
        background-color: #f5f5f5;
        button {
            margin: 10px;
            padding: 10px;
            border-radius: 5px;
            border: none;
            background-color: #f5f5f5;
            color: #000;
            font-size: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
                background-color: #000;
                color: #fff;
            }
        }
        input {
            margin: 10px;
            padding: 10px;
            border-radius: 5px;
            border: none;
            background-color: #f5f5f5;
            color: #000;
            font-size: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
                background-color: #000;
                color: #fff;
            }
        }
    }
`;

export default UpdateLend;
