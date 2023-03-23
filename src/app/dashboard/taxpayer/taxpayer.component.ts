import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../services/on-fail.service";
import { ToastrService } from 'ngx-toastr';
import { TaxpayerService } from './taxpayer.service';

declare var $: any;

@Component({
  selector: 'app-taxpayer',
  templateUrl: './taxpayer.component.html',
  styleUrls: ['./taxpayer.component.css']
})
export class TaxpayerComponent implements OnInit {

  // All Component Level Variables Declaration
  entitylist=[];
  taxpayerAll=[];
  taxpayer={
    taxpayer_ID: 0,
    person_ID:{},
    company_ID:{},
      isactive: true
  };
  orderno=[];

  constructor(
    private taxpayerservice: TaxpayerService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService
  ) { }

  ngOnInit() {
    this.getAll();

    for (var i = 0; i <= 50; i++) {
      this.orderno.push({ value: i });
    }
  }


  // Frontend Actions 

  View(taxpayer) {
    const url = "view/taxpayer/" + taxpayer.data.taxpayer_ID + "/taxpayerassets";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.taxpayer = {
      taxpayer_ID: 0,
      person_ID:{},
      company_ID:{},
      isactive: true
    };
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.taxpayer = {
      taxpayer_ID: row.data.taxpayer_ID,
      person_ID:row.data.person_ID,
      company_ID:row.data.company_ID,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.taxpayer.isactive = true;
    } else {
      this.taxpayer.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.taxpayerservice.getAll().subscribe(response => {
      if(response) {
        this.taxpayerAll=response;
        var i;
        for(i=0;i<this.taxpayerAll.length;i++)
          {
            this.taxpayerAll[i].person_ID= JSON.parse(this.taxpayerAll[i].person_DETAIL).person_ID.person_NAME;
            }
        for(i=0;i<this.taxpayerAll.length;i++)
          {
            this.taxpayerAll[i].company_ID= JSON.parse(this.taxpayerAll[i].company_DETAIL).company_ID.company_NAME;
            }
          }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  add(taxpayer) {
    this.taxpayerservice.add(taxpayer).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.taxpayer_ID) {
          this.toastrservice.success("Success", "New  taxpayer Added");
          this.taxpayer = response;
          this.getAll();
          $("#addModal").modal("hide");
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  update(taxpayer) {
    if (taxpayer.isactive == true) {
      taxpayer.isactive = 'Y';
    } else {
      taxpayer.isactive = 'N';
    }

    this.taxpayerservice.update(taxpayer, taxpayer.taxpayer_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.taxpayer_ID) {
          this.toastrservice.success("Success", "Taxpayer Updated");
          this.taxpayer = response;
          this.getAll();
          $("#editModal").modal("hide");
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

   
}
