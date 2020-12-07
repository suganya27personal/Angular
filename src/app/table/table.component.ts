import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  records :any;
  message:string;
  constructor() {}
  ngOnInit(){
    //on init fetches the records from service
     this.getRecords("isNotValid");
    }
    /**
     * 
     * @param records 
     * parse the response
     */
    public parseResponse(records,cardNum){
      this.records = JSON.parse(records);   
    }

    
    /**
     * gets the record 
     * from webservice
     */
    public getRecords(cardNum){
      var xhttp = new XMLHttpRequest();
      var data;
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {      
        data = this.responseText;
        }
      };
      xhttp.open("GET", "http://localhost:8080/v1/creditcard", true);
      xhttp.send();

     
      setTimeout(() =>  this.records=data ,1000);
      setTimeout(() =>  this.parseResponse(this.records,cardNum) ,1000);
     
      
    }

    
   
  }
  


