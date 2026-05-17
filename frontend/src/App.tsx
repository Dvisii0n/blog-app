import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router";
import { useState } from "react";
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(() => checkLogIn())


	function checkLogIn() {
		const token:string | null = localStorage.getItem("token");
		return token ? true : false;
	}

	function logout() {
		localStorage.removeItem('token')
		localStorage.removeItem('username')
		localStorage.removeItem('role')
		setIsLoggedIn(false)
	}

	const loginContext = {
		setIsLoggedIn,
	}


	return (
		<>
			<Header isLoggedIn={isLoggedIn} logout={logout} />
			<Outlet context={loginContext}/>
			<Footer />
		</>
	);
}

export default App;
