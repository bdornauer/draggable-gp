function initDragAndDrop() {
    const draggableItemsContainer = document.querySelector('ul');

    draggableItemsContainer.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragged');
    });

    draggableItemsContainer.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragged');
    });

    draggableItemsContainer.addEventListener('dragenter', (e) => {
        if (e.target.dataset.index) {
            e.target.classList.add('dragover');
        }
    });

    draggableItemsContainer.addEventListener('dragleave', (e) => {
        if (e.target.dataset.index) { //access data in the data-index set
            e.target.classList.remove('dragover');
        }
    });

    draggableItemsContainer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.index); // data-index
        e.target.classList.add('dragged');
    });

    draggableItemsContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });


    draggableItemsContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        const index1 = e.dataTransfer.getData('text/plain');
        const index2 = e.target.dataset.index;
        console.log(index1);
        console.log(index2);
        swap(index1, index2);
        // TODO: HTML-Elemente tauschen
    });

    function swap(index1, index2) {
        const e1 = draggableItemsContainer.querySelector(`[data-index="${index1}"]`);
        const e2 = draggableItemsContainer.querySelector(`[data-index="${index2}"]`);
        //TODO: swap!

        e2.insertAdjacentElement("afterend", e1);
    }
}

function initTouch() {
    const draggableItemsContainer = document.querySelector('ul');
    let initialX = 0;
    let initialY = 0;
    let lastX = 0;
    let lastY = 0;

    draggableItemsContainer.addEventListener('touchstart', (e) => {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
    });
    draggableItemsContainer.addEventListener('touchmove', (e) => {
        const x = e.touches[0].clientX - initialX;
        const y = e.touches[0].clientY - initialY;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        e.target.style.transform = "translate(" + x + "px, " + y + "px)";
    });
    draggableItemsContainer.addEventListener('touchend', (e) => {
        const elementList = document.elementsFromPoint(lastX, lastY)
        if (elementList.length > 1 && elementList[1].hasAttribute('draggable')) {
            // die swapItems Funktion wurde bereits in Aufgabe 1b von Ihnen erstellt
            swapItems(e.target.dataset.index, elementList[1].dataset.index);
        }
        e.target.style.transform = "translate(0px, 0px)";
    });
}

initTouch();

