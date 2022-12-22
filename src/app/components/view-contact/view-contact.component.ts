import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from 'src/app/models/icontact/icontact';
import { IGroup } from 'src/app/models/IGroup/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent {
  public loading : boolean = true;
  public contactId : string | null = null;
  public contact : IContact = {} as IContact;
  public errorMessage : string | null = null;
  public group : IGroup = {} as IGroup;
  constructor(
    
    private activatedRoute : ActivatedRoute,
    private contactService : ContactService
    ){}
 
  ngOnInit(): void{

    this.activatedRoute.paramMap.subscribe({
      next:(param:ParamMap)=>{
        this.contactId = param.get('contactId');
      }
    })
    if(this.contactId){
      this.loading = true;
        this.contactService.getContact(this.contactId).subscribe({next:(res : IContact)=>{
              this.contact = res;
              this.loading = false;
              this.contactService.getGroup(res).subscribe({
                next:(data : IGroup)=>{
                  this.group = data;
                 
                },
                error:(err)=>{console.log(err);
                }
              })
        },
      error:(err)=>{
        console.log(err);
      }
    })
    }
  }
}
