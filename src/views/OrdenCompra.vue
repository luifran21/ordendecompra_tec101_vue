<script setup>

</script>
<template>
    <div class=" container m-auto bg-slate-50 border rounded-xl p-2 mb-12" @click="clearLists()">

        <div class="m-2 grid grid-cols-2">
            <label for="" class="m-2 col-span-1 flex items-center">Cliente
                <div class="w-fit">
                    <input v-if="editarCliente == false" type="text" class="border rounded p-1 mx-2"
                        :value="cliente.nombre + ' ' + cliente.apellido" disabled>
                    <input v-if="editarCliente" type="text" class="text-black border rounded p-1 mx-2"
                        v-model="clave_busqueda_clientes" @input="getClientes()">
                    <div class="w-fit px-1 bg-slate-50 z-50 absolute" v-if="clientes.length > 0 && editarCliente">
                        <ul class="list-none w-full bg-slate-200 border rounded shadow-lg my-2">
                            <li class="p-2 rounded hover:bg-slate-500 hover:text-slate-50 cursor-pointer"
                                v-for="cliente in clientes" @click="addCliente(cliente)">
                                {{ cliente.nombre + " " + cliente.apellido }}
                            </li>
                        </ul>
                    </div>
                    
                </div>
                <button class="bg-blue-500 p-1 rounded text-white" :class="{ 'bg-red-500': editarCliente }"
                    @click="editarCliente = !editarCliente">
                    <svg v-if="!editarCliente" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <svg v-if="editarCliente" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </label>
            <label for="" class="m-2 text-right">Fecha:
                <input type="date" class="border rounded p-1 mx-2" v-model="today">
            </label>
        </div>
        <div class="m-2">
            <label for="" class="col-span-2 m-2 w-100">Dirección
                <input class="border rounded p-1 mx-2 w-3/6" :value="cliente.direccion" disabled />
            </label>
        </div>
        <div class="border m-4 rounded">

            <table class="table-auto w-full">
                <thead class="border bg-slate-100">
                    <tr>
                        <th>Producto</th>
                        <th>precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="detalle in detalles_compra_show" class="text-center">
                        <td>{{ detalle.producto }}</td>
                        <td>${{ detalle.precio }}</td>
                        <td>
                            <input type="number" min="1" class="text-black border rounded text-center w-12"
                                v-model="detalle.cantidad" @change="calcularSubtotal(detalle)">
                        </td>
                        <td>${{ Number(detalle.subtotal).toFixed(2) }}</td>
                        <td><button class="bg-red-500 text-white m-1 p-1 rounded"
                                @click="deleteDetail(detalle)">del</button></td>
                    </tr>
                    <tr>
                        <td class="w-full text-center font-bold" colspan="5">
                            Total
                            $ {{ Number(detalles_compra_show.reduce((accumulador, currentValue) => accumulador +
                                currentValue.subtotal, 0)).toFixed(2) }}
                        </td>
                    </tr>
                    <tr>
                        <td class="w-full text-center font-bold py-6" colspan="5">

                            <label for="">Agregar producto</label>
                            <input type="text" class="text-black border rounded p-1 mx-2" v-model="clave_busqueda_productos"
                                @input="getProducts()">
                            <div class="w-full text-center flex justify-center" v-if="products.length > 0">
                                <ul class="list-none w-1/3 absolute bg-slate-200 border rounded shadow-lg my-2">
                                    <li class="hover:bg-slate-500 hover:text-slate-50 cursor-pointer"
                                        v-for="product in products" @click="addDetalle(product)">
                                        {{ product.nombre }}
                                    </li>
                                </ul>
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-full text-center mt-4">
            <button class="bg-emerald-500 text-slate-50 m-2 p-2 rounded" @click="saveOrdenCompra()">Guardar Orden</button>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";
import axios from 'axios'
import moment from 'moment'

const toast = useToast();

export default {
    data() {
        return {
            editarCliente: false,
            today: moment().format('YYYY-MM-DD'),
            clave_busqueda_productos: "",
            clave_busqueda_clientes: "",
            products: [],
            clientes: [],
            cliente: {
                "id": "",
                "nombre": "",
                "apellido": "",
                "direccion": ""
            },
            orden_compra: {},
            detalles_compra: [],
            detalles_compra_show: []
        }
    },
    methods: {
        getClientes() {
            if (this.clave_busqueda_clientes !== "") {
                axios.get('/clientes/sugerencias?clave=' + this.clave_busqueda_clientes).then(
                    (response) => {
                        this.clientes = response.data.results;
                    }
                ).catch(
                    (error) => {
                        toast.error("Error al obtener los productos");
                    }
                )
            } else {
                this.clientes = [];
            }
        },
        getProducts() {
            if (this.clave_busqueda_productos !== "") {
                axios.get('/products_sugerencias?clave=' + this.clave_busqueda_productos).then(
                    (response) => {
                        this.products = response.data.results;
                    }
                ).catch(
                    (error) => {
                        toast.error("Error al obtener los productos");
                    }
                )
            }
        },
        saveOrdenCompra() {
            if (this.validarInputs()) {

                this.orden_compra = {};
                this.orden_compra = {
                    "fecha": this.today ? this.today : moment().format('YYYY-MM-DD'),//today? today:moment().format("YYY-MM-DD"),
                    "cliente_id": this.cliente.id
                }
                this.detalles_compra = [];
                this.detalles_compra_show.forEach(detalle => {
                    this.detalles_compra.push({
                        "cantidad": detalle.cantidad,
                        "subtotal": detalle.subtotal,
                        "producto_id": detalle.producto_id
                    })
                })

                let params = {
                    "orden_compra": this.orden_compra,
                    "detalles_compra": this.detalles_compra
                }
                console.log(this.orden_compra)
                console.log(this.detalles_compra)
                axios.post("/orden_compra", params).then(
                    (response) => {
                        toast.success("Orden de compra registrada correctamente"),
                            this.clearInputs()
                    }
                ).catch(
                    (error) => {
                        console.log(error.response.data.message)
                        toast.error(error.response.data)
                    }
                )
            }
        },
        addCliente(cliente) {
            this.cliente.nombre = cliente.nombre;
            this.cliente.apellido = cliente.apellido;
            this.cliente.id = cliente.id;
            this.cliente.direccion = cliente.direccion;

            this.clave_busqueda_clientes = "";
            this.clientes = [];
            this.editarCliente = false
        },
        addDetalle(product) {
            let productoActual = this.detalles_compra_show.find(objeto => objeto.producto_id == product.id)
            if (productoActual) {
                console.log(productoActual.cantidad += 1)
                productoActual.subtotal = productoActual.cantidad * productoActual.precio;
            } else {
                let product_show = {
                    "producto_id": product.id,
                    "producto": product.nombre,
                    "precio": product.precio,
                    "cantidad": 1,
                    "subtotal": product.precio
                }
                this.detalles_compra_show.push(product_show)
                this.clave_busqueda_productos = "";
            }
            this.clearSugerencias();
        },
        deleteDetail(product) {
            console.log(this.detalles_compra_show.indexOf(product))
            let index = this.detalles_compra_show.indexOf(product);
            this.detalles_compra_show.splice(index, 1);
        },
        calcularSubtotal(detalle) {
            if (detalle.cantidad <= 0) {
                detalle.cantidad = 1
            }
            detalle.subtotal = detalle.cantidad * detalle.precio
        },
        clearSugerencias() {
            this.products = [];
        },
        validarInputs() {
            let status = true;

            if (this.cliente.id == "") {
                toast.info("Seleccione un cliente");
                status = false;
            }
            if (this.detalles_compra_show.length == 0) {
                toast.info("No se han agregado productos a la orden.")
                status = false;
            }

            return status;
        },
        clearInputs() {
            this.detalles_compra = [];
            this.detalles_compra_show = [];
            this.cliente = {
                "nombre": "",
                "apellido": "",
                "id": ""
            };
            this.orden_compra = {};
        },
        clearLists(){
            this.clientes = [];
            this.products = [];
        }
    },
    mounted() {

        toast.success("Bienvenido", {
            timeout: 2000
        });

        //this.getProducts();
    }
}
</script>