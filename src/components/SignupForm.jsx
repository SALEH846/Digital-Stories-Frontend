import { TextField, Typography, Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import axios from "axios";
import BackDrop from "./BackDrop";

const SignupForm = () => {
	// signup form state
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// state for loading spinner
	const [loading, setLoading] = useState(false);

	// to navigate to other pages programmatically
	const navigate = useNavigate();

	// state for snackbar
	const [snackbarState, setSnackbarState] = useState({
		open: false,
		message: "",
		severity: "",
	});

	// form submission handler
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post(
				"https://digital-stories-backend.vercel.app/api/auth/register",
				{
					fullname: fullName,
					username: username,
					email: email,
					password: password,
				}
			);
			// setSnackbarState({
			// 	open: false,
			// 	message: "",
			// 	severity: "",
			// });
			// setLoading(false);
			// setSnackbarState({
			// 	open: true,
			// 	message: "User created successfully!",
			// 	severity: "success",
			// });
			navigate("/login");
		} catch (error) {
			setLoading(false);
			setSnackbarState({
				open: false,
				message: "",
				severity: "",
			});
			setSnackbarState({
				open: true,
				message: error.response.data?.error,
				severity: "error",
			});
			// console.log(error.response.data?.error);
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
					height: "70vh",
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
							SignUp
						</Typography>
						<TextField
							label="Full Name"
							variant="filled"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							fullWidth
							required
						/>
						<TextField
							label="User name"
							variant="filled"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							inputProps={{ minLength: 5 }}
							fullWidth
							required
						/>
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
							inputProps={{ minLength: 8 }}
							fullWidth
							required
						/>
						<Button variant="contained" type="submit">
							Signup
						</Button>
						<Typography>
							Already have an account? <NavLink to="/login">Login</NavLink>
						</Typography>
					</Stack>
				</form>
			</Box>
		</Box>
	);
};

export default SignupForm;
