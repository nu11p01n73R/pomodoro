<template>
    <div>
        <div 
         class="font-weight-light"
         style="font-size: 2rem;">
            {{ task.name }}
        </div>
        <div style="font-size: 10rem">{{ time }}</div>
        <div class="row justify-content-center">
            <div class="col-9">
                <div class="progress mb-5">
                    <div 
                    class="progress-bar progress-bar-striped bg-danger" 
                    v-bind:style="{width : progress}"
                    role="progressbar" 
                    aria-valuenow="100" 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                    </div>
                </div>
            </div>
        </div>
        <button 
         class="btn btn-outline-success btn-lg"
         v-show="!timer"
         v-on:click="start">
            Play
        </button>
        <button 
         class="btn btn-outline-danger btn-lg"
         v-show="timer" 
         v-on:click="reset">
            Reset
        </button>
    </div>
</template>

<script>
import timeUnit from './utils'

const INTERVAL = 25*60

export default {
   props: {
       task: {
           type: Object,
           required: true
       }
   },
   data: function() {
        return {
            remaining: INTERVAL,
            timer: null,
            notified: false,
        }
    },
    watch: {
        task: function() {
            this.reset()
        }
    },

    computed: {
        time: function() {
            return timeUnit(this.remaining)
        },
        progress: function() {
            return ((INTERVAL - this.remaining) / INTERVAL * 100) + '%'
        }
    },

    methods: {
        tick: function() {
            if (this.remaining) {
                this.remaining--
            }
            this.task.time++
            this.notify()
        },
        start: function() {
            this.tick()
            this.timer = setInterval(this.tick, 1000)
        },
        pause: function() {
            clearInterval(this.timer)
            this.timer = null
        },
        reset: function() {
            this.remaining = INTERVAL
            clearInterval(this.timer)
            this.timer = null
            this.notified = false
        },
        notify: function() {
            var vm = this
            if ("Notification" in window 
                && Notification.permission == "granted"
                && vm.remaining == 0
                && !vm.notified ) {
                    new Notification('(╯°□°）╯︵ ┻━┻', {
                        silent: true
                    })
                    vm.notified = true
            }
        }
    }     
}
</script>
