import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//Interfaces of lists
import IMerchant from '../ts/IMerchant';
import IEshop from '../ts/IEshop';
import ILike from '../ts/ILike';

export interface IDataState {
    merchants: IMerchant[] | undefined,
    eshops: IEshop[] | undefined,
    likes: ILike[] | undefined
};

const initialState: IDataState = {
    merchants: undefined,
    eshops: undefined,
    likes: undefined
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setMerchants: (state, action: PayloadAction<IMerchant[]>) => {
            state.merchants = action.payload
        },
        setEshops: (state, action: PayloadAction<IEshop[]>) => {
            state.eshops = action.payload
        },
        setLikes: (state, action: PayloadAction<ILike[]>) => {
            state.likes = action.payload
        }
    },
});

export const { setMerchants, setEshops, setLikes } = dataSlice.actions;
export default dataSlice.reducer;
