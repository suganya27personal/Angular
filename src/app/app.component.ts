import { Component, Input, ViewChild } from '@angular/core';

import { TableComponent } from './table/table.component';
import { CreditCard } from './creditcard.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  card: CreditCard;

  constructor() {
    this.card = new CreditCard();
  }
  title = 'Credit Card System';
  titleAdd = 'Add';
  tableComp: TableComponent;
  //Sets error msg if name is empty
  public setNameError() {
    (document.querySelector('.errName') as HTMLElement).style.display = "none";
  }
  //Sets error msg if card is invalid
  public setCardError() {
    (document.querySelector('.errCard') as HTMLElement).style.display = "none";
    (document.querySelector('.errCardLength') as HTMLElement).style.display = "none";
  }
 //onClick for add
  public add() {
    this.card.name = (document.getElementById("name") as HTMLInputElement).value;
    this.card.limit = parseInt((document.getElementById("limit") as HTMLInputElement).value);
    //sets default values
    this.card.balance = 0;
    var noError = true;
    if (isNaN(this.card.limit)) {
      this.card.limit = 0;
    }

    var cardNum = (document.getElementById("cardNum") as HTMLInputElement).value;
   
    //if name is empty shows error
    if (this.card.name.trim().length == 0) {
      (document.querySelector('.errName') as HTMLElement).style.display = "block";
      noError = false;
    }

    var length = cardNum.toString().trim().length;
    //if card length is not valid shows error
    var errCardElement = (document.querySelector('.errCardLength') as HTMLElement);
    if (length > 19 || length < 13) {
      errCardElement.style.display = "block";
      noError = false;
    } else {
      errCardElement.style.display = "none";
      this.card.creditCardNumber = parseInt(cardNum);
    }

  //sends the request to service
  if(noError) {
    var xmlhttp = new XMLHttpRequest();
    //in the real time, url will be configurable
    xmlhttp.open("POST", "http://localhost:8080/v1/creditcard", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(this.card));
    this.tableComp = new TableComponent();
    this.tableComp.records = this.tableComp.getRecords(this.card.creditCardNumber);
    window.location.reload(false);
  }
}


}