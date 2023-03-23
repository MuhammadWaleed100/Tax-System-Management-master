import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../../services/on-fail.service";
import { AssetsclassificationService } from "./assetsclassification.service";
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-assetsclassification',
  templateUrl: './assetsclassification.component.html',
  styleUrls: ['./assetsclassification.component.css']
})
export class AssetsclassificationComponent implements OnInit {

  // All Component Level Variables Declaration
  assetsclassificationAll=[];
  assetsclassification={
      assetsclassification_ID: 0,
      assetsclassification_NAME: '',
      assetsclassification_DESC: '',
      isactive: true,
  };
  orderno=[];

  constructor(
    private assetsclassificationservice: AssetsclassificationService,
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

  View(assetsclassification) {
    const url = "view/demo/" + assetsclassification.data.assetsclassification_ID + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.assetsclassification = {
      assetsclassification_ID: 0,
      assetsclassification_NAME: '',
      assetsclassification_DESC: '',
      isactive: true
    };
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.assetsclassification = {
      assetsclassification_ID: row.data.assetsclassification_ID,
      assetsclassification_NAME:row.data.assetsclassification_NAME,
      assetsclassification_DESC: row.data.assetsclassification_DESC,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.assetsclassification.isactive = true;
    } else {
      this.assetsclassification.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.assetsclassificationservice.getAll().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.assetsclassificationAll= response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  add(assetsclassification) {
    this.assetsclassificationservice.add(assetsclassification).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.assetsclassification_ID) {
          this.toastrservice.success("Success", "New Assets Classification Added");
          this.assetsclassification = response;
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

  update(assetsclassification) {
    if (assetsclassification.isactive == true) {
      assetsclassification.isactive = 'Y';
    } else {
      assetsclassification.isactive = 'N';
    }

    this.assetsclassificationservice.update(assetsclassification, assetsclassification.assetsclassification_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.assetsclassification_ID) {
          this.toastrservice.success("Success", "Assets Classification Updated");
          this.assetsclassification = response;
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
