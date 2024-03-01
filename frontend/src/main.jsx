import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<CartProvider>
					<SocketContextProvider>
						<App />
					</SocketContextProvider>
				</CartProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
