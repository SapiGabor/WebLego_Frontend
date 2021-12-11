import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LegoService } from './lego.service';
import { Lego } from './lego';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public legos: Lego[] = [];
  public editLego: Lego;
  public deleteLego: Lego;

  constructor(private legoService: LegoService){ }

  ngOnInit(){
    this.getLegos();
  }

  public getLegos(): void{
    this.legoService.getLegos().subscribe(
      (response: Lego[]) => {
        this.legos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddLego(addForm: NgForm): void{
    document.getElementById('add-lego-form')?.click();
    this.legoService.addLego(addForm.value).subscribe(
      (response: Lego) => {
        console.log(response);
        this.getLegos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateLego(lego: Lego): void{
    this.legoService.updateLego(lego).subscribe(
      (response: Lego) => {
        console.log(response);
        this.getLegos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteLego(legoId: number): void {
    this.legoService.deleteLego(legoId).subscribe(
      (response: void) => {
        console.log(response);
        this.getLegos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

public searchLegos(key: string): void {
  console.log(key);
  if(!key){
    this.getLegos();
  }
  else{
    const results: Lego[] = [];
    for (const lego of this.legos) {
      if(lego.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        lego.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        lego.pieces.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        lego.setNumber.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        lego.type.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        lego.recommendedAge.toLowerCase().indexOf(key.toLowerCase()) !== -1 ){
        results.push(lego);
      }  
    }
    this.legos = results;
  }
}

  public onOpenModalAdd(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addLegoModal');
    container?.appendChild(button);
    button.click();
  }

  public onOpenModal(lego: Lego , mode: string) : void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit'){
      this.editLego = lego;
      button.setAttribute('data-target', '#updateLegoModal');
    }
    else if (mode === 'delete'){
      this.deleteLego = lego;
      button.setAttribute('data-target', '#deleteLegoModal');
    }
    container?.appendChild(button);
    button.click();
  }
}