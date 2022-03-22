function tabs(tabsSelector, tabsContentSelector, activeClass) {
    const tabHeaderTitles = document.querySelectorAll(tabsSelector);
    const tabHeaderItem = document.querySelectorAll(tabsContentSelector) ;

    tabHeaderTitles.forEach((item, i) => {       //берем каждое загалвие
        item.addEventListener('click', e => {  // добавляем событие клика на него
            e.preventDefault();                  // убираем стандартные действия
            tabHeaderTitles.forEach(name => {      // проходимся по всем заглавиям и убираем класс tabheader__item_active если он есть у кого-то
                name.classList.remove(activeClass);
            });
            item.classList.add(activeClass);   // добавляем элементу на который нажали класс tabheader__item_active
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
}

export default tabs;