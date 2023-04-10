import {createSlice} from '@reduxjs/toolkit'

const PaperSlice = createSlice({
    name:"paper",
    initialState:{
        paper:null,
        error:false
    },
    reducers:{
        PaperSuccess:(state,action)=>{
            state.paper = action.payload
            state.error = false
        },
        PaperFailure:(state)=>{
            state.paper = null
            state.error = true
        },
        PaperEmpty:(state)=>{
            state.paper = null
            state.error = false
        },
        PaperDelete:(state,action)=>{
            state.paper.splice(
                state.paper.findIndex(
                    (index)=>index._id === action.payload
                ),1
            )
        }
    }
})

export const {PaperSuccess,PaperFailure,PaperEmpty,PaperDelete} = PaperSlice.actions
export default PaperSlice.reducer