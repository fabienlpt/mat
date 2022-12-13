/* eslint-disable react-hooks/exhaustive-deps */
// import axios from 'axios';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { config } from "../../config.js";


declare module namespace {

    export interface ILends {
        email: string;
        id: number;
        is_returned: number;
        lend_date: string;
        material_id: number;
        return_date: string;
    }

    export interface IMaterials {
        id: number;
        name: string;
        description: string;
    }

    export interface IStudents {
        id: number;
        nom: string;
        prenom: string;
        mail: string;
    }
}

// TODO : Home page is to see all lend of materials which are not returned
// TODO : modification juste materiel / pareil pour emprunt
// TODO : Quantité
// TODO : suppression des emprunts lié au materiel

const Home: React.FC = () => {
    const [materials, setMaterials] = useState([]);
    const [lends, setLends] = useState([]);
    const [students, setStudents] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const getMaterials = () => {
            let material: any = [];
            fetch(`${config.serverBaseURL}/api/material/get`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then(function (response) {
                response.forEach((item: any) => {
                    material.push(item);
                });
                setMaterials(material);
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        const getLends = () => {
            let lend: any = [];
            fetch(`${config.serverBaseURL}/api/lend/get`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => response.json())
            .then((response) => {
                response.forEach((item: any) => {
                    lend.push(item);
                });
                setLends(lend);
                updateLends();
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        const getStudents = () => {
            let student: any = [];
            fetch(`${config.serverBaseURL}/api/user/get`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then(function (response) {
                response.data.forEach((item: any) => {
                    student.push(item);
                });
                setStudents(student);
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        const updateLends = () => {
            let lend: any = [];
            console.log(materials);
            console.log(lends);
            getStudents();
            console.log(students);
            lends.forEach((item: any) => {
                students.forEach((student: any) => {
                    if (item.user_id === student.id) {
                        item.email = student.mail;
                        lend.push(item);
                    }
                });
            });
            setLends(lend);
        }

        getMaterials();
        getLends();

    }, []);

    
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
        fetch(`${config.serverBaseURL}/api/lend/delete`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id})
        }).then(() => {
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
                    {/* use map on lends */}



                    { lends && lends.map((val : namespace.ILends)=>{
                        val.lend_date = val.lend_date.split('T')[0];
                        val.return_date = val.return_date.split('T')[0];
                        
                        if(val.is_returned === 0){
                            // Store the material name and description where material.id is equal to lend.material_id
                            let materialName = "";
                            let materialDescription = "";
                            materials && materials.map((material : namespace.IMaterials)=>{
                                if(material.id === val.material_id){
                                    materialName = material.name;
                                    materialDescription = material.description;
                                }
                                return null ;
                            })
                            return (
                                <tr key={val.id}>
                                    <td>{materialName}</td>
                                    <td>{materialDescription}</td>
                                    <td>{val.email}</td>
                                    <td>
                                        <input type="date" value={val.lend_date} disabled/>
                                    </td>
                                    <td>
                                        <input type="date" value={val.return_date} disabled/>
                                    </td>
                                    <td><Button className="mail" onClick={() => sendMail(val.material_id, materialName)}>Send Mail</Button></td>
                                    <td>
                                        <Button className="update" onClick={() => navigate(`/lend/${val.material_id}/update`)}>Edit</Button>
                                        <Button className="delete" onClick={() => deleteForm(val.material_id)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        } else {
                            return null;
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