import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Error404 from "../components/Error404";

const Error = () => {
	return (
		<div>
			<NavBar />
			<Box>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ flex: { sm: 0, md: 3 }, postion: "fixed" }}>
						<Sidebar />
					</Box>
					<Box sx={{ flex: { sm: 1, md: 9 }, height: "100%" }}>
						<Error404 />
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default Error;
