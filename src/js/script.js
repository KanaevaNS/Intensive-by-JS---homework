const switcher = document.querySelector('#cbx'), //выбор по id
    more = document.querySelector('.more'), //выбор по классу, первый и единственный элемент который попался в верстке
    modal = document.querySelector('.modal'),
    videos = document.querySelectorAll('.videos__item');
let player;

function bindSlideToggle(trigger, boxBody, content, openClass) {
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };
    const box = document.querySelector(boxBody),
        boxContent = document.querySelector(content);
    //menu слушатель события: следи за элементом и при нажатии на него делай следующее
    button.element.addEventListener('click', () => {
        if (button.active === false) { // проверка меню на неактивность
            button.active = true; //если не активна - включить
            //позволяет получить высоту
            box.style.height = boxContent.clientHeight + 'px';
            //достучатсья до всех классов элемента
            box.classList.add(openClass); // активный класс для меню
        } else {
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass);
        }
    });
}
//дата атрибуты в [], классы селектора .head
bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function switchMode() {
    if (night === false) {
        night = true;
        //document.body.style.backgroundColor = '#000';
        document.body.classList.add('night'); //класс night уже закоготвлен
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#fff'; // присутствует атрибут stroke в теге
        });
        //возьмет все теги line внутри гамбургера. форич - для каждой
        // конструкция из е6 стандарта item => { которая будет запускаться и что-то делать

        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#fff';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#fff';
        });

        document.querySelector('.header__item-descr').style.color = '#fff';

        document.querySelector('.logo > img').src = 'logo/youtube_night.svg';

    } else {
        night = false;
        document.body.classList.remove('night');
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#000';
        });

        // videos__item-descr класс который есть у каждого заголовка видео
        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#000';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#000';
        });

        document.querySelector('.header__item-descr').style.color = '#000';
        document.querySelector('.logo > img').src = 'logo/youtube.svg';
    }
}

let night = false;
switcher.addEventListener('change', () => { // так там прописан чекбокс, то ставим change вместо клик
    switchMode();
});

const data = [
    ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
    ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов', '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2', '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
    ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
    ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
];

more.addEventListener('click', () => {
    //враппер - это обертка
    const videosWrapper = document.querySelector('.videos__wrapper');
    more.remove();

    for (let i = 0; i < data[0].length; i++) {
        let card = document.createElement('a');
        card.classList.add('videos__item', 'videos__item-active');
        card.setAttribute('data-url', data[3][i]);
        // интерполяция косые кавычки `` для вставки кода
        card.innerHTML = `
        <img src="${data[0][i]}" alt="thumb">
        <div class="videos__item-descr">
            ${data[1][i]}
        </div>
        <div class="videos__item-views">
            ${data[2][i]}
        </div>
        `;
        //команда appendChild помещает элемент в конец другого элемента
        videosWrapper.appendChild(card);
        setTimeout(() => {
            card.classList.remove('videos__item-active');
        }, 10); // тайммаут на 10 милисекунд
    }

});