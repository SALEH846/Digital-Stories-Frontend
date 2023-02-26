import { Avatar, Box, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { removeFollowing, addFollowing } from "../features/user/userSlice";

const ProfileInfo = ({ setLoading, setSnackbarState }) => {
	// state for user
	const [user, setUser] = useState({});
	// console.log(user);

	// to check whether the currently logged in user is following this user or not
	const isFollowing = () => {
		if (loggedinUser.followings.includes(user._id)) {
			return true;
		} else {
			return false;
		}
	};

	// public folder
	const PF = import.meta.env.VITE_PUBLIC_FOLDER;

	// to dispatch actions
	const dispatch = useDispatch();

	// currently logged in user data
	const loggedinUser = useSelector((state) => state.user.user);

	// to get the params from the URL
	const params = useParams();

	// get the details of the user whose profile page is rendered
	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axios.get(
					`https://digital-stories-backend.vercel.app/api/users?username=${params.username}`
				);
				setUser(response.data?.data);
			} catch (error) {}
		};
		getUser();
	}, [params.username]);

	// to navigate programmatically
	const navigate = useNavigate();

	const handleProfileInfoButtonClick = async () => {
		if (loggedinUser._id === user._id) {
			navigate(`/edit/${loggedinUser._id}`);
		} else if (isFollowing() === true) {
			try {
				setLoading(true);
				const response = axios.put(
					`https://digital-stories-backend.vercel.app/api/users/${user._id}/unfollow`,
					{
						userId: loggedinUser._id,
					}
				);
				dispatch(removeFollowing(user._id));
				setLoading(false);
				setSnackbarState({
					open: false,
					message: "",
					severity: "",
				});
				setSnackbarState({
					open: true,
					message: response.data.message,
					severity: "success",
				});
			} catch (error) {}
		} else {
			try {
				setLoading(true);
				const response = axios.put(
					`https://digital-stories-backend.vercel.app/api/users/${user._id}/follow`,
					{
						userId: loggedinUser._id,
					}
				);
				dispatch(addFollowing(user._id));
				setLoading(false);
				setSnackbarState({
					open: false,
					message: "",
					severity: "",
				});
				setSnackbarState({
					open: true,
					message: response.data.message,
					severity: "success",
				});
			} catch (error) {}
		}
	};

	return (
		<>
			<Box
				sx={{
					padding: { xs: 2, sm: 2, md: 5 },
					display: "flex",
					ml: { xs: "5px", sm: "auto" },
					mr: { xs: "5px", sm: "auto" },
				}}
			>
				<Avatar
					src={
						loggedinUser?.profilePicture ? `${PF}${user.profilePicture}` : null
					}
					sx={{
						width: { xs: 48, sm: 72, md: 112 },
						height: { xs: 48, sm: 72, md: 112 },
					}}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: { xs: "column", sm: "row" },
							alignItems: { xs: "left", sm: "center" },
							mb: 1,
						}}
					>
						<Typography sx={{ ml: 2, mr: 2, fontWeight: 700 }} variant="h6">
							{`${user.username}`}
						</Typography>
						<Button
							variant="contained"
							sx={{
								ml: { xs: 2, sm: 0 },
							}}
							onClick={handleProfileInfoButtonClick}
						>
							{loggedinUser._id === user._id
								? "Edit"
								: isFollowing()
								? "UnFollow"
								: "Follow"}
						</Button>
					</Box>
					<Box
						sx={{
							display: { xs: "none", sm: "flex" },
							alignItems: "center",
							mb: 1,
						}}
					>
						{/* <Typography component="p" sx={{ ml: 2, mr: 2, fontWeight: 500 }}>
							10 Posts
						</Typography> */}
						<Typography component="p" sx={{ ml: 2, mr: 2, fontWeight: 500 }}>
							{user.followers?.length} Followers
						</Typography>
						<Typography component="p" sx={{ mr: 2, fontWeight: 500 }}>
							{user.followings?.length} Following
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Typography sx={{ ml: 2, fontWeight: 500 }}>
							{user.fullname}
						</Typography>
						<Typography sx={{ ml: 2, wordBreak: "break-word" }}>
							{loggedinUser?.description ? user.description : null}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					display: { xs: "flex", sm: "none" },
					alignItems: "center",
					mb: 1,
				}}
			>
				{/* <Typography component="span" sx={{ ml: 2, mr: 2, fontWeight: 500 }}>
					10 Posts
				</Typography> */}
				<Typography component="span" sx={{ ml: 2, mr: 2, fontWeight: 500 }}>
					{loggedinUser.followers.length} Followers
				</Typography>
				<Typography component="span" sx={{ mr: 2, fontWeight: 500 }}>
					{loggedinUser.followings.length} Following
				</Typography>
			</Box>
		</>
	);
};

export default ProfileInfo;
