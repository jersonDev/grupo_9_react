import React from 'react';

function Category(props){
    return(
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                
                    <div className="card-body">
                        {props.nombre  + ": " + props.cantidad + ' productos'}
                    </div>
                
            </div>
        </React.Fragment>
    )
}
export default Category;