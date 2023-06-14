export default class AddCardTask {
  constructor(elementDragDrop, elementClose, manager) {
    this.elementDragDrop = elementDragDrop;
    this.elementClose = elementClose;
    this.manager = manager;
    this.addCard = this.addCard.bind(this);
    this.saveTask = this.saveTask.bind(this);
  }

  addCard(event) {
    event.preventDefault();
    this.blockAdd = event.target.closest('.block-add');
    if (this.blockAdd.previousElementSibling.classList.contains('element-input')) return;
    this.blockAdd.insertAdjacentHTML('beforebegin', `
      <div class="block-task for-grab block-task-onpoint element-input">
        <input type='text' class='input-new-task'>
        <div class="close">&#215;</div>
      </div>
    `);
    this.blockAdd.previousElementSibling.querySelector('.close').addEventListener('click', this.elementClose.dellCard);
    this.blockAdd.querySelector('.save').classList.remove('hidd');
    this.blockAdd.querySelector('.save').addEventListener('click', this.saveTask);
  }

  saveTask(event) {
    this.newElementCard = event.target.closest('.column').querySelector('.element-input');
    if (!this.newElementCard) return;
    this.textInputElement = this.newElementCard.querySelector('.input-new-task');
    if (!this.textInputElement.value) return;
    this.newElementTextTask = document.createElement('div');
    this.newElementTextTask.setAttribute('class', 'task-text');
    this.newElementTextTask.innerText = this.textInputElement.value;
    this.newElementCard.insertAdjacentElement('afterbegin', this.newElementTextTask);
    this.textInputElement.parentNode.removeChild(this.textInputElement);
    this.newElementCard.classList.remove('element-input');
    this.newElementCard.addEventListener('mousedown', this.elementDragDrop.startDrag);
    event.target.removeEventListener('click', this.saveTask);
    event.target.classList.add('hidd');
    this.manager.saveColumns();
  }
}
