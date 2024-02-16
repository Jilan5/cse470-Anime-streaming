import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Navbar from "./components/navbar/Navbar";
import Chat from "./pages/chat/Chat";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div>
			{authUser && <Navbar />}

<div className='p-4 h-screen flex items-center justify-center '>
			
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/chat' element={authUser ? <Chat /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	
		</div>
	);	
}

export default App;
