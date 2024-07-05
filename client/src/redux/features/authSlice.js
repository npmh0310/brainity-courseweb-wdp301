import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile } from '../../fetchData/User';

export const validateToken = createAsyncThunk(
    'auth/validateToken',
    async (_, thunkAPI) => {
        try {
            const res = await getProfile();
            // console.log(res)
            if (res) {
                return res.data;
            } else {
                throw new Error('Invalid token');
            }
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
);
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        isLogin: false,
        loading: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isLogin = action.payload.isLogin;
            // localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.isLogin = false;
            // localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(validateToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.success) {
                    state.user = action.payload.data;
                    state.isLogin = true;
                }
            })
            .addCase(validateToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                // localStorage.removeItem('token');
            });
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export const getIsLogin = (state) => state.auth.isLogin
export const getCourseEnrolled = (state) => state.auth.user.coursesEnrolled
export default authSlice.reducer;