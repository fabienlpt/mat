// import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { config } from "../../config.js";


// TODO : Material page is to see all materials with update and delete button

const Material: React.FC = () => {
    const [materials, setMaterials] = useState([]);
    const [lends, setLends] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${config.serverBaseURL}/api/material/get`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(function (response) {
            setMaterials(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);
    
    useEffect(() => {
        fetch(`${config.serverBaseURL}/api/lend/get`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(function (response) {
            setLends(response);
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
            navigate('');
        }).catch(function (error) {
            console.log(error);
        });
        
    };

    // Store all material_id on lends in materialLend
    let materialLend : any = [];
    materialLend = lends.map((val : any)=>val.material_id);
    
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Réservation</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map((material: any) => (
                        <tr key={material.id}>
                            <td>{material.id}</td>
                            <td>{material.name}</td>
                            <td>{material.description}</td>
                            <td>{materialLend.includes(material.id) ? "Réservé" : <Button className="lend" onClick={() => navigate(`/add-lend/`+material.id)}>Réserver</Button>}</td>
                            <td>
                                <Button className="update" onClick={() => navigate(`/material/${material.id}/update`)}>Edit</Button>
                                <Button className="delete" onClick={() => deleteForm(material.id)}>Delete</Button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </Table>

            <Button className="add" onClick={() => navigate(`/add-material`)}>Ajouter un nouveau matériel</Button>
        </>
    );
};
const Table = styled.table`
    width: 85%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    font-size: 0.9em;
    font-family: sans-serif;
    margin: auto;
    text-align: center;
    th {
        background-color: ${({theme})=> theme.colors.layout.secondary};
        color: white;
        padding: 12px 15px;
    }
    td {
        border-bottom: 1px solid #ddd;
        padding: 12px 15px;
    }
    tr {
        &:hover {
            background-color: #f5f5f5;
        }
    }
`;
const Button = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 1px solid #ddd;
    background-color: ${({theme})=> theme.colors.layout.tertiary};
    color: black;
    margin: 0.5rem;
    cursor: pointer;

    &.update {
        background-color: ${({theme})=> theme.colors.layout.secondary};
    }
    &.delete {
        background-color: ${({theme})=> theme.colors.layout.primary};
        color: white;
    }
    &.add {
        background-color: ${({theme})=> theme.colors.layout.secondary};
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        border: none;
        color: white;
        font-size: 1.2em;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            background-color: ${({theme})=> theme.colors.layout.secondary};
        }
    }
    &.lend {
        background-color: ${({theme})=> theme.colors.layout.body};
        color: black;
    }
        
`;

export default Material;