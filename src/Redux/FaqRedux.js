import {createSlice} from '@reduxjs/toolkit'

const FaqSlice = createSlice({
    name:"faq",
    initialState:{
        faq:null,
        error:false
    },
    reducers:{
        FaqSuccess:(state,action)=>{
            state.faq = action.payload
            state.error = false
        },
        FaqFailure:(state)=>{
            state.faq = null
            state.error = true
        },
        FaqEmpty:(state)=>{
            state.faq = null
            state.error = false
        },
        FaqDelete:(state,action)=>{
            state.faq.splice(
                state.faq.findIndex(
                    (index)=>index._id === action.payload
                ),1
            )
        }
    }
})

export const {FaqSuccess,FaqFailure,FaqEmpty,FaqDelete} = FaqSlice.actions
export default FaqSlice.reducer