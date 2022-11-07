import React, {useState, useEffect} from 'react';


const NewMaterial: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [materialList, setMaterialList] = useState<any>([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/get',{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(function (response) {
            setMaterialList(response);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);
    
      const submitForm = () => {
        fetch('http://localhost:3001/api/create',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: name, description: description})
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
      };
    
      
      const deleteForm = (id : any) => {
        fetch('http://localhost:3001/api/delete',{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id})
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
      };
    
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
             <h1>New Material</h1>

            <div className='form'>
            <label>Material Name: </label>
            <input type='text' name='materialName' onChange={(e)=> {
                setName(e.target.value) 
            }}/>
            <label>Description: </label>
            <input type='text' name='materialDescription' onChange={(e)=> {
                setDescription(e.target.value) 
            }}/>
            <button onClick={submitForm}>Submit</button>

            {materialList.map((val : any)=>{
                return (
                <div className='card'>
                <h1>{val.name}</h1>
                <p>{val.description} </p>
                <button onClick={() => {deleteForm(val.id)}}>Delete</button>
                <input type='text' id='updateInput' onChange={(e)=> {
                    setName(e.target.value)
                }}/>
                <input type='text' id='updateInput' onChange={(e)=>{
                    setDescription(e.target.value);
                }}/>
                <button onClick={()=>{updateForm(val.id)}}>Edit Review</button>
                </div>);
            })}
            </div>
        </>
    );
};
export default NewMaterial;