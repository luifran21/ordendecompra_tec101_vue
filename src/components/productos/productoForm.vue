<script setup>
</script>
<template>
    <button @click="open()" class="bg-blue-500 rounded text-white hover:bg-blue-600"
        :class="{ 'w-fit': producto, 'w-full': !producto }">
        <li class="p-1 w-3/6" :class="{ 'flex': !producto }">
            <svg v-if="!producto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span v-if="!producto" class="mx-2">Registrar</span>
            <svg v-if="producto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
        </li>
    </button>
    <Teleport to="body">
        <div v-if="showModal" class="fixed left-0 top-0 w-screen h-screen bg-black opacity-50" @click="showModal = false" style="z-index: 100;">
        </div>
        <div v-if="showModal" class="fixed left-0 top-0 bg-slate-50 rounded-xl w-fit py-4 px-6" style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #f0f0f0;
        z-index:100;">
            <div class="w-full m-2">
                <h1 class="font-bold">Registro de productos</h1>
            </div>
            <form class="flex flex-col items-center" @submit.prevent="saveProducto()">
                <div class="w-fit flex flex-col p-2 m-1">
                    <label class="flex flex-col text-left my-2">
                        Nombre:
                        <input type="text" required class="rounded border border-slate-200 p-1" v-model="nombre">
                    </label>
                    <label class="flex flex-col text-left my-2">
                        precio $:
                        <input type="number" step="0.01" min="0" required class="rounded border border-slate-200 p-1"
                            v-model="precio">
                    </label>
                    <label class="flex flex-col text-left my-2">
                        Unidades de medida:
                        <input type="text" required class="rounded border border-slate-200 p-1"
                            v-model="unidades_de_medida">
                    </label>
                    <label class="flex flex-col text-left my-2">
                        Descripcion:
                        <input type="text" required class="rounded border border-slate-200 p-1" v-model="descripcion">
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
        'producto',
        'updated',
    ],
    data() {
        return {
            showModal: false,
            nombre: "",
            precio: "",
            unidades_de_medida: "",
            descripcion: "",
        }
    },
    mounted() {
        /*
        if (this.producto) {
            this.nombre = this.producto.nombre
            this.precio = this.producto.precio,
            this.unidades_de_medida = this.producto.unidades_de_medida,
            this.descripcion = this.producto.descripcion
        }
        */
    },
    methods: {
        open() {
            if (this.producto) {
                this.nombre = this.producto.nombre
                this.precio = this.producto.precio,
                    this.unidades_de_medida = this.producto.unidades_de_medida,
                    this.descripcion = this.producto.descripcion
            }
            this.showModal = true;
        },
        saveProducto() {
            console.log(this.producto)
            if (this.producto) {
                this.updateProducto();
            } else {
                let params = {
                    'nombre': this.nombre,
                    'precio': this.precio,
                    'unidades_de_medida': this.unidades_de_medida,
                    'descripcion': this.descripcion
                }

                axios.post('/products', params).then(
                    (response) => {
                        toast.success(response.data.message)
                        this.clearInputs
                        this.showModal = false
                    }
                ).catch(
                    (error) => {
                        toast.success(error.response.data.message)
                    }
                )
            }
        },
        updateProducto() {
            let params = {
                'nombre': this.nombre,
                'precio': this.precio,
                'unidades_de_medida': this.unidades_de_medida,
                'descripcion': this.descripcion
            }
            axios.put('/products/' + this.producto.id, params).then(
                (response) => {
                    toast.success(response.data.message),
                        this.$emit('saved');
                    this.showModal = false;
                }
            ).catch(
                (error) => {
                    toast.error(error.response.data.message)
                }
            )
        },
        clearInputs(){
            this.nombre = ""
            this.precio = "",
            this.unidades_de_medida = "",
            this.descripcion = ""
        }
    }
}
</script>