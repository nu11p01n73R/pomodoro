import Vue from 'vue'
import task from './task'
import timer from './timer'
import 'bootstrap/dist/css/bootstrap.min.css'

var vue = new Vue({
    el: '#pomodoro-app',
    data: {
        newTaskName: "",
        current: null,
        showList: 'todo',
        tasks: [],
    },

    computed: {
        filtered: function() {
            if (this.showList == 'todo') {
                return this.todo
            } else if (this.showList == 'done') {
                return this.done
            } 
            return this.tasks
        },
        done: function() {
            return this.tasks.filter(task => task.done)
        },
        todo: function() {
            return this.tasks.filter(task => !task.done)
        },
        totalTime: function() {
            return this.tasks
                .map(task => task.time)
                .reduce((sum, time) => sum + time, 0)
        }
    },

    methods: {
        deleteTask: function(toDelete) {
            this.tasks = this.tasks.filter(
                task => !(task.id == toDelete.id))
        },
        create: function() {
            var task = {
                id: Math.random().toString(36).substring(5),
                name: this.newTaskName,
                done: false,
                time: 0,
            }

            this.newTaskName = ""
            this.tasks.push(task)
        }
    },

    components: {
        task,
        timer
    }
})