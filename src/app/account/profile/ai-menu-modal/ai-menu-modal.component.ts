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
  dataApi:any = {
    "daily_calories": 1397.1342951660158,
    "calo_burn": [
        106.82870483398438
    ],
    "menu": {
        "Ngày 1": {
            "Bữa sáng": [
                {
                    "món": "Trứng bỏ lò",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
                    "món": "Dưa chuột",
                    "khối_lượng_calo": 69.86,
                    "khối_lượng_thức_ăn": 17.46
                },
                {
                    "món": "Hạnh nhân",
                    "khối_lượng_calo": 69.86,
                    "khối_lượng_thức_ăn": 17.46
                }
            ],
            "Bữa trưa": [
                {
                    "món": "Canh cải bắp với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                },
                {
                    "món": "Salad rau cải với đậu hủ chiên và sốt mù tạt",
                    "khối_lượng_calo": 349.28,
                    "khối_lượng_thức_ăn": 87.32
                },
                {
                    "món": "Canh rau cải thảo với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                }
            ],
            "Bữa tối": [
                {
                    "món": "Thịt bò xào rau cải",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
                    "món": "Thịt bò xào cải ngọt",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
                    "món": "Cá basa nướng",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                }
            ]
        },
        "Ngày 2": {
            "Bữa sáng": [
                {
                    "món": "Hành tây",
                    "khối_lượng_calo": 69.86,
                    "khối_lượng_thức_ăn": 17.46
                },
                {
                    "món": "Dưa chuột",
                    "khối_lượng_calo": 69.86,
                    "khối_lượng_thức_ăn": 17.46
                },
                {
                    "món": "Hạnh nhân",
                    "khối_lượng_calo": 69.86,
                    "khối_lượng_thức_ăn": 17.46
                }
            ],
            "Bữa trưa": [
                {
                    "món": "Canh rau cải thảo với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
"khối_lượng_thức_ăn": 122.25
                },
                {
                    "món": "Canh rau cải thảo với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                },
                {
                    "món": "Canh bí đỏ với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                }
            ],
            "Bữa tối": [
                {
                    "món": "Thịt bò xào rau cải",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
                    "món": "Thịt bò xào cải ngọt",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
                    "món": "Cá basa nướng",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                }
            ]
        },
        "Ngày 3": {
            "Bữa sáng": [
                {
                    "món": "Quả lê",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
                    "món": "Trứng bỏ lò",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
                    "món": "Trái cây",
                    "khối_lượng_calo": 279.43,
                    "khối_lượng_thức_ăn": 69.86
                }
            ],
            "Bữa trưa": [
                {
                    "món": "Canh rau cải thảo với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                },
                {
                    "món": "Canh rau cải thảo với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                },
                {
                    "món": "Canh bí đỏ với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                }
            ],
            "Bữa tối": [
                {
                    "món": "Thịt bò xào cải ngọt",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
                    "món": "Cá basa nướng",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
"món": "Thịt bò xào rau cải",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                }
            ]
        },
        "Ngày 4": {
            "Bữa sáng": [
                {
                    "món": "Quả lê",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
                    "món": "Quả chuối",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
                    "món": "Hạnh nhân",
                    "khối_lượng_calo": 69.86,
                    "khối_lượng_thức_ăn": 17.46
                }
            ],
            "Bữa trưa": [
                {
                    "món": "Canh bí đỏ với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                },
                {
                    "món": "Salad gà với sốt vinaigrette",
                    "khối_lượng_calo": 349.28,
                    "khối_lượng_thức_ăn": 87.32
                },
                {
                    "món": "Canh cải bắp với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                }
            ],
            "Bữa tối": [
                {
                    "món": "Cá hồi nướng",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
                    "món": "Rau xà lách",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
                    "món": "Thịt bò xào rau cải",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                }
            ]
        },
        "Ngày 5": {
            "Bữa sáng": [
                {
                    "món": "Quả chuối",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
                    "món": "Quả lê",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
                    "món": "Dưa chuột",
                    "khối_lượng_calo": 69.86,
                    "khối_lượng_thức_ăn": 17.46
                }
            ],
            "Bữa trưa": [
                {
                    "món": "Salad rau cải với đậu hủ chiên và sốt mù tạt",
                    "khối_lượng_calo": 349.28,
"khối_lượng_thức_ăn": 87.32
                },
                {
                    "món": "Salad cà chua bi với thịt gà và hành tây",
                    "khối_lượng_calo": 349.28,
                    "khối_lượng_thức_ăn": 87.32
                },
                {
                    "món": "Canh rau cải thảo với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                }
            ],
            "Bữa tối": [
                {
                    "món": "Cá hồi nướng",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
                    "món": "Cá hồi nướng",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
                    "món": "Rau xà lách",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                }
            ]
        },
        "Ngày 6": {
            "Bữa sáng": [
                {
                    "món": "Dưa chuột",
                    "khối_lượng_calo": 69.86,
                    "khối_lượng_thức_ăn": 17.46
                },
                {
                    "món": "Bánh mì ngũ cốc",
                    "khối_lượng_calo": 279.43,
                    "khối_lượng_thức_ăn": 69.86
                },
                {
                    "món": "Cháo yến mạch",
                    "khối_lượng_calo": 209.57,
                    "khối_lượng_thức_ăn": 52.39
                }
            ],
            "Bữa trưa": [
                {
                    "món": "Canh rau cải thảo với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                },
                {
                    "món": "Salad rau cải với đậu hủ chiên và sốt mù tạt",
                    "khối_lượng_calo": 349.28,
                    "khối_lượng_thức_ăn": 87.32
                },
                {
                    "món": "Canh bí đỏ với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                }
            ],
            "Bữa tối": [
                {
                    "món": "Cá basa nướng",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
                    "món": "Rau xà lách",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
"món": "Thịt gà nướng",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                }
            ]
        },
        "Ngày 7": {
            "Bữa sáng": [
                {
                    "món": "Quả chuối",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
                    "món": "Trái cây",
                    "khối_lượng_calo": 279.43,
                    "khối_lượng_thức_ăn": 69.86
                },
                {
                    "món": "Hạnh nhân",
                    "khối_lượng_calo": 69.86,
                    "khối_lượng_thức_ăn": 17.46
                }
            ],
            "Bữa trưa": [
                {
                    "món": "Canh rau cải thảo với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                },
                {
                    "món": "Salad cà chua bi với thịt gà và hành tây",
                    "khối_lượng_calo": 349.28,
                    "khối_lượng_thức_ăn": 87.32
                },
                {
                    "món": "Canh cải bắp với thịt gà và cà rốt",
                    "khối_lượng_calo": 489.0,
                    "khối_lượng_thức_ăn": 122.25
                }
            ],
            "Bữa tối": [
                {
                    "món": "Cá basa nướng",
                    "khối_lượng_calo": 558.85,
                    "khối_lượng_thức_ăn": 139.71
                },
                {
                    "món": "Rau xà lách",
                    "khối_lượng_calo": 139.71,
                    "khối_lượng_thức_ăn": 34.93
                },
                {
                    "món": "Cơm gạo lứt",
                    "khối_lượng_calo": 279.43,
                    "khối_lượng_thức_ăn": 69.86
                }
            ]
        }
    }
}
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



          
        }, // nextHandler
        error: (err) => {
          console.log(err);
          return
        }, // errorHandler
      })
      // đoan này dùng data cứng - đưa lên trên thay this.dataApi -> res(data lấy từ api)
      this.healths = this.formatDataApi(this.dataApi); // customer lại data Api để render UI
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
