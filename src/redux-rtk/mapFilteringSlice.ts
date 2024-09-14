import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
    filters: {}
    //Food & Drinks, Shops, Services
}
export const mapFilteringSlice = createSlice({
    name: 'mapFiltering',
    initialState,
    reducers: {
        setFiltering: (state, action: PayloadAction<any>) => {
            state.something = action.payload
        }
    }
})