<script setup>
</script>
<template>
    <button @click="open()" class="bg-blue-500 rounded text-white hover:bg-blue-600"
        :class="{ 'w-fit': cliente, 'w-full': !cliente }">
        <li class="p-1 w-3/6" :class="{ 'flex': !cliente }">
            <svg v-if="!cliente" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span v-if="!cliente" class="mx-2">Registrar</span>
            <svg v-if="cliente" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>

        </li>
    </button>
    <Teleport to="body">
        <div v-if="showModal" class="fixed left-0 top-0 w-full h-full bg-black opacity-50" @click="showModal = false"
            style="z-index: 100;">
        </div>
        <div v-if="showModal" class="fixed left-0 top-0 bg-slate-50 rounded-xl w-fit py-4 px-6" style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #f0f0f0;
        z-index:101;">
            <div class="w-full m-2">
                <h1 class="font-bold">Registro de clientes</h1>
            </div>
            <form class="flex flex-col items-center" @submit.prevent="saveCliente()">
                <div class="w-fit flex flex-col p-2 m-1">
                    <label class="flex flex-col text-left my-2">
                        Nombre:
                        <input type="text" required class="rounded border border-slate-200 p-1" v-model="nombre">
                    </label>
                    <label class="flex flex-col text-left my-2">
                        Apellido:
                        <input type="text" required class="rounded border border-slate-200 p-1" v-model="apellido">
                    </label>
                    <label class="flex flex-col text-left my-2">
                        Dirección:
                        <input type="text" required class="rounded border border-slate-200 p-1" v-model="direccion">
                    </label>
                </div>
                <div>
                    <button type="button" @click="showModal = !showModal"
                        class="bg-red-500 text-white p-1 mx-2 mb-2 rounded">Cerrar</button>
                    <button type="submit" class="bg-blue-500 text-white p-1 mx-2 mb-2 rounded">Guardar</button>
                </div>
            </form>
        </div>
    </Teleport>
</template>
<script>
import axios from 'axios'
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
    emits: [
        'saved'
    ],
    props: [
        'cliente',
        'update',
    ],
    data() {
        return {
            showModal: false,
            nombre: "",
            apellido: "",
            direccion: "",
        }
    },
    mounted() {

    },
    methods: {
        saveCliente() {
            if (this.cliente) {
                this.updateCliente();
            } else {
                let params = {
                    'nombre': this.nombre,
                    'apellido': this.apellido,
                    'direccion': this.direccion
                }

                axios.post('/clientes', params).then(
                    (response) => {
                        toast.success(response.data.message)
                        this.clearInputs()
                        this.showModal = false
                        this.$emit('saved')
                    }
                ).catch(
                    (error) => {
                        toast.success(error.response.data.message)
                    }
                )
            }
        },
        updateCliente() {
            let params = {
                'nombre': this.nombre,
                'apellido': this.apellido,
                'direccion': this.direccion
            }
            axios.put('/clientes/' + this.cliente.id, params).then(
                (response) => {
                    toast.success(response.data.message),
                        this.$emit('saved');
                    this.showModal = false;
                }
            ).catch(
                (error) => {
                    toast.success(error.response.data.message)
                }
            )
        },
        open() {
            if (this.cliente) {
                this.nombre = this.cliente.nombre
                this.apellido = this.cliente.apellido
                this.direccion = this.cliente.direccion
            }
            this.showModal = true;
        },
        clearInputs() {
            this.nombre = ""
            this.apellido = ""
            this.direccion = ""
        }
    }
}
</script>