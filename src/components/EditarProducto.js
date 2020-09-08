import React, {useState, useEffect} from 'react';
import {editarProductoAction} from '../actions/productoActions';
import {useHistory} from 'react-router-dom';

//Redux
import {useDispatch, useSelector} from 'react-redux';

const EditarProducto = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    //Nuevo state de producto
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    });

    //producto a editar
    const productoeditar = useSelector (state => state.productos.productoeditar);
    //no puede ir con el useEffect if(!producto) return null; //con esto se evita que salga un error al recargar la web en la ruta de editar

    //Llenar el state automaticamente con useEffect
    useEffect(() => {
        guardarProducto(productoeditar);
    },[productoeditar]);

    //Leer los datos del formulario
    const onChangeFormularo = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const {nombre, precio} = producto;

    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch(editarProductoAction(producto));//pasamos el nuevo producto a productoActions

        //redireccion al componente principal
        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormularo}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeFormularo}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;