export default class ManagerLocalStorage {
  constructor() {
    this.arrColumns = [];
    this.arrDefault = [
      ['Выполнить', 'Полить цветы', 'Выкопать кактус', 'Заколотить дверь в туалет соседа'],
      ['В процессе', 'Приготовить завтрак на троих'],
      ['Выполнено', 'Покрасить соседского кота в оранжевый', 'Уничтожить остатки краски', 'Подбросить кисточку вышибале ночного клуба, который живет напротив'],
    ];
  }

  saveColumns() {
    this.columns = document.querySelectorAll('.column');
    this.columns.forEach((column) => {
      this.arrText = [];
      this.arrText.push(column.querySelector('.block-title').textContent);
      this.elementsTask = column.querySelectorAll('.task-text');
      this.elementsTask.forEach((line) => {
        if (line.textContent === 'Добавить карточку') return;
        this.arrText.push(line.textContent);
      });
      this.arrColumns.push(this.arrText);
    });
    localStorage.setItem('columns', JSON.stringify(this.arrColumns));
    this.arrColumns = [];
  }

  renderColumns() {
    this.arrColumns = JSON.parse(window.localStorage.getItem('columns'));
    if (!this.arrColumns || this.arrColumns.length === 0) {
      this.arrColumns = this.arrDefault;
    }
    this.desk = document.querySelector('.desk');

    this.arrColumns.forEach((column) => {
      this.newColumn = document.createElement('div');
      this.newColumn.setAttribute('class', 'column');
      this.newColumn.innerHTML = `<div class="block-title">${column.shift()}</div>`;
      column.forEach((item) => {
        this.newColumn.insertAdjacentHTML('beforeend', `
          <div class="block-task block-task-onpoint for-grab">
            <div class="task-text">${item}</div>
            <div class="close">&#215;</div>
          </div>
        `);
      });
      this.newColumn.insertAdjacentHTML('beforeend', `
        <div class="block-add">
          <div class="add">
            <div class="plus">&#43;</div>
            <div class="task-text">Добавить карточку</div>
          </div>
          <div class="save hidd">Save</div>
        </div>
      `);
      this.desk.insertAdjacentElement('beforeend', this.newColumn);
    });
    this.arrColumns = [];
  }
}
