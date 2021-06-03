import React, {Component} from 'react';
let userList = [];
class UserList extends Component{
    
	constructor(props){
        super(props)
        this.state = {
            users:[],
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
		this.apiCall('api/users', this.cargarUsuarios)
	}

	cargarUsuarios = (data) => {

		console.log('data', data)
		userList = data.users;
		this.setState({users:userList , done:true})
	
	}



	render(){
		return(
			<React.Fragment>
						<br></br>
						<div className="card shadow mb-4" style={{width:'100%'}}>  
							<div className="card-header py-3">
								<h1 className="h3 mb-2 text-gray-800">Usuarios</h1>
                        	</div>
							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
										<thead>
											<tr>
												<th>Id</th>
												<th>Nombres</th>
												<th>Email</th>
											</tr>
										</thead>
							
										<tbody>
										{
                    						this.state.users.map((user,index)=>{
                        						return  <tr key={index}>
															<td>{user.id}</td>
															<td>{user.name}</td>
															<td>{user.email}</td>
												</tr>
                    						})
                						}
										</tbody>
									</table>
									{/*this.state.users*/}
								</div>
							</div>
						</div>            
			</React.Fragment>
		)
	}
	
}
export default UserList;