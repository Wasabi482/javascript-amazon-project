import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

//Object that contains all the delivery options available
export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0 
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

//Get deliveryOptionId and compares it to all the deliveryOption object. 
//If it matches return the option, if not return the first option which is the default.
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });

    return deliveryOption || deliveryOptions[0];
}

//get the date and check if it is a weekend
function isWeekend(date){
  // Get the full name of the day (e.g., "Monday")
  const dayOfWeek = date.format('dddd');
  // Returns true if it's a weekend
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

//Asign the deliverydays to remaining days variable.
//Asign dayjs to deliverydate which is the date today.
export function calculateDeliveryDate(deliveryOption) {
  // Number of delivery days required
 let remainingDays = deliveryOption.deliveryDays;
 // Get today's date using dayjs
 let deliveryDate = dayjs();

 //As long as remaining days is greater than 0 keep decreasing the remaining days, skipping the weekends
 while (remainingDays > 0){
   // Move to the next day
  deliveryDate = deliveryDate.add(1, 'day');
  if(!isWeekend(deliveryDate)) {
    // Decrease remaining delivery days
    remainingDays--;
  }
 }

//format the delivery date
 const dateString = deliveryDate.format(
  'dddd, MMMM D'
 );

 return dateString;
}