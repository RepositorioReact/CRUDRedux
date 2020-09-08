import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTO,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto());//agrega el producto al state

        //Consulta a la BD (en este caso API)
        try {
            //Insertar en la API
            await clienteAxios.post('/productos', producto);

            //Si todo sale bien, actualiza el state
            dispatch(agregarProductoExito(producto));

            //Alerta de la libreria sweetaler2
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
              )
        } catch (error) {
            console.log(error);
            //si hay un error se cambia el state
            dispatch(agregarProductoError(true));

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, inténtalo de nuevo'
            })
        }
    }
}

//este agregarProducto debe estar en el reducer. Todas las funciones deben estar en el reducer
const agregarProducto = () =>({
    type: AGREGAR_PRODUCTO,
    payload: true
});

//si el producto se guarda en BD
const agregarProductoExito = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

//Si hubo un error
const agregarProductoError = estado =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});




//Función que descarga los productos de la BD en este caso la API
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            //Insertar en la API
            const respuesta = await clienteAxios.get('/productos');
    
            //Si todo sale bien, actualiza el state
            dispatch(descargaProductosExito(respuesta.data));
        } catch (error) {
            console.log(error);
            //si hay un error se cambia el state
            dispatch(descargaProductosError());
        }

    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTO,
    payload: true
});

const descargaProductosExito = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});




//Selecciona y elimina el producto
export function borrarProductoAction(id){
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);

            dispatch(eliminarProductoExito());

            //Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado con éxito.',
                'success'
              )

        } catch (error) {
            console.log(error);

            dispatch(eliminarProductoError());

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error al intentar eliminar el producto, inténtalo de nuevo'
            })
        }

    }
}

//ponemos en el state el id del producto a eliminar
const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({ //no se le pasa nada ya que lo que está en el state es lo que el usuario desea eliminar
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});




//Colocar producto en edicion. No se hace llamado a la api, lo colocamos en activo
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto));
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});




//Edita un registro en la api y state
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto());//aqui por el momento no cambia el state
        
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);//se le pasa también el producto nuevo

            dispatch(editarProductoExito(producto));
        } catch (error) {
            console.log(error);

            dispatch(editarProductoError());
        }

    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
});