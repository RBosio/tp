import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { BookingService } from '../../services/booking.service';
import { BookingIResponse } from 'src/app/models/booking.model';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking-seller',
  templateUrl: './booking-seller.component.html',
  styleUrls: ['./booking-seller.component.scss']
})
export class BookingSellerComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['nro', 'admission','departure', 'status', 'dni', 'operations'];
  dataSource: MatTableDataSource<BookingIResponse, MatTableDataSourcePaginator>;

  subscription1$: Subscription  
  subscription2$: Subscription

  bookings: BookingIResponse[]
  status: string
  name: string
  statusList: string[]
  selectedStatus: string

  form: FormGroup

  constructor(
    private bookingService: BookingService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) {
    this.statusList = ['', 'Pendiente', 'En curso', 'Finalizada', 'Cancelada']
    this.form = this.initForm()
  }

  initForm(): FormGroup {
    return this.fb.group({
      'dni': ['', []],
      'status': ['', []]
    })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.subscription1$ = this.bookingService.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource<BookingIResponse>(res);
      this.bookings = res

      this.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Ultima página';
      this.paginator._intl.nextPageLabel = 'Siguiente página';
      this.paginator._intl.previousPageLabel = 'Anterior página';
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    if(this.subscription2$){
      this.subscription2$.unsubscribe()
    }
  }

  checkin(dni: string, admissionDate) {
    this.sharedService.openDialog('Realizar checkin').afterClosed().subscribe(res => {
      const admission = admissionDate
      admissionDate = admissionDate.split('T')[0]
      
      if(res) {
        this.bookingService.checkin(dni, admissionDate).subscribe(() => {
           this.dataSource.data.filter(x => x.user.dni == dni && x.admissionDate == admission)[0].status = 'En curso'
        })
      }
    })
  }
  
  checkout(dni: string, admissionDate) {
    this.sharedService.openDialog('Realizar checkout').afterClosed().subscribe(res => {
      const admission = admissionDate
      admissionDate = admissionDate.split('T')[0]

      if(res) {
        this.bookingService.checkout(dni, admissionDate).subscribe(() => {
           this.dataSource.data.filter(x => x.user.dni == dni && x.admissionDate == admission)[0].status = 'Finalizada'
        })
      }
    })
  }
  
  cancel(dni: string, admissionDate) {
    this.sharedService.openDialog('Cancelar reserva').afterClosed().subscribe(res => {
      const admission = admissionDate
      admissionDate = admissionDate.split('T')[0]

      if(res) {
        this.bookingService.cancel(dni, admissionDate).subscribe(() => {
           this.dataSource.data.filter(x => x.user.dni == dni && x.admissionDate == admission)[0].status = 'Cancelada'
        })
      }
    })
  }

  filterByDniAndStatus() {
    if(!this.form.controls['dni'].value && !this.form.controls['status'].value) {
      this.dataSource = new MatTableDataSource<BookingIResponse>(this.bookings)
    } else if(!this.form.controls['dni'].value) {
      this.dataSource = new MatTableDataSource<BookingIResponse>(this.bookings.filter(x => x.status == this.form.controls['status'].value))
    } else if(!this.form.controls['status'].value) {
      this.dataSource = new MatTableDataSource<BookingIResponse>(this.bookings.filter(x => x.user.dni.includes(this.form.controls['dni'].value)))
    } else {
      this.dataSource = new MatTableDataSource<BookingIResponse>(this.bookings.filter(x => x.status == this.form.controls['status'].value && x.user.dni.includes(this.form.controls['dni'].value)))
    }

    this.dataSource.paginator = this.paginator
  }
}