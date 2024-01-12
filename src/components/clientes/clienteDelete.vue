<script setup>
</script>
<template>
    <button @click="showModal = !showModal" class="bg-red-400 rounded w-fit text-white hover:bg-blue-600">
        <li class="p-1 w-3/6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

        </li>
    </button>
    <Teleport to="body">
        <div v-if="showModal" class="fixed left-0 top-0 w-full h-full rounded-xl bg-black opacity-50"
            @click="showModal = false" style="z-index: 100;">
        </div>
        <div v-if="showModal" class="fixed left-0 top-0 bg-slate-50 rounded-xl w-10/12" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #f0f0f0;
            z-index:101;">
            <div class="w-full p-4 flex flex-col items-center justify-center">
                <p>¿Eliminar cliente con id "{{ cliente.id }}" ({{ cliente.nombre }} {{ cliente.apellido }})?</p>
                <div class="grid grid-cols-2 gap-1">
                    <button class="bg-red-500 text-white p-1 rounded" @click="showModal = false">Cancelar</button>
                    <button class="bg-red-500 text-white p-1 rounded" @click="deleteCliente()">Eliminar</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<script>
import axios from 'axios'
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
    emits: [
        'deleted'
    ],
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
        deleteCliente() {
            axios.delete('/clientes/' + this.cliente.id).then(
                (response) => {
                    toast.success(response.data.message);
                    this.$emit('deleted');
                    this.showModal = false;
                }
            ).catch(
                (error) => {
                    toast.error(error.response.data.message);
                }
            )
        }
    }
}
</script>