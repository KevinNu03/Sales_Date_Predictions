import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OrderCustomer } from '../../../../shared/models/Customers';
import { SalesDatePredictionServiceService } from '../../Services/sales-date-prediction-service.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { tap } from 'rxjs';
import { LoadingTableComponent } from '../../../../shared/components/ui/loanding/loading-table/loading-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-modal-orders-view',
  imports: [
    CommonModule,
    MatToolbarModule,
    LoadingTableComponent,
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatToolbarModule,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './modal-orders-view.component.html',
  styleUrl: './modal-orders-view.component.css'
})
export class ModalOrdersViewComponent implements OnInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    public dialogRef: MatDialogRef<ModalOrdersViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cusId: number, CustomerName: string },
    private salesDateService: SalesDatePredictionServiceService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ){}
  displayedColumns: string[] = ['orderid', 'requireddate', 'shippeddate', 'shipname', 'shipaddress', 'shipcity'];
  dataSource!: MatTableDataSource<OrderCustomer>;
    pageIndex?: number;
    filtro?: string;
    listOrderCustomers: OrderCustomer[] = [];
    loaderTable: boolean = false;

  ngOnInit(){
    const paginacion = this.localStorageService.getIndexPage();
    this.loaderTable = false;

    this.salesDateService.GetClientOrders(this.data.cusId)
    .pipe(
      tap(responseOrdersCustomers => {
        this.paginator._intl.itemsPerPageLabel = 'Tamaño de Página';
          this.pageIndex = paginacion ? parseInt(paginacion) : 0;

          this.listOrderCustomers = responseOrdersCustomers;
          this.dataSource = new MatTableDataSource(responseOrdersCustomers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.paginator.pageIndex = this.pageIndex;
          this.dataSource.sort = this.sort;
          this.loaderTable = true;
      })
    )
    .subscribe({
      next: () => {},
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex  = e.pageIndex;
    this.localStorageService.saveIndexPage(this.pageIndex.toString());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  closeModal(){
    this.dialog.closeAll();
  }
}
