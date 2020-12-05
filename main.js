let coins = 0; // #TODO: Прикрутить Куки файлы к восстановлению очков и прогрессу участника
let hard_level = 0; // Уровень сложности
let task_number = -1;// Номер выполняемого задания
let server_route = 'https://34.70.57.26:443/api/' //Максимальное количество заданий в модуле

function task_reset() {
    let reset = document.createElement('div')
    reset.style.width = '80px';
    reset.style.height = '50px';
    reset.style.backgroundColor = '#FFFFFF';
    reset.style.position = 'fixed';
    reset.style.right = '0%';
    reset.style.top = '0%';
    reset.textContent = 'Reset task';
    reset.addEventListener('click', resetTask, false);
    function resetTask() {
        console.log('reset')
        fetch(server_route+'delete_values')
        .then(function (message){
                window.location.reload()
        })
        .catch(alert);
        

    }
    return reset
}
function get_current_values() {
    
}


function updateValue(value, step) {
    value += step
    return value
}


function creteBackground() {
    let backwindow = document.createElement('div');
    backwindow.style.width = '100vw';
    backwindow.style.height = '100vh';
    backwindow.style.top = '0';
    backwindow.style.bottom = '0';
    backwindow.style.display = 'block';
    backwindow.style.position = 'fixed';
    backwindow.style.background = "url('images/Background.jpg')";
    backwindow.style.backgroundRepeat = 'no-repeat';
    backwindow.style.backgroundSize = 'cover';
    backwindow.style.zIndex = '-1';

        let repeatback = document.createElement('img');
        repeatback.src = 'images/Background.jpg';
        repeatback.style.marginLeft = '20%';
        repeatback.style.marginRight = '20%';
        repeatback.addEventListener('load', Loadback, false);
        function Loadback() {
            repeatback.setAttribute('width', '60%');
            repeatback.setAttribute('height', '100%');
            repeatback.setAttribute('z-index', '2');
        }
    backwindow.appendChild(repeatback);
    console.log('Background declare')
    return backwindow
}

// Блок с описанем текста задания
function createTextExhample() {
    let exhample = document.createElement('div');
    let heading = document.createElement('h1');
    heading.id = 'heading'
    heading.textContent = 'Привет, искатель!';
    heading.style.color = '#FFFFFF';

    let Extext = document.createElement('p');
    Extext.id = 'Extest'
    Extext.textContent = '';
    Extext.style.color = '#FFFFFF';
    Extext.style.fontSize = '24px';

    let Answer = document.createElement('p');
    Answer.id = 'Answer'
    Answer.style.color = '#FFFFFF';
    Answer.style.fontSize = '24px';
    Answer.innerHTML = `Приветствую вас, в Leveling up Py!<br/><br/>
                        Данный тренер поможет вам освоиться в столь
                        интересном и увлекательном языке программирования Python.<br/><br/>
                        Решайте задачи, копите баллы и переходите на новый уровень, собирайте ачивки и соревнуйтесь.<br/>
                        Разработчики желают вам приятной игры!<br/>
                        Нажимайте на стрелку справа и отправляйтесь на прокачку!`
    Answer.style.bottom = '0';

    exhample.appendChild(heading);
    exhample.appendChild(Extext);
    exhample.appendChild(Answer);
    console.log('Exhample declare')
    return exhample
}
// Индикатор решенной задачи
function accept_mark() {
    let mark = document.createElement('img');
    mark.id = 'mark';
    mark.style.zIndex = '1';
    mark.style.visibility = 'hidden';
    mark.style.position = 'relative';
    mark.style.top = '-120%';
    mark.style.left = '82%';
    mark.src = 'images/pngegg.png'
    mark.addEventListener('load', LoadMark, false);
    function LoadMark() {
        mark.setAttribute('width', '100px');
        mark.setAttribute('height', '100px');
        mark.setAttribute('alt', 'Coin');
        mark.setAttribute('id', 'coin');
        mark.setAttribute('z-index', '2');
    }
    return mark
}
// Поле для ответа
function createfield() {
    let fielddiv = document.createElement('div')
    fielddiv.style.height = '300px';
    let field = document.createElement('textarea');
    field.id = 'fieldarea';
    field.style.width = '80%';
    field.style.height = '100%'; 
    field.style.background = '#000';
    field.style.color = '#FFFFFF';
    field.style.fontSize = '18px';
    field.style.resize = 'none';
    field.style.marginLeft = '10%';
    field.style.marginRight = '10%';
    // Переопределение клавиши таб для поля ответа.
    field.addEventListener('keydown', function (e) {
        if (e.keyCode === 9) { // tab нажат?
            // Определение позиции
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var target = e.target;
            var value = target.value;

            // Переопределение строки, value.substring(0, start) + "\t" + value.substring(end);
            target.value = value.substring(0, start)
                + "\t"
                + value.substring(end);

            // Снова поместить курсор в правильное положение 
            this.selectionStart = this.selectionEnd = start + 1;

            // Зафиксировать курсор на выбранном положении
            e.preventDefault();
        }
    }, false);
    console.log('Field declare')
    fielddiv.appendChild(field);
    fielddiv.appendChild(accept_mark())
    return fielddiv;
}
function createBackplate(){
    let backplate = document.createElement('div');
    backplate.style.display = 'flex';
    backplate.style.justifyContent = 'space-around';
    backplate.style.marginTop = '3%';
    backplate.appendChild(printCoins());
    backplate.appendChild(createbutton());
    backplate.appendChild(nexttask());
    return backplate
}

// Кнопка отправки решения
function createbutton() {
    mark = document.getElementById('mark');
    let accept = document.createElement('div');
    accept.style.height = "auto";
    accept.style.width = "auto";

    let coin = document.createElement('img');
    coin.src = 'images/coin.gif';
    coin.addEventListener('load', LoadCoin, false);
    function LoadCoin() {
        coin.setAttribute('width', '100px');
        coin.setAttribute('height', '100px');
        coin.setAttribute('alt', 'Coin');
        coin.setAttribute('id', 'coin');
        coin.setAttribute('z-index', '2');
    }
    accept.appendChild(coin);

    coin.addEventListener('click', CheckAnswer, false);
    let message_response;
    function CheckAnswer() {
        //REST API Запрос по тексту к серверу ------------------Проверка правильности решения----------Запрос к серверу
        field = document.getElementById('fieldarea');
        coin_field = document.getElementById('pCoins');
        console.log(field.value)
        let url = server_route+'check_task';
        let data = {
            task_string: field.value,
            level: hard_level,
            task: task_number
        };
        console.log(data)
        fetch(url, {
            method: 'POST',
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (task) {
                message_response = task;
                console.log(JSON.stringify(message_response));
                if (message_response.success) {
                    alert(message_response.description)
                    coins = updateValue(coins, message_response.hard_level)
                    mark.style.visibility = 'visible';
                    //Смена визуального отображения Коинов
                    coin_field.textContent = 'Coins: ' + coins.toString()
                }
                else {
                    alert(message_response.description)
                }

            })
            .catch(alert);
        // ---------------------------------------------------------------------------------------------Запрос к серверу
    }
    console.log('Coin declare')
    return accept
}

//Кнопка перехода к следующему заданию.
function nexttask() {
    let arrow = document.createElement('img')
    arrow.src = 'images/arrow.png';
    mark = document.getElementById('mark');
    arrow.addEventListener('load', LoadArrow, false);
    function LoadArrow() {
        arrow.setAttribute('width', '100px');
        arrow.setAttribute('height', '100px');
        arrow.setAttribute('alt', 'Coin');
        arrow.setAttribute('id', 'coin');
        arrow.setAttribute('z-index', '2');
    }
    arrow.addEventListener('click', getTask, false);
    let message_response;
    function getTask() {
        //REST API Запрос по тексту к серверу -------------------------Следующее задание--------------------Запрос к серверу
        task_number += 1
        mark.style.visibility = 'hidden';
        field = document.getElementById('fieldarea'); // Для записи в поле <--------- field
        task_name = document.getElementById('heading'); // Для смены Названия <-------heading
        task_description = document.getElementById('Extest');// Для описания задачи<--Extext
        theory = document.getElementById('Answer');
        let url = server_route+'get_task'; // action = get_task-----------
        let data = {
            level: hard_level,
            task: task_number
        };
        console.log(data)
        fetch(url, {
            method: 'POST',
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (task) {
                message_response = task;
                console.log(JSON.stringify(message_response))
                field.value = message_response.result.start_field
                task_name.textContent = message_response.result.header + ' №' + message_response.result.number.toString() + ', Сложность: ' + message_response.result.hard_level;
                theory.innerHTML = message_response.result.description;
                task_number = parseInt(message_response.result.number) - 1;
                task_description.innerHTML = message_response.result.theory;
                console.log(theory)
                if (message_response.result.is_task_completed == 1) {
                    mark.style.visibility = 'visible';
                }
                else {
                    mark.style.visibility = 'hidden';
                }
            })
            .catch(alert);
        // ---------------------------------------------------------------------------------------------Запрос к серверу
    }
    return arrow
}
function printCoins() {
    let pCoins = document.createElement('h1')
    pCoins.id = 'pCoins'
    pCoins.style.fontSize = '25px';
    pCoins.style.color = '#FFFFFF';
    pCoins.textContent = 'Coins: ' + coins.toString()
    console.log('Coins visual declare')
    return pCoins
}

// Создание окна прокачки
function createShop() {
    let shopwindow = document.createElement('div');
    shopwindow.style.width = '20%';
    shopwindow.style.height = '100%';
    shopwindow.style.position = 'fixed';
    shopwindow.style.top = '0';
    shopwindow.style.display = 'flex';
    shopwindow.style.flexDirection = 'column';
    shopwindow.style.alignItems = 'center';

    let urlblock = "http://127.0.0.1:8000/api/change_lvl"; // api для смены блока задач
        let discription = document.createElement('h1');
        discription.textContent = 'Shop of Tasks';
        discription.style.fontSize = '24px';
        discription.style.color = '#FFFFFF';

        let firstblock = document.createElement('div');
        firstblock.style.width = '80%';
        firstblock.style.maxHeight = '10%';
        firstblock.style.marginTop = '3%';
        firstblock.style.backgroundColor = '#001d18';
        firstblock.style.opacity = '100%';
        firstblock.textContent = 'Простейшая алгебра Price: Basic block'; //TODO: Смена цены
        firstblock.style.fontSize = '24px';
        firstblock.style.color = '#000000';
        firstblock.style.textAlign = 'center';
        firstblock.style.paddingTop = '10%';
        firstblock.style.paddingBottom = '10%';
        firstblock.style.borderRadius = '0 10px';
        firstblock.onmouseover = function(){   
                firstblock.style.backgroundColor = '#00b899';               
        }
        firstblock.onmouseout = function(){   
            firstblock.style.backgroundColor = '#001d18';              
        }      
        firstblock.addEventListener('click', () => changeto(0), false)

        let secondblock = document.createElement('div');
        secondblock.style.width = '80%';
        secondblock.style.maxHeight = '10%';
        secondblock.style.backgroundColor = '#001d18';
        secondblock.style.marginTop = '3%';
        secondblock.textContent = 'Типы данных Python Price: 5'; //TODO: Смена цены
        secondblock.style.fontSize = '24px';
        secondblock.style.color = '#000000';
        secondblock.style.textAlign = 'center';
        secondblock.style.borderRadius = '0 10px';
        secondblock.style.paddingTop = '10%';
        secondblock.style.paddingBottom = '10%';
        secondblock.onmouseover = function(){   
            secondblock.style.backgroundColor = '#00b899';          
        }
        secondblock.onmouseout = function(){   
            secondblock.style.backgroundColor = '#001d18';            
        } 
        secondblock.addEventListener('click', () => changeto(1), false);
        
        let thirdblock = document.createElement('div');
        thirdblock.style.width = '80%';
        thirdblock.style.maxHeight = '10%';
        thirdblock.style.backgroundColor = '#001d18';
        thirdblock.style.marginTop = '3%';
        thirdblock.textContent = 'Условия и циклы Price: 15'; //TODO: Смена цены
        thirdblock.style.fontSize = '24px';
        thirdblock.style.color = '#000000';
        thirdblock.style.textAlign = 'center';
        thirdblock.style.paddingTop = '10%';
        thirdblock.style.borderRadius = '0 10px';
        thirdblock.style.paddingBottom = '10%';
        thirdblock.onmouseover = function(){   
            thirdblock.style.backgroundColor = '#00b899';               
        }
        thirdblock.onmouseout = function(){   
            thirdblock.style.backgroundColor = '#001d18';                
        } 
        thirdblock.addEventListener('click', () => changeto(2), false);

        function changeto(levelto){
            //------------------------------------------------------------Запрос на сервер
            let data = {
                level: levelto
            };
            fetch(urlblock, {
                method: 'POST',
                headers: { "content-type": "application/json; charset=utf-8" },
                body: JSON.stringify(data)
            })
                .catch(alert);
            setTimeout(function () {
                window.location.reload()
            }, 100)
            //------------------------------------------------------------Запрос на сервер
            }    
    shopwindow.appendChild(discription);
    shopwindow.appendChild(firstblock);   
    shopwindow.appendChild(secondblock);
    shopwindow.appendChild(thirdblock);
    return shopwindow
}

// Главное окно
window.onload = function () {
    let window_div = document.createElement('div');
    window_div.style.marginLeft = '25%';
    window_div.style.marginRight = '25%';
    document.body.style.margin = '0px';
    fetch(server_route+'get_values')
        .then(function (response) {
            return response.json();
        })
        .then(function (task) {
            message_response = task;
            console.log(JSON.stringify(message_response));
            coins = message_response.coins;
            hard_level = message_response.level;
            task_number = message_response.task;

            
            window_div.appendChild(task_reset());
            window_div.appendChild(createTextExhample());
            window_div.appendChild(createfield());
            window_div.appendChild(createBackplate());
        })
        .catch(alert);
    document.body.appendChild(creteBackground());
    document.body.appendChild(createShop());
    document.body.appendChild(window_div);
}
