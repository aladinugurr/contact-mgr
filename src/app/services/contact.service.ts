import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IContact } from '../models/icontact/icontact';
import  {IGroup} from '../models/IGroup/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl : string = `http://localhost:9000`; //json server url

  constructor(
    private http: HttpClient
  ) {  }
  //GET All Contacts
  public getAllContacts() : Observable<IContact[]>{
    let dataUrl:string =`${this.serverUrl}/contacts`;
    return this.http.get<IContact[]>(dataUrl); 
  }

  //Get Single Contact
  public getContact(contactId : string | null) : Observable<IContact>{
   let dataUrl : string = `${this.serverUrl}/contacts/${contactId}`;
   return this.http.get<IContact>(dataUrl);
  }
  //Create Contact
  public createContact(contact : IContact) : Observable<IContact>{
    let dataUrl:string =`${this.serverUrl}/contacts`;
    return this.http.post<IContact>(dataUrl,contact);
  }
  //Update Contact
  public updateContact(contact : IContact,contactId : string) : Observable<IContact>{
    let dataUrl:string =`${this.serverUrl}/contacts/${contactId}`;
    return this.http.put<IContact>(dataUrl,contact);
  }
  //Delete Contact
  public deleteContact(contactId : string) : Observable<{}>{
    let dataUrl:string =`${this.serverUrl}/contacts/${contactId}`;
    return this.http.delete<{}>(dataUrl);
  }
  //Get All Groups
  public getAllGroups() : Observable<IGroup[]>{
    let dataUrl:string =`${this.serverUrl}/groups`;
    return this.http.get<IGroup[]>(dataUrl); 
  }
  //Get Single Group
  public getGroup(contact : IContact) : Observable<IGroup>{
    let dataUrl : string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.http.get<IGroup>(dataUrl);
   }
}
