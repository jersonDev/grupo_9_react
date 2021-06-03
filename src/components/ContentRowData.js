import React, {Component} from 'react';
import SmallCard from './SmallCard';
var cards = [];
class ContentRowData extends Component{

    constructor(props){
        super(props)
        this.state = {
            cardProps:[]
        }
    }

    apiCall(url, consecuencia){
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(e => console.log(e))
    }

    componentDidMount() {
        this.apiCall('/api/users', this.cargarNumUsers);
        this.apiCall('api/products', this.cargarNumProducts);
    }

    cargarNumUsers = (data) => {
        let usersInDataBase = {
                color: "primary",
                titulo: "Cantidad de Usuarios",
                valor: data.count,
              
        }
        cards.push(usersInDataBase);
        this.setState({
            cardProps: cards
        });
    }

    cargarNumProducts = (data) => {
        let productsInDataBase = {
            color:   "primary",
            titulo: "Cantidad de Productos",
            valor: data.count,
           
        };
        let categoriesInDataBase = {
            color:   "primary",
            titulo: "Cantidad en Categorias",
            valor: Object.keys(data.countByCategory).length,
           
        };
        cards.push(productsInDataBase, categoriesInDataBase);
        this.setState({
            cardProps: cards
        });
        cards = [];
    }

    render(){
        let contenido;
        if(this.state.cardProps.length===0){
            contenido = <div className="row">Cargando...</div>
        } else {
            contenido = <div className="row">
                {
                    this.state.cardProps.map((producto,index)=>{
                        return <SmallCard  {...producto}  key= {index}/>
                    })
                }      
            </div>
        }

        return (
            <React.Fragment>
                {contenido}
            </React.Fragment>
        )
    }
}
export default ContentRowData;