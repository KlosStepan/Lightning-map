import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth'; // Import the Firebase User type
//import IMerchant from '../ts/IMerchant';
import { IMerchantADWrapper } from '../ts/IMerchant';
//import IEshop from '../ts/IEshop';
import { IEshopADWrapper } from '../ts/IEshop';

export interface IMiscSlice {
    debug: boolean;
    blog: boolean;
    user: User | null;  // The user will now be of type Firebase User or null
    userMerchants: IMerchantADWrapper[] | null
    userEshops: IEshopADWrapper[] | null
}
const initialState: IMiscSlice = {
    debug: process.env.REACT_APP_DEBUG === 'true' ? true : false,
    blog: process.env.REACT_APP_BLOG === 'false' ? false : true,
    user: null,  // User is initially null, meaning no one is logged in]
    userMerchants: null,
    userEshops: null
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
        //TODO - minimum User data only (to avoid User big chunk) || mby?
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;  // Set or unset the Firebase User object
        },
        //Adding User related stuff
        setUserMerchants: (state, action: PayloadAction<IMerchantADWrapper[]>) => {
            state.userMerchants = action.payload
        },
        setUserEshops: (state, action: PayloadAction<IEshopADWrapper[]>) => {
            state.userEshops = action.payload
        }
    }
})

export const { setDebug, setBlog, setUser, setUserMerchants, setUserEshops } = miscSlice.actions;
export default miscSlice.reducer; 