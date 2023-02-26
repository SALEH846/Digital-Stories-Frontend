import { Box, Stack, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
	return (
		<Box
			sx={{
				border: "2px solid",
				borderRadius: "4px",
				marginLeft: "20px",
				marginRight: "10px",
				marginTop: "20px",
				padding: "20px",
				display: { xs: "none", sm: "none", md: "block" },
				backgroundColor: "white",
			}}
		>
			<Stack spacing={3}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<HomeRoundedIcon sx={{ marginRight: "10px", fontSize: "30px" }} />
					<NavLink to="/">
						<Typography sx={{ fontWeight: 700 }}>Home</Typography>
					</NavLink>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						fontWeight: "400",
					}}
				>
					<TimelineRoundedIcon sx={{ marginRight: "10px", fontSize: "30px" }} />
					<NavLink to="/trending">
						<Typography sx={{ fontWeight: 700 }}>Trending</Typography>
					</NavLink>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						fontWeight: "400",
					}}
				>
					<Diversity3RoundedIcon
						sx={{ marginRight: "10px", fontSize: "30px" }}
					/>
					<NavLink to="/engagement">
						<Typography sx={{ fontWeight: 700 }}>Engagement</Typography>
					</NavLink>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						fontWeight: "400",
					}}
				>
					<LeaderboardRoundedIcon
						sx={{ marginRight: "10px", fontSize: "30px" }}
					/>
					<NavLink to="/leaderboard">
						<Typography sx={{ fontWeight: 700 }}>LeaderBoard</Typography>
					</NavLink>
				</Box>
			</Stack>
		</Box>
	);
};

export default Sidebar;
