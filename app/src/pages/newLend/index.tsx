import React, {useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { config } from "../../config.js";
import styled from 'styled-components';

const NewLend: React.FC = () => {
    let material_id = useParams()["id"];
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [lend_date, setLendDate] = useState('');
    const [return_date, setReturnDate] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`${config.serverBaseURL}/api/lend/create`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                lend_date: lend_date,
                return_date: return_date,
                material_id: material_id
            })
        }).then(function (response) {
            console.log(response);
            navigate(-1);
        }).catch(function (error) {
            console.log(error);
        });
    };

    return (
        <Container>
            <h1>New Lend</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Lend Date:
                    <input type="date" value={lend_date} onChange={e => setLendDate(e.target.value)} />
                </label>
                <label>
                    Return Date:
                    <input type="date" value={return_date} onChange={e => setReturnDate(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default NewLend;