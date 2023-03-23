import { Injectable } from '@angular/core';
import { setting } from "../setting";
import { HttpCallServieService } from "../services/http-call-servie.service";

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  constructor(
    private _HttpCallServieService_: HttpCallServieService
  ) { }
  get() {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "GET",
      request_URI: "productcategory",
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  getAll() {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "GET",
      request_URI: "productcategory/all",
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }


  getOne(id) {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "GET",
      request_URI: "productcategory/" + id,
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  add(data) {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "POST",
      request_URI: "productcategory",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  update(data, id) {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "PUT",
      request_URI: "productcategory/" + id,
      request_BODY: JSON.stringify(data)

    }
    return this._HttpCallServieService_.api(postData);
  }

  delete(id) {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "DELETE",
      request_URI: "productcategory/" + id,
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  search(data) {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "POST",
      request_URI: "productcategory/search",
      request_BODY: JSON.stringify(data)

    }
    return this._HttpCallServieService_.api(postData);
  }

  searchAll(data) {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "POST",
      request_URI: "productcategory/search/all",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearch(data) {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "POST",
      request_URI: "productcategory/advancedsearch",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearchAll(data) {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "POST",
      request_URI: "productcategory/advancedsearch/all",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  productcategory(data) {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "POST",
      request_URI: "productcategory/entity",
      request_BODY: JSON.stringify({ entityname : data })
    }
    return this._HttpCallServieService_.api(postData);
  }

  entityList() {
    var postData = {
      service_NAME: setting.service_PRODUCT,
      request_TYPE: "GET",
      request_URI: "productcategory/entitylist",
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

}
