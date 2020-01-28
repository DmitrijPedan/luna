// Алгоритм Луна:
const createHTMLNode = (tag, attrs, inner) => {
    const element = document.createElement(tag);
    attrs.map(attr => {element.setAttribute(attr.name, attr.value.join(' '))});
    inner
        ?
            Array.isArray(inner) ? inner.map(el => element.appendChild(el)):
                element.innerHTML=inner
                :null;
    return element;
};

const getHeader = () => {
    const col = createHTMLNode ('div', [{name: 'class', value:['col', 'title']}], [
        createHTMLNode ('h3', [], 'Проверка банковких карт согласно алгоритму Луна.'),
        createHTMLNode ('a', [{name: 'href', value:['https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC_%D0%9B%D1%83%D0%BD%D0%B0#%D0%9E%D1%80%D0%B8%D0%B3%D0%B8%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC,_%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9_%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D0%BE%D0%BC']}], 'Подробнее здесь')
        ]);
    const row = createHTMLNode ('div', [{name: 'class', value:['row']}], [col])
    const container = createHTMLNode ('div', [{name: 'class', value:['container']}], [row])
    const header = createHTMLNode ('header', [], [container]);
    document.getElementById('app').appendChild(header);
};

const getFooter = () => {
    const span = createHTMLNode ('span', [], `&#169 dmitrijpedan.github.io, ${new Date ().getFullYear()}`);
    const col = createHTMLNode ('div', [{name: 'class', value:['col']}], [span])
    const row = createHTMLNode ('div', [{name: 'class', value:['row']}], [col])
    const container = createHTMLNode ('div', [{name: 'class', value:['container']}], [row])
    const footer = createHTMLNode ('footer', [], [container]);
    document.getElementById('app').appendChild(footer);
};

const getMain = () => {
    const rowCards = createHTMLNode ('div', [{name: 'class', value:['row']}], [
        createHTMLNode ('div', [{name: 'class', value:['col']}], [
            createHTMLNode ('div', [{name: 'class', value:['cards']}, {name: 'id', value:['output']}], null)])
    ])
    const col = createHTMLNode ('div', [{name: 'class', value:['col']}], [
        createHTMLNode ('label', [{name: 'for', value:['userInput']}], 'Введите номер банковской карты:'),
        createHTMLNode ('input', [{name: 'type', value:['number']}, {name: 'class', value:['form-control']}, {name: 'id', value:['userInput']}, {name: 'placeholder', value:['16-значный номер карты']}], null),
        createHTMLNode ('div', [{name: 'class', value:['btn-wrapper']}], [
            createHTMLNode ('button', [{name: 'id', value:['checkButton']}, {name: 'type', value:['button']}, {name: 'class', value:['btn', 'btn-info']}], 'Проверить карту'),
            createHTMLNode ('button', [{name: 'id', value:['clearButton']}, {name: 'type', value:['button']}, {name: 'class', value:['btn', 'btn-danger']}], 'Очистить')
        ])
    ]);
    const rowInputs = createHTMLNode ('div', [{name: 'class', value:['row']}], [col]);
    const container = createHTMLNode ('div', [{name: 'class', value:['container']}], [rowInputs, rowCards])
    const main = createHTMLNode ('section', [], [container]);
    document.getElementById('app').appendChild(main);
};

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

const renderApp = () => {
    let cardNumber = getUserInput();
    let card = getCardVerification(cardNumber)
    let p2 = createHTMLNode('p', [{name: 'class', value:['card-number']}], `${cardNumber.join('')}`);
    if (card) {
        let p1 = createHTMLNode('p', [{name: 'class', value:['message-success']}], 'Карта прошла проверку');
        let h3 = createHTMLNode('h3', [], `${getPaySystem(cardNumber)}`);
        let message = createHTMLNode('div', [{name: 'class', value:['card-success']}], [h3,p2,p1]);
        document.getElementById('output').prepend(message);
    } else {
        let p1 = createHTMLNode('p', [{name: 'class', value:['message-fail']}], 'Карта не прошла проверку');
        let h3 = createHTMLNode('h3', [], 'No pay system');
        let message = createHTMLNode('div', [{name: 'class', value:['card-fail']}], [h3,p2,p1]);
        document.getElementById('output').prepend(message);
    }
}

const clearData = () => window.location.reload();

getHeader();
getMain();
getFooter();

checkButton.onclick = renderApp;
clearButton.onclick = clearData;

