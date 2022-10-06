import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  output: string = '';
  sum: number;
  final = [];
  oil = 0;
  bushels = 0;
  turnsLeft = 0;
  foodProduction = 0;
  oilProduction = 0;
  foodToProduce = 0;
  oilToProduce = 0;
  foodOnHand = 0;
  oilOnHand = 0;
  totalFood = 0;
  totalOil = 0;
  turnsOnHand = 0;
  datetime = new Date(new Date().toUTCString()).toISOString();
  timeLocal = new Date(this.datetime).toLocaleString();
  isoTime = new Date().toISOString();
  parse(event: any) {
    this.oil = 0;
    this.final = [];
    this.bushels = 0;
    this.sum = 0;

    let value = event.target.value;
    let lines = value.split('\n');
    this.final = [];

    this.sum = 0;
    for (let line of lines) {
      console.log(line);
      let amountAndPrice = line
        .match(/([0-9,$.(])/g)
        .join('')
        .split('(')[0]
        .split('$');
      let amount = parseInt(amountAndPrice[0].replaceAll(',', ''));
      let type = '';
      if (line.includes('Bushels')) {
        this.bushels += amount;
        type = 'Bushels';
      }
      if (line.includes('Barrels')) {
        this.oil += amount;
        type = 'Oil';
        //hmm
      }
      if (!type) {
        type = 'Not oil or bushels :P';
      }
      let price = parseInt(amountAndPrice[1]);
      let total = amount * price * 0.94;
      this.sum += total;
      this.final.push({ total: Math.ceil(total), type });
    }
    this.calcTotalOil();
    this.calcTotalFood();
  }

  daysLeft(event: any) {
    let daysLeft = event.target.value as number;
    this.turnsLeft = 0;
    this.turnsLeft = Math.floor(daysLeft * 78);
    this.calcFoodToProduce();
    this.calcOilToProduce();
    this.calcTotalFood();
    this.calcTotalOil();
  }

  foodProd(event: any) {
    let foodProd = event.target.value;
    this.foodProduction = 0;
    this.foodProduction = foodProd;
    this.calcFoodToProduce();
    this.calcTotalFood();
  }

  oilProd(event: any) {
    let oilProd = event.target.value;
    this.oilProduction = 0;
    this.oilProduction = oilProd;
    this.calcOilToProduce();
    this.calcTotalOil();
  }

  calcFoodToProduce() {
    this.foodToProduce = 0;
    this.foodToProduce =
      (this.turnsLeft + this.turnsOnHand) * this.foodProduction;
  }

  calcOilToProduce() {
    this.oilToProduce = 0;
    this.oilToProduce =
      (this.turnsLeft + this.turnsOnHand) * this.oilProduction;
  }

  oilHand(event: any) {
    let oilOnHand = parseInt(event.target.value);
    this.oilOnHand = 0;
    this.oilOnHand = oilOnHand;
    this.calcTotalOil();
  }
  foodHand(event: any) {
    console.log(event.target.value);
    let foodOnHand = parseInt(event.target.value);
    this.foodOnHand = 0;
    this.foodOnHand = foodOnHand;
    this.calcTotalFood();
  }

  calcTotalFood() {
    this.totalFood = 0;
    console.log('foodonhand', this.foodOnHand);
    console.log('bushels', this.bushels);
    console.log('foodToProduce', this.foodToProduce);
    debugger;
    this.totalFood = this.foodOnHand + this.bushels + this.foodToProduce;
  }
  calcTotalOil() {
    this.totalOil = 0;
    this.totalOil = this.oilOnHand + this.oil + this.oilToProduce;
  }

  calcAll() {
    this.calcFoodToProduce();
    this.calcTotalFood();
    this.calcTotalFood();
    this.calcTotalOil();
  }

  turnHand(event: any) {
    let turnsOnHand = parseInt(event.target.value);
    this.turnsOnHand = 0;
    this.turnsOnHand = turnsOnHand;
  }
}

// En Route: 41,460,512 Bushels on sale for $36 each (Arrive in 4.2 hours)
// En Route: 3,710,260 Oil Barrels on sale for $114 each (Arrive in 4.3 hours)
