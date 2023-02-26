import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { updateUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import BackDrop from "./BackDrop";
import Notification from "./Notification";
import axios from "axios";

const LoginForm = () => {
	// Login form state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// console.log(password);
	// state for loading spinner
	const [loading, setLoading] = useState(false);

	// state for snack bar
	const [snackbarState, setSnackbarState] = useState({
		open: false,
		message: "",
		severity: "",
	});

	// To dispatch redux actions
	const dispatch = useDispatch();

	// data for currently logged in user
	const loggedinUser = useSelector((state) => state.user.user);

	// to navigate programmatically
	const navigate = useNavigate();

	// form submission handler
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post(
				"https://digital-stories-backend.vercel.app/api/auth/login",
				{
					email,
					password,
				}
			);
			dispatch(updateUser(response.data.data));
			setLoading(false);
			navigate("/");
		} catch (error) {
			setLoading(false);
			setSnackbarState({
				open: false,
				message: "",
				severity: "",
			});
			setSnackbarState({
				open: true,
				message: error.response?.data?.error,
				severity: "error",
			});
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				backgroundColor: "gray",
				width: "100vw",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<BackDrop open={loading} />
			{snackbarState.open && (
				<Notification
					state={snackbarState}
					setState={setSnackbarState}
					vertical="top"
					horizontal="center"
				/>
			)}
			<Box
				sx={{
					padding: "20px",
					width: { xs: "70vw", md: "35vw" },
					height: "50vh",
					backgroundColor: "#fff",
					borderRadius: "4px",
				}}
			>
				<form onSubmit={handleSubmit}>
					<Stack spacing={3}>
						<Typography
							sx={{ textAlign: "center", fontWeight: "700" }}
							variant="h4"
						>
							Login
						</Typography>
						<TextField
							label="Email"
							variant="filled"
							value={email}
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
							required
						/>
						<TextField
							label="Password"
							variant="filled"
							value={password}
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							fullWidth
							required
						/>
						<Button variant="contained" type="submit">
							Login
						</Button>
						<Typography>
							Don't have an account? <NavLink to="/signup">SignUp</NavLink>
						</Typography>
					</Stack>
				</form>
			</Box>
		</Box>
	);
};

export default LoginForm;
