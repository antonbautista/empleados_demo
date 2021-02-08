import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css'],
  providers:[DatePipe]
})
export class PuestosComponent implements OnInit {
  formPuesto:FormGroup;
  submitted = false;

  listapuesto=[];

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { 
    this.formPuesto= this.formBuilder.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let getpuestos=localStorage.getItem('puesto');
    this.listapuesto=JSON.parse(getpuestos);
    console.log("lista de puesto  = ",this.listapuesto);
  }
  registro(){
      if (this.formPuesto.invalid) {
        this.submitted = false;
        alert("favor de completar el formulario");
      } else {
  
        this.submitted = true;
  
        let datos = this.formPuesto.value;
        let arreglo = [];
        try {
          let dato = localStorage.getItem('puesto');
          if (dato != null) {
            let getdato = JSON.parse(dato);
            //arreglo=getdato;
            getdato.push(datos);
            console.log("datos obtenidos", getdato);
            localStorage.setItem('puesto', JSON.stringify(getdato));
          } else {
  
            arreglo.push(datos);
            localStorage.setItem('puesto', JSON.stringify(arreglo));
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
    let getpuesto=localStorage.getItem('puesto');
    this.listapuesto=JSON.parse(getpuesto);
    this.listapuesto.splice(i, 1);
    localStorage.setItem('puesto', JSON.stringify(this.listapuesto));
    //window.location.reload();
  }
}
