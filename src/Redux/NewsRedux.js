import {createSlice} from '@reduxjs/toolkit'

const NewsSlice = createSlice({
    name:"news",
    initialState:{
        news:null,
        error:false
    },
    reducers:{
        NewsSuccess:(state,action)=>{
            state.news = action.payload
            state.error = false
        },
        NewsFailure:(state)=>{
            state.news = null
            state.error = true
        },
        NewsDelete:(state,action)=>{
                state.news.splice(
                    state.news.findIndex(
                        (item)=>item._id === action.payload
                    ),1
                )
        },
        NewsEmpty:(state)=>{
            state.news = null
            state.error = false
        }
    }
})

export const {NewsSuccess,NewsFailure,NewsDelete,NewsEmpty} = NewsSlice.actions
export default NewsSlice.reducer