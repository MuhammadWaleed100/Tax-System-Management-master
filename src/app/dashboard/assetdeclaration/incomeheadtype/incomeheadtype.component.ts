import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../../services/on-fail.service";
import {  IncomeheadtypeService } from "./incomeheadtype.service";
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app- incomeheadtype',
  templateUrl: './incomeheadtype.component.html',
  styleUrls: ['./incomeheadtype.component.css']
})
export class  IncomeheadtypeComponent implements OnInit {

  // All Component Level Variables Declaration
  entitylist=[];
   incomeheadtypeAll=[];
   incomeheadtype={
       incomeheadtype_ID: 0,
       incomeheadtype_NAME: '',
       incomeheadtype_DESC: '',
      isactive: true
  };
  

  constructor(
    private  incomeheadtypeservice:  IncomeheadtypeService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService
  ) { }

  ngOnInit() {
    this.getAll();
  }


  // Frontend Actions 

  View( incomeheadtype) {
    const url = "view/demo/" +  incomeheadtype.data.id + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this. incomeheadtype = {
       incomeheadtype_ID: 0,
       incomeheadtype_NAME: '',
       incomeheadtype_DESC: '',
      isactive: true
    };
    $("#addModal").modal("show");
  }

  Edit(row) {
    this. incomeheadtype = {
       incomeheadtype_ID: row.data.incomeheadtype_ID,
       incomeheadtype_NAME:row.data.incomeheadtype_NAME,
       incomeheadtype_DESC: row.data.incomeheadtype_DESC,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this. incomeheadtype.isactive = true;
    } else {
      this. incomeheadtype.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this. incomeheadtypeservice.getAll().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this. incomeheadtypeAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  add(incomeheadtype) {
    this. incomeheadtypeservice.add(incomeheadtype).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.incomeheadtype_ID) {
          this.toastrservice.success("Success", "New  Income Headtype Added");
          this. incomeheadtype = response;
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

  update(incomeheadtype) {
    if (incomeheadtype.isactive == true) {
       incomeheadtype.isactive = 'Y';
    } else {
       incomeheadtype.isactive = 'N';
    }

    this.incomeheadtypeservice.update(incomeheadtype,incomeheadtype.incomeheadtype_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.incomeheadtype_ID) {
          this.toastrservice.success("Success", " Income Headtype Updated");
          this. incomeheadtype = response;
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
