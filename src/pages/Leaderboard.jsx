import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";

const Leaderboard = () => {
	return (
		<div>
			<NavBar />
			<Box>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ flex: { sm: 0, md: 3 }, postion: "fixed" }}>
						<Sidebar />
					</Box>
					<Box
						sx={{
							flex: { sm: 1, md: 9 },
							p: "20px",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Table />
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default Leaderboard;
