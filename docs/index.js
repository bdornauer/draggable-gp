const draggableItemsContainer = document.querySelector('ul');

function initDragAndDrop() {
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
        if (e.target.dataset.index) {
            e.target.classList.remove('dragover');
        }
    });
    draggableItemsContainer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.index); // data-index
        e.target.classList.add('dragged');
    });
// ...
    draggableItemsContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    draggableItemsContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        e.target.classList.remove('dragover');
        const index1 = e.dataTransfer.getData('text/plain');
        const index2 = e.target.dataset.index;
        swap(index1, index2);
        // TODO: HTML-Elemente tauschen
    });

    function swap(index1, index2) {
        const elements = draggableItemsContainer.children;
        let arr = [];
        for (let i = 0; i < elements.length; i++) {
            arr.push(elements[i].dataset.index);
        }

        elements[index2 - 1].insertAdjacentElement('afterend', elements[index1 - 1]);

        for (let i = 0; i < elements.length; i++) {
            if (index1 == arr[i]) {
                //logic < >
                // elements[i].insertAdjacentElement('afterend',elements[index2]);
                console.log(arr[i]);
            }
        }
        console.log(arr);
    }

}

function initTouch() {
    let initialX = 0;
    let initialY = 0;
    let lastX = 0;
    let lastY = 0;

    draggableItemsContainer.addEventListener('touchstart', (e) => {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;

        e.target.classList.add('dragged');
    });

    let currentSelectedElement;
    draggableItemsContainer.addEventListener('touchmove', (e) => {
        const x = e.touches[0].clientX - initialX;
        const y = e.touches[0].clientY - initialY;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;

        const elementList = document.elementsFromPoint(lastX, lastY)

        if (elementList[1].hasAttribute('draggable')) {
            elementList[1].classList.add('dragover');
        }

        const childs = draggableItemsContainer.children;

        for (let i = 0; i < childs.length; i++) {
            if (elementList[1] !== childs[i]) {
                childs[i].classList.remove('dragover')
            }
        }

        e.target.style.transform = "translate(" + x + "px, " + y + "px)";
    });

    draggableItemsContainer.addEventListener('touchend', (e) => {
        const elementList = document.elementsFromPoint(lastX, lastY)
        e.target.classList.remove('dragged');
        elementList[1].classList.remove('dragover');

        if (elementList.length > 1 && elementList[1].hasAttribute('draggable')) {
            // die swapItems Funktion wurde bereits in Aufgabe 1b von Ihnen erstellt
            //swapItems(e.target.dataset.index, elementList[1].dataset.index);
        }

        e.target.style.transform = "translate(0px, 0px)";
    });


}

//https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
window.addEventListener('load', (event) => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log("---> mobile device");
        initTouch();
    } else {
        // false for not mobile device
        console.log("---> not desktop device");
        initDragAndDrop();
    }
});





