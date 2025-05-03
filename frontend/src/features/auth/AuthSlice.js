import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";

const initialState = {
    user: null,
    isAuthenticated: false,
    isUploadingImage: false,
    loading: false,
    error: null
}

export const CheckAuth = createAsyncThunk('/auth/chekAuth', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get('/auth/checkauth')
        // console.log(res.data)
        return res.data
    } catch (error) {
        // Suppress 401 Unauthorized console error
        if (error.response?.status === 401) {
            return rejectWithValue(null); // Don't log this
        } else {
            console.error("Unexpected auth error:", error); // Log only real issues
            return rejectWithValue("Something went wrong while checking auth");
        }
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStarted: (state, action) => {
            state.loading = action.payload
        },
        authSuccess: (state, action) => {
            // console.log("Updating the user" , action.payload)
            state.loading = false
            state.user = action.payload
            state.error = null
            state.isAuthenticated = true
        },
        authFailed: (state, action) => {
            state.loading = false
            state.user = null
            state.error = action.payload
            state.isAuthenticated = false
        },
        authLogout: (state, action) => {
            state.user = null
            state.isAuthenticated = false
        },
        uploadImage: (state, action) => {
            state.isUploadingImage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CheckAuth.pending, (state) => {
            // console.log("loading again")
            state.loading = true
        })
            .addCase(CheckAuth.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.loading = false
                state.user = action.payload
                state.error = null
                state.isAuthenticated = true
            })
            .addCase(CheckAuth.rejected, (state, action) => {
                // console.log(action.payload)
                state.loading = false
                state.user = null
                state.error = action.payload
                state.isAuthenticated = false
            })
    }
})

export default authSlice.reducer;
export const { authStarted, authSuccess, authFailed, authLogout, uploadImage } = authSlice.actions;