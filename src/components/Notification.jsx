import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({ state, setState, horizontal, vertical }) => {
	// handle the closing of snackbar
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setState({
			open: false,
			message: "",
			severity: "",
		});
	};

	return (
		<Snackbar
			open={state.open}
			autoHideDuration={5000}
			onClose={handleClose}
			anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
		>
			<Alert
				onClose={handleClose}
				severity={state.severity}
				sx={{ width: "100%" }}
			>
				{state.message}
			</Alert>
		</Snackbar>
	);
};

export default Notification;
