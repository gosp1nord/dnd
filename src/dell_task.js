export default class DellCardTask {
  constructor(manager) {
    this.dellCard = this.dellCard.bind(this);
    this.manager = manager;
  }

  dellCard(event) {
    this.elementDell = event.target.closest('.block-task');
    if (this.elementDell.classList.contains('element-input')) {
      this.btnSave = this.elementDell.parentNode.querySelector('.save');
      if (this.btnSave) {
        this.btnSave.classList.add('hidd');
      }
    }
    this.elementDell.parentNode.removeChild(this.elementDell);
    this.manager.saveColumns();
  }
}
