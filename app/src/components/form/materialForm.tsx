// import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Material: React.FC = () => {
    const [materials, setMaterials] = useState([]);
    const [lends, setLends] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/api/material/get',{
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
        fetch('http://localhost:3001/api/lend/get',{
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

    let materialLend : any = [];
    {lends.map((val : any)=>{
        materialLend.push(val.material_id);
    })}

    // useEffect(() => {
    //     const fetchApiPosts = async () => {
    //         const response = await axios.get('http://localhost:3001/api/material/get');
    //         setMaterials(response.data);
    //     };
    //     fetchApiPosts();
    // }, []);
    return (
        <>
            <Ol>
                {materials.map((val : any)=>{ 
                    let is_reserved = false;
                    if(materialLend.includes(val.id)){
                        is_reserved = true;
                    }
                    return (
                        <Li key={val.id}>
                            <p>Name - {val.name}</p>
                            <p>Description - {val.description}</p>
                            <Button 
                                className="updateButton" 
                                onClick={() => navigate("/update-material/"+val.id)}>
                                    Modifier
                            </Button>
                            {/* <Button disabled={is_reserved}
                                className="lendButton"
                                onClick={() => navigate("/add-lend/"+val.id)}>
                                Réserver
                            </Button> */}
                            { is_reserved ? <p>Is reserved</p> : 
                            <Button 
                                className="lendButton"
                                onClick={() => navigate("/add-lend/"+val.id)}>
                                Réserver
                            </Button>}
                        </Li>
                    );
                })}
            </Ol>
        </>
    );
};

const Ol = styled.ol`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color:  ${({theme})=> theme.colors.layout.body};
    align-items: center;
    height: fit-content;
    color: #fff;
`;
const Li = styled.li`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 95vw;
    height: 50px;
    background-color: ${({theme})=> theme.colors.layout.tertiary};
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
`;
const Button = styled.button`
    background-color: ${({theme})=> theme.colors.layout.tertiary};
`;
export default Material;