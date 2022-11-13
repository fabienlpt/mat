import "./reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./services/theme";
import Home from "./pages/Home";
import Material from "./pages/Materials";
import LendMaterial from "./pages/LendMaterial";
import NavBar from "./components/header";
import NewMaterial from "./components/form/newMaterialForm";
import UpdateMaterial from "./components/form/updateMaterialForm";
import NewLend from "./components/form/newLendForm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
				<ThemeProvider theme={theme}>
					<NavBar/>
					<Routes >
						<Route path="/" element={<Home/>} />
						<Route path="/material" element={<Material/>} />
						<Route path="/reservation/:id" element={<LendMaterial/>} />
						<Route path="/add-material" element={<NewMaterial/>} />
						<Route path="/add-lend/:id" element={<NewLend/>} />
						<Route path="tertiaire" element={<UpdateMaterial />} />
					</Routes>
				</ThemeProvider>
		</BrowserRouter>
	
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
