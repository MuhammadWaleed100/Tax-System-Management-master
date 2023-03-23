import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../services/on-fail.service";
import { AssetsdocumentService } from "./assetsdocument.service";
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-assetsdocument',
  templateUrl: './assetsdocument.component.html',
  styleUrls: ['./assetsdocument.component.css']
})
export class AssetsdocumentComponent implements OnInit {

  // All Component Level Variables Declaration
  assetsdocumentAll=[];
  assetsdocument={
      assetsdocument_ID: 0,
      assetsdocument_PDF: '',
      isactive: true,
  };
  orderno=[];

  constructor(
    private assetsdocumentservice: AssetsdocumentService,
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
    this.assetsdocument = {
      assetsdocument_ID: 0,
      assetsdocument_PDF: '',
      isactive: true
    };
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.assetsdocument = {
      assetsdocument_ID: row.data.assetsdocument_ID,
      assetsdocument_PDF: row.data.assetsdocument_PDF,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.assetsdocument.isactive = true;
    } else {
      this.assetsdocument.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.assetsdocumentservice.getAll().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.assetsdocumentAll= response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  add(assetsdocument) {
    this.assetsdocumentservice.add(assetsdocument).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.assetsdocument_ID) {
          this.toastrservice.success("Success", "New Assets Document Added");
          this.assetsdocument = response;
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

  update(assetsdocument) {
    if (assetsdocument.isactive == true) {
      assetsdocument.isactive = 'Y';
    } else {
      assetsdocument.isactive = 'N';
    }

    this.assetsdocumentservice.update(assetsdocument, assetsdocument.assetsdocument_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.assetsdocument_ID) {
          this.toastrservice.success("Success", "Assets Document Updated");
          this.assetsdocument = response;
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
