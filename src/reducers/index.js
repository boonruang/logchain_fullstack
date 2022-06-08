import { combineReducers } from 'redux'
import registerReducer from './register.reducer'
import loginReducer from './login.reducer'
import blockReducer from './block.reducer'
import blockDataReducer from './block.data.reducer'
import systemReducer from './system.reducer'
import systemNodeReducer from './system.node.reducer'
import userReducer from './user.reducer'
import userEditReducer from './user.edit.reducer'

export default combineReducers({
  registerReducer,
  loginReducer,
  blockReducer,
  blockDataReducer,
  systemReducer,
  systemNodeReducer,
  userReducer,
  userEditReducer,
})
