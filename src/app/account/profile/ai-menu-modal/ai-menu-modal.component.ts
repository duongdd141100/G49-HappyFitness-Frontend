import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { scrollToFirstInvalidControl, validateAllFormFields, validateForm } from 'src/app/functions/function-helper';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-ai-menu-modal',
  templateUrl: './ai-menu-modal.component.html',
  styleUrls: ['./ai-menu-modal.component.scss']
})
export class AIMenuModalComponent implements OnInit {
  healthForm: FormGroup;
  validateForm = validateForm;
  healths:any;
  constructor( public activeModal: NgbActiveModal, private apiService: ApiService,  private formBuilder: FormBuilder) { 

    this.healthForm = this.createFormHealth();
  }

  ngOnInit(): void {
    
  }
  formatDataApi(dataApi) {
    let datamenu = Object.entries(dataApi['menu']).map(([day, meals]) => {
      return {
        day,
        meals: Object.entries(meals).map(([mealName, foods]) => {
          return {
            name: mealName,
            foods: foods.map(food => ({
              dish: food['món'],
              mass_calories: food['khối_lượng_calo'],
              food_volume: food['khối_lượng_thức_ăn']
            })) // Convert the object values to an array
          };
        })
      };
    });
    let dataApiFormat= {
      caloDay: null,
      caloBurn: null,
      menu: [],
    };
    dataApiFormat.caloDay = dataApi['daily_calories']
    dataApiFormat.caloBurn = dataApi['calo_burn'][0]
    dataApiFormat.menu = datamenu
    return dataApiFormat
  }
  handleBackForm() {
    this.healths = null;
    this.healthForm = this.createFormHealth();
  }
  onSubmit() {
    if (this.healthForm.valid) {
      //call api AI
      this.apiService.AImenu(this.healthForm.value).subscribe({
        next: (res) => {
          console.log(res);
          //data nhận được ở đây
          this.healths = this.formatDataApi(res);
        }, // nextHandler
        error: (err) => {
          console.log(err);
          return
        }, // errorHandler
      })
    } else {
      validateAllFormFields(this.healthForm);
      scrollToFirstInvalidControl(this.healthForm);
    }
  }
  createFormHealth():FormGroup {
    return this.formBuilder.group({
      male: [this.healthForm?.value?.male ? this.healthForm?.value?.male : 0], // default to male
      age: [this.healthForm?.value?.age ? this.healthForm?.value?.age : null, [Validators.required]],
      height: [this.healthForm?.value?.height ? this.healthForm?.value?.height : null, [Validators.required]],
      weight: [this.healthForm?.value?.weight ? this.healthForm?.value?.weight : null, [Validators.required]],
      duration: [this.healthForm?.value?.duration ? this.healthForm?.value?.duration : null, [Validators.required]],
      heart_rate: [this.healthForm?.value?.heart_rate ? this.healthForm?.value?.heart_rate  : null,[Validators.required]],
      body_temp: [this.healthForm?.value?.body_temp ? this.healthForm?.value?.body_temp : null, [Validators.required]]
    });
  }
}
