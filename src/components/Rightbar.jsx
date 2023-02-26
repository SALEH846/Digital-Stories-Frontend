import { Box, Link, Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";

const Rightbar = ({ sortby, setSortby }) => {
	return (
		<Box
			sx={{
				border: "2px solid",
				borderRadius: "4px",
				marginRight: "20px",
				marginLeft: "10px",
				marginTop: "20px",
				padding: "20px",
				display: { xs: "none", sm: "none", md: "block" },
				postion: "sticky",
				backgroundColor: "white",
			}}
		>
			<Stack spacing={3}>
				<Box>
					<Typography sx={{ fontWeight: 700 }}>Sort By</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<AccessTimeRoundedIcon
						sx={{ marginRight: "10px", fontSize: "30px" }}
					/>

					<Link
						component="button"
						variant="body2"
						sx={{
							textDecoration: "none",
							fontWeight: 700,
							color: sortby === "time" ? "red" : "black",
						}}
						onClick={() => setSortby("time")}
						underline="hover"
					>
						Creation time
					</Link>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						textAlign: "left",
						fontWeight: "400",
					}}
				>
					<CommentRoundedIcon sx={{ marginRight: "10px", fontSize: "30px" }} />
					<Link
						component="button"
						variant="body2"
						sx={{
							textDecoration: "none",
							fontWeight: 700,
							textAlign: "left",
							color: sortby === "comments" ? "red" : "black",
						}}
						onClick={() => setSortby("comments")}
						underline="hover"
					>
						Number of comments
					</Link>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						fontWeight: "400",
					}}
				>
					<ThumbUpRoundedIcon sx={{ marginRight: "10px", fontSize: "30px" }} />
					<Link
						component="button"
						variant="body2"
						sx={{
							textDecoration: "none",
							fontWeight: 700,
							textAlign: "left",
							color: sortby === "upvotes" ? "red" : "black",
						}}
						onClick={() => setSortby("upvotes")}
						underline="hover"
					>
						Number of upvotes
					</Link>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						fontWeight: "400",
					}}
				>
					<ThumbDownRoundedIcon
						sx={{ marginRight: "10px", fontSize: "30px" }}
					/>
					<Link
						component="button"
						variant="body2"
						sx={{
							textDecoration: "none",
							fontWeight: 700,
							textAlign: "left",
							color: sortby === "downvotes" ? "red" : "black",
						}}
						onClick={() => setSortby("downvotes")}
						underline="hover"
					>
						Number of downvotes
					</Link>
				</Box>
			</Stack>
		</Box>
	);
};

export default Rightbar;
