import { Component } from '@angular/core';
import { ActivatedRoute,ParamMap, Router,} from '@angular/router';
import { IContact } from 'src/app/models/icontact/icontact';
import { IGroup } from 'src/app/models/IGroup/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {
public loading : boolean = true;
public contactId : string | null = null;
public contact : IContact = {} as IContact;
public groups : IGroup[] = [] as IGroup[];

constructor(
  
  private activatedRoute:ActivatedRoute,
  private contactService : ContactService,
  private router : Router,
){}
ngOnInit(){
  this.activatedRoute.paramMap.subscribe({next:(param:ParamMap)=>{
    this.contactId = param.get('contactId');
    if(this.contact){
     this.contactService.getContact(this.contactId).subscribe({
      next:(res:IContact)=>{
        this.contact = res;
        this.loading=false;
        this.contactService.getAllGroups().subscribe({
          next:(res:IGroup[])=>{
            this.groups = res;
          }
        })  
      },error:(err)=>{console.log(err);
      }
     })
    }
  }})
}
public editSubmit(){
  if(this.contactId){
    this.contactService.updateContact(this.contact,this.contactId).subscribe({
  next:(res:IContact)=>{
    this.contact = res;
    this.router.navigate(['/'], {  });
  }
})
}
  }

}
