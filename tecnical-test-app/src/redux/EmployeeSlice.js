import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    employeeId: 0,
    firstName: '',
    lastName: '',
    description: '',
    positionId: '',
    statusId: '',
};

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers:{
        addEmployee: (state, action) => {
            const { employeeId, firstName, lastName, description, positionId, statusId } = action.payload;
            state.employeeId = employeeId;
            state.firstName = firstName;
            state.lastName = lastName;
            state.description = description;
            state.positionId = positionId;
            state.statusId = statusId;
        },
        updateEmployee: (state, action) => {
            const { firstName, lastName, description, positionId, statusId } = action.payload;

            console.log(action.payload)
            state.firstName = firstName;
            state.lastName = lastName;
            state.description = description;
            state.positionId = positionId;
            state.statusId = statusId;
        },
        resetEmployee: (state) => {
            return initialState;
        },
    }
});

export const { addEmployee, updateEmployee, resetEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
