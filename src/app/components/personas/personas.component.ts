import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
  providers: [DatePipe]
})
export class PersonasComponent implements OnInit {
  formPersona: FormGroup;
  submitted = false;
  listapersonas=[];

  constructor(
    private dtservice: DatosService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.formPersona = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
  }


  clickprueba() {
    try {
      localStorage.setItem('persona', JSON.stringify({ nombre: "test", apellido: "dasdsa", fechaNacimiento: 28 }));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
    //---------------
  }
  ngOnInit(){
    let getpersonas=localStorage.getItem('persona');
    this.listapersonas=JSON.parse(getpersonas);
    console.log("lista de personas  = ",this.listapersonas);
  }

  registar() {
    if (this.formPersona.invalid) {
      this.submitted = false;
      alert("favor de completar el formulario");
    } else {

      this.submitted = true;

      let datos = this.formPersona.value;
      let arreglo = [];
      try {
        let dato = localStorage.getItem('persona');
        if (dato != null) {
          let getdato = JSON.parse(dato);
          //arreglo=getdato;
          getdato.push(datos);
          console.log("datos obtenidos", getdato);
          localStorage.setItem('persona', JSON.stringify(getdato));
        } else {

          arreglo.push(datos);
          localStorage.setItem('persona', JSON.stringify(arreglo));
        }
        window.location.reload();
        alert("Se guardo correctamente");
        

      } catch (e) {
        alert('Error al guardar datos');
      }

    }


  }

  eliminar(i,p){
    //console.log("datos = "+i,p);
    let getpersonas=localStorage.getItem('persona');
    this.listapersonas=JSON.parse(getpersonas);
    this.listapersonas.splice(i, 1);
    localStorage.setItem('persona', JSON.stringify(this.listapersonas));
    //window.location.reload();

  }


  getAll(){
    let getpersonas=localStorage.getItem('persona');
    this.listapersonas=JSON.parse(getpersonas);
    console.log("lista de personas  = ",this.listapersonas);
  }
}
