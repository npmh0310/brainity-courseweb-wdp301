import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCourseToCart, getCartOfUser, moveToCart, removeCourseFromCart, saveForLater  } from "../../fetchData/Cart";

export const getCart = createAsyncThunk(
    'cart/getCart', async () => {
        const response = await getCartOfUser();
        console.log("hahaha" , response.data)
        return response.data.data
    }
)
export const addCourse = createAsyncThunk(
    'cart/addCourseToCart' , async(courseId) => {
        const response = await addCourseToCart(courseId)
        return response.data.data
    }
)

export const removeCourse = createAsyncThunk(
    'cart/removeCourseFromCart', async(courseId) => {
        const response = await removeCourseFromCart(courseId)
        return response.data.data
    }
)

export const moveCourseToCart = createAsyncThunk(
    'cart/moveToCart', async(courseId) => {
        const response = await moveToCart(courseId)
        return response.data.data
    }
)
export const saveCourseForLater = createAsyncThunk(
    'cart/saveForLater', async(courseId) => {
        const response = await saveForLater(courseId)
        return response.data.data
    }
)



const cartSlice = createSlice({
    name: "cart",
    initialState : {
        cart: [],
        loading: false,
        error : null
    
    },

    extraReducers(builder) {
        builder
            .addCase(getCart.pending , ( state, action) => {
                state.loading = true
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload.courses
            })
            .addCase(getCart.rejected , (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(addCourse.pending , (state, action) => {
                state.loading = true
            })
            .addCase(addCourse.fulfilled , (state, action) => {
                state.loading = false
                state.cart = action.payload.courses
            })
            .addCase(addCourse.rejected , (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(removeCourse.pending , (state, action) => {
                state.loading = true
            })
            .addCase(removeCourse.fulfilled , (state, action) => {
                state.loading = false
                state.cart = action.payload.courses
            })
            .addCase(removeCourse.rejected , (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(moveCourseToCart.pending , (state, action) => {
                state.loading = true
            })
            .addCase(moveCourseToCart.fulfilled , (state, action) => {
                state.loading = false
                state.cart = action.payload.courses
            })
            .addCase(moveCourseToCart.rejected , (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(saveCourseForLater.pending , (state, action) => {
                state.loading = true
            })
            .addCase(saveCourseForLater.fulfilled , (state, action) => {
                state.loading = false
                state.cart = action.payload.courses
            })
            .addCase(saveCourseForLater.rejected , (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }


})

export const getQuantityInCart = (state) => state.cart.cart != null ? state.cart.cart.length : 0
export const getCoursesInCart = (state) => state.cart.cart != null && state.cart.cart.filter(data => data.later)
export const getCartLoading = (state) => state.cart.loading
export const getCourseLaterInCart = (state) => state.cart.cart != null && state.cart.cart.filter(data => data.later === false)
export const getAllInCart = (state) => state.cart.cart

export default cartSlice.reducer
