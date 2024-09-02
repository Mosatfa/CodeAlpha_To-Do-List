class DargAndDrop {
    constructor() {
        this.sortList = document.querySelector('.todo-list')
        this.todoItems = document.querySelectorAll('.todo-item')
        this.dragPoint()
        this.sortList.addEventListener('dragover', this.initSortList.bind(this))
        // document.addEventListener('DOMContentLoaded', () => {
        //     this.loadOrder();
        // });
        this.loadOrder()
    }

    dragPoint() {
        this.todoItems.forEach(item => {
            item.addEventListener('dragstart', () => setTimeout(() => item.classList.add('dragging'), 0))
            item.addEventListener('dragend', () => item.classList.remove('dragging'))
        })
    }


    initSortList(e) {
        const draggableElements = [...this.sortList.querySelectorAll('.todo-item:not(.dragging)')];
        let nextSibling = draggableElements.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });
        this.sortList.insertBefore(this.sortList.querySelector('.dragging'), nextSibling);
        this.saveOrder()
    }

    saveOrder() {
        const todoItems = [...this.sortList.querySelectorAll('.todo-item')];
        const order = todoItems.map(item => item.dataset.id);

        localStorage.setItem('todoOrder', JSON.stringify(order));
    }

    loadOrder() {
        const savedOrder = JSON.parse(localStorage.getItem('todoOrder'));
        
        if (savedOrder) {
            const todoItems = savedOrder.map(id => this.sortList.querySelector(`[data-id="${id}"]`));
            todoItems.forEach(item => this.sortList.appendChild(item));
        }
    }

}

export default DargAndDrop



