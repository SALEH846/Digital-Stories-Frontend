import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import EditForm from "../components/EditForm";

const Edit = () => {
	return (
		<div>
			<NavBar />
			<Box>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ flex: { sm: 0, md: 2 }, postion: "fixed" }}>
						<Sidebar />
					</Box>
					<Box
						sx={{
							flex: { sm: 1, md: 7 },
						}}
					>
						<EditForm />
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default Edit;
