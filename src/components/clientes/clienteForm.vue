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
    <div v-if="showModal" class="fixed left-0 top-0 bg-slate-50 rounded-xl w-fit py-4 px-6" style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #f0f0f0;
        z-index:99;">
        <div class="w-full m-2">
            <h1 class="font-bold">Registro de clientes</h1>
        </div>
        <form class="flex flex-col items-center" @submit.prevent="">
            <div class="w-fit flex flex-col p-2 m-1">
                <label class="flex flex-col text-left my-2">
                    Nombre:
                    <input type="text" required class="rounded border border-slate-200 p-1">
                </label>
                <label class="flex flex-col text-left my-2">
                    Apellido:
                    <input type="text" required class="rounded border border-slate-200 p-1">
                </label>
                <label class="flex flex-col text-left my-2">
                    Dirección:
                    <input type="text" required class="rounded border border-slate-200 p-1">
                </label>
            </div>
            <div>
                <button type="button" @click="showModal = !showModal" class="bg-red-500 text-white p-1 mx-2 mb-2 rounded">Cerrar</button>
                <button type="submit" class="bg-blue-500 text-white p-1 mx-2 mb-2 rounded">Guardar</button>
            </div>
        </form>
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