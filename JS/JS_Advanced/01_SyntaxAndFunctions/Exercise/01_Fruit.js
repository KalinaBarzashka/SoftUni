function main(typeOfFood, weightGrams, pricePerKg)
{
  let kg = weightGrams / 1000;
  let total = kg * pricePerKg;

  console.log(`I need $${total.toFixed(2)} to buy ${kg.toFixed(2)} kilograms ${typeOfFood}.`);
}