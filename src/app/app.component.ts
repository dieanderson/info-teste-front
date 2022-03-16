import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { VeiculoService } from './services/veiculo.service';
import { Veiculo } from './models/veiculo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  veiculo = {} as Veiculo
  veiculos: Veiculo[] = []

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit() {
    this.getVeiculos()  
  }

  saveVeiculo(form: NgForm) {
    if(this.veiculo._id !== undefined) {
      this.veiculoService.putVeiculo(this.veiculo).subscribe(() => {
        this.cleanForm(form)
      })
    } else {
      this.veiculoService.postVeiculo(this.veiculo).subscribe(() => {
        this.cleanForm(form)
      })
    }
  }

  getVeiculos() {
    this.veiculoService.getVeiculos().subscribe((veiculos: Veiculo[]) => {
      this.veiculos = veiculos
    })
  }

  deleteVeiculo(veiculo: Veiculo) {
    this.veiculoService.deleteVeiculo(veiculo).subscribe(() => {
      this.getVeiculos()
    })
  }

  editVeiculo(veiculo: Veiculo) {
    this.veiculo = { ...veiculo }
  }

  cleanForm(form: NgForm) {
    this.getVeiculos()
    form.resetForm()
    this.veiculo = {} as Veiculo
  }


}
