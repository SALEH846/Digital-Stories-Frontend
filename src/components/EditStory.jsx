import { Modal, Box, Typography, Avatar, Stack, Button } from "@mui/material";
import { useState, useRef } from "react";
import TextEditor from "./TextEditor";
import axios from "axios";
import BackDrop from "./BackDrop";
import { useSelector } from "react-redux";

const EditStory = ({
	open,
	setOpen,
	setSnackbarState,
	post,
	refetchCounter,
	setRefetchCounter,
}) => {
	// console.log(post);
	// data for currently logged in user
	const loggedinUser = useSelector((state) => state.user.user);

	// public folder
	const PF = import.meta.env.VITE_PUBLIC_FOLDER;

	// state for loading spinner
	const [loading, setLoading] = useState(false);

	// state to hold content of text editor
	const [content, setContent] = useState("");
	// state to hold uploaded media file
	const [file, setFile] = useState(null);

	// Story creation handler
	const handleStoryEdit = async () => {
		// initialize the loading spinner
		setLoading(true);

		// Create a new Story object
		const updatedStory = {
			userId: loggedinUser._id,
			description: content,
		};

		// Check if user has selected a media file
		if (file) {
			const data = new FormData();
			const fileName = `${Date.now()}${file.name}`;
			data.append("name", fileName);
			data.append("file", file);
			updatedStory.media = fileName;

			// upload the media file
			try {
				await axios.post(
					"https://digital-stories-backend.vercel.app/api/upload",
					data
				);
			} catch (error) {
				// stop loading spinner
				setLoading(false);

				// close the create story modal
				setOpen(false);

				// close the snack bar if it is already opened
				setSnackbarState({
					open: false,
					message: "",
					severity: "",
				});

				// open the new snack bar with success message
				setSnackbarState({
					open: true,
					message: error.response.data.error,
					severity: "error",
				});

				// exit from the function
				return;
			}
		}

		// create the new story in the database
		try {
			await axios.put(
				`https://digital-stories-backend.vercel.app/api/posts/${post._id}`,
				updatedStory
			);
		} catch (error) {
			// stop loading spinner
			setLoading(false);

			// close the create story modal
			setOpen(false);

			// close the snack bar if it is already opened
			setSnackbarState({
				open: false,
				message: "",
				severity: "",
			});

			// open the new snack bar with success message
			setSnackbarState({
				open: true,
				message: error.response?.data.error,
				severity: "error",
			});

			// exit from the function
			return;
		}

		// stop loading spinner
		setLoading(false);

		// close the create story modal
		setOpen(false);

		// close the snack bar if it is already opened
		setSnackbarState({
			open: false,
			message: "",
			severity: "",
		});

		// open the new snack bar with success message
		setSnackbarState({
			open: true,
			message: "The Story has been updated",
			severity: "success",
		});

		setRefetchCounter(refetchCounter + 1);
		setContent("");
		setFile(null);
	};

	// reference to the file input for opening file picker window on button click
	const fileInput = useRef();

	return (
		<>
			<Modal
				open={open}
				onClose={(e) => setOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						width: { xs: "95%", md: "70%" },
						height: 500,
						p: 3,
						borderRadius: 3,
					}}
					bgcolor={"background.default"}
					// color={"text.primary"}
				>
					<BackDrop open={loading} />
					<Typography variant="h6" color="gray" textAlign="center">
						Edit Story
					</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
							marginBottom: "20px",
						}}
					>
						<Avatar
							sx={{ width: 35, height: 35 }}
							alt={loggedinUser.fullname}
							src={
								loggedinUser?.profilePicture
									? `${PF}${loggedinUser.profilePicture}`
									: null
							}
						/>
						<Typography variant="span" sx={{ fontWeight: 500 }}>
							{loggedinUser.username}
						</Typography>
					</Box>
					<Box>
						<TextEditor
							content={content}
							setContent={setContent}
							username={loggedinUser.username}
							currentContent={post.description}
						/>
					</Box>
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
								Add/Update Media
							</Button>
							<input
								type="file"
								id="file"
								ref={fileInput}
								accept=".png,.jpeg,.jpg,.jfif,.gif,.mkv,.mp4"
								style={{ display: "none" }}
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</label>
						<Typography>{file ? file.name : null}</Typography>
					</Stack>
					<Button
						variant="contained"
						color="success"
						onClick={handleStoryEdit}
						fullWidth
					>
						Update
					</Button>
				</Box>
			</Modal>
		</>
	);
};

export default EditStory;
