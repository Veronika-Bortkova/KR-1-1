let form = document.getElementById("formNameValuePair");
let selectNameValue = document.getElementById("myList");
let inputNameValuePair = document.getElementById("InputNameValuePair");
let buttonAdd = document.getElementById("buttonAdd");
let DivInCorrectFormat = document.getElementById("inCorrectFormat");
let btns = document.getElementsByTagName("button");
let input = document.getElementById("InputNameValuePair");
let divDeleteText = document.getElementById("deleteText");
let pTexForFieldAndroid = document.getElementById("texForFieldAndroid");


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
                DivInCorrectFormat.innerText = "Enter the information in the correct format";// если в строке нет знака "=" или их больше одного, выдаю сообщение об ошибке
            } else {
                let Name_Value = value.split("=");
                if (!/^[\p{L}\p{N}][\p{L}\p{N}]*\s*$/u.test(Name_Value[0]) || !/^\s*[\p{L}\p{N}]+$/u.test(Name_Value[1])){//делаю проверку строк до знака равно и после. Строка находящаяся до знака "=" должна начинаться только с численно-буквенных символов, далее содержать любое (в том числе ноль) кол-во буквенно-числовых символов, конец строки - любое кол-во пробелов. После знака "=" строка должна начинаться с любого кол-ва пробелов (в том числе ноль - ни одного пробела), далее любое кол-во буквенно-численных символов, но не менее одного символа. Юникод флаг для того чтобы работало для букв и чисел любого алфавита.
                    DivInCorrectFormat.innerText = "Enter the information in the correct format";
                 } else{
                    DivInCorrectFormat.innerText ="";//убираю сообщение об ошибке
                    let optionPair = document.createElement("option");
                    optionPair.innerText =(Name_Value[0]+"="+Name_Value[1]).replaceAll(" ","");//формирую строку, которую кладем в список, убираю пробелы перед и до знака "="
                    selectNameValue.append(optionPair);
                     }
            }
})


