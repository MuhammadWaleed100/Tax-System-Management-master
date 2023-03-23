import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../../services/on-fail.service";
import { FinancialtaxyearService } from "./financialtaxyear.service";
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-financialtaxyear',
  templateUrl: './financialtaxyear.component.html',
  styleUrls: ['./financialtaxyear.component.css']
})
export class FinancialtaxyearComponent implements OnInit {

  // All Component Level Variables Declaration
  entitylist=[];
  financialtaxyearAll=[];
  financialtaxyear={
      financialtaxyear_ID: 0,
      financialtaxyear_STARTDATE: '',
      financialtaxyear_ENDDATE: '',
      financialtaxyear_DESC: '',
      isactive: true
  };
  orderno=[];

  constructor(
    private financialtaxyearservice: FinancialtaxyearService,
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

  View(financialtaxyear) {
    const url = "view/demo/" + financialtaxyear.data.id + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.financialtaxyear = {
      financialtaxyear_ID: 0,
      financialtaxyear_STARTDATE: '',
      financialtaxyear_ENDDATE: '',
      financialtaxyear_DESC: '',
      isactive: true
    };
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.financialtaxyear = {
      financialtaxyear_ID:row.data.financialtaxyear_ID,
      financialtaxyear_STARTDATE:row.data.financialtaxyear_STARTDATE,
      financialtaxyear_ENDDATE: row.data.financialtaxyear_ENDDATE,
      financialtaxyear_DESC: row.data.financialtaxyear_DESC,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.financialtaxyear.isactive = true;
    } else {
      this.financialtaxyear.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.financialtaxyearservice.getAll().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.financialtaxyearAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  add(financialtaxyear) {
    this.financialtaxyearservice.add(financialtaxyear).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.financialtaxyear_ID) {
          this.toastrservice.success("Success", "New Financial Taxyear Added");
          this.financialtaxyear = response;
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

  update(financialtaxyear) {
    if (financialtaxyear.isactive == true) {
      financialtaxyear.isactive = 'Y';
    } else {
      financialtaxyear.isactive = 'N';
    }

    this.financialtaxyearservice.update(financialtaxyear, financialtaxyear.financialtaxyear_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.financialtaxyear_ID) {
          this.toastrservice.success("Success", "Financial Taxyear Updated");
          this.financialtaxyear = response;
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
