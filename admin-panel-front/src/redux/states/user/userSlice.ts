import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../classes/user"
import { AppDispatch, AppThunk, RootState } from "../../configureStore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// const initialState = new User();

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
  };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser : (state, action: PayloadAction<User | null>) => { // this is not mutating since we are changing inside createSlice
            state.user = action.payload  // Replace state entirely
        }
    },
    extraReducers: (builder ) => {
        builder
            .addCase(fetchUser.pending, (state) => { // state is optional here 
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state , action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.user = null;
            })
    }      
});

export const setUserAsync = createAsyncThunk("setUserAsync" , async () => {
    // do something
});


export const {setUser} = userSlice.actions; 
export default userSlice.reducer;


export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("user"); // API request to fetch user data
      return new User(data.first_name, data.last_name, data.id, data.email, data.role);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  });


// export const loginUser = createAsyncThunk(
//     "user/login",
//     async (loginCred :{email: string, password: string}) => {
//         const res = await axios.post("login", loginCred);
//         return res.data;
//     }
// )










  
// //in order to access user state inside components 
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const user = useSelector((state: RootState) => state.user);
// const dispatch = useDispatch<AppDispatch>() // app dispatch is for using async func like setUserAsync

// // const tmp = () => {
// //     return (
// //         <div onClick={() => dispatch(setUserAsync())}> </div>
// //     )
// // }


