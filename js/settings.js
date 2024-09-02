import DargAndDrop from '../js/drag&drop.js'
class Settings {
    constructor() {

        if (localStorage.getItem("data")?.length) {
            this.data = JSON.parse(localStorage.getItem("data"))
            this.displayData()
        } else {
            this.data = []
        }
        this.input = document.querySelector('.main-input')
        this.btn = document.querySelector('.btn-add')
        this.btn.addEventListener('click', this.createTask.bind(this))
    }

    createTask() {
        let task = {
            id: this.data[this.data.length - 1] == undefined ? this.data.length + 1 : this.data[this.data.length - 1].id + 1,
            textContent: this.input.value,
            isChecked: false
        }
        this.input.value = ''
        this.data.push(task)
        this.saveData()
    }


    displayData() {
        let tasks = ``
        for (const [index, ele] of this.data.entries()) {
            tasks += `
                <div class="todo-item" draggable="true" data-id="${ele.id}">
                    <div class="todo">
                        <input type="checkbox" id="task${index}" ${ele.isChecked ? 'checked' : ''}>
                        <label>${ele.textContent}</label>
                    </div>
                    <div class="darg">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>`
        }
        document.querySelector('.todo-list').innerHTML = tasks

        document.querySelectorAll('.todo-item input[type="checkbox"]').forEach((checkbox, index) => {
            checkbox.addEventListener('click', () => this.checkedTask(index));
        });

        document.querySelectorAll('.todo-item .darg').forEach((ele, index) => {
            ele.addEventListener('click', () => this.deleteTask(index));
        });
        new DargAndDrop()

    }

    saveData() {
        localStorage.setItem("data", JSON.stringify(this.data))
        this.displayData()
    }

    checkedTask(index) {
        this.data[index].isChecked = !this.data[index].isChecked
        this.saveData()
    }

    deleteTask(index) {
        let id = this.data[index].id.toString()
        if (JSON.parse(localStorage.getItem('todoOrder'))) {
            let order = JSON.parse(localStorage.getItem("todoOrder")).filter(e => e != id)
            localStorage.setItem("todoOrder", JSON.stringify(order))
        }
        this.data.splice(index, 1)
        this.saveData()
    }
}
export default Settings