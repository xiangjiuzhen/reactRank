import { configureStore } from '@reduxjs/toolkit'
//导入子模块reducer
import counterReducer from './moudle/counterSlice.tsx'
 console.log(counterReducer,'1234')
//创建根store组合子模块
const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
 
export default store 