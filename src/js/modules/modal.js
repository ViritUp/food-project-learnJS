function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }

}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    const btnOpenModal = document.querySelectorAll(triggerSelector);

    btnOpenModal.forEach(openBtn => {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal(modalSelector, modalTimerId);
        });
    });

    modal.addEventListener('click', e => {
        if(e.target && e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', e => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {showModal};