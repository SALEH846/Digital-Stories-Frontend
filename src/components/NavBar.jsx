import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../features/user/userSlice";

const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	// to navigate programmatically
	const navigate = useNavigate();

	// data of currently loggedin user
	const loggedinUser = useSelector((state) => state.user.user);

	// public folder
	const PF = import.meta.env.VITE_PUBLIC_FOLDER;

	// to dispatch actions
	const dispatch = useDispatch();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AutoStoriesRoundedIcon
						sx={{
							display: { xs: "none", md: "flex" },
							mr: 1,
							fontSize: "40px",
						}}
					/>
					<Typography
						variant="h4"
						noWrap
						component="a"
						// href="/"
						sx={{
							mr: 5,
							display: { xs: "none", md: "flex" },
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							cursor: "pointer",
						}}
						onClick={() => navigate("/")}
					>
						DigiStory
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							<MenuItem
								onClick={() => {
									setAnchorElNav(null);
									navigate("/");
								}}
							>
								<Typography textAlign="center">Home</Typography>
							</MenuItem>
							<MenuItem
								onClick={() => {
									setAnchorElNav(null);
									navigate("/trending");
								}}
							>
								<Typography textAlign="center">Trending</Typography>
							</MenuItem>
							<MenuItem
								onClick={() => {
									setAnchorElNav(null);
									navigate("/leaderboard");
								}}
							>
								<Typography textAlign="center">LeaderBoard</Typography>
							</MenuItem>
							<MenuItem
								onClick={() => {
									setAnchorElNav(null);
									navigate("/engagement");
								}}
							>
								<Typography textAlign="center">Engagement</Typography>
							</MenuItem>
						</Menu>
					</Box>
					<AutoStoriesRoundedIcon
						sx={{
							display: { xs: "flex", md: "none" },
							mr: 1,
							fontSize: "30px",
						}}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						DigiStory
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<Button
							onClick={() => {
								setAnchorElNav(null);
								navigate("/");
							}}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							Home
						</Button>
						<Button
							onClick={() => {
								setAnchorElNav(null);
								navigate("/trending");
							}}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							Trending
						</Button>
						<Button
							onClick={() => {
								setAnchorElNav(null);
								navigate("/leaderboard");
							}}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							Leaderboard
						</Button>
						<Button
							onClick={() => {
								setAnchorElNav(null);
								navigate("/engagement");
							}}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							Engagement
						</Button>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt={loggedinUser.fullname}
									src={
										loggedinUser?.profilePicture
											? `${PF}${loggedinUser.profilePicture}`
											: null
									}
								/>
							</IconButton>
						</Tooltip>
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
							<MenuItem
								onClick={() => {
									setAnchorElUser(null);
									navigate(`/profile/${loggedinUser.username}`);
								}}
							>
								<Typography textAlign="center">Profile</Typography>
							</MenuItem>
							<MenuItem
								onClick={() => {
									setAnchorElUser(null);
									dispatch(removeUser());
								}}
							>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavBar;
