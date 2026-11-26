

class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(nombre, descripcion, fecha, prioridad, categoria, estado) {
        this.currentId++;

        this.tasks.push({
            id: this.currentId,
            nombre: nombre,
            descripcion: descripcion,
            fecha: fecha,
            prioridad: prioridad,
            categoria: categoria,
            estado: estado,
            status: "PORHACER",
            completada: estado === "Completada"
        });
    }

    deleteTask(taskId) {
        const newTasks = [];

        for (let task of this.tasks) {
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }

        this.tasks = newTasks;
    }
}