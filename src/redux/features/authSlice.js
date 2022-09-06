import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
  username: "",
  email: "",
  role: ""
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
})

export const { } = authSlice.actions

export default authSlice.reducer