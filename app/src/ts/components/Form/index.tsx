import React, {useState, useEffect} from 'react';
import Axios from 'axios';

const Form: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [materialList, setMaterialList] = useState<any>([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response)=> {
            console.log("init")
            setMaterialList(response.data);
        });
      },[]);
    
      const submitForm = () => {
        Axios.post('http://localhost:3001/api/insert', {name: name, description: description}).then(()=>{
            setMaterialList([...materialList, {name: name, description: description}]);
        });
      };
    
      
      const deleteForm = (id : any) => {
        Axios.delete(`http://localhost:3001/api/delete/${id}`);
      };
    
      const updateForm = (id : any) => {
        Axios.put('http://localhost:3001/api/update', {
            id: id,
            name: name,
            description: description,
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
export default Form;