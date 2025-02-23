import { Action, legacy_createStore as createStore} from 'redux'
import { setUserReducer } from "./reducers/setUserReducer"
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from "./states/user/userSlice"
import { useSelector } from 'react-redux';

// export const configurationStore = () => {
//     return configureStore({reducer: setUserReducer});
// }

export const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch; // this is usefull in async actions






