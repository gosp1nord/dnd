export default class DraggingElement {
  constructor(elementClose, manager) {
    this.belowBlockTask = undefined;
    this.actualBlockTask = undefined;
    this.elementOffsetX = 0;
    this.elementOffsetY = 0;
    this.elementClose = elementClose;
    this.manager = manager;
    this.elementBlocksTask = document.querySelectorAll('.block-task');
    this.moveElement = this.moveElement.bind(this);
    this.finishDrag = this.finishDrag.bind(this);
    this.createBelowArea = this.createBelowArea.bind(this);
    this.setArea = this.setArea.bind(this);
    this.startDrag = this.startDrag.bind(this);
  }

  startDrag(event) {
    event.preventDefault();
    if (event.target.classList.contains('close')) return;
    this.actualBlockTask = event.target.closest('.block-task');
    this.actualBlockTask.classList.remove('block-task-onpoint');
    this.actualBlockTask.querySelector('.close').hidden = true;
    document.addEventListener('mousemove', this.moveElement);
    this.actualBlockTask.addEventListener('mouseup', this.finishDrag);

    this.elementOffsetY = event.offsetY;
    this.elementOffsetX = event.offsetX;
    this.actualBlockTask.style.top = `${this.actualBlockTask.getBoundingClientRect().top - 12}px`;
    this.actualBlockTask.style.left = `${this.actualBlockTask.getBoundingClientRect().left}px`;
    this.actualBlockTask.classList.remove('for-grab');
    this.actualBlockTask.classList.add('grabbed');
  }

  finishDrag() {
    document.removeEventListener('mousemove', this.moveElement);
    this.actualBlockTask.removeEventListener('mouseup', this.finishDrag);
    if (this.belowBlockTask && this.belowBlockTask.closest('.block-area')) {
      this.areaElement = this.belowBlockTask.closest('.block-area');
      if (this.areaElement.classList.contains('afterend')) {
        this.targetPoint = 'afterend';
        this.parentElement = this.areaElement.previousElementSibling;
      } else {
        this.targetPoint = 'beforebegin';
        this.parentElement = this.areaElement.nextElementSibling;
      }
      if (!this.parentElement) return;

      this.parentElement.insertAdjacentHTML(this.targetPoint, `
        <div class="block-task for-grab block-task-onpoint new_element">
          <div class="task-text">${this.actualBlockTask.querySelector('.task-text').textContent}</div>
          <div class="close">&#215;</div>
        </div>
      `);
      this.newElement = document.querySelector('.new_element');
      this.newElement.addEventListener('mousedown', this.startDrag);
      this.newElement.querySelector('.close').addEventListener('click', this.elementClose.dellCard);
      this.newElement.classList.remove('new_element');
      this.actualBlockTask.parentNode.removeChild(this.actualBlockTask);
      this.areaElement.parentNode.removeChild(this.areaElement);
      this.manager.saveColumns();
    } else {
      this.actualBlockTask.classList.add('for-grab');
      this.actualBlockTask.classList.remove('grabbed');
      this.actualBlockTask.classList.add('block-task-onpoint');
      this.actualBlockTask.querySelector('.close').hidden = false;
      this.area = document.querySelector('.block-area');
      if (this.area) {
        this.area.parentNode.removeChild(this.area);
      }
    }
  }

  moveElement(event) {
    this.actualBlockTask.style.top = `${event.clientY - this.elementOffsetY - 12}px`;
    this.actualBlockTask.style.left = `${event.clientX - this.elementOffsetX}px`;
    this.belowBlockTask = undefined;
    this.area = document.querySelector('.block-area');

    this.actualBlockTask.hidden = true;
    this.elementbelow = document.elementFromPoint(event.clientX, event.clientY);
    this.actualBlockTask.hidden = false;
    if (this.elementbelow.closest('.block-area')) {
      this.belowBlockTask = this.elementbelow.closest('.block-area');
      return;
    }
    if (this.area) {
      this.area.parentNode.removeChild(this.area);
    }
    if (this.elementbelow.closest('.block-task') || this.elementbelow.closest('.block-add')) {
      this.createBelowArea(event.clientY);
    }
  }

  createBelowArea(clientY) {
    if (this.elementbelow.closest('.block-add')) {
      this.belowBlockTask = this.elementbelow.closest('.block-add');
      this.setArea('beforebegin');
      return;
    }
    this.belowBlockTask = this.elementbelow.closest('.block-task');
    this.element = this.belowBlockTask.getBoundingClientRect();
    this.middlePoint = this.element.top + this.element.height / 2;
    if (clientY > this.middlePoint) {
      this.setArea('afterend');
    } else {
      this.setArea('beforebegin');
    }
  }

  setArea(targetPoint) {
    this.belowBlockTask.insertAdjacentHTML(targetPoint, `
      <div class='block-area ${targetPoint}'><div class='area'></div></div>
    `);
  }
}
