import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./EmployeesSlice";
import employeeReducer from "./EmployeeSlice";

export const store = configureStore({
    reducer: {
        employees: employeesReducer,
        employee: employeeReducer
    }
});

export default store;