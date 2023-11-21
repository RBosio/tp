import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { CityService } from '../../services/city.service';
import { CityIResponse } from 'src/app/models/city.model';
import { Subscription } from 'rxjs';
import { CountryIResponse } from 'src/app/models/country.model';
import { CountryService } from 'src/app/country/services/country.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'province', 'country', 'operations'];
  dataSource: MatTableDataSource<CityIResponse, MatTableDataSourcePaginator>;
  countries: CountryIResponse[]

  subscription1$: Subscription
  subscription2$: Subscription
  subscription3$: Subscription
  
  constructor(
    private cityService: CityService,
    private countryService: CountryService
  ) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.subscription1$ = this.countryService.getAll().subscribe(res => {
      this.countries = res
      
      this.subscription2$ = this.cityService.getAll().subscribe(res => {
        res = res.map(city => ({...city, country: this.countries.find(country => city.province.countryId == country.id).name}))
        this.dataSource = new MatTableDataSource<CityIResponse>(res);

        this.paginator._intl.itemsPerPageLabel = 'Items por página';
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.lastPageLabel = 'Ultima página';
        this.paginator._intl.nextPageLabel = 'Siguiente página';
        this.paginator._intl.previousPageLabel = 'Anterior página';
        this.dataSource.paginator = this.paginator;
      })
    })
  }
  
  delete(zipCode: string) {
        this.subscription3$ = this.cityService.delete(zipCode).subscribe(() => {
          const indice = this.dataSource.data.indexOf(this.dataSource.data.find(data => data.zipCode == zipCode))
          this.dataSource.data.splice(indice, 1)
          this.dataSource._updateChangeSubscription()
        })
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    this.subscription2$.unsubscribe()
    if(this.subscription3$){
      this.subscription3$.unsubscribe()
    }
  }
}