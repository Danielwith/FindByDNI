import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { DniServicio } from './services/dni.service';
import { Data } from './models/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  title = 'FindByDNI';
  nombre: String = '';
  dni: Number;
  fec_nac: String = '';
  telef: Number;
  matricula: boolean;
  anim_init: boolean = false;

  constructor(
    private flashMessages: ToastrService,
    private dniData: DniServicio
  ) {}

  ngOnInit(): void {
    this.flashMessages.overlayContainer = this.toastContainer;
  }

  consultar({ value, valid }: { value: Number; valid: boolean }) {
    console.log(value);
    if (!valid) {
      this.flashMessages.error('Por favor, inserte un DNI', 'Error');
    } else {
      // Busca en el API segun el DNI
      this.dniData.getData(value).subscribe((dni: Data) => {
        try {
          this.nombre = dni.data.nombre_completo;
        } catch (error) {
          this.flashMessages.error('DNI Invalido!', 'Error');
          return;
        }
        if (dni.success == true) {
          this.flashMessages.success('Encontrado!', 'Success');

          // Generador de datos aleatorios
          this.fec_nac = this.generateRandomDateOfBirth();
          this.telef = this.generateRandomPhoneNumber();

          // Determina si es mayor de edad
          this.matriculaPermitida();

          // Se ejecuta la animacion de la carta
          const animation = document.querySelector('.card');
          animation.classList.add('animate');
        } else {
          this.flashMessages.error('No se encontro dicha persona.', 'Error');
          return;
        }
      });
    }
  }

  generateRandomDateOfBirth() {
    const currentDate = new Date();
    const minYear = 1990;
    const maxYear = currentDate.getFullYear();
    const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 31) + 1;

    // Comprobamos que la fecha generada sea válida
    const dateOfBirth = new Date(year, month - 1, day);
    if (dateOfBirth > currentDate) {
      return this.generateRandomDateOfBirth();
    }

    // Convertimos la fecha a un string en formato "YYYY-MM-DD"
    const dateString = dateOfBirth.toISOString().slice(0, 10);
    return dateString;
  }

  generateRandomPhoneNumber(): number {
    const prefixes = [9, 5, 0];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNumber = Math.floor(Math.random() * 10000000);
    const phoneNumber = +`${prefix}${randomNumber.toString().padStart(7, '0')}`;
    return phoneNumber;
  }

  matriculaPermitida(): void {
    let fechaActual = new Date();
    let years =
      fechaActual.getFullYear() - Number(this.fec_nac.substring(0, 4));
    if (years < 18) {
      this.matricula = false;
    } else {
      this.matricula = true;
    }
  }

  onlyNumbers(event: any): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }
}
