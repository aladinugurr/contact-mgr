import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/icontact/icontact';
import { IGroup } from 'src/app/models/IGroup/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
 
public loading : boolean = true;
public contact : IContact = {} as IContact;
//public errorMessage : string | null = null;
public groups : IGroup[] = [] as IGroup[];

constructor
(
  private contactService : ContactService,
  private router : Router
){ }

ngOnInit(){
  this.contactService.getAllGroups().subscribe({next:( data:IGroup[])=>{
     this.groups = data;
  },
  error:(err)=>{console.log(err);
  }
})
}
public createSubmit() : void 
 {
      this.contactService.createContact(this.contact).subscribe({
      next:(res:IContact)=>{
      this.contact= res;
      this.router.navigate(['/'], {  });
      
 }
  })
}

}
