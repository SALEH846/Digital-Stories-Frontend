import { Box, Typography } from "@mui/material";

const Error404 = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				marginTop: "20px",
			}}
		>
			<Box>
				<Typography variant="h1" sx={{ fontWeight: 500 }}>
					Oops!
				</Typography>
			</Box>
			<Box>
				<Typography variant="h5" sx={{ color: "red" }}>
					Page Not Found!
				</Typography>
			</Box>
		</Box>
	);
};

export default Error404;
