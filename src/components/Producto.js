import React from 'react';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import {useDispatch} from 'react-redux';
import {borrarProductoAction, obtenerProductoEditar} from '../actions/productoActions';

const Producto = ({producto}) => {

    //extraemos de producto
    const {nombre, precio, id} = producto;

    //se requiere para poder ejecutar las funciones
    const dispatch = useDispatch();
    const history = useHistory();//habilitar history para redireccion

    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {

        //preguntar al usuario
        //Alerta de la libreria sweetaler2
        Swal.fire({
            title: 'Estás seguro?',
            text: `Vas a eliminar ${nombre}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, deseo eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                //pasarlo al action
                dispatch(borrarProductoAction(id));
            }
          });
    }

    //Funcion que redirige de forma programada. Toma el producto completo para obtener el id y también el producto
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`)
    }
    
    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weigth-bold">{precio} €</span></td>
            <td className="acciones">
                <button 
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(producto)}
                >
                    Editar
                </button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;