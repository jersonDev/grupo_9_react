import React, { Component }from 'react';
import CategoriesInDb from './CategoriesInDb';
import ContentRowData from './ContentRowData';
let productList = {};
class ContentRowTop extends Component{
	constructor(props){
        super(props)
        this.state = {
            lastProduct:{}
        }
    }

	apiCall(url, consecuencia){
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(e => console.log(e))
    }

	componentDidMount(){
		this.apiCall('api/products', this.buscarUltimo)
	}

	buscarUltimo = (data) => {
		let ultimo = 0;
		data.products.forEach((producto, index) => {
			ultimo=index
		})

		data.products.forEach((producto, index) => {
			if(index===ultimo){
				//productList = producto
				productList = {
					"id": producto.id,
					'name': producto.name,
					'description':producto.description,
					'price': producto.price,
					'category':producto.category.name,
					'image':producto.image,
					'brand':producto.brand.name,
					
				}

			}
		})
		this.apiCall('api/products/'+ultimo, this.cargarUltimo);
		console.log('ultimo', ultimo)
		console.log('data.products', productList)
		this.setState({lastProduct:productList});
	}



    render(){
		return(
			<React.Fragment>
					{/*<!-- Content Row Top -->*/}
					<div className="container-fluid">
						<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
							<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
						</div>
					
						{/*<!-- Content Row Movies-->*/}
						<ContentRowData />
						{/*<!-- End movies in Data Base -->*/}
						
		
						{/*<!-- Content Row Last Movie in Data Base -->*/}
						<div className="row">
							{/*<!-- Last Movie in DB -->*/}
							<div className="col-lg-6 mb-4">
								<div className="card shadow mb-4">
									<div className="card-header py-3">
										<h5 className="m-0 font-weight-bold text-gray-800">Ultimo Producto</h5>
									</div>
									<div className="card-body">
										<div className="text-center">
											<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 20 +'rem'}} src={this.state.lastProduct.image} />
										</div>
										<p>Nombre: {this.state.lastProduct.name}</p>
										<p>Descripción: {this.state.lastProduct.description}</p>
										<p>Categoria: {this.state.lastProduct.category}</p>
										<p>Marca: {this.state.lastProduct.brand}</p>
										<p>Precio: {this.state.lastProduct.price}</p>
									
										<a className="btn btn-danger" rel="nofollow" href={"http://localhost:3030/products/detail/"+this.state.lastProduct.id}>Ver Detalle</a>
									</div>
								</div>
							</div>
							{/*<!-- End content row last movie in Data Base -->*/}
	
							{/*<!-- Genres in DB -->*/}
							<CategoriesInDb />
	
							{/*<!--End Genres In Db-->*/}		
						</div>
					</div>
					{/*<!--End Content Row Top-->*/}
	
			</React.Fragment>
		)
	}
}
export default ContentRowTop;