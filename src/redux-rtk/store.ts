import { configureStore } from '@reduxjs/toolkit'
//Slices
import miscSlice from './miscSlice'
import dataSlice from './dataSlice'
import mapFilteringSlice from './mapFilteringSlice'

export const store = configureStore({
    reducer: {
        misc: miscSlice,
        data: dataSlice,
        mapFiltering: mapFilteringSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch