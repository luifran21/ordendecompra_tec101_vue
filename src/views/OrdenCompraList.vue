<script setup></script>
<template>
    <section class="container m-auto bg-slate-50 text-center mb-6 p-6 border rounded-xl">
        <h1 class="text-xl font-bold">Ordenes de Compra</h1>

        <div class="m-4 space-x-2">
            <label for="">
                Cliente
                <input type="text" class="border rounded p-1 mx-2" v-model="cliente">
            </label>
            <label for="">
                Fecha
                <input type="date" class="border rounded p-1 mx-2" v-model="filtro_fecha">
            </label>
            <button class="bg-blue-500 px-2 py-1 text-white rounded" @click="filtrarOrdenes()">Filtrar</button>
        </div>

        <div class="relative overflow-x-auto rounded border">
            <table class="w-full text-sm text-left rtl:text-right">
                <thead class="text-xs text-gray-700 uppercase bg-slate-200">
                    <tr>
                        <td scope="col" class=" px-6 py-3">
                            id
                        </td>
                        <th scope="col" class="px-6 py-3">
                            Cliente
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Accion
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="orden in ordenes" class="bg-slate-50 hover:bg-slate-100">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                            {{ orden.id }}
                        </th>
                        <td class="px-6 py-4">
                            {{ orden.cliente.nombre }} {{ orden.cliente.apellido }}
                        </td>
                        <td class="px-6 py-4">
                            {{ orden.fecha }}
                        </td>
                        <td class="px-6 py-4">
                            ${{ Number(orden.detalles_compra.reduce((acumulado, orden) => acumulado +
                                orden.subtotal, 0)).toFixed(2) }}
                        </td>
                        <td class="px-6 py-4">
                            <DetalleOrden :orden="orden" />
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
</template>
<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
import moment from 'moment';
import DetalleOrden from '../components/OrdenDeCompraDetalle.vue';

const toast = useToast();

export default {
    components: {
        DetalleOrden,
    },
    data() {
        return {
            cliente: "",
            filtro_fecha: "",
            ordenes: [],
            pagination: {
                "current": "",
                "last": "",
                "prev": "",
                "next": "",
                "last_url": "",
                "first_url": ""
            }
        }
    },
    mounted() {
        this.getOrdenes();
    },
    methods: {
        getOrdenes(url = null) {
            console.log(url)
            if (url == null) {
                url = "/orden_compra"
            }
            axios.get(url).then(
                (response) => {
                    this.ordenes = response.data.results.data,
                        console.log(response.data.results)
                    this.pagination.current = response.data.results.current_page,
                        this.pagination.last = response.data.results.last_page,
                        this.pagination.prev = response.data.results.prev_page_url,
                        this.pagination.next = response.data.results.next_page_url,
                        this.pagination.last_url = response.data.results.last_page_url,
                        this.pagination.first_url = response.data.results.first_page_url
                }
            )
        },
        filtrarOrdenes() {
            axios.get(`/orden_compra/filter?cliente=${this.cliente}&fecha=${this.filtro_fecha}`).then(
                (response) => {
                    this.ordenes = response.data.results.data,
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