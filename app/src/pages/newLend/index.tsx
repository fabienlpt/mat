import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { config } from "../../config.js";
import styled from 'styled-components';

declare module namespace {
    export interface IStudents {
        id: number;
        nom: string;
        prenom: string;
        mail: string;
    }
}

const NewLend: React.FC = () => {
    let material_id = useParams()["id"];
    const navigate = useNavigate();
    const [user_id, setUserId] = useState(null);
    const [email, setEmail] = useState('');
    const [lend_date, setLendDate] = useState('');
    const [return_date, setReturnDate] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`${config.serverBaseURL}/api/user/get`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(function (response) {
            setStudents(response.data);
            setUserId(response.data[0].id);
            setEmail(response.data[0].mail);
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`${config.serverBaseURL}/api/lend/create`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                user_id: user_id,
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

    const handleChange = (e: any) => {
        console.log(e.target.value);
        setUserId(e.target.value);
        // set email from user_id
        students.forEach((student : namespace.IStudents) => {
            if (student.id == user_id) {
                setEmail(student.mail);
            }
        });
    }
    return (
        <Container>
            <h1>New Lend</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    {/* map on students and setUserId on change option */}
                    <select onChange={e => handleChange(e)}>
                        {students.map((student : namespace.IStudents) => (
                            <option value={student.id}>{student.mail}</option>
                        ))}
                    </select>
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
    h1 {
        margin: 0;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        label {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px;
        }
    }

    input {
        margin: 10px;
    }

    button {
        margin: 10px;
    }

    select {
        margin: 10px;
    }
`;

export default NewLend;