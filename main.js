let form = document.getElementById("formNameValuePair");
let selectNameValue = document.getElementById("myList");
let inputNameValuePair = document.getElementById("InputNameValuePair");
// let buttonAdd = document.getElementById("buttonAdd");
let DivInCorrectFormat = document.getElementById("inCorrectFormat");
let btns = document.getElementsByTagName("button");
let input = document.getElementById("InputNameValuePair");
let divDeleteText = document.getElementById("deleteText");
let pTexForFieldAndroid = document.getElementById("texForFieldAndroid");
let buttonSortByName = document.getElementById("SortByName");
let buttonSortByValue = document.getElementById("SortByValue");
let buttonDelete = document.getElementById("delete");
let select = document.getElementById("myList");


    input.addEventListener("dblclick", function (){//Налаштовую, щоб подвійним кліком ЛКМ виділявся весь вміст інпута
        this.select();
    });
if ((navigator.userAgentData && navigator.userAgentData.mobile||/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
)){//Роблю перевірку, з якого пристрою відкрито застосунок, щоб поруч із полем та кнопками встановлювався різний текст на десктопі й мобільних пристроях (через те, що select multiply відображається/замінюється в мобільних браузерах не так, як на десктопі). Зробити це лише брейкпоінтами без JavaScript не виходить, бо брейкпоінти мобільних пристроїв і ноутбуків перетинаються. Виконую перевірку через userAgentData та через userAgent, оскільки userAgentData підтримується не всіма браузерами.
    divDeleteText.innerText = "(Delete selected)";
    pTexForFieldAndroid.innerText = "(Tap the field below ↓ to view the full list and select pairs)";
} else {
    divDeleteText.innerText = "(Ctrl+Click to select, Delete to remove)";
    pTexForFieldAndroid.innerText = "";
}

for (const btn of btns) {
    btn.addEventListener("touchstart", () => {// Налаштування масштабу кнопок при натисканні, прописані в CSS, спрацьовують не у всіх мобільних браузерах, тому додаю це тут
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
            if (element === "=") {//Перевіряю, чи є у введеному рядку знак "="
                arrNumberEqualSigns.push(element);
            }
        }
            if (arrNumberEqualSigns.length!=1){
                DivInCorrectFormat.innerText = "Enter the information in the correct format";// Якщо у рядку немає знака "=" або їх більше одного, видаю повідомлення про те, щоб ввели текст у правильному форматі
            } else {
                let Name_Values = value.split("=");
                if (!/^[\p{L}\p{N}][\p{L}\p{N}]*\s*$/u.test(Name_Values[0]) || !/^\s*[\p{L}\p{N}]+$/u.test(Name_Values[1])){//роблю перевірку рядків до знака рівності та після. Рядок, що знаходиться до знака "=", має починатися лише з буквено‑цифрових символів, далі містити будь‑яку (в тому числі нуль) кількість буквено‑цифрових символів, кінець рядка — будь‑яку кількість пробілів. Після знака "=" рядок має починатися з будь‑якої кількості пробілів (у тому числі нуль — жодного пробілу), далі будь‑яка кількість буквено‑цифрових символів, але не менше одного символу. Unicode флаг потрібен для того, щоб працювало для букв і чисел будь‑якого алфавіту
                    DivInCorrectFormat.innerText = "Enter the information in the correct format";
                 } else{
                    DivInCorrectFormat.innerText =" ";//прибираю повідомлення про те, щоб ввели текст у правильному форматі
                    let optionPair = document.createElement("option");
                    optionPair.innerText =(Name_Values[0]+"="+Name_Values[1]).replaceAll(" ","");//формую рядок, який кладемо в список, прибираю пробіли перед і до знака "="
                    selectNameValue.append(optionPair);
                     }
            }
})

buttonSortByName.addEventListener("click", function (){
    let arrNameValues = Array.from(select.options).map(value => value.value.split("="));//отримую масив, у якому кожен елемент — це масив із двох елементів: ім’я та значення
    let arrSortNameValues =arrNameValues.sort((a,b) => a[0].localeCompare(b[0], undefined, { numeric: true})).map(value => value[0]+"="+value[1]); //сортую масив за елементами з іменем методом localeCompare, локаль прописую як undefined, щоб метод використовував системну/браузерну локаль, тому що в налаштуваннях перевірки синтаксису перед додаванням пари в мене вказано приймати буквено‑цифрові символи будь‑якого алфавіту; в об’єкті налаштувань для localeCompare зазначаю, щоб числа всередині рядків порівнювалися як числа. Maпом збираю новий масив, у елементи якого записую рядки виду ім’я=значення
    select.innerHTML = "";
    arrSortNameValues.forEach(value => {
        let optionPair = document.createElement("option");
        optionPair.innerText = value;
        select.append(optionPair);
    })
})

buttonSortByValue.addEventListener("click", function (){
    let arrNameValues = Array.from(select.options).map(value => value.value.split("="));
    let arrSortNameValues =arrNameValues.sort((a,b) => a[1].localeCompare(b[1], undefined, { numeric: true})).map(value => value[0]+"="+value[1]);
    select.innerHTML = "";
    arrSortNameValues.forEach(value => {
        let optionPair = document.createElement("option");
        optionPair.innerText = value;
        select.append(optionPair);
    })
})

buttonDelete.addEventListener("click", function (){
    Array.from(select.selectedOptions).forEach(value => value.remove());//cтворюю масив із колекції DOM‑елементів option, оскільки в масиві лежать посилання на ці елементи, то видаляю їх прямо з масиву
})






