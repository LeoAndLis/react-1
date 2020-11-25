import React, {Component} from 'react';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

export default class App extends Component{

    maxId = 100;

    state = {
        todoList: [
            this.createTask('Todo 1'),
            this.createTask('Todo 2'),
            this.createTask('Todo 3'),
        ],
    }

    deleteTask = (id) => {
        this.setState(({todoList}) => {
            const newList = todoList.filter((el) => el.id !== id);

            return {
                todoList: newList
            }
        })
    }

    addTask = (text) => {
        const newTask = this.createTask(text);

        this.setState(({ todoList }) => {
            const newList = [...todoList, newTask];

            return {
                todoList: newList
            };
        });
    }

    createTask(label) {
        return {
            label,
            id: this.maxId++,
            completed: false,
            editing: false,
        }
    }

    render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm
                        onAdd={this.addTask}
                    />
                </header>
                <section className="main">
                    <TaskList
                        todos={this.state.todoList}
                        onDeleted={this.deleteTask}

                    />
                    <Footer />
                </section>
            </section>
        );
    }
}
