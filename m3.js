let converter = document.querySelectorAll('.have>.buttons>.button>.button-hidden');
let purchase = document.querySelectorAll('.purchase>.buttons>.button>.button-hidden');
let leftRate = document.querySelector('.rate-have');
let rightRate = document.querySelector('.rate-purchase');
let sumHave = document.querySelector('.text-sum-have');
let sumPurchase = document.querySelector('.text-sum-purchase');


// let currencyBtnHave = converter[i].parentNode.querySelector('.currency-button').innerHTML;
// let currencyBtnPurcharse = purchase[j].parentNode.querySelector('.currency-button').innerHTML;
// let checkedHave = converter[i].parentNode.querySelector('.button-hidden').checked;
// let checkedPurcharse = purchase[j].parentNode.querySelector('.button-hidden').checked;

let buttonHidden = document.querySelectorAll('.button-hidden');

setRightValue();

buttonHidden.forEach((element) => {
    element.addEventListener('change', () => {
        setRightValue();

    })
})

sumHave.addEventListener ('keyup',setRightValue);

function setLeftValue () {
    let leftCurency = document.querySelector('.converter .button-hidden:checked');
    let rightCurency = document.querySelector('.purchase .button-hidden:checked');

    let rightValue = sumPurchase.value;

    fetch(`https://api.exchangerate.host/latest?base=${rightCurency.value}&symbols=${leftCurency.value}`)
        .then(response => response.json())
        .then(data => {

            sumHave.value=rightValue*data.rates[leftCurency.value];

            console.log(rightValue*data.rates[leftCurency.value]);
            console.log(rightValue, leftCurency)
        })
}
sumPurchase.addEventListener ('keyup', setLeftValue);

function setRightValue() {
    let leftCurency = document.querySelector('.converter .button-hidden:checked');
    let rightCurency = document.querySelector('.purchase .button-hidden:checked');

    let leftValue = sumHave.value;

    fetch(`https://api.exchangerate.host/latest?base=${rightCurency.value}&symbols=${leftCurency.value}`)
        .then(response => response.json())
        .then(data => {
            
            sumPurchase.value = leftValue*data.rates[leftCurency.value];

            // let rubRate = 1 / `${data.rates[leftCurency.value]}`;
            // leftRate.value = `1 ${leftCurency.value} = ${rubRate.toFixed(4)} ${rightCurency.value}`;

            // rightRate.value = `1 ${rightCurency.value} = ${data.rates[leftCurency.value].toFixed(4)} ${leftCurency.value}`;

            // let textSumHave = sumPurchase.value * data.rates[leftCurency.value].toFixed(4);
            // sumHave.value = textSumHave.toFixed(4);

            // let textSumPurchase = sumHave.value / data.rates[leftCurency.value].toFixed(4);
            // sumPurchase.value = textSumPurchase.toFixed(4);


            // recalculationPurcharse(sumHave, sumPurchase, data.rates[leftCurency.value]);

            // recalculationHave(sumPurchase, sumHave, data.rates[leftCurency.value]);
        })

}



function recalculationHave(inputAmount, calculationAmount, rate) {
    //usd -> rub
    inputAmount.removeEventListener('keyup', addEventLeft)

    function addEventLeft () {
        let textSumHave = inputAmount.value * rate.toFixed(4);
        calculationAmount.value = textSumHave.toFixed(4);
    }
    inputAmount.addEventListener('keyup', addEventLeft)
}

function recalculationPurcharse(inputAmount, calculationAmount, rate) {
    //rub -> usd
    inputAmount.removeEventListener('keyup',addEventRight)

    function addEventRight() {
        let textSumPurchase = inputAmount.value / rate.toFixed(4);
        calculationAmount.value = textSumPurchase.toFixed(4);
    }
    inputAmount.addEventListener('keyup', addEventRight)

}







// change - смена валюты. вызывать функцию getRate при срабатывании данного события