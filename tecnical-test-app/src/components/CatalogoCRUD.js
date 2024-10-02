import React, { useState } from 'react';

const CatalogoCRUD = () => {
  const [catalogo, setCatalogo] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSave = () => {
    if (editId !== null) {
      // Editar item existente
      setCatalogo(catalogo.map(item => 
        item.id === editId ? { id: editId, descripcion } : item
      ));
      setEditId(null);
    } else {
      // Crear nuevo item
      const newId = catalogo.length ? catalogo[catalogo.length - 1].id + 1 : 1; // Generar nuevo ID
      setCatalogo([...catalogo, { id: newId, descripcion }]);
    }
    setDescripcion('');
  };

  const handleEdit = (item) => {
    setDescripcion(item.descripcion);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    setCatalogo(catalogo.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>Catálogo CRUD</h2>
      <input 
        type="text" 
        value={descripcion} 
        onChange={(e) => setDescripcion(e.target.value)} 
        placeholder="Descripción" 
      />
      <button onClick={handleSave}>{editId ? 'Actualizar' : 'Guardar'}</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {catalogo.map(item => (
            <tr key={item.id}>
              <td><input type="text" value={item.id} readOnly /></td>
              <td><input type="text" value={item.descripcion} readOnly /></td>
              <td>
                <button onClick={() => handleEdit(item)}>Editar</button>
                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CatalogoCRUD;
