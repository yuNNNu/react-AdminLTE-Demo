import React from 'react'
import {rutaAPI} from '../../../../config/Config';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import EditarBenefitPlan from './EditarBenefitPlan'
export default function BenefitsPlan(){


	const dataBenefits = async() => {
		/*=============================================
		=            CREAMOS EL DATASET               =
		=============================================*/
		
		const getBenefits = await getData();
		const dataSet = [];
		

		getBenefits.data.forEach((benefit, index) => {
			dataSet[index] = [(index+1),
                      
							benefit.titulo, 
                            benefit.descripcion, 
                           
                            [benefit._id + "_",
                      
							benefit.titulo+ "_", 
                            benefit.descripcion, 
                         
                ]];
            
		})

		// =============================================
	// =            EJECUTAMOS DATATABLE          =
	// =============================================
	$(document).ready(function () {
		let tablaBenefits = $('.table').DataTable({
			retrieve: true,
			data: dataSet,
			
				"columnDefs":[{

					"searchable":true,
					"orderable":true,
					"targets":0

				}],

				"order":[[0, "desc"]],
			columns: [
            { title: "#" },
            { title: "Titulo" },
            { title: "Descripción" },
           
			{title: "Acciones",
              render: function(data){

              	return `
					
					<a href="#" class="editarInputs" data-toggle="modal" data-target="#editarBenefitPlan" data="${data}">

						<svg style="color:black; background:orange; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:8px"

						aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>


					</a>`

              }

		    }]
		}); 

		tablaBenefits.on("order.dt search.dt", function(){


				tablaBenefits.column(0, {search:"applied", order:"applied"})
				.nodes()
				.each(function(cell, i){

					cell.innerHTML = i+1

				})
			
			}).draw();

	 })

	}

	dataBenefits();

	return(

		<div className="content-wrapper" style={{minHeight: "494px"}}>
			<div className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1 className="m-0 text-dark">Beneficios Planes</h1>
						</div>
					</div>	
				</div>
			</div>

			<div className="content">

				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12">
							<div className="card card-primary card-outline">
								<div className="card-header">
									<h5 className="m-0">
										<button className="btn btn-primary limpiarForm" data-toggle="modal" data-target="">Nuevo Beneficio</button>
									</h5>
								</div>

								<div className="card-body">
				   					
				   					<table className="table table-striped dt-responsive" style={{"width": "100%"}}>
				   						
				   					</table>
				  			    </div>		   
							</div>
						</div>
					</div>	
				</div>
			</div>

			{/* <CrearImgPrincipal/> */}

			<EditarBenefitPlan/>

		</div>

	);



}

/*=============================================
=                     GET                     =
=============================================*/
	
const getData = () => {
	const url = `${rutaAPI}/show-planbenefits`;
	const params = {
		method: "GET",
		headers: {
			"Content-type": "application/json"
		}
	}

	return fetch(url, params).then(response => {
		return response.json();
	}).then(result => {
		return  result;
	}).then(err => {
		return err;
	})
}