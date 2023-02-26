import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import TrendingRightbar from "../components/TrendingRightbar";
import Feed from "../components/Feed";
import AddPost from "../components/AddPost";
import Notification from "../components/Notification";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import EditStory from "../components/EditStory";

const Trending = () => {
	// data for currently for currently logged in user
	const loggedinUser = useSelector((state) => state.user.user);

	// state for snackbar
	const [snackbarState, setSnackbarState] = useState({
		open: false,
		message: "",
		severity: "",
	});

	// state for loading spinner
	const [loading, setLoading] = useState(false);

	// current post
	const [currentPost, setCurrentPost] = useState({});

	// state for edit modal
	const [openEditModal, setOpenEditModal] = useState(false);

	// state for timeline posts
	const [posts, setPosts] = useState([]);

	// state to trigger the refetch of posts if any of them is deleted, edited or made public/private
	const [refetchCounter, setRefetchCounter] = useState(0);

	// state for sorting
	const [sortby, setSortby] = useState("comments");
	// console.log(sortby);

	// fetch the posts for timeline
	useEffect(() => {
		const getTimelinePosts = async () => {
			const response = await axios.get(
				`https://digital-stories-backend.vercel.app/api/posts/all/posts`
			);
			let data = response.data.data.filter(
				(post) => !(post.userId !== loggedinUser._id && post.isPrivate === true)
			);
			if (sortby === "comments") {
				setPosts(
					data.sort((post1, post2) => {
						return post2.comments.length - post1.comments.length;
					})
				);
			} else if (sortby === "upvotes") {
				setPosts(
					data.sort((post1, post2) => {
						return post2.likes.length - post1.likes.length;
					})
				);
			}
		};
		getTimelinePosts();
	}, [sortby, refetchCounter]);

	return (
		<div>
			<NavBar />
			<Box>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ flex: { sm: 0, md: 2 }, postion: "fixed" }}>
						<Sidebar />
					</Box>
					<Box sx={{ flex: { sm: 1, md: 7 } }}>
						<Feed
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
					<Box sx={{ flex: { sm: 0, md: 3 } }}>
						<TrendingRightbar sortby={sortby} setSortby={setSortby} />
					</Box>
				</Box>
				<AddPost
					snackbarState={snackbarState}
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

export default Trending;
