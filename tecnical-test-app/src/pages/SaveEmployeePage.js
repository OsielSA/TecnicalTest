import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../apiConfig';
import axios from 'axios';
import { updateEmployee } from '../redux/EmployeeSlice'
import { toast } from 'react-toastify';

const SaveEmployeePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector((state) => state.employee);
  const [positions, setPositions] = useState([])
  const [statuses, setStatuses] = useState([])
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [loadingStatuses, setLoadingStatuses] = useState(true);
  const [title, setTitle] = useState("Agregar Empleado");

  const getPositions = async () => {
    try {
      const response = await axios.get(API_URLS.GET_POSITIONS);
      setPositions(response.data)
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error al cargar las posiciones.', { autoClose: 3000 });
    } finally {
      setLoadingPositions(false)
    }
  };

  const getStatuses = async () => {
    try {
      const response = await axios.get(API_URLS.GET_STATUSES);
      setStatuses(response.data)
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error al cargar los estatus.', { autoClose: 3000 });
    } finally {
      setLoadingStatuses(false)
    }
  };

  useEffect(() => {
    if (employee.employeeId !== 0) {
      setTitle("Editar Empleado");
    }
    getPositions();
    getStatuses();
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateEmployee({ ...employee, [name]: value }));
    // dispatch(updateEmployee({ [name]: value }));
  };
  const handleCancel = () => {
    navigate('/');
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (!employee.firstName || !employee.lastName || !employee.description || !employee.positionId || !employee.statusId) {
      toast.warning("Por favor, completa todos los campos.", { autoClose: 2000 });
      return;
    }
    saveEmployee()
  };

  const saveEmployee = async () => {

    const saveEmployeePromise = new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(API_URLS.SAVE_EMPLOYEE, {
          employeeId: employee.employeeId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          description: employee.description,
          positionId: employee.positionId,
          statusId: employee.statusId,
        });
        console.log("Empleado guardado:", response.data);
        resolve('Empleado guardado con éxito!');
      } catch (error) {
        console.error("Error al guardar el empleado:", error);
        reject('Error al guardar el empleado.');
      }
    });

    toast.promise(saveEmployeePromise, {
      pending: 'Guardando empleado...',
      success: 'Empleado guardado con éxito!',
      error: 'Hubo un error al guardar el empleado.'
    }, {
      position: 'top-right',
      autoClose: 3000,
    }).then(() => {
      navigate('/');
    });
  };



  if (loadingPositions && loadingStatuses) {
    return <div>Cargando catálogos...</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-200">
      <div className="bg-white p-10 mt-[50px] rounded-lg shadow-lg w-full md:w-1/2">
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-gray-800 font-bold mb-2">Nombre</label>
            <input type="text" id="firstName" name="firstName" className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Ingrese el nombre" value={employee.firstName} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-800 font-bold mb-2">Apellido</label>
            <input type="text" id="lastName" name="lastName" className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Ingrese el apellido" value={employee.lastName} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-800 font-bold mb-2">Descripción</label>
            <input type="text" id="description" name="description" className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Ingrese la descripción" value={employee.description} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="positionId" className="block text-gray-800 font-bold mb-2">Posición</label>
            <select id="positionId" name="positionId" className="w-full border border-gray-300 p-2 rounded-lg" value={employee.positionId} onChange={handleInputChange}>
              <option value="">Selecciona una posición</option>
              {positions.map((position) => (
                <option key={position.positionId} value={position.positionId}>
                  {position.description}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="statusId" className="block text-gray-800 font-bold mb-2">Estatus</label>
            <select id="statusId" name="statusId" className="w-full border border-gray-300 p-2 rounded-lg" value={employee.statusId} onChange={handleInputChange}>
              <option value="">Selecciona un estatus</option>
              {statuses.map((status) => (
                <option key={status.statusId} value={status.statusId}>
                  {status.description}
                </option>
              ))}
            </select>

          </div>
          <div className="flex space-x-2">
            <button className="w-1/2 rounded-xl bg-gray-500 py-2 text-lg font-medium text-white"
              onClick={() => handleCancel()}>
              Cancelar
            </button>
            <button type="button" className="w-1/2 rounded-xl bg-sky-800 py-2 text-lg font-medium text-white"
              onClick={(e) => handleSave(e)}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveEmployeePage;