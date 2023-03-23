import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../services/on-fail.service";
import { PaymentService } from "./payment.service";
import { ToastrService } from 'ngx-toastr';


declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // All Component Level Variables Declaration
 
  paymentAll=[];
  payment={
    payment_ID: 0,
    taxpayer_ID:0,
    payment_MODE: '',
    payment_DESC: '',
    payment_BANKNAME: '',
    payment_BRANCHNAME: '',
    payment_AMOUNT:0,
      isactive: true
  };
   orderno=[];

  constructor(
    private paymentservice: PaymentService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService
  ) { }

  ngOnInit() {
    this.getAll();
    //this.getAllEntityList();

    for (var i = 0; i <= 50; i++) {
      this.orderno.push({ value: i });
    }
  }


  // Frontend Actions 

  View(payment) {
    const url = "view/demo/" + payment.data.payment_ID + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.payment = {
      payment_ID: 0,
      taxpayer_ID:0,
      payment_MODE: '',
      payment_DESC: '',
      payment_BANKNAME: '',
      payment_BRANCHNAME: '',
      payment_AMOUNT:0,
        isactive: true
    };
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.payment = {
      payment_ID: row.data.payment_ID,
      taxpayer_ID:row.data.taxpayer_ID,
      payment_MODE: row.data.payment_MODE,
      payment_DESC: row.data.payment_DESC,
      payment_BANKNAME: row.data.payment_BANKNAME,
      payment_BRANCHNAME: row.data.payment_BRANCHNAME,
      payment_AMOUNT:row.data.payment_AMOUNT,
        isactive: true

    
    };
    if (row.data.isactive == "Y") {
      this.payment.isactive = true;
    } else {
      this.payment.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.paymentservice.getAll().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.paymentAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  add(payment) {
    this.paymentservice.add(payment).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.payment_ID) {
          this.toastrservice.success("Success", "New Product Category Added");
          this.payment = response;
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

  update(payment) {
    if (payment.isactive == true) {
      payment.isactive = 'Y';
    } else {
      payment.isactive = 'N';
    }

    this.paymentservice.update(payment, payment.payment_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.payment_ID) {
          this.toastrservice.success("Success", "Payment Updated");
          this.payment = response;
          this.getAll();
          $("#editModal").modal("hide");
        } else {
          this.toastrservice.error("Something went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  } 
}

















































