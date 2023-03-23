import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../../services/on-fail.service";
import { TaxpayerassetsService } from "./taxpayerassets.service";
import { ToastrService } from 'ngx-toastr';
import { TaxpayerService } from '../../taxpayer/taxpayer.service';

declare var $: any;

@Component({
  selector: 'app-taxpayerassets',
  templateUrl: './taxpayerassets.component.html',
  styleUrls: ['./taxpayerassets.component.css']
})
export class TaxpayerassetsComponent implements OnInit {

  // All Component Level Variables Declaration
  taxpayerassetsAll=[];
  taxpayerassets={
      taxpayerassets_ID: 0,
      taxpayer_ID: {},
      assetstype_ID: {},
      financialtaxyear_ID:{},
      isactive: true,
  };
  orderno=[];

  constructor(
    private taxpayerassetsservice: TaxpayerassetsService,
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
    this.taxpayerassets = {
      taxpayerassets_ID: 0,
      taxpayer_ID: {},
      assetstype_ID: {},
      financialtaxyear_ID:{},
      isactive: true
    };
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.taxpayerassets = {
      taxpayerassets_ID: row.data.taxpayerassets_ID,
      taxpayer_ID: row.data.taxpayer_ID,
      assetstype_ID:row.data.assetstype_ID,
      financialtaxyear_ID:row.data.financialtaxyear_ID,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.taxpayerassets.isactive = true;
    } else {
      this.taxpayerassets.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.taxpayerassetsservice.getAll().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.taxpayerassetsAll= response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  add(taxpayerassets) {
    this.taxpayerassetsservice.add(taxpayerassets).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.taxpayerassets_ID) {
          this.toastrservice.success("Success", "New Taxpayerasset Added");
          this.taxpayerassets = response;
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

  update(taxpayerassets) {
    if (taxpayerassets.isactive == true) {
      taxpayerassets.isactive = 'Y';
    } else {
      taxpayerassets.isactive = 'N';
    }

    this.taxpayerassetsservice.update(taxpayerassets, taxpayerassets.taxpayerassets_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.taxpayerassets_ID) {
          this.toastrservice.success("Success", "Taxpayer Asset Updated");
          this.taxpayerassets = response;
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
