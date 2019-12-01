import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from 'src/app/services/modal-upload/modal-upload.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  usuario:any;
  imagenSubir:File;
  imagenTemp:string;


  constructor(public _sa:SubirArchivoService,
              public _mu:ModalUploadService) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._mu.ocultarModal();
  }
  subirImagen(){

    this._sa.subirArchivo(this.imagenSubir,this._mu.tipo,this._mu.id)
      .then( res =>{
        this._mu.notificacion.emit(res);
        this.cerrarModal();
      })
      .catch(err=>{
        console.error(err);
      })
  }
  seleccionImagen(archivo:File){
    if(!archivo){
      this.imagenSubir =  null;
      return;
    }
    if(archivo.type.indexOf('image')<0){
      // swal('Solo Imagenes','El archivo seleccionado debe ser una imagen','error');
      this.imagenSubir =  null;
      return;
    }
    this.imagenSubir =  archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }

}
