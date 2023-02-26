import { useSelector } from "react-redux";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackDrop from "./BackDrop";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/user/userSlice";

const EditForm = () => {
	// data of currently logged in user
	const loggedinUser = useSelector((state) => state.user.user);

	// state for edit user info fields
	const [fullname, setFullname] = useState(loggedinUser.fullname);
	const [description, setDescription] = useState(
		loggedinUser?.description ? loggedinUser.description : ""
	);
	const [profilePic, setProfilePic] = useState(null);

	// to navigate programmatically
	const navigate = useNavigate();

	// loading spinner state
	const [loading, setLoading] = useState(false);

	// to dispatch actions
	const dispatch = useDispatch();

	// form submission handler
	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const updatedUserInfo = {
			...loggedinUser,
			// userId: loggedinUser._id,
			description: description,
			fullname: fullname,
		};
		if (profilePic) {
			const data = new FormData();
			const fileName = `${Date.now()}${profilePic.name}`;
			data.append("name", fileName);
			data.append("file", profilePic);
			updatedUserInfo.profilePicture = fileName;
			try {
				await axios.post(
					"https://digital-stories-backend.vercel.app/api/upload",
					data
				);
			} catch (error) {
				console.log(error);
			}
		}
		try {
			await axios.put(
				`https://digital-stories-backend.vercel.app/api/users/edit/${loggedinUser._id}`,
				updatedUserInfo
			);
			dispatch(updateUser(updatedUserInfo));
			navigate(`/profile/${loggedinUser.username}`);
			setLoading(false);
		} catch (error) {
			//
		}
	};

	// file change handler
	const fileChangeHandler = (e) => {
		setProfilePic(e.target.files[0]);
	};

	// reference to the file input for opening file picker window on button click
	const fileInput = useRef();

	return (
		<Box
			sx={{
				padding: "20px",
				width: { xs: "90%", sm: "80%", md: "70%" },
				backgroundColor: "#fff",
				borderRadius: "4px",
				margin: "auto",
				marginTop: "20px",
			}}
		>
			<BackDrop open={loading} />
			<form onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<Typography
						sx={{ textAlign: "center", fontWeight: "700" }}
						variant="h4"
					>
						Edit Your profile
					</Typography>
					<TextField
						label="Full Name"
						variant="filled"
						value={fullname}
						onChange={(e) => setFullname(e.target.value)}
						fullWidth
					/>
					<TextField
						label="Bio"
						variant="filled"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						fullWidth
						multiline
						rows={3}
					/>
					<Stack
						direction="row"
						gap={1}
						mt={2}
						mb={3}
						sx={{ display: "flex", alignItems: "center" }}
					>
						<label htmlFor="file">
							<Button
								variant="contained"
								type="button"
								onClick={() => fileInput.current.click()}
							>
								Update Profile Image
							</Button>
							<input
								type="file"
								id="file"
								ref={fileInput}
								accept=".png,.jpeg,.jpg,.jfif,.gif"
								style={{ display: "none" }}
								onChange={fileChangeHandler}
							/>
						</label>
						<Typography>{profilePic?.name ? profilePic.name : null}</Typography>
					</Stack>
					<Button variant="contained" type="submit" color="success">
						Update
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default EditForm;
