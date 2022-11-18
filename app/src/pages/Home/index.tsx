// import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { config } from "../../config.js";


// TODO : Home page is to see all lend of materials which are not returned
// TODO : modification juste materiel / pareil pour emprunt
// TODO : Quantité
// TODO : suppression des emprunts lié au materiel

const Home: React.FC = () => {
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

    // Send mail to the email of lend
    const sendMail = (material_id: number, name: string) => {
        fetch(`${config.serverBaseURL}api/sendMail`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ material_id: material_id, name: name })
        })
        .then(response => response.json())
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const deleteForm = (id : any) => {
        fetch(`${config.serverBaseURL}server/api/lend/delete`,{
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


    return (
        <>
{/* Write all the lend with material_id where is_returned is false */}
            <Table>
                <thead>
                    <tr>
                        <th>Material Name</th>
                        <th>Material Description</th>
                        <th>Email</th>
                        <th>Lend Date</th>
                        <th>Return Date</th>
                        <th>Send Mail</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {lends.map((val : any)=>{
                        if(val.is_returned === 0){
                            // Store the material name and description where material.id is equal to lend.material_id
                            let materialName = "";
                            let materialDescription = "";
                            materials.map((material : any)=>{
                                if(material.id === val.material_id){
                                    materialName = material.name;
                                    materialDescription = material.description;
                                }
                            })
                            return (
                                <tr key={val.id}>
                                    <td>{materialName}</td>
                                    <td>{materialDescription}</td>
                                    <td>{val.email}</td>
                                    <td>{val.lend_date}</td>
                                    <td>{val.return_date}</td>
                                    <td><Button className="mail" onClick={() => sendMail(val.material_id, materialName)}>Send Mail</Button></td>
                                    <td>
                                        <Button className="update" onClick={() => navigate(`/lend/${val.material_id}/update`)}>Edit</Button>
                                        <Button className="delete" onClick={() => deleteForm(val.material_id)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        }
                    })}
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
        background-color: ${({theme})=> theme.colors.layout.primary};
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
    &.mail {
        background-color: ${({theme})=> theme.colors.layout.body};
        color: black;
    }
`;
export default Home;