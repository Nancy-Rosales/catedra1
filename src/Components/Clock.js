import React, { useState, useEffect } from "react";
import './Clock.css';
import License from './License';
//import ReactExport, { ExcelFile, ExcelSheet, ExcelColumn } from "react-data-export";

function Clock({ ...props }) {
  const [idSearch, setIdSearch] = useState(1);
  const [producto, setProducto] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "asd",
    category: "",
    image: "",
    rating: {
      rate: 0.0,
      count: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://fakestoreapi.com/products/' + idSearch);
      const data2 = await response.json();
      setProducto(data2);
    };
    fetchData();
  }, [idSearch]);

  const change = (value) => {
    console.log(value);
    setIdSearch(value);
  };

  const editar = () => {
    console.log("producto editado", producto);
  };

  const [productosConsumidos, setProductosConsumidos] = useState([]);

  const agregarProductoConsumido = () => {
    setProductosConsumidos((prevProductos) => [...prevProductos, producto]);
  };

  return (
    <div>
       <div className="contenedor_agregar">
        <button className ="boton_agregar" onClick={agregarProductoConsumido}>Agregar a la lista</button>
      </div>
      <div className="text_contenedor">
        <h2>Productos Consumidos</h2>
        <ul>
          {productosConsumidos.map((producto, index) => (
            <li key={index}>{producto.title}</li>
          ))}
        </ul>
      </div>
      
    
         <div className="product__box">
            <div className="product__box-img">
                <img className="product_img" src={producto.image} ></img>
            </div>
            <div className="product__box-details">
                <div className="product_meta">
                    <input  type="number" value={idSearch} onChange={(e) => change(e.target.value) } />
                    <input type="text" value={producto.title} onChange={(e) => setProducto({...producto, title: e.target.value}) } />
                </div>

                <p className="product_price">{`$${producto.price}`}</p>
                <p>{producto.category}</p>
                <p className="product_description">{producto.description}</p>
         
                <div className="contenedor_boton">
                      <button className="boton_editar" onClick={()=> editar()}>Editar</button>
        

                </div>
            </div>
        </div>

      <License/>
    </div>
    
  );
}

export default Clock;

