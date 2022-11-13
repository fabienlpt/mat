// import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';


// TODO : Material page is to see all materials with update and delete button

const Material: React.FC = () => {
    const [materials, setMaterials] = useState([]);
    const [lends, setLends] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetch('https://fabien.iamroot.fr/api/material/get',{
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
        fetch('https://fabien.iamroot.fr/api/lend/get',{
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
        fetch('https://fabien.iamroot.fr/api/lend/delete',{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id})
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

        fetch('https://fabien.iamroot.fr/api/material/delete',{
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
                            <td>{materialLend.includes(material.id) ? "Réservé" : "Disponible"}</td>
                            <td>
                                <Button onClick={() => navigate(`/material/${material.id}/update`)}>Edit</Button>
                                <Button onClick={() => deleteForm(material.id)}>Delete</Button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </Table>
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
        background-color: #009879;
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
    background-color: ${({theme})=> theme.colors.layout.tertiary};
`;
export default Material;