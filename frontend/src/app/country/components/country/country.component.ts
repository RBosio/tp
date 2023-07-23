import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { CountryService } from '../../services/country.service';
import { CountryIResponse } from 'src/app/models/country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'operations'];
  dataSource: MatTableDataSource<CountryIResponse, MatTableDataSourcePaginator>;

  constructor(
    private countryService: CountryService,
  ) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.countryService.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource<CountryIResponse>(res);

      this.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Ultima página';
      this.paginator._intl.nextPageLabel = 'Siguiente página';
      this.paginator._intl.previousPageLabel = 'Anterior página';
      this.dataSource.paginator = this.paginator;
    })
  }
  
  delete(id: number) {
        this.countryService.delete(id).subscribe(() => {
          const indice = this.dataSource.data.indexOf(this.dataSource.data.find(data => data.id == id))
          this.dataSource.data.splice(indice, 1)
          this.dataSource._updateChangeSubscription()
        })

  }
}