import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Shippers } from '../../../../shared/models/Shippers';
import { SalesDatePredictionServiceService } from '../../Services/sales-date-prediction-service.service';
import { Employees } from '../../../../shared/models/Employeed';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Products } from '../../../../shared/models/Products';
import { catchError, forkJoin, of, tap, throwError } from 'rxjs';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddOrder } from '../../../../shared/models/Customers';
import { ModalInfoComponent } from '../../../../shared/components/ui/modal-info/modal-info.component';

@Component({
  selector: 'app-modal-new-order',
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-new-order.component.html',
  styleUrl: './modal-new-order.component.css'
})
export class ModalNewOrderComponent implements OnInit{
  employees: Employees[] = [];
  shippers: Shippers[] = [];
  products: Products[] = [];

  formNewOrder = new FormGroup({
    employee: new FormControl('', Validators.required),
    shipper: new FormControl('', Validators.required),
    shipName: new FormControl('', Validators.required),
    shiAddress: new FormControl('', Validators.required),
    shipCity: new FormControl('', Validators.required),
    shipCountry: new FormControl('', Validators.required),
    orderDate: new FormControl('', Validators.required),
    requiredDate: new FormControl('', Validators.required),
    shippedDate: new FormControl('', Validators.required),
    freight: new FormControl('', [Validators.required, Validators.max(9999999999999999999)]),
    product: new FormControl('', Validators.required),
    unitPrice: new FormControl('', [Validators.required, Validators.max(9999999999999999999)]),
    quantity: new FormControl('', [Validators.required, Validators.max(99999)]),
    discount: new FormControl('', [Validators.required, Validators.max(999)]),
  })

  constructor(
    public dialogRef: MatDialogRef<ModalNewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cusId: number, CustomerName:string },
    private salesDateService: SalesDatePredictionServiceService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    forkJoin({
      employees: this.salesDateService.GetEmployees().pipe(
        tap(response => this.employees = response),
        catchError(err => {
          this.openModal('' + err);
          return of([]); 
        })
      ),
      products: this.salesDateService.GetProducts().pipe(
        tap(response => this.products = response),
        catchError(err => {
          this.openModal('' + err);
          return of([]); 
        })
      ),
      shippers: this.salesDateService.GetShippers().pipe(
        tap(response => this.shippers = response),
        catchError(err => {
          this.openModal('' + err);
          return of([]); 
        })
      )
    }).subscribe({
      next: () => {
      },
      error: (err) => {
        this.openModal('' + err);
      }
    });


  }
  
  closeModal(){
    this.dialog.closeAll();
  }

  saveOrder(){
    const AddOrder: AddOrder = {
      empId: Number(this.formNewOrder.get("employee")?.value),
      shipperId: Number(this.formNewOrder.get("shipper")?.value),
      shipName: String(this.formNewOrder.get("shipName")?.value),
      shipAddress: String(this.formNewOrder.get("shiAddress")?.value),
      shipCity: String(this.formNewOrder.get("shipCity")?.value),
      orderDate: this.getValidDate("orderDate"),
      requiredDate: this.getValidDate("requiredDate"),
      shippedDate: this.getValidDate("shippedDate"),
      freight: Number(this.formNewOrder.get("freight")?.value),
      shipCountry: String(this.formNewOrder.get("shipCountry")?.value),
      productId: Number(this.formNewOrder.get("product")?.value),
      unitPrice: Number(this.formNewOrder.get("unitPrice")?.value),
      qty: Number(this.formNewOrder.get("quantity")?.value),
      discount: Number(this.formNewOrder.get("discount")?.value),
      cusId: Number(this.data.cusId)
    }

    this.salesDateService.AddNewOrder(AddOrder)
    .pipe(
      tap(Response => {
        this.openModal("Orden Creada Correctamente.");
        this.dialogRef.close(false);
      }),
      catchError(error => {
        this.openModal(error.ResponseHttp)
        return throwError(() => new Error("Error al procesar la orden"));
      })
    )
    .subscribe({
      next: () => {
      },
      error: (err) => {
        console.log(err)
        this.openModal('');
      }
    })
  }

  openModal(Messsage: string){
    const dialogRef = this.dialog.open(ModalInfoComponent, { width: '400px' });
    dialogRef.componentInstance.message = Messsage;

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    })
  }

  getValidDate(controlName: string): Date | null {
    const value = this.formNewOrder.get(controlName)?.value;
    return value ? new Date(value) : null;
  }
}
