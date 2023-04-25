
import {Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { startWith } from 'rxjs/operators';
import {DocumentService} from "../_services/document.service";
import {Document} from "../_services/document";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  document: Document;
  documents: Observable<string[]>;
  currentDoc: string;
  private _docSub: Subscription;
  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.documents;
    //this._docSub = this.documentService.currentDocument.subscribe(doc => this.currentDoc = doc.id);
    this._docSub = this.documentService.currentDocument.pipe(
      startWith({ id: '', doc: 'Select an existing document or create a new one to get started'})
    ).subscribe(document => this.document = document);
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  editDoc() {
    this.documentService.editDocument(this.document);
  }

  loadDoc(id: string) {
    this.documentService.getDocument(id);
  }

  newDoc() {
    this.documentService.newDocument();
  }
}
