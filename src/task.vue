<template>
    <li 
     v-on:mouseover="hover=true"
     v-on:mouseleave="hover=false"
     class="list-group-item">
        <div 
         class="float-left"
         style="line-height: 2;">
            {{ task.name }}
        </div>
        <div 
         v-show="showTime"
         class="float-right"
         style="line-height: 2;">
            {{ time(task.time) }}
        </div>
        <div 
         v-show="showButtons"
         class="float-right">
            <button
             class="btn btn-outline-success btn-sm"
             v-show="list == 'todo'"
             v-on:click="task.done = true">
                Done
            </button>
            <button
             class="btn btn-outline-primary btn-sm"
             v-show="list == 'todo'"
             v-on:click="$emit('started')">
                Start
            </button>
            <button
             class="btn btn-outline-danger btn-sm"
             v-show="list == 'done'"
             v-on:click="$emit('task-delete')">
                Delete
            </button>
        </div>
        <div 
         v-if="list=='all'"
         class="progress w-100">
            <div 
             class="progress-bar progress-bar-striped bg-danger" 
             v-bind:style="{width : (task.time / totalTime * 100) + '%'}"
             role="progressbar" 
             aria-valuenow="100" 
             aria-valuemin="0" 
             aria-valuemax="100">
            </div>
        </div>
    </li>
</template>

<script>
import timeUnit from './utils'

export default {
    props: {
        task: {
            type: Object,
            required: true
        },
        list: {
            type: String,
            required: true
        },
        totalTime: {
            type: Number,
            required: true
        }
    },
    data: function() {
        return {
            hover: false
        }
    },
    computed: {
        showTime: function() {
            return this.list == 'all'
        },
        showButtons: function() {
            return this.list != 'all' && this.hover
        }
    },
    methods: {
        time: function(time) {
            return timeUnit(time)
        }
    }
}
</script>