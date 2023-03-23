import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../services/on-fail.service";
import { ToastrService } from 'ngx-toastr';
import { TaxcalculationService } from './taxcalculation.service';
declare var $: any;

@Component({
  selector: 'app-taxcalculation',
  templateUrl: './taxcalculation.component.html',
  styleUrls: ['./taxcalculation.component.css']
})
export class TaxcalculationComponent implements OnInit {

  // All Component Level Variables Declaration
  taxcalculationAll=[];
  taxcalculation={
    taxcalculation_ID: 0,
    taxpayer_ID:{},
    taxcalculation_AMOUNT:'',
    taxcalculation_TOTALTAX:'',
      isactive: true
  };
  orderno=[];

  constructor(
    private taxcalculationservice: TaxcalculationService,
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
    this.taxcalculation = {
      taxcalculation_ID: 0,
      taxpayer_ID:{},
      taxcalculation_AMOUNT:'',
      taxcalculation_TOTALTAX:'',
      isactive: true
    };
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.taxcalculation = {
      taxcalculation_ID: row.data.taxcalculation_ID,
    taxpayer_ID:row.data.taxpayer_ID,
     taxcalculation_AMOUNT:row.data.taxcalculation_AMOUNT,
     taxcalculation_TOTALTAX:row.data.taxcalculation_TOTALTAX,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.taxcalculation.isactive = true;
    } else {
      this.taxcalculation.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.taxcalculationservice.getAll().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.taxcalculationAll= response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }


  add(taxcalculation) {
    this.taxcalculationservice.add(taxcalculation).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.taxcalculation_ID) {
          this.toastrservice.success("Success", "New  taxcalculation Added");
          this.taxcalculation = response;
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

  update(taxcalculation) {
    if (taxcalculation.isactive == true) {
      taxcalculation.isactive = 'Y';
    } else {
      taxcalculation.isactive = 'N';
    }

    this.taxcalculationservice.update(taxcalculation, taxcalculation.taxcalculation_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.taxcalculation_ID) {
          this.toastrservice.success("Success", "Taxcalculation Updated");
          this.taxcalculation = response;
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
