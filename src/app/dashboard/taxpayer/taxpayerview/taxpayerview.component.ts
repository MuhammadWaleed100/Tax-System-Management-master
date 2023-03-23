import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { OnFailService } from "../../../services/on-fail.service";
import { TaxpayerService } from "../taxpayer.service";
declare var $: any;
@Component({
  selector: 'app-taxpayerview',
  templateUrl: './taxpayerview.component.html',
  styleUrls: ['./taxpayerview.component.css']
})

export class TaxpayerviewComponent implements OnInit {
  // All Component Level Variables Declaration
  taxpayerview={
    taxpayer_ID: 0,
    person_ID:{},
    company_ID:{},
    isactive:'Y',
   active:true
  };

  constructor(
    private taxpayerservice: TaxpayerService,
    private activeroute: ActivatedRoute,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit() {
    const routeParams = this.activeroute.snapshot.params;
    this.getOne(routeParams.id);
  }

  Edit() {
    $("#editModal").modal("show");
  }

  // APIs Call Functions
  getOne(id) {
    this.taxpayerservice.getOne(id).subscribe(response => {
      if(response) {
       this.taxpayerview= response;
     }
        if(this.taxpayerview.isactive=='Y'){
          this.taxpayerview.active=true;
        }
          else{
          this.taxpayerview.active=false;
      }
    }, error => { 
      this.onfailservice.onFail(error);
    })
  }

 update(taxpayer) {
    this.taxpayerservice.update(taxpayer, taxpayer.taxpayer_ID).subscribe(response => {
      if(response) {
        this.taxpayerview = response;
        $("#editModal").modal("hide");
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  } 
 
 

 
}
