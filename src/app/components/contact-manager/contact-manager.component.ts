import { Component } from '@angular/core';
import { IContact } from 'src/app/models/icontact/icontact';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent {

  public loading : boolean = false;
  public contacts : IContact[] = [];
  public searchedContacts : IContact[] = []; 
  public errorMessage : string | null = null;
  public searchTerm : string = '';

  ngOnInit() : void
  {
     this.loading = true;
     this.getAllContacts()
     
  }

  constructor(private contactService: ContactService){}

  public getAllContacts() : void 
  {
        this.contactService.getAllContacts().subscribe({
          next:(res:IContact[])=>
          {
            this.contacts = res;
            this.loading = false;
          },
          error:( err ) =>
          {
             this.loading = false;
             console.log(err)
          }
        })
  } 

  public deleteContact(contactId : string | undefined) : void
  {
if(contactId){
  this.contactService.deleteContact(contactId).subscribe({
    next:(res:{})=>{
      console.log(res)
       this.getAllContacts();

    },
  error:(err)=>{console.log(err);
  }
  })
}
  }
  public search(value: string): void 
  {
    console.log(value);
    
    this.searchedContacts = this.contacts.filter((val) =>
      val.name.toLowerCase().includes(value) 
    )
    if(this.searchedContacts.length>0)
    {
    this.contacts = this.searchedContacts;
    }
    else
    {
    this.getAllContacts();
    }
  }

 }
