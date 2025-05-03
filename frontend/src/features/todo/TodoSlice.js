import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";

const initialState = {
    todos : [],
    loading : false,
    error_message : '',
    currentTodo : null,
}


export const getTodos = createAsyncThunk('/todo/getTodos' , async (_, {rejectWithValue}) =>{
    try {
        const res = await axiosInstance.get('/todos/gettodos')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const addTodo = createAsyncThunk('/todo/addTodo' , async (tododata , {rejectWithValue}) =>{
    try {
        const res = await axiosInstance.post('/todos/addtodo' , tododata)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async ({ id, updates } , {rejectWithValue}) => {
    try {
        const res = await axiosInstance.put(`/todos/updatetodo/${id}`, updates);
        return res.data
    } catch (error){
        return rejectWithValue(error.response.data.message)
    }
  })
  
  export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id , {rejectWithValue}) => {
    try {
        await axiosInstance.delete(`/todos/deletetodo/${id}`);
        return id
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
  })

const todosSlice = createSlice({
    name : 'todos',
    initialState,
    reducers:{
        setCurrentTodo:(state , action)=>{
            state.currentTodo = action.payload
        },
        clearCurrentTodo:(state)=>{
            state.currentTodo = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getTodos.pending , (state)=>{
            state.loading = true
        })
        builder.addCase(getTodos.fulfilled , (state , action)=>{
            state.loading = false
            state.todos = action.payload
            state.error_message = ''
        })
        builder.addCase(getTodos.rejected , (state, action)=>{
            state.loading = false
            state.error_message = action.payload
            state.todos = []
        })
        builder.addCase(addTodo.pending , (state)=>{
            state.loading = true
        })
        builder.addCase(addTodo.fulfilled , (state , action)=>{
            state.loading = false
            state.todos.push(action.payload)
            state.error_message = ''
        })
        builder.addCase(addTodo.rejected , (state , action)=>{
            state.loading = false
            state.error_message = action.payload
        })
        builder.addCase(updateTodo.fulfilled , (state , action)=>{
            const index = state.todos.findIndex((id)=>id._id === action.payload._id)
            state.todos[index] = action.payload
        })
        builder.addCase(deleteTodo.fulfilled , (state , action)=>{
            state.todos = state.todos.filter((todo)=> todo._id !== action.payload)
        })
    }
})

export default todosSlice.reducer;
export const {setCurrentTodo , clearCurrentTodo} = todosSlice.actions
