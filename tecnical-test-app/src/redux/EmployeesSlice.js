import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    employees: []
};

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployees: (state, action) => {
            state.employees = action.payload
        }
    }
});

export const { addEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
