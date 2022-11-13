// import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';

// TODO : LendMaterial page is to lend a material to an email and sending a mail to the email

const LendMaterial: React.FC = () => {
    const id = useParams()['id'];
    const [material, setMaterial] = useState({ name :'', description :'', quantity :''});
    const [lend, setLend] = useState({ material_id :'', email :'', lend_date :'', return_date :''});
    let navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/api/material/get/'+id,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(function (response) {
            setMaterial(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);
    
    useEffect(() => {
        fetch('http://localhost:3001/api/lend/get/'+id,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(function (response) {
            setLend(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);

    if (lend === null) {
        return (
            <>
                <h1>Material</h1>
                <h2>{material.name}</h2>
                <p>Material Description: {material.description}</p>
            </>
        );
    } else {
        return (
            <Container >
                <h1>Material</h1>
                <h2>{material.name}</h2>
                <p>Material Description: {material.description}</p>
                <h1>Lend</h1>
                <p>Lend Material ID: {lend.material_id}</p>
                <p>Lend Email: {lend.email}</p>
                <p>Lend Date: {lend.lend_date}</p>
                <p>Return Date: {lend.return_date}</p>
                <Button onClick={() => navigate('/material/'+ id +'/update')}>Edit material</Button>
                <Button onClick={() => navigate('/material/'+id)}>Delete Réservation</Button>
            </Container>
        );
    }

  
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color:  ${({theme})=> theme.colors.layout.body};
    align-items: center;
    height: fit-content;
    color: #fff;
`;

const Button = styled.button`
    background-color: ${({theme})=> theme.colors.layout.body};
    color: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
    &:hover {
        background-color: #fff;
        color: ${({theme})=> theme.colors.layout.body};
    }
`;
export default LendMaterial;