import React, {useState} from 'react'
import $ from 'jquery';
import {rutaAPI} from '../../../../config/Config';
import notie from 'notie';
import Swal from 'sweetalert2'

export default function EditarFooter(){

	// HOOK

	const [footer, editarFooter] = useState({

		id: "",
		titulo: "",
		descripcion: []

	})

	// ONCHANGE

	const cambiarFormPut = e => {
		
		editarFooter({
			'id' : $("#editarID").val(),
			'titulo': $("#editarTitulo").val(),
			'descripcion': $("#editarDescripcion").val()
		})
	}

	// ONSUBMIT

	const submitPut = async e => {

		$('.alert').remove();
		e.preventDefault();
		const {id, titulo, descripcion} = footer;

	
		// SE EJECUTA SERVICIO PUT

		const result = await putData(footer); 

		if(titulo === ""){
			$(".invalid-titulo").show();
			$(".invalid-titulo").html("Completa este campo");
		}

		if(descripcion === ""){
			$(".invalid-descripcion").show();
			$(".invalid-descripcion").html("Completa este campo");
		}

		if(result.status === 400){

			Swal.fire({

		      type: "error",
		      title: result.mensaje,
		      showConfirmButton: true,
		      confirmButtonText: "Cerrar"
            
			}).then(function(result){
				if(result.value){
					window.location.href = "/footer";
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
					window.location.href = "/footer";
				}
			})
		}

	}

	//CAPTURAR DATOS PARA EDITAR

	$(document).on("click", ".editarInputs", function(e){
		e.preventDefault();

		let data = $(this).attr("data").split('_,');
		$("#editarID").val(data[0]);
		
		$("#editarTitulo").val(data[1]);
		$("#editarDescripcion").val(data[2]);
		console.log("data[0]", data[0]);
		editarFooter({

			'titulo' : $('#editarTitulo').val(),
			'descripcion': $('#editarDescripcion').val(),
			'id' : data[0]

		})
	})

	

	// RETORNO DE LA VISTA

	return(
		<div className="modal fade" id="editarFooter">

			<div className="modal-dialog">

				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Editar footer</h4>
						<button type="button" className="close" data-dismiss="modal">x</button>
					</div>

					<form onChange={cambiarFormPut} onSubmit={submitPut} encType="multipart/form-data">

						<div className="modal-body">
							<input type="hidden" id="editarID"/>
							{/* ENTRADA TITULO */}

							<div className="form-group">
								<label className="small text-secondary" htmlFor="editarTitulo">* No ingresar caracteres especiales, solo letras y números</label>

								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i className="fas fa-file-alt"></i>
									</div>

									<input id="editarTitulo" type="text" className="form-control" name="titulo" placeholder="Ingrese el titulo" pattern="([0-9a-zA-Z]).{1,30}"/>

									<div className="invalid-feedback invalid-titulo"></div>
								</div>
							</div>

							{/* ENTRADA DESCRIPCION*/}

							<div className="form-group">
								<label className="small text-secondary" htmlFor="editarDescripcion">* No ingresar caracteres especiales, solo letras y números</label>

								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i className="fas fa-file-alt"></i>
									</div>

									<textarea className="form-control" rows="5" id="editarDescripcion" name="descripcion" placeholder="Ingrese la descripcion" pattern="([0-9a-zA-Z]).{1,30}"></textarea>

									<div className="invalid-feedback invalid-descripcion"></div>
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
=       Peticion PUT para footer    =
=============================================*/

const putData = data => {

	const url = `${rutaAPI}/edit-footer/${data.id}`;
	const token = localStorage.getItem("ACCESS_TOKEN");

	const params = {
		method: "PUT",
		body: JSON.stringify(data),
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
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
