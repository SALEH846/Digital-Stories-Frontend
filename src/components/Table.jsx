import {
	TableContainer,
	Table as table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Avatar,
	Box,
	styled,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
	text-decoration: none;

	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;

const Table = () => {
	const PF = import.meta.env.VITE_PUBLIC_FOLDER;
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getAllUsers = async () => {
			try {
				const allUsers = await axios.get(
					"https://digital-stories-backend.vercel.app/api/users/all"
				);

				const data = await Promise.all(
					allUsers.data.data.map(async (eachUser) => {
						const eachUserPosts = await axios.get(
							`https://digital-stories-backend.vercel.app/api/posts/profile/all/${eachUser.username}`
						);

						const upvotesCount = eachUserPosts.data.data.reduce(
							(acc, post) => acc + post.likes.length,
							0
						);
						const eachUserDetails = {
							profilePicture: eachUser.profilePicture,
							username: eachUser.username,
							followers: eachUser.followers.length,
							stories: eachUserPosts.data.data.length,
							upvotes: upvotesCount,
						};
						return eachUserDetails;
					})
				).then((res) => res);
				setUsers(data);
			} catch (error) {
				// console.log(error);
			}
		};
		getAllUsers();
	}, []);

	return (
		<TableContainer
			component={Paper}
			className="tableMain"
			sx={{ width: { xs: "95%", sm: "80%", md: "70%" } }}
		>
			<Box
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			>
				<table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Profile Pic</TableCell>
							<TableCell align="right">Name</TableCell>
							<TableCell
								align="right"
								sx={{ display: { xs: "none", sm: "block", md: "block" } }}
							>
								Stories
							</TableCell>
							<TableCell align="right">Upvotes</TableCell>
							<TableCell align="right">Followers</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow
								key={user.username}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{user.profilePicture ? (
										<Avatar
											src={`${PF}${user.profilePicture}`}
											onClick={() => navigate(`/profile/${user.username}`)}
										/>
									) : (
										<Avatar
											onClick={() => navigate(`/profile/${user.username}`)}
										/>
									)}
								</TableCell>

								<TableCell align="right">
									<StyledNavLink to={`/profile/${user.username}`}>
										{user.username}
									</StyledNavLink>
								</TableCell>

								<TableCell
									align="right"
									sx={{
										display: {
											xs: "none",
											sm: "table-cell",
											md: "table-cell",
										},
									}}
								>
									{user.stories}
								</TableCell>
								<TableCell align="right">{user.upvotes}</TableCell>
								<TableCell align="right">{user.followers}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</table>
			</Box>
		</TableContainer>
	);
};

export default Table;
