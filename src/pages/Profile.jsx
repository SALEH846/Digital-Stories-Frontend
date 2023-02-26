import { Box, Stack } from "@mui/material";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import AddPost from "../components/AddPost";
import Notification from "../components/Notification";
import { useState, useEffect } from "react";
import ProfileInfo from "../components/ProfileInfo";
import FeedProfile from "../components/FeedProfile";
import BackDrop from "../components/BackDrop";
import EditStory from "../components/EditStory";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
	// to extract the params from URL
	const params = useParams();

	// data of the currently logged in user
	const loggedinUser = useSelector((state) => state.user.user);

	// state for loading spinner
	const [loading, setLoading] = useState(false);

	// state for edit modal
	const [openEditModal, setOpenEditModal] = useState(false);

	// state for snackbar
	const [snackbarState, setSnackbarState] = useState({
		open: false,
		message: "",
		severity: "",
	});

	// all posts
	const [posts, setPosts] = useState([]);

	// current post
	const [currentPost, setCurrentPost] = useState({});

	// state to trigger the refetch of posts if any of them is deleted, edited or made public/private
	const [refetchCounter, setRefetchCounter] = useState(0);

	// fetch all the posts from the current user
	useEffect(() => {
		const fetchPosts = async () => {
			const response =
				loggedinUser.username === params.username
					? await axios.get(
							`https://digital-stories-backend.vercel.app/api/posts/profile/all/${params.username}`
					  )
					: await axios.get(
							`https://digital-stories-backend.vercel.app/api/posts/profile/${params.username}`
					  );
			setPosts(response.data?.data);
		};
		fetchPosts();
	}, [params.username, refetchCounter]);

	return (
		<div>
			<NavBar />
			<BackDrop open={loading} />
			<Box>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ flex: { sm: 0, md: 3 }, postion: "fixed" }}>
						<Sidebar />
					</Box>
					<Box sx={{ flex: { sm: 1, md: 9 } }}>
						<Box sx={{ width: "100%" }}>
							<ProfileInfo
								setLoading={setLoading}
								setSnackbarState={setSnackbarState}
							/>
						</Box>
						<FeedProfile
							setLoading={setLoading}
							setSnackbarState={setSnackbarState}
							open={openEditModal}
							setOpen={setOpenEditModal}
							posts={posts}
							setCurrentPost={setCurrentPost}
							refetchCounter={refetchCounter}
							setRefetchCounter={setRefetchCounter}
						/>
					</Box>
				</Box>
				<AddPost
					setSnackbarState={setSnackbarState}
					refetchCounter={refetchCounter}
					setRefetchCounter={setRefetchCounter}
				/>
				<EditStory
					setSnackbarState={setSnackbarState}
					open={openEditModal}
					setOpen={setOpenEditModal}
					post={currentPost}
					refetchCounter={refetchCounter}
					setRefetchCounter={setRefetchCounter}
				/>
				{snackbarState.open && (
					<Notification
						state={snackbarState}
						setState={setSnackbarState}
						horizontal="right"
						vertical="bottom"
					/>
				)}
			</Box>
		</div>
	);
};

export default Profile;
