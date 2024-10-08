import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//Interfaces of lists
import IMerchant from '../ts/IMerchant';
import IEshop from '../ts/IEeshop';

export interface IDataState {
    merchants: IMerchant[] | undefined,
    eshops: IEshop[] | undefined
}
const initialState: IDataState = {
    merchants: undefined,
    eshops: undefined
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setMerchants: (state, action: PayloadAction<IMerchant[]>) => {
            state.merchants = action.payload
        },
        setEshops: (state, action: PayloadAction<IEshop[]>) => {
            state.eshops = action.payload
        }
    },
})

export const { setMerchants, setEshops } = dataSlice.actions;
export default dataSlice.reducer;
