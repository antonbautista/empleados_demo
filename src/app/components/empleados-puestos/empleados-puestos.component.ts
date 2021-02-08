import { Component, OnInit } from '@angular/core';
//import { FormsModule, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-empleados-puestos',
  templateUrl: './empleados-puestos.component.html',
  styleUrls: ['./empleados-puestos.component.css'],
  providers:[DatePipe]
})
export class EmpleadosPuestosComponent implements OnInit {


  formempleadopuesto: FormGroup;
  persona=[];
  puesto=[];
  listaempleadopuesto=[];

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {

    this.formempleadopuesto = this.formBuilder.group({
      puesto: ['', Validators.required],
      persona: ['', Validators.required]
    });
    
   }

  ngOnInit(){
    
    let getpuestos='';
     getpuestos=localStorage.getItem('puesto');
    this.puesto=JSON.parse(getpuestos); 
    console.log("puestos= ",this.puesto);

    let getempleados='';
    getempleados=localStorage.getItem('persona');
   this.persona=JSON.parse(getempleados); 
   console.log("persona= ",this.persona);

   let getempleadopuesto=localStorage.getItem('empleadopuesto');
    this.listaempleadopuesto=JSON.parse(getempleadopuesto);
    console.log("listaempleadopuesto  = ",this.listaempleadopuesto);

  }

  
  registar(){
    if (this.formempleadopuesto.invalid) {
      alert("favor de completar el formulario");
    } else {


      let datos = this.formempleadopuesto.value;
      console.log("Datos de formulario =",datos.persona);
      let enviar={
        persona:JSON.parse(datos.persona),
        puesto:datos.puesto
      };

      let arreglo = [];
      try {
        let dato = localStorage.getItem('empleadopuesto');
        if (dato != null) {
          let getdato = JSON.parse(dato);
          //arreglo=getdato;
          getdato.push(enviar);
          console.log("datos obtenidos", getdato);
          localStorage.setItem('empleadopuesto', JSON.stringify(getdato));
        } else {

          arreglo.push(enviar);
          localStorage.setItem('empleadopuesto', JSON.stringify(arreglo));
          
        }
        window.location.reload();
        //localStorage.setItem('puesto', JSON.stringify({nombre:"test",apellido:"dasdsa",fechaNacimiento:28}));
        alert("Se guardo correctamente");
      } catch (e) {
        alert('Error al guardar datos');
      }

    }

  }

  eliminar(i){
    let getempleadopuesto=localStorage.getItem('empleadopuesto');
    this.listaempleadopuesto=JSON.parse(getempleadopuesto);
    this.listaempleadopuesto.splice(i, 1);
    localStorage.setItem('empleadopuesto', JSON.stringify(this.listaempleadopuesto));
    //window.location.reload();
  }
}
