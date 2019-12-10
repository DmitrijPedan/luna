console.log('luna is started...');

let cardNum = [4,1,4,9,4,9,7,8,7,3,3,2,7,7,4,8];
let cardNumRev = [];

//реверс массива
for (let i = cardNum.length - 1; i >= 0; i--) {
    cardNumRev.push(cardNum[i]);
}

// умножаем на 2 все четные элементы, если результат больше 9 то вычитаем 9
for (let i = 1; i < cardNumRev.length; i += 2) {
    cardNumRev[i] *= 2;
    if (cardNumRev[i] > 9) {
        cardNumRev[i] = cardNumRev[i] - 9;
    } 
}
//суммируем все элементы
 let summ = 0;
 for(let i = 0; i < cardNumRev.length; i++) {
     summ += cardNumRev[i];
}

(summ % 10 == 0)?alert('Номер указан верно'):alert('Номер указан неверно');

console.log(cardNum);
console.log(cardNumRev);
console.log(summ);