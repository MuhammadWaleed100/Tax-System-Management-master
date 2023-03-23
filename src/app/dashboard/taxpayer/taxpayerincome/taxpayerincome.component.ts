import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../../services/on-fail.service";
import { ToastrService } from 'ngx-toastr';
import { TaxpayerincomeService } from './taxpayerincome.service';
declare var $: any;

@Component({
  selector: 'app-taxpayerincome',
  templateUrl: './taxpayerincome.component.html',
  styleUrls: ['./taxpayerincome.component.css']
})
export class TaxpayerincomeComponent implements OnInit {

  // All Component Level Variables Declaration
  taxpayerincomeAll=[];
  taxpayerincome={
    taxpayerincome_ID: 0,
    taxpayer_ID:{},
    incomeheadtype_ID:{},
    taxpayerincome_AMOUNT:'',
      isactive: true
  };
  orderno=[];

  constructor(
    private taxpayerincomeservice: TaxpayerincomeService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService
  ) { }

  ngOnInit() {
    this.getAll();

    for (var i = 0; i <= 50; i++) {
      this.orderno.push({ value: i });
    }
  }

  AddNew() {
    this.taxpayerincome = {
      taxpayerincome_ID: 0,
    taxpayer_ID:{},
    incomeheadtype_ID:{},
    taxpayerincome_AMOUNT:'',
      isactive: true
    };
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.taxpayerincome = {
      taxpayerincome_ID: row.data.taxpayerincome_ID,
    taxpayer_ID:row.data.taxpayer_ID,
    incomeheadtype_ID:row.data.incomeheadtype_ID,
    taxpayerincome_AMOUNT:row.data.taxpayerincome_AMOUNT,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.taxpayerincome.isactive = true;
    } else {
      this.taxpayerincome.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.taxpayerincomeservice.getAll().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.taxpayerincomeAll= response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }


  add(taxpayerincome) {
    this.taxpayerincomeservice.add(taxpayerincome).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.taxpayerincome_ID) {
          this.toastrservice.success("Success", "New  taxpayerincome Added");
          this.taxpayerincome = response;
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

  update(taxpayerincome) {
    if (taxpayerincome.isactive == true) {
      taxpayerincome.isactive = 'Y';
    } else {
      taxpayerincome.isactive = 'N';
    }

    this.taxpayerincomeservice.update(taxpayerincome, taxpayerincome.taxpayerincome_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.taxpayerincome_ID) {
          this.toastrservice.success("Success", "Taxpayerincome Updated");
          this.taxpayerincome = response;
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
