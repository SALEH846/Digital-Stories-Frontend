import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, blue } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import {
	Modal,
	Stack,
	List,
	Divider,
	ListItemText,
	ListItem,
	ListItemAvatar,
	TextField,
	Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import parse from "html-react-parser";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { addEngagement, removeEngagement } from "../features/user/userSlice";

function get_extension(filename) {
	const ext = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
	if (
		ext === "jpg" ||
		ext === "jpeg" ||
		ext === "png" ||
		ext === "gif" ||
		ext === "jfif"
	) {
		return true;
	} else {
		return false;
	}
}

// get_extension("/path/to/file.ext"); // "ext"

const Story = ({
	post,
	setLoading,
	setSnackbarState,
	setOpen,
	setCurrentPost,
	refetchCounter,
	setRefetchCounter,
}) => {
	// state for comment modal
	const [openComments, setOpenComments] = useState(false);

	// for story actions menu
	const [anchorElUser, setAnchorElUser] = useState(null);
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	// to dispatch actions
	const dispatch = useDispatch();

	// public folder
	const PF = import.meta.env.VITE_PUBLIC_FOLDER;

	// details of the story creator
	const [storyCreator, setStoryCreator] = useState({});
	// console.log(storyCreator);

	// data of currently logged in user
	const loggedinUser = useSelector((state) => state.user.user);

	// fetch the details of the creator of the story
	useEffect(() => {
		const fetchStoryCreator = async () => {
			try {
				const response = await axios.get(
					`https://digital-stories-backend.vercel.app/api/users?userId=${post.userId}`
				);
				setStoryCreator(response.data?.data);
			} catch (error) {
				//
			}
		};
		fetchStoryCreator();
	}, []);

	const handleEdit = async () => {
		setOpen(true);
		setCurrentPost(post);
	};

	// handler for public private
	const handlePublicPrivate = async () => {
		setLoading(true);
		setSnackbarState({
			open: false,
			message: "",
			severity: "",
		});
		setAnchorElUser(null);
		if (post.isPrivate === true) {
			try {
				const response = await axios.post(
					`https://digital-stories-backend.vercel.app/api/posts/public/${post._id}`
				);
				setLoading(false);
				setSnackbarState({
					open: true,
					message: response.data.message,
					severity: "success",
				});
			} catch (error) {
				setLoading(false);
				setSnackbarState({
					open: true,
					message: error.response?.data?.error,
					severity: "error",
				});
			}
		} else {
			try {
				const response = await axios.post(
					`https://digital-stories-backend.vercel.app/api/posts/private/${post._id}`
				);
				setLoading(false);
				setSnackbarState({
					open: true,
					message: response.data.message,
					severity: "success",
				});
			} catch (error) {
				setLoading(false);
				setSnackbarState({
					open: true,
					message: error.response?.data?.error,
					severity: "error",
				});
			}
		}
		setRefetchCounter(refetchCounter + 1);
		// window.location.reload();
	};

	// delete handler
	const handleDelete = async () => {
		setLoading(true);
		setSnackbarState({
			open: false,
			message: "",
			severity: "",
		});
		setAnchorElUser(null);
		try {
			const response = await axios.delete(
				`https://digital-stories-backend.vercel.app/api/posts/${post._id}`,
				{ data: { userId: loggedinUser._id } }
			);
			setLoading(false);
			setSnackbarState({
				open: true,
				message: response.data.message,
				severity: "success",
			});
		} catch (error) {
			setLoading(false);
			setSnackbarState({
				open: true,
				message: error.response?.data?.error,
				severity: "error",
			});
		}
		setRefetchCounter(refetchCounter - 1);
	};

	// state for comments
	// const [comment, setComment] = useState("");
	// const commentRef = useRef(null);
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	// console.log(comments);

	// function for handling of new commnet posting
	const postCommentHandler = async () => {
		// console.log(e.target.value);
		const commentBody = {
			userId: loggedinUser._id,
			username: loggedinUser.username,
			postId: post._id,
			content: comment,
			profilePicture: loggedinUser?.profilePicture,
		};
		try {
			const allComments = await axios.post(
				`https://digital-stories-backend.vercel.app/api/comments/`,
				commentBody
			);
			dispatch(addEngagement(post._id));
			setComments(allComments.data);
			setComment("");
		} catch (error) {
			// console.log(error);
		}
	};

	// fetch commnets for a the current post
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const commentsForPost = await axios.get(
					`https://digital-stories-backend.vercel.app/api/comments/${post._id}`
				);
				setComments(commentsForPost.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchComments();
	}, []);

	// state for upvote and downvote
	const [upvotes, setUpvotes] = useState(post.likes.length);
	const [downvotes, setDownvotes] = useState(post.dislikes.length);
	const [isUpvoted, setIsUpvoted] = useState(
		post.likes.includes(loggedinUser._id)
	);
	const [isDownvoted, setIsDownvoted] = useState(
		post.dislikes.includes(loggedinUser._id)
	);

	// upvote handler
	const upvoteHandler = async () => {
		try {
			await axios.put(
				`https://digital-stories-backend.vercel.app/api/posts/${post._id}/like`,
				{
					userId: loggedinUser._id,
				}
			);
		} catch (error) {}
		// setUpvotes(isUpvoted ? upvotes - 1 : upvotes + 1);
		if (isUpvoted) {
			setUpvotes(upvotes - 1);
			if (comments.length === 0) {
				dispatch(removeEngagement(post._id));
			}
		} else {
			setUpvotes(upvotes + 1);
			dispatch(addEngagement(post._id));
		}
		if (!isUpvoted && isDownvoted) {
			setDownvotes(downvotes - 1);
			setIsDownvoted(false);
		}
		setIsUpvoted(!isUpvoted);
		setRefetchCounter(refetchCounter + 1);
	};

	// downvote handler
	const downvoteHandler = async () => {
		try {
			await axios.put(
				`https://digital-stories-backend.vercel.app/api/posts/${post._id}/dislike`,
				{
					userId: loggedinUser._id,
				}
			);
		} catch (error) {}
		if (isDownvoted) {
			setDownvotes(downvotes - 1);
			if (comments.length === 0) {
				dispatch(removeEngagement(post._id));
			}
		} else {
			setDownvotes(downvotes + 1);
			dispatch(addEngagement(post._id));
		}
		if (!isDownvoted && isUpvoted) {
			setUpvotes(upvotes - 1);
			setIsUpvoted(false);
		}
		setIsDownvoted(!isDownvoted);
		setRefetchCounter(refetchCounter - 1);
	};

	return (
		<>
			<Card
				sx={{
					maxWidth: 600,
					minWidth: { xs: 300, sm: 400, md: 600 },
					ml: { xs: "5px", sm: "auto", md: "auto" },
					mr: { xs: "5px", sm: "auto", md: "auto" },
					mt: "20px",
					mb: "5px",
				}}
			>
				<CardHeader
					avatar={
						<Avatar
							alt={storyCreator.username}
							sx={{ bgcolor: red[500] }}
							aria-label="recipe"
							src={`${PF}${storyCreator?.profilePicture}`}
						/>
					}
					action={
						<>
							{loggedinUser._id === post.userId && (
								<IconButton aria-label="settings" onClick={handleOpenUserMenu}>
									<MoreVertIcon />
								</IconButton>
							)}
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={handlePublicPrivate}>
									<Typography textAlign="center">
										{post.isPrivate ? "Make public" : "Make private"}
									</Typography>
								</MenuItem>
								<MenuItem onClick={handleEdit}>
									<Typography textAlign="center">Edit</Typography>
								</MenuItem>
								<MenuItem onClick={handleDelete}>
									<Typography textAlign="center">Delete</Typography>
								</MenuItem>
							</Menu>
						</>
					}
					title={
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography sx={{ mr: "5px" }}>
								{storyCreator.username}
							</Typography>
							{post.isPrivate ? (
								<LockRoundedIcon sx={{ fontSize: "20px", color: blue[800] }} />
							) : (
								<LockOpenRoundedIcon
									sx={{ fontSize: "20px", color: blue[800] }}
								/>
							)}
						</Box>
					}
					subheader={format(post.createdAt)}
				/>
				{post?.media && (
					<CardMedia
						component={get_extension(post.media) ? "img" : "video"}
						height="280"
						image={`${PF}${post?.media}`}
						// alt="Paella dish"
						sx={{ objectFit: "contain" }}
						controls
					/>
				)}
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{parse(post.description)}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton
						aria-label="add to favorites"
						// sx={{ display: "flex", alignItems: "center" }}
						onClick={upvoteHandler}
					>
						{isUpvoted ? (
							<ThumbUpIcon sx={{ color: blue[800] }} />
						) : (
							<ThumbUpOutlinedIcon sx={{ color: blue[800] }} />
						)}
					</IconButton>
					<IconButton aria-label="share" onClick={downvoteHandler}>
						{isDownvoted ? (
							<ThumbDownIcon sx={{ color: blue[800] }} />
						) : (
							<ThumbDownOutlinedIcon sx={{ color: blue[800] }} />
						)}
					</IconButton>
				</CardActions>

				<Stack direction="row" sx={{ mb: "10px" }}>
					<Typography sx={{ ml: "10px", fontWeight: 500 }}>
						{upvotes}/{downvotes} people like this
					</Typography>
					<Typography
						component="a"
						sx={{
							marginLeft: "auto",
							mr: "10px",
							borderBottom: "1px dashed",
							cursor: "pointer",
						}}
						onClick={() => setOpenComments(true)}
					>
						{comments.length} comments
					</Typography>
				</Stack>
			</Card>
			<Modal
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
				open={openComments}
				onClose={() => setOpenComments(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						width: 400,
						height: 280,
						backgroundColor: "white",
						borderRadius: 3,
						p: 3,
						overflow: "scroll",
					}}
				>
					<Typography variant="h6" color="gray" textAlign="center">
						Comments
					</Typography>
					<List
						sx={{
							width: "100%",
							maxWidth: 360,
							bgcolor: "background.paper",
						}}
					>
						{comments.map((currComment) => (
							<div key={currComment._id}>
								{/* <div> */}
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar
											alt={currComment.username}
											src={
												currComment?.profilePicture
													? `${PF}${currComment.profilePicture}`
													: null
											}
										/>
									</ListItemAvatar>
									<ListItemText
										secondary={
											<>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													{currComment.username}
												</Typography>
												{`: ${currComment.content}`}
											</>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
							</div>
						))}
					</List>
					<TextField
						fullWidth
						multiline
						rows={2}
						variant="standard"
						placeholder="Want to say something?"
						// ref={comment}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<Button
						variant="contained"
						fullWidth
						sx={{ marginTop: 2 }}
						onClick={() => postCommentHandler()}
					>
						Post
					</Button>
				</Box>
			</Modal>
		</>
	);
};

export default Story;
