import {createSlice} from '@reduxjs/toolkit'

const TestSlice = createSlice({
    name:"test",
    initialState:{
        test:null,
        error:false
    },
    reducers:{
        TestSuccess:(state,action)=>{
            state.test = action.payload
            state.error = false
        },
        TestFailure:(state)=>{
            state.test = null
            state.error = true
        },
        MockTestDelete:(state,action)=>{
            state.test[0].mock.splice(
                state.test[0].mock.findIndex(
                    (index)=> index._id === action.payload
                ),1
            )
        },
        ChemistryTestDelete:(state,action)=>{
            state.test[0].chemistry.splice(
                state.test[0].chemistry.findIndex(
                    (index)=> index._id === action.payload
                ),1
            )
        },
        PhysicsTestDelete:(state,action)=>{
            state.test[0].physics.splice(
                state.test[0].physics.findIndex(
                    (index)=> index._id === action.payload
                ),1
            )
        },
        MathTestDelete:(state,action)=>{
            state.test[0].math.splice(
                state.test[0].math.findIndex(
                    (index)=> index._id === action.payload
                ),1
            )
        },
        TestEmpty:(state)=>{
            state.test = null
            state.error = false
        }
    }
})

export const {TestSuccess,TestFailure,TestEmpty,MockTestDelete,ChemistryTestDelete,PhysicsTestDelete,MathTestDelete} = TestSlice.actions
export default TestSlice.reducer