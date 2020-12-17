import React, {useState} from 'react'
import $ from 'jquery';
import {rutaAPI} from '../../../../config/Config';
import notie from 'notie';
import Swal from 'sweetalert2'

export default function EditarImgInicio(){

	// HOOK

	const [imgP, editarImg] = useState({

		
        id: "",
        titulo: "",
        descripcion: "",
        archivo: null,

	})

	// ONCHANGE

	const cambiarFormPut = e => {
		if($("#editarImagen").val()){


			let imagen = $("#editarImagen").get(0).files[0];
			
			if(imagen["type"] !== "image/jpeg" && imagen["type"] !== "image/png"){
				$("#imagen").val("");

				notie.alert({
					type: 3,
					text: 'ERROR: La imagen debe estar en formato JPG o PNG!',
					time: 7
				})

				$(".previsualizarImg").attr("src", "");
				return;
			}else if(imagen["size"] > 2000000){
				$("#imagen").val("");
				notie.alert({
					type: 3,
					text: 'ERROR: La imagen debe pesar como maximo 2mb',
					time: 7
				})
				$(".previsualizarImg").attr("src", "");
				return;
			}else{
				let datosArchivo = new FileReader;
				datosArchivo.readAsDataURL(imagen);

				$(datosArchivo).on("load", function(event){
					let rutaArchivo = event.target.result;
					
					$(".previsualizarImg").attr("src", rutaArchivo);

					editarImg({

                        'imagen': imagen,
                        'titulo': $("#editarTitulo").val(),
                        'descripcion': $("#editarDescripcion").val(),
						'id' : $("#editarID").val()

					})
				})
			}
		}else{

			editarImg({

                'imagen': null,
                'titulo': $("#editarTitulo").val(),
                'descripcion': $("#editarDescripcion").val(),
                'id' : $("#editarID").val()

					})

		}	
	}

	// ONSUBMIT

	const submitPut = async e => {

		$('.alert').remove();
		e.preventDefault();
		const {imagen, titulo, descripcion, id} = imgP;

			if(titulo !== ""){
			const expTitulo = /^([0-9a-zA-Z]).{1,30}$/;

			if(!expTitulo.test(titulo)){
				$(".invalid-titulo").show();
				$(".invalid-titulo").html("Utiliza un formato que coincida con el solicitado");

				return;
			}
            }
            if(descripcion !== ""){
			const expDescripcion = /^([0-9a-zA-Z]).{1,100}$/;

                if(!expDescripcion.test(descripcion)){
                    $(".invalid-titulo").show();
                    $(".invalid-titulo").html("Utiliza un formato que coincida con el solicitado");

                    return;
                }
		    }

		// SE EJECUTA SERVICIO PUT

		const result = await putData(imgP); 
		console.log("result", result.status);


		if(result.status === 400){

			Swal.fire({

		      type: "error",
		      title: result.mensaje,
		      showConfirmButton: true,
		      confirmButtonText: "Cerrar"
            
			}).then(function(result){
				if(result.value){
					window.location.href = "/inicio_slide";
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
					window.location.href = "/inicio_slide";
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
        $(".previsualizarImg").attr("src", `${rutaAPI}/mostrar-principal-img-inicio/${ data[1] }`);
        $("#editarTitulo").val(data[2]);
		$("#editarDescripcion").val(data[3]);

		editarImg({

			'imagen': null,
			'titulo': data[2],
			'descripcion': data[3],
			'id' : data[0]

		})
	})

	

	// RETORNO DE LA VISTA

		return(
		<div className="modal fade" id="editarImgInicio">

			<div className="modal-dialog">

				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Editar Imagen Principal Inicio</h4>
						<button type="button" className="close" data-dismiss="modal">x</button>
					</div>

					<form onChange={cambiarFormPut} onSubmit={submitPut} encType="multipart/form-data">

						<div className="modal-body">

							<input type="hidden" id="editarID"/>

							{/* ENTRADA IMAGEN*/}

							<label className="small text-secondary" htmlFor="editarImagen">*Peso Max. 2MB | Formato: JPG o PNG</label>
							<input id="editarImagen" type="file" className="form-control-file border" name="imagen" />
							<div className="invalidad-feedback invalid-imagen"></div>
							<img className="previsualizarImg img-fluid"/>

							{/* ENTRADA TITULO*/}

							<div className="form-group">
								<label className="small text-secondary" htmlFor="editarTitulo">* No ingresar caracteres especiales, solo letras y números</label>

								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i className="fas fa-heading"></i>
									</div>

									<input id="editarTitulo" type="text" className="form-control" name="titulo" placeholder="Ingrese el titulo" pattern="([0-9a-zA-Z]){1,30}"/>

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

									<textarea id="editarDescripcion" type="text" className="form-control" name="descripcion" placeholder="Ingrese la descripcion" pattern="([0-9a-zA-Z]).{1,30}"/>

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
=       Peticion PUT para logo    =
=============================================*/

const putData = data => {

	const url = `${rutaAPI}/editar-principal-img-inicio-data/${data.id}`;
	const token = localStorage.getItem("ACCESS_TOKEN");

	let formData = new FormData();
	formData.append("imagen", data.imagen);
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



