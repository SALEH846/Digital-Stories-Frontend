import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loading: false,
	user: null,
	error: "",
};

export const fetchUser = createAsyncThunk("user/fetchUser", (body) => {
	return axios
		.post("https://digital-stories-backend.vercel.app/api/auth/login", body, {
			headers: { "Accept-Encoding": "gzip,deflate,compress" },
		})
		.then((response) => response.data);
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: (state, action) => {
			state.user = action.payload;
		},
		removeUser: (state, action) => {
			state.user = null;
		},
		addFollowing: (state, action) => {
			state.user.followings.push(action.payload);
		},
		removeFollowing: (state, action) => {
			state.user.followings = state.user.followings.filter(
				(following) => following !== action.payload
			);
		},
		addEngagement: (state, action) => {
			if (!state.user.engagement.includes(action.payload)) {
				state.user.engagement.push(action.payload);
			}
		},
		removeEngagement: (state, action) => {
			state.user.engagement = state.user.engagement.filter(
				(currElem) => currElem !== action.payload
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.error = "";
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.loading = false;
			state.user = {};
			state.error = action.error.message;
		});
	},
});

export default userSlice.reducer;
export const {
	updateUser,
	removeUser,
	addFollowing,
	removeFollowing,
	addEngagement,
	removeEngagement,
} = userSlice.actions;
