import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching order details
export const fetchOrderDetails = createAsyncThunk(
    'orders/fetchOrderDetails',
    async (orderId) => {
        const response = await axios.get(`/api/orders/${orderId}`);
        return response.data;
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        order: null,
        loading: false,
        error: null,
        status: 0, // Add status to the initial state
    },
    reducers: {
        resetOrder: (state) => {
            state.order = null;
            state.error = null;
            state.status = 0; // Reset status
        },
        setOrderStatus: (state, action) => {
            state.status = action.payload; // Update status
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.status = getStatusFromOrder(action.payload.status); // Set status based on order
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Helper function to map order status to integer
const getStatusFromOrder = (orderStatus) => {
    const statuses = {
        accept: 1,
        processing: 2,
        dispatch: 3,
        transporting: 4,
        nearby: 5,
        'out-for-delivery': 6,
        delivered: 7,
    };
    return statuses[orderStatus] || 0; // Default to 0 if status is unknown
};

// Export actions and reducer
export const { resetOrder, setOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
