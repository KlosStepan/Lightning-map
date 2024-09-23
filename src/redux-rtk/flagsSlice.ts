import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//TODO debugs& blog (homepage & menu out)
//Use to enable/disable debug info (prolly via ENV local true) &blog
export interface IFlagsSlice {
    debug: boolean
    blog: boolean
}
const initialState: IFlagsSlice = {
    debug: true,
    blog: true
}

export const flagsSlice = createSlice({
    name: 'flags',
    initialState,
    reducers: {
        setDebug: (state, action: PayloadAction<boolean>) => {
            state.debug = action.payload
        },
        setBlog: (state, action: PayloadAction<boolean>) => {
            state.blog = action.payload
        }
    }
})

export const { setDebug, setBlog } = flagsSlice.actions;
export default flagsSlice.reducer; 