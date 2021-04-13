# AngularLaravelSPA
Simple SPA in Angular 11 and Laravel 8 


#JWT tokenGetter app.module

Il token getter è una funziona che recupera dal local storage il token, per inserirlo poi in tutte le richieste http.

**In questo caso all'interno di quella funzione è stato inserito un JSON.parse per eliminare gli apici, che altrimenti setterebbero un token non valido nelle request.**

#FileUpload Primeng

il file upload è un componente di PrimeFaces che permette di fare l'upload di files,
in questo caso viene usato per l'upload di immagini in Registarione.

1) Va scelta la modalità di fileUpload [in questo caso la Basic]
2) Va scelta la tipologia di files in questo caso image/* 
3) ***Scrivere l'etichetta del pulsante di selezione  Importante, altrimenti il pulsante non verrà visualizzato***
3) Va scritto poi l'evento in questo caso onSelect e il metodo da chiamare Dentro al quale verranno eseguite le operazioni necessarie

    `<p-fileUpload mode="basic" name="docs[]" accept="image/*" maxFileSize="2000000" chooseLabel="Choose" (onSelect)="myUploader($event)"></p-fileUpload>`
                
Questo file uploader tornera un file di tipo Blob      







**A questo punto se il file verrà ridimensionato con il tool di cropping non servirà alcuna modifica, mentre,
nel caso in cui il il file venga stampato o salvato direttamente dev'essere "sanificato", in questo modo**        

`

    import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
    
    public srcBlob: SafeUrl;
    
    constructor(private domSanitizer: DomSanitizer){}
    
    myUploader($event: any) {
        this.srcBlob = this.domSanitizer.bypassSecurityTrustUrl($event.currentFiles[0].objectURL.changingThisBreaksApplicationSecurity);
      }  
`