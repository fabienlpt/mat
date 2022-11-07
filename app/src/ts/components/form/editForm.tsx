import React, {useState} from 'react';
import styled from 'styled-components';

interface IProps {
    id: number;
};

const Edit: React.FC<IProps> = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const updateForm = (id : any) => {
        fetch('http://localhost:3001/api/update',{
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
        <>
            <h1>Edit</h1>
            <Form>
                <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />

                <label>Description</label>
                <input type="text" onChange={(e) => setDescription(e.target.value)} />

                <button type="submit" onClick={updateForm}>Update</button>
            </Form>

        </>
    );};
const Form = styled.form``;
export default Edit;