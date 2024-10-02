import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEmployees } from '../redux/EmployeesSlice'
import { resetEmployee } from '../redux/EmployeeSlice'
import axios from 'axios';
import { API_URLS } from '../apiConfig';
import EmployeesTable from '../components/EmployeesTable';
import { FaSearch } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { toast } from 'react-toastify';

const EmployeesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [nameFilter, setNameFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState(1);

    const getEmployees = async (filterName = '', filterPosition = '', filterStatusId = null) => {        
        const fetchEmployeesPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(API_URLS.GET_EMPLOYEES, {
                    params: {
                        filterName: filterName,
                        position: filterPosition,
                        statusId: filterStatusId
                    },
                });
                dispatch(addEmployees(response.data));
                resolve('Empleados cargados con éxito!');
            } catch (error) {
                console.error("Error al cargar los empleados:", error);
                reject('Hubo un error al cargar los empleados.');
            }
        });
    
        toast.promise(fetchEmployeesPromise, {
            pending: 'Cargando empleados...',
            success: 'Empleados cargados con éxito.',
            error: 'Hubo un error al cargar los empleados.'
        }, {
            position: 'top-right',
            autoClose: 3000,
        }).finally(() => {
            setLoading(false);
        });
    };
    const getStatuses = async () => {
        try {
            const response = await axios.get(API_URLS.GET_STATUSES);
            setStatuses(response.data)
        } catch (error) {
            console.log(error);
            toast.error('Hubo un error al cargar los estatus.', {autoClose: 3000});
        }
    };

    useEffect(() => {
        getEmployees();
        getStatuses();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    const handleSelectStatus = (e) => {
        const { name, value } = e.target;
        setStatusFilter(value)
    };
    const handleSearch = () => {
        getEmployees(nameFilter, positionFilter, statusFilter);
    };
    const handleAddEmployee = () => {
        dispatch(resetEmployee());
        navigate('/employee');
    };

    return (
        <div >
            <div className='flex flex-col items-center py-[30px]'>
                <h1 className='font-bold text-xl'>Listado de empleados</h1>
            </div>
            <div className='flex flex-col items-center'>
                <div className="flex flex-wrap justify-between w-full md:w-4/5 mb-4">
                    <div className="flex space-x-4 mb-2 md:mb-0">
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="border border-gray-300 p-2 rounded-lg"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Posición"
                            className="border border-gray-300 p-2 rounded-lg"
                            value={positionFilter}
                            onChange={(e) => setPositionFilter(e.target.value)}
                        />
                        <select id="statusId" name="statusId" className="w-full border border-gray-300 p-2 rounded-lg" value={statusFilter} onChange={handleSelectStatus}>
                            <option value="">Selecciona un estatus</option>
                            {statuses.map((status) => (
                                <option key={status.statusId} value={status.statusId}>
                                    {status.description}
                                </option>
                            ))}
                        </select>
                        <button className="text-xl text-gray-800 py-2 px-1" onClick={handleSearch}>
                            <FaSearch />
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 mb-2 md:mb-0">
                        <button className="bg-sky-700 hover:bg-sky-800 text-white py-2 px-4 rounded-lg flex items-center" onClick={() => handleAddEmployee()}>
                            Nuevo empleado <IoPersonAddSharp className="ml-2" />
                        </button>
                    </div>
                </div>

            </div>
            <div className='w-full text-center'>
                <div className="inline-block w-4/5">
                    <EmployeesTable />
                </div>
            </div>
        </div>

    );
};

export default EmployeesPage;
