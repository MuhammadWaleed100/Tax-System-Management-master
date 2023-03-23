import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../../services/on-fail.service";
import { AssetstypeService } from "./assetstype.service";
import { ToastrService } from 'ngx-toastr';
import { AssetsclassificationService } from "../assetsclassification/assetsclassification.service";
import {ProductcategoryService} from "../../../services/productcategory.service";

declare var $: any;

@Component({
  selector: 'app-assetstype',
  templateUrl: './assetstype.component.html',
  styleUrls: ['./assetstype.component.css']
})
export class AssetstypeComponent implements OnInit {

  // All Component Level Variables Declaration
 assetsclassificationAll=[];
 assetsclassificationupdate=[];
  assetstypeAll=[];
  productcategoryAll=[];
    assetstype={
    assetstype_ID: 0,
    assetsclassification_ID:{},
    productcategory_ID:{},
    assetstype_NAME: '',
    assetstype_DESC: '',
      isactive: true
  };
  orderno=[];

  constructor(
    private assetsclassificationservice:AssetsclassificationService,
    private productcategoryservice:ProductcategoryService,
    private assetstypeservice: AssetstypeService,
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

  View(assetstype) {
    const url = "view/demo/" + assetstype.data.id + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.assetstype = {
      assetstype_ID: 0,
    assetsclassification_ID:{},
    productcategory_ID:{},
    assetstype_NAME: '',
    assetstype_DESC: '',
      isactive: true
    };
    this.getAssetsClassification();
    this.getProductCategory();
    
    
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.assetstype = {
      assetstype_ID: row.data.assetstype_ID,
    assetsclassification_ID:row.data.assetsclassification_ID,
    productcategory_ID:row.data. productcategory_ID,
  assetstype_NAME: row.data.assetstype_NAME,
    assetstype_DESC: row.data.assetstype_DESC,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.assetstype.isactive = true;
    } else {
      this.assetstype.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.assetstypeservice.getAll().subscribe(response => {
      if(response) {
        this.assetstypeAll=response;
        var i;
        for (i=0; i<this.assetstypeAll.length;i++) {
          this.assetstypeAll[i].assetsclassification_NAME = JSON.parse(this.assetstypeAll[i]).assetstype_ID.assetsclassification_ID;

        }
        for (i=0; i<this.assetstypeAll.length;i++) {
          this.assetstypeAll[i].productcategory_NAME = JSON.parse(this.assetstypeAll[i].productitem_DETAIL).product_ID.productcategory_ID;

        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  add(assetstype) {
    this.assetstypeservice.add(assetstype).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.assetstype_ID) {
          this.toastrservice.success("Success", "New Product Category Added");
          this.assetstype = response;
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

  update(assetstype) {
    if (assetstype.isactive == true) {
      assetstype.isactive = 'Y';
    } else {
      assetstype.isactive = 'N';
    }

    this.assetstypeservice.update(assetstype, assetstype.assetstype_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.assetstype_ID) {
          this.toastrservice.success("Success", "Product Category Updated");
          this.assetstype = response;
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
  getAssetsClassification() {
    this.assetsclassificationservice.get().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.assetsclassificationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  getProductCategory() {
    this.productcategoryservice.get().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.productcategoryAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  
  
}
