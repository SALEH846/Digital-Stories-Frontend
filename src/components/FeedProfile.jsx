import { Stack } from "@mui/material";
import Story from "./Story";

const FeedProfile = ({
	setLoading,
	setSnackbarState,
	open,
	setOpen,
	posts,
	setCurrentPost,
	refetchCounter,
	setRefetchCounter,
}) => {
	return (
		<Stack>
			{posts.map((post) => (
				<Story
					key={post._id}
					post={post}
					setLoading={setLoading}
					setSnackbarState={setSnackbarState}
					open={open}
					setOpen={setOpen}
					setCurrentPost={setCurrentPost}
					refetchCounter={refetchCounter}
					setRefetchCounter={setRefetchCounter}
				/>
			))}
		</Stack>
	);
};

export default FeedProfile;
