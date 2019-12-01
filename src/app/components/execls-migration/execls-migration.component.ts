import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-execls-migration',
  templateUrl: './execls-migration.component.html',
  styleUrls: ['./execls-migration.component.css']
})
export class ExeclsMigrationComponent implements OnInit {
  filename:any;
  data:any;
  @Input('guardar') guardar:boolean= false;
  @Input('margenIzq') margenIzq:number = 6;
  @Input('margenDer') margenDer:number = 6;
  @Input('header') header:any[]=[];
  @Input('fileExportName') fileExportName:string = "";
  @Output("output-table") table:EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor() { }

  ngOnInit() {
  }
  onFileChange(evt: any){
    this.guardar = true
    this.filename = evt.srcElement.files[0].name

    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
       reader.onload = (e: any) => {
         /* read workbook */
         const bstr: string = e.target.result;
         const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

         const wsname: string = wb.SheetNames[0];
         const ws: XLSX.WorkSheet = wb.Sheets[wsname];
         this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
         this.table.emit(this.data.filter(data=>{return data.length>0}))
         this.fileExportName="";
         // this.guardar = false;

       };
       reader.readAsBinaryString(target.files[0]);

  }
  exportarArchivo(){
    console.log(this.header)
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.header);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    console.log("name "+this.fileExportName)

    /* save to file */
    XLSX.writeFile(wb, this.fileExportName);
  }


}
