import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../redux/EmployeeSlice';
import { API_URLS } from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import axios from 'axios';

const EmployeesTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const employees = useSelector((state) => state.employees.employees);
    const [positions, setPositions] = useState([]);
    const [loadingPositions, setLoadingPositions] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10);

    // Estado para ordenar
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const get_positions = async () => {
        try {
            const response = await axios.get(API_URLS.GET_POSITIONS);
            setPositions(response.data);
        } catch (error) {
            console.log(error);
            alert("Hubo un error al cargar las posiciones");
        } finally {
            setLoadingPositions(false);
        }
    };

    useEffect(() => {
        get_positions();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEdit = (employee) => {
        dispatch(addEmployee(employee));
        navigate('/employee');
    };

    const getPositionDescription = (positionId) => {
        const position = positions.find(pos => pos.positionId === positionId);
        return position ? position.description : 'Sin posicion';
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(newDirection);
    };

    const sortedEmployees = [...employees].sort((a, b) => {
        if (!sortColumn) return 0;

        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (sortDirection === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    // Lógica de paginación
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPages = Math.ceil(employees.length / employeesPerPage);

    if (!Array.isArray(employees)) {
        return <div>No hay empleados disponibles.</div>;
    }
    if (loadingPositions) {
        return <div>Cargando posiciones...</div>;
    }

    return (
        <div>
            <div className="flex justify-center shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ width: '6%' }} onClick={() => handleSort('employeeId')}>
                                ID {sortColumn === 'employeeId' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ width: '20%' }} onClick={() => handleSort('firstName')}>
                                Nombre {sortColumn === 'firstName' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ width: '40%' }} onClick={() => handleSort('description')}>
                                Descripción {sortColumn === 'description' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ width: '24%' }} onClick={() => handleSort('positionId')}>
                                Puesto {sortColumn === 'positionId' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ width: '10%' }}>
                                Editar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.map((employee) => (
                            <tr className="odd:bg-white even:bg-gray-50 border-b" key={employee.employeeId}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {employee.employeeId}
                                </th>
                                <td className="px-6 py-4">{employee.firstName} {employee.lastName}</td>
                                <td className="px-6 py-4">{employee.description}</td>
                                <td className="px-6 py-4">{getPositionDescription(employee.positionId)}</td>
                                <td className="px-6 py-4 flex justify-center items-center">
                                    <a href="#" className="text-lg text-blue-500 hover:underline" onClick={() => handleEdit(employee)}>
                                        <FaUserEdit />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmployeesTable;
