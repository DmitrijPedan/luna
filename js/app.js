// Алгоритм Луна:

const getUserInput = () => {
    let input = document.getElementById('userInput').value;
    let result;
    input == +input && input.split('').length == 16 ? result = input.split('').map(el => +el) : alert ('Неправильный ввод. Проверьте номер карты.');
    return result;
};

const getCardVerification = (arr) => {
    let stepOne = arr.map((el, ind) => ind % 2 == 0 ? el = el*2 : el = el);
    let stepTwo = stepOne.map((el) => el > 9 ? el = el - 9 : el = el);
    let summ = stepTwo.reduce((acc, el) => acc + el);
    summ % 10 == 0 ? result = true : result =  false;
    return result;
}

const getPaySystem = (arr) => {
    let number = Number(arr.splice(0,1).join(''))
    number == 3 ? result = 'American Express' : null;
    number == 4 ? result = 'VISA' : null;
    number == 5 ? result = 'Master card' : null;
    return result;
}

const createHTMLNode = (tag, attrs, inner) => {
    const element = document.createElement(tag);
    attrs.map(attr => {element.setAttribute(attr.name, attr.value.join(' '))});
    inner
        ?
            Array.isArray(inner) ? inner.map(el => element.appendChild(el)):
                element.innerHTML=inner
                :null;
    return element;
}

const renderApp = () => {
    let cardNumber = getUserInput();
    let card = getCardVerification(cardNumber)
    let p2 = createHTMLNode('p', [{name: 'class', value:['card-number']}], `${cardNumber.join('')}`);
    if (card) {
        let p1 = createHTMLNode('p', [{name: 'class', value:['message-success']}], 'Карта прошла проверку');
        let h3 = createHTMLNode('h3', [], `${getPaySystem(cardNumber)}`);
        let message = createHTMLNode('div', [{name: 'class', value:['card-success']}], [h3,p2,p1]);
        document.getElementById('app').prepend(message);
    } else {
        let p1 = createHTMLNode('p', [{name: 'class', value:['message-fail']}], 'Карта не прошла проверку');
        let h3 = createHTMLNode('h3', [], 'No pay system');
        let message = createHTMLNode('div', [{name: 'class', value:['card-fail']}], [h3,p2,p1]);
        document.getElementById('app').prepend(message);
    }
}

checkButton.onclick = renderApp;
