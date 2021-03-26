const draggableItemsContainer = document.querySelector('ul');

draggableItemsContainer.addEventListener('dragstart', (e) => {
    e.target.classList.add('dragged');
});

draggableItemsContainer.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragged');
});

draggableItemsContainer.addEventListener('dragenter', (e) => {
    if (e.target.dataset.index) {
        e.target.classList.remove('dragover');
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
    swap(index1,index2);
    // TODO: HTML-Elemente tauschen
});

function swap(index1, index2){
    const e1 = draggableItemsContainer.querySelector(`[data-index="${index1}"]`);
    const e2 = draggableItemsContainer.querySelector(`[data-index="${index2}"]`);
    //TODO: swap!

    e2.insertAdjacentElement("afterend", e1);
}

