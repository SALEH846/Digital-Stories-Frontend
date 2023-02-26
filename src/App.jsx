import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import Edit from "./pages/Edit";
import Leaderboard from "./pages/Leaderboard";
import Trending from "./pages/Trending";
import Engagement from "./pages/Engagement";
import Error from "./pages/Error";

const App = () => {
	// currently logged in user data
	const loggedinUser = useSelector((state) => state.user.user);

	return (
		<div className="bg">
			<BrowserRouter>
				<Routes>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={loggedinUser ? <Home /> : <Login />} />
					<Route
						path="/leaderboard"
						element={loggedinUser ? <Leaderboard /> : <Login />}
					/>
					<Route
						path="/trending"
						element={loggedinUser ? <Trending /> : <Login />}
					/>
					<Route
						path="/edit/:id"
						element={loggedinUser ? <Edit /> : <SignUp />}
					/>
					<Route
						path="/profile/:username"
						element={loggedinUser ? <Profile /> : <Login />}
					/>
					<Route
						path="/engagement"
						element={loggedinUser ? <Engagement /> : <Login />}
					/>
					<Route path="*" element={loggedinUser ? <Error /> : <Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
