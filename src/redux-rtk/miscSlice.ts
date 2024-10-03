import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth'; // Import the Firebase User type

export interface IMiscSlice {
    debug: boolean;
    blog: boolean;
    user: User | null;  // The user will now be of type Firebase User or null
}
const initialState: IMiscSlice = {
    debug: process.env.REACT_APP_DEBUG === 'true' ? true : false,
    blog: process.env.REACT_APP_BLOG === 'false' ? false : true,
    user: null,  // User is initially null, meaning no one is logged in
};

export const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setDebug: (state, action: PayloadAction<boolean>) => {
            state.debug = action.payload
        },
        setBlog: (state, action: PayloadAction<boolean>) => {
            state.blog = action.payload
        },
        //TODO - minimum User data only (to avoid User big chunk)
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;  // Set or unset the Firebase User object
        },
    }
})

export const { setDebug, setBlog, setUser } = miscSlice.actions;
export default miscSlice.reducer; 