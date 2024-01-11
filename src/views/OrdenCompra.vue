<script setup>

</script>
<template>
    <div class="border rounded-xl p-2">
        <div class="m-2">
            <label for="">cliente</label>
            <input type="text" class="text-black" v-model="clave_busqueda_clientes" @input="getClientes()">
            <div class="border" v-if="clientes.length > 0">
                <ul class="list-none">
                    <li class="hover:bg-slate-500" v-for="cliente in clientes" @click="addCliente(cliente)">
                        {{ cliente.nombre + " " + cliente.apellido }}
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <label for="">producto</label>
            <input type="text" class="text-black" v-model="clave_busqueda_productos" @input="getProducts()">
            <div class="border" v-if="products.length > 0">
                <ul class="list-none">
                    <li class="hover:bg-slate-500" v-for="product in products" @click="addDetalle(product)">
                        {{ product.nombre }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="m-2 grid grid-cols-3">
            <label for="" class="m-2">Cliente:
                {{ cliente.nombre }}
                {{ cliente.apellido }}
            </label>
            <label for="">Dirección:
                {{ cliente.direccion }}
            </label>
            <label for="" class="m-2 text-right">Fecha:
                {{ today }}
            </label>
        </div>
        <div class="border m-4">

            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="detalle in detalles_compra_show" class="text-center">
                        <td>{{ detalle.producto }}</td>
                        <td>${{ detalle.precio }}</td>
                        <td>
                            <input type="number" class="text-black w-12" v-model="detalle.cantidad"
                                @change="calcularSubtotal(detalle)">
                        </td>
                        <td>${{ Number(detalle.subtotal).toFixed(2) }}</td>
                        <td><button class="bg-red-500 text-white m-1 p-1 rounded"
                                @click="deleteDetail(detalle)">del</button></td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>$ {{ Number(detalles_compra_show.reduce((accumulador, currentValue) => accumulador +
                            currentValue.subtotal, 0)).toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="w-full text-center mt-4">
                <button class="bg-emerald-500 m-2 p-2 rounded" @click="saveOrdenCompra()">Guardar Orden</button>
            </div>
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
            today: moment().format('DD/MM/YYYY'),
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
                axios.get('/products/sugerencias?clave=' + this.clave_busqueda_productos).then(
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
                    "fecha": moment().format("YYYY-MM-DD"),
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
        }
    },
    mounted() {

        toast.success("Soy toast", {
            timeout: 2000
        });

        //this.getProducts();
    }
}
</script>