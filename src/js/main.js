window.addEventListener('DOMContentLoaded' , () => {

    // TABS starts

    const tabHeaderTitles = document.querySelectorAll('.tabheader__items .tabheader__item');
    const tabHeaderItem = document.querySelectorAll('.tabcontent') ;

    tabHeaderTitles.forEach((item, i) => {       //берем каждое загалвие
        item.addEventListener('click', e => {  // добавляем событие клика на него
            e.preventDefault();                  // убираем стандартные действия
            tabHeaderTitles.forEach(name => {      // проходимся по всем заглавиям и убираем класс tabheader__item_active если он есть у кого-то
                name.classList.remove('tabheader__item_active');
            });
            item.classList.add('tabheader__item_active');   // добавляем элементу на который нажали класс tabheader__item_active
            tabHeaderItem.forEach((item, index) => {   // проходимся по массиву контентов табов
                item.classList.remove('show' , 'fade');   // убираем у всех класс показа
                item.classList.add('hide');        // добавляем класс скрытия
                if (index == i) {          // если же индекс контента совпадает с индексом заглавия на которое нажали добавляем ему класс показа и убираем класс скрытия
                    item.classList.remove('hide');
                    item.classList.add('show', 'fade');
                }
            });
        });
    });

    //TABS ends

    //TIMER stars

    const deadline = '2022-05-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((t / (1000 * 60)) %  60);
        const seconds = Math.floor((t / 1000) %  60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <=0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //TIMER ends

    //MODAL starts

    const modal = document.querySelector('.modal');
    const btnOpenModal = document.querySelectorAll('[data-modal]');
    const btnCloseModal = document.querySelector('[data-close]');

    btnOpenModal.forEach(openBtn => {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal();
        });
    });

    btnCloseModal.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    modal.addEventListener('click', e => {
        if(e.target && e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });


    function showModal() {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


    const modalTimerId = setTimeout(showModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //MODAL ends

    

});

