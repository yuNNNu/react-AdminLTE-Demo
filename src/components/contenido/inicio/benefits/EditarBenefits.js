import React, {useState} from 'react'
import $ from 'jquery';
import {rutaAPI} from '../../../../config/Config';
import Swal from 'sweetalert2'

export default function EditarBenefitInicio(){

	// HOOK

	const [imgP, editarImg] = useState({

		
        id: "",
        titulo: "",
        descripcion: "",
     

	})

	// ONCHANGE

	const cambiarFormPut = e => {
	
        editarImg({
     
        'titulo': $("#editarTitulo").val(),
        'descripcion': $("#editarDescripcion").val(),
        'id' : $("#editarID").val()

        })
	}

	// ONSUBMIT

	const submitPut = async e => {

		$('.alert').remove();
		e.preventDefault();
		

			
		// SE EJECUTA SERVICIO PUT

		const result = await putData(imgP); 


		if(result.status === 400){

			Swal.fire({

		      type: "error",
		      title: result.mensaje,
		      showConfirmButton: true,
		      confirmButtonText: "Cerrar"
            
			}).then(function(result){
				if(result.value){
					window.location.href = `${process.env.PUBLIC_URL}/inicio_benefits`;
				}
			})

		}

		if(result.status === 200){

			Swal.fire({

		      type: "success",
		      title: result.mensaje,
		      showConfirmButton: true,
		      confirmButtonText: "Cerrar"
            
			}).then(function(result){
				if(result.value){
					window.location.href = `${process.env.PUBLIC_URL}/inicio_benefits`;
				}
			})
		}

	}

	//CAPTURAR DATOS PARA EDITAR

	$(document).on("click", ".editarInputs", function(e){
		e.preventDefault();

        let data = $(this).attr("data").split('_,');

 
      

        // recuperamos os datos

		$("#editarID").val(data[0]);
        $("#editarTitulo").val(data[1]);
		$("#editarDescripcion").val(data[2]);

		editarImg({

			
			'id' : data[0],
			'titulo': data[1],
			'descripcion': data[2]

		})
	})

	

	// RETORNO DE LA VISTA

		return(
		<div className="modal fade" id="editarBenefitInicio">

			<div className="modal-dialog">

				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Editar Beneficio</h4>
						<button type="button" className="close" data-dismiss="modal">x</button>
					</div>

					<form onChange={cambiarFormPut} onSubmit={submitPut} encType="multipart/form-data">

						<div className="modal-body">

							<input type="hidden" id="editarID"/>

					
							{/* ENTRADA TITULO*/}

							<div className="form-group">

								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i className="fas fa-heading"></i>
									</div>

									<input id="editarTitulo" type="text" className="form-control" name="titulo" placeholder="Ingrese el titulo" required/>

									<div className="invalid-feedback invalid-titulo"></div>
								</div>
							</div>

							{/* ENTRADA DESCRIPCION*/}

							<div className="form-group">

								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i className="fas fa-file-alt"></i>
									</div>

									<textarea id="editarDescripcion" type="text" className="form-control" name="descripcion" placeholder="Ingrese la descripcion" required/>

									<div className="invalid-feedback invalid-titulo"></div>
								</div>
							</div>
						</div>

						<div className="modal-footer d-flex justify-content-between">

							<div>
								<button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
							</div>

							<div>
								<button type="submit" className="btn btn-primary">Guardar</button>
							</div>

						</div>

					</form>
				</div>

			</div>

		</div>

	)

}

/*=============================================
=       Peticion PUT para benefit de inicio    =
=============================================*/

const putData = data => {

	const url = `${rutaAPI}/edit-benefit/${data.id}`;
	const token = localStorage.getItem("ACCESS_TOKEN");

	let formData = new FormData();
	formData.append("titulo", data.titulo);
	formData.append("descripcion", data.descripcion);

	const params = {
		method: "PUT",
		body: formData,
		headers: {
			"Authorization": token
		}
	}

	return fetch(url, params).then(response => {
		return response.json();
	}).then(result => {
		return result;
	}).catch(err => {
		return err;
	})

}



