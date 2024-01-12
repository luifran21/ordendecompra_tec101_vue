<script setup>

</script>
<template>
    <button class="bg-blue-500 rounded text-white p-2" @click="showModal = true">
        Ver
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

        <div class="m-auto bg-slate-50 border rounded-xl p-0">

            <div class="m-2 grid grid-cols-2">
                <label for="" class="m-2 col-span-1">Cliente
                    <input type="text" class="border rounded p-1 mx-2"
                        :value="orden.cliente.nombre + ' ' + orden.cliente.apellido" disabled>
                </label>
                <label for="" class="m-2 text-right">Fecha:
                    <input type="date" class="border rounded p-1 mx-2" :value="orden.fecha">
                </label>
            </div>
            <div class="m-2">
                <label for="" class="col-span-2 m-2 w-100">Dirección
                    <input class="border rounded p-1 mx-2 w-fit" :value="orden.cliente.direccion" disabled />
                </label>
            </div>
            <div class="border m-4 rounded">

                <table class="table-auto w-full text-center">
                    <thead class="border bg-slate-100">
                        <tr>
                            <th>Producto</th>
                            <th>precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="detalle in orden.detalles_compra" >
                            <td>{{ detalle.producto.nombre }}</td>
                            <td>${{ detalle.producto.precio }}</td>
                            <td>
                                <input type="number" class="text-black border rounded text-center w-12"
                                    v-model="detalle.cantidad" @change="calcularSubtotal(detalle)" disabled>
                            </td>
                            <td>${{ Number(detalle.subtotal).toFixed(2) }}</td>
                        </tr>
                        <tr>
                            <td class="w-full text-center font-bold" colspan="5">
                                Total
                                $ {{ Number(orden.detalles_compra.reduce((accumulador, currentValue) => accumulador +
                                    currentValue.subtotal, 0)).toFixed(2) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-full text-center mt-4">
                <button class="bg-emerald-500 text-slate-50 m-2 p-2 rounded" @click="showModal = false">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "orden",
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