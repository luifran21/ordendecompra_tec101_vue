<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import FormCliente from '../components/clientes/clienteForm.vue'
import ListCliente from '../components/clientes/clienteList.vue'

import FormProducto from '../components/productos/productoForm.vue'
import ListProducto from '../components/productos/productoList.vue'
</script>

<template>
  <main>
    <section class="container border m-auto rounded-xl p-4 bg-slate-50 flex flex-col items-center text-center">
      
      <div class="grid md:grid-cols-1 gap-2 w-full max-w-[500px]">
        <div class="bg-white rounded shadow md:col-span-1 text-center py-2 px-4">
          <h2 class="font-bold">Ordenes de Compra</h2>
          <ul class="grid gap-2 grid-cols-2 justify-items-center">
            <routerLink :to="'/orden_de_compra'" class="bg-blue-500 rounded w-full text-white hover:bg-blue-600">
              <li class="p-1 w-3/6 flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span class="mx-2"> Registrar</span>
              </li>
            </routerLink>
            <routerLink :to="'/orden_de_compra/list'" class="bg-blue-500 rounded w-full text-white hover:bg-blue-600">
              <li class="p-1 rounded w-full flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                </svg>
                <span class="mx-2">Listar</span>
              </li>
            </routerLink>
          </ul>
        </div>
        <div class="bg-white rounded shadow md:col-span-1 text-center py-2 px-4">
          <h2 class="font-bold">Clientes</h2>
          <ul class="grid gap-2 grid-cols-2 justify-items-center">
            <FormCliente></FormCliente>
            <ListCliente />
          </ul>
        </div>
        <div class="bg-white rounded shadow md:col-span-1 text-center py-2 px-4">
          <h2 class="font-bold">Productos</h2>
          <ul class="grid gap-2 grid-cols-2 justify-items-center">
            <FormProducto/>
            <ListProducto />
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script>

</script>
