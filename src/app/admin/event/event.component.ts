import { Component, OnInit } from '@angular/core';
import { EarlyBirdService } from '../services/earlybird.service';
import { EarlyBird } from 'src/app/Model/earlybird';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  earlyBirds: EarlyBird[] = [];
  currentEarlyBird: EarlyBird = new EarlyBird();
  showEarlyBirdModal: boolean = false;
  editingEarlyBird: boolean = false;
  showDeleteEarlyBirdModal = false;
  earlyBirdToDeleteDetails: any;
  earlyBirdToDelete: any = null;

  constructor(private earlyBirdService: EarlyBirdService, private toastr : ToastrService){ }

  ngOnInit(): void {
    // you can load initial data here if needed.
    this.loadEarlyBirds();
  }

  async loadEarlyBirds(): Promise<void> {
    try {
      this.earlyBirds = await this.earlyBirdService.getEarlyBirds();
     
    } catch (error) {
      console.error(error);
      this.toastr.error('Error, please try again', 'Early Bird Table');
    }
  }

  openAddEarlyBirdModal() {
    this.editingEarlyBird = false;
    this.currentEarlyBird = new EarlyBird();
    this.showEarlyBirdModal = true;
  }

  openEditEarlyBirdModal(id: number) {
    console.log('Opening edit early bird modal for ID:', id);
    this.editingEarlyBird = true;
    // Find the original EarlyBird object
    const originalEarlyBird = this.earlyBirds.find(earlyBird => earlyBird.earlyBirdID === id);
    if (originalEarlyBird) {
      // Clone the original EarlyBird object and assign it to currentEarlyBird
      this.currentEarlyBird = {...originalEarlyBird};
    }
    this.showEarlyBirdModal = true;
}

  closeEarlyBirdModal() {
    this.showEarlyBirdModal = false;
  }

  openDeleteEarlyBirdModal(earlyBird: any): void {
    this.earlyBirdToDelete = earlyBird.earlyBirdID;
    console.log("Early Bird : ", this.earlyBirdToDelete)
    this.earlyBirdToDeleteDetails = earlyBird;
    this.showDeleteEarlyBirdModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteEarlyBirdModal = false;
  }

  async submitEarlyBirdForm(form: NgForm): Promise<void> {
    console.log('Submitting form with editingEarlyBird flag:', this.editingEarlyBird);
    if (form.valid) {
      try {
        if (this.editingEarlyBird) {
          await this.earlyBirdService.updateEarlyBird(this.currentEarlyBird.earlyBirdID!, this.currentEarlyBird);
          const index = this.earlyBirds.findIndex(earlyBird => earlyBird.earlyBirdID === this.currentEarlyBird.earlyBirdID);
          if (index !== -1) {
            // Update the original EarlyBird object with the changes made to the clone
            this.earlyBirds[index] = this.currentEarlyBird;
          }
          this.toastr.success('Successfully updated', 'Update');
        } else {
          const data = await this.earlyBirdService.addEarlyBird(this.currentEarlyBird);
          this.earlyBirds.push(data);
          this.toastr.success('Successfully added', 'Add');
        }
        this.closeEarlyBirdModal();
        if (!this.editingEarlyBird) {
          form.resetForm();
        }
      } catch (error) {
        console.error(error);
        this.toastr.error('Error, please try again');
      }
    }
  }

  async deleteEarlyBird(): Promise<void> {
    if (this.earlyBirdToDelete !== null) {
      try {
        await this.earlyBirdService.deleteEarlyBird(this.earlyBirdToDelete);
        console.log(this.earlyBirdToDelete);
        this.earlyBirds = this.earlyBirds.filter(earlyBird => earlyBird.earlyBirdID !== this.earlyBirdToDelete);
        this.toastr.success('Successfully deleted', 'Delete');
      } catch (error) {
        console.error('Error deleting EarlyBird:', error);
        this.toastr.error('Error, please try again', 'Delete');
      }
      this.closeDeleteModal();
    }
  }
}
