import React, {Component} from 'react';
let productList = [];
class ProductList extends Component{
    
	constructor(props){
        super(props)
        this.state = {
            products:[],
			done: false
        }
    }

	apiCall(url, consecuencia){
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(e => console.log(e))
    }

	componentDidMount(){
		this.apiCall('api/products', this.cargarProductos)
	}

	cargarProductos = (data) => {
		console.log('data', data)
		productList = data.products;
		this.setState({products:productList , done:true})
	}

	


	render(){
		return(
			<React.Fragment>
						{/*<!-- PRODUCTS LIST -->*/}
						
						{/*<!-- DataTales Example -->*/}
						<div className="card shadow mb-4" style={{width:'100%'}}>
							<div className="card-header py-3">
								<h1 className="h3 mb-2 text-gray-800">Productos</h1>
                        	</div>
							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
										<thead>
											<tr>
												<th>Id</th>
												<th>Nombre</th>
												<th>Descripción</th>
												<th>Precio (S/.)</th>
										
											</tr>
										</thead>
										<tbody>
										{
                    						this.state.products.map((product,index)=>{
                        						return  <tr key={index}>
															<td>{product.id}</td>
															<td>{product.name}</td>
															<td>{product.description}</td>
															<td>{product.price}</td>
														</tr>
                    						})
                						}
										</tbody>
									</table>
								</div>
							</div>
						</div>            
			</React.Fragment>
		)
	}
	
}
export default ProductList;