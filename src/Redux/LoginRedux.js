import {createSlice} from '@reduxjs/toolkit'

const LoginSlice = createSlice({
    name:"login",
    initialState:{
        current:null,
        error:false
    },
    reducers:{
        LoginStart:(state)=>{
            state.current = null
            state.error = false
        },
        LoginSuccess:(state,action)=>{
            state.current = action.payload
            state.error = false
        },
        LoginFailure:(state)=>{
            state.current = null
            state.error = true
        },
    }
})

export const {LoginStart,LoginSuccess,LoginFailure} = LoginSlice.actions
export default LoginSlice.reducer