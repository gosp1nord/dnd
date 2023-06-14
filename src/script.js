import DraggingElement from './dragging';
import DellCardTask from './dell_task';
import AddCardTask from './add_task';
import ManagerLocalStorage from './get_set_data';

document.addEventListener('DOMContentLoaded', () => {
  const manager = new ManagerLocalStorage();
  const elementClose = new DellCardTask(manager);
  const elementDragDrop = new DraggingElement(elementClose, manager);
  const elementAdd = new AddCardTask(elementDragDrop, elementClose, manager);
  manager.renderColumns();
  const elementBlocksTask = document.querySelectorAll('.block-task');
  elementBlocksTask.forEach((item) => {
    item.addEventListener('mousedown', elementDragDrop.startDrag);
  });

  const elementsClose = document.querySelectorAll('.close');
  elementsClose.forEach((line) => {
    line.addEventListener('click', elementClose.dellCard);
  });

  const elementsAdd = document.querySelectorAll('.add');
  elementsAdd.forEach((elem) => {
    elem.addEventListener('click', elementAdd.addCard);
  });
});
