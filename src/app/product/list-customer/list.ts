import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/services/api.service'

@Component({
  selector: 'app-list-customer-product',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // imports: [CommonModule]
})

export class ListCustomerProductComponent implements OnInit {
  focus: any;
  focus1: any;
  listProduct: any;
  productsByRow: any;
  categories: any;
  selectedCategory: null;
  facilities: any;
  selectedFacility: any;
  suppliers: any;
  selectedSupplier: null;

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        this.facilities = res.body
        this.selectedFacility = res.body[0].id
      }, // nextHandler
      error: (err) => {
        console.info(err)
        return
      }, // errorHandler
    })
    this.apiService.getAllCategory().subscribe({
      next: (res) => {
        this.categories = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
        return
      }, // errorHandler
    })
    this.apiService.getAllSupplier().subscribe({
      next: (res) => {
        this.suppliers = res.body
      }, // nextHandler
      error: (err) => {
        return
      }, // errorHandler
    })
    const initFacility = this.selectedFacility ? this.selectedFacility : 1
    this.onGetProduct(initFacility)
  }

  seperateProductByRows (products, rowSize) {
    const result: any[][] = [];
    for (let i = 0; i < products.length; i += rowSize) {
        result.push(products.slice(i, i + rowSize));
    }
    return result;
  }

  onFacilityChange(value) {
    this.onGetProduct(value)
  }

  onGetProduct(facility) {
    this.apiService.getProduct(facility).subscribe({
      next: (res) => {
        this.listProduct = res.body.filter(x => x.status === 'Hoạt động')
        this.productsByRow = this.seperateProductByRows(this.listProduct, 4)
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  onSupplierClicked(supplierId?) {
    if (!supplierId) {
      this.selectedSupplier = null
      this.productsByRow = this.seperateProductByRows(this.listProduct, 4)
      return
    }
    this.selectedSupplier = supplierId;
    this.filterBySupplier(supplierId)
  }

  onCategoryClicked (categoryName?) {
    if(!categoryName) {
      this.selectedCategory = null;
      return this.productsByRow = this.seperateProductByRows(this.listProduct, 4)
    }
    this.selectedCategory = categoryName;
    this.filterByCategory(categoryName)
  }

  filterByCategory (categoryName) {
    const productsByCategory = this.listProduct.filter(item => item.category == categoryName)
    this.productsByRow = this.seperateProductByRows(productsByCategory, 4)
  }

  filterBySupplier (supplierId) {
    const productsBySupplierId = this.listProduct.filter(item => item.supplierId == supplierId)
    this.productsByRow = this.seperateProductByRows(productsBySupplierId, 4)
  }

  handleCardClick (code) {
    this.router.navigate([`/product-detail/${code}`])
  }
}
