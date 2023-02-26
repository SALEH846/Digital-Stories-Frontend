import { Box, Link, Stack, Typography } from "@mui/material";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

const TrendingRightbar = ({ sortby, setSortby }) => {
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
						Most commented
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
						Most upvoted
					</Link>
				</Box>
			</Stack>
		</Box>
	);
};

export default TrendingRightbar;
