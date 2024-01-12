<script setup>
</script>
<template>
    <button @click="showModal = !showModal" class="bg-blue-500 rounded w-full text-white hover:bg-blue-600">
        <li class="p-1 w-3/6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </li>
    </button>
    <div v-if="showModal" class="fixed left-0 top-0 w-screen h-screen bg-black opacity-50">
    </div>
    <div v-if="showModal" class="fixed left-0 top-0 bg-slate-50 rounded-xl w-10/12" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #f0f0f0;
            z-index:99;"
            >
            hola
            </div>
</template>
<script>
import axios from 'axios'

export default {
    props: [
        'cliente'
    ],
    data() {
        return {
            showModal: false,
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>