<script setup>
import FormCliente from '../../components/clientes/clienteForm.vue'
import DeleteCliente from '../../components/clientes/clienteDelete.vue'
</script>
<template>
    <button @click="showModal = !showModal" class="bg-blue-500 rounded w-full text-white hover:bg-blue-600">
        <li class="p-1 w-3/6 flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
            </svg>
            <span class="mx-2">Listar</span>
        </li>
    </button>
    <div @click="showModal = !showModal" v-if="showModal" class="fixed left-0 top-0 w-screen h-screen bg-black opacity-50">
    </div>
    <div v-if="showModal" class="fixed left-0 top-0 bg-slate-50 rounded-xl w-11/12" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #f0f0f0;
            z-index:99;">

        <section class=" m-0 bg-slate-50 text-center p-6 border rounded-xl">
            <h1 class="text-xl font-bold">Clientes</h1>

            <div class="relative overflow-x-auto rounded border">
                <table class="w-full text-sm text-left rtl:text-right">
                    <thead class="text-xs text-gray-700 uppercase bg-slate-200">
                        <tr>
                            <td scope="col" class=" px-6 py-3">
                                Id
                            </td>
                            <th scope="col" class="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Apellido
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Dirección
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cliente in clientes" class="bg-slate-50 hover:bg-slate-100">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                                {{ cliente.id }}
                            </th>
                            <td class="px-6 py-4">
                                {{ cliente.nombre }}
                            </td>
                            <td class="px-6 py-4">
                                {{ cliente.apellido }}
                            </td>
                            <td class="px-6 py-4">
                                {{ cliente.direccion }}
                            </td>
                            <td class="grid grid-cols-2 p-1">
                                <FormCliente :cliente="cliente" @saved="getClientes()" />
                                <DeleteCliente :cliente="cliente" @deleted="getClientes()" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col items-center mt-5">
                <!-- Help text -->
                <span class="text-sm text-gray-700">
                    Pagina <a href=""><span class="font-semibold text-gray-900">{{ pagination.current
                    }}</span></a> de
                    <span class="font-semibold text-gray-900 ">{{ pagination.last }}</span>
                </span>
                <!-- Buttons -->
                <div class="inline-flex mt-2 xs:mt-0" style="z-index:1;">
                    <button @click=getOrdenes(pagination.prev)
                        class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        v-bind:class="{ 'opacity-50 pointer-events-none': pagination.current == 1 }">
                        Prev
                    </button>
                    <button @click="getOrdenes(pagination.next)"
                        class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        v-bind:class="{ 'opacity-50 pointer-events-none': pagination.current == pagination.last }">
                        Next
                    </button>
                </div>
            </div>

        </section>

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
            clientes: [],
            pagination: {
                "current": "",
                "last": "",
                "prev": "",
                "next": "",
                "last_url": "",
                "first_url": ""
            },
        }
    },
    mounted() {
        this.getClientes();
    },
    methods: {
        getClientes() {
            axios.get('/clientes').then(
                (response) => {
                    this.clientes = response.data.results.data,
                        this.pagination.current = response.data.results.current_page,
                        this.pagination.last = response.data.results.last_page,
                        this.pagination.prev = response.data.results.prev_page_url,
                        this.pagination.next = response.data.results.next_page_url,
                        this.pagination.last_url = response.data.results.last_page_url,
                        this.pagination.first_url = response.data.results.first_page_url
                }
            )
        }
    }
}
</script>