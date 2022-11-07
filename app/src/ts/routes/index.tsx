// create route file to handle all the routes

import { BrowserRouter , Route } from 'react-router-dom';
import Home from '../pages/home';
import NewMaterial from '../components/form/newMaterialForm';
import Edit from '../components/form/editForm';

//TODO: add routes for all the pages
const Routes = () => (
    <BrowserRouter>
        <Route path="/" element={<Home/>} />
        <Route path="/new" element={<NewMaterial/>} />
    </BrowserRouter>
);

export default Routes;