import { configureStore } from '@reduxjs/toolkit'
//import ciselnikySlice from './ciselnikySlice'
//import miscStuffSlice from './miscStuffSlice'

export const store = configureStore({
    reducer: {
        //miscStuff: miscStuffSlice,
        //ciselniky: ciselnikySlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch