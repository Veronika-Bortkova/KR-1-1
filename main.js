let form = document.getElementById("formNameValuePair");
let selectNameValue = document.getElementById("myList");
let inputNameValuePair = document.getElementById("InputNameValuePair");
let buttonAdd = document.getElementById("buttonAdd");
let DivInCorrectFormat = document.getElementById("inCorrectFormat");
let btns = document.getElementsByTagName("button");
let input = document.getElementById("InputNameValuePair");
let divDeleteText = document.getElementById("deleteText");
let pTexForFieldAndroid = document.getElementById("texForFieldAndroid");
let buttonSortByName = document.getElementById("SortByName");
let buttonSortByValue = document.getElementById("SortByValue");
let buttonDelete = document.getElementById("delete");
let select = document.getElementById("myList");


    input.addEventListener("dblclick", function (){//настраиваю, чтобы по двойному щелчку ЛКМ выделялось все содержание инпута
        this.select();
    });
if ((navigator.userAgentData && navigator.userAgentData.mobile||/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
)){//делаю проверку на то с какого устройства открыто приложение, что бы поставить разный текст у поля и кнопок на декстопе и мобильных устройствах (из-за того, что селект мультиплай отображается (заменяется) на мобильных браузерах не так, как на декстопе). Сделать это без джаваскрипта только брекпоинтами не получается, потому что брекпоинты мобильных устройств и лаптопов пересекаются. Делаю проверку по userAgentData и по userAgent потому что userAgentData поддерживается не всеми браузерами
    divDeleteText.innerText = "(Delete selected)";
    pTexForFieldAndroid.innerText = "(Tap the field below ↓ to view the full list and select pairs)";
} else {
    divDeleteText.innerText = "(Ctrl+Click to select, Delete to remove)";
    pTexForFieldAndroid.innerText = "";
}

for (const btn of btns) {
    btn.addEventListener("touchstart", () => {// настройки скейла кнопок при нажатии прописанные в css срабатывают не во всех браузерах, поэтому добавляю здесь
        btn.style.transform = "scale(0.8)";
    });
    btn.addEventListener("touchend", () => {
        btn.style.transform = "scale(1)";
    });
}


form.addEventListener("submit",function (ev){
    ev.preventDefault();

    let value = inputNameValuePair.value;
    let arrNumberEqualSigns = [];
        for (const element of value) {
            if (element === "=") {//проверяю есть ли во введенной строке знак "="
                arrNumberEqualSigns.push(element);
            }
        }
            if (arrNumberEqualSigns.length!=1){
                DivInCorrectFormat.innerText = "Enter the information in the correct format";// если в строке нет знака "=" или их больше одного, выдаю сообщение о том, чтобы ввели текст в правильном формате
            } else {
                let Name_Values = value.split("=");
                if (!/^[\p{L}\p{N}][\p{L}\p{N}]*\s*$/u.test(Name_Values[0]) || !/^\s*[\p{L}\p{N}]+$/u.test(Name_Values[1])){//делаю проверку строк до знака равно и после. Строка находящаяся до знака "=" должна начинаться только с буквенно-цифровых символов, далее содержать любое (в том числе ноль) кол-во буквенно-цифровых символов, конец строки - любое кол-во пробелов. После знака "=" строка должна начинаться с любого кол-ва пробелов (в том числе ноль - ни одного пробела), далее любое кол-во буквенно-цифровых символов, но не менее одного символа. Юникод флаг для того чтобы работало для букв и чисел любого алфавита.
                    DivInCorrectFormat.innerText = "Enter the information in the correct format";
                 } else{
                    DivInCorrectFormat.innerText =" ";//убираю сообщение о том, чтобы ввели текст в правильном формате
                    let optionPair = document.createElement("option");
                    optionPair.innerText =(Name_Values[0]+"="+Name_Values[1]).replaceAll(" ","");//формирую строку, которую кладем в список, убираю пробелы перед и до знака "="
                    selectNameValue.append(optionPair);
                     }
            }
})

buttonSortByName.addEventListener("click", function (){
    let arrNameValue = Array.from(select.options).map(value => value.value.split("="));//получаю массив, в котором каждый элемент это массив из двух элементов - имя и значение
    let arrSortNameValue =arrNameValue.sort((a,b) => a[0].localeCompare(b[0], undefined, { numeric: true})).map(value => value[0]+"="+value[1]); //сортирую массив по элементам с именем по методу localeCompare, локаль прописываю как undefined чтобы метод использовал системную/браузерную локаль, потому что в настройках проверки синтаксиса перед добавлением пары у меня указано принимать буквенно-цифровые символы любого алфавита; в обьекте настроек для localeCompare указываю чтобы числа внутри строк сравнивались как числа. Мепом собираю новый массив, в элементы которого записываю строки вида имя=значение
    select.innerHTML = "";
    arrSortNameValue.forEach(value => {
        let optionPair = document.createElement("option");
        optionPair.innerText = value;
        select.append(optionPair);
    })
})

buttonSortByValue.addEventListener("click", function (){
    let arrNameValue = Array.from(select.options).map(value => value.value.split("="));
    let arrSortNameValue =arrNameValue.sort((a,b) => a[1].localeCompare(b[1], undefined, { numeric: true})).map(value => value[0]+"="+value[1]);
    select.innerHTML = "";
    arrSortNameValue.forEach(value => {
        let optionPair = document.createElement("option");
        optionPair.innerText = value;
        select.append(optionPair);
    })
})

buttonDelete.addEventListener("click", function (){
    let arrSelectedOptions = Array.from(select.selectedOptions).forEach(value => value.remove());//создаю массив из коллекции DOM 'элементов option, так как в массиве лежат ссылки на эти элементы, то удаляю их прямо из массива
})






