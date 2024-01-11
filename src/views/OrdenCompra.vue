<script setup>

</script>
<template>
    <div class="border rounded-xl p-2">
        <h1>Hola Mundo</h1>
        <button class="bg-emerald-500 rounded">Press here</button>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
    data() {
        return {
            products : [],
        }
    },
    methods: {
        getProducts(){
            axios.get('http://localhost:8000/products').then(
                (response) => {
                    this.products = resoponse.data.results;
                }
            ).catch(
                (error) => {
                    toast.error("Error al obtener los productos");
                }
            )
        }
    },
    mounted() {
        
        toast.success("Soy toast", {
            timeout:2000
        });
    }
}
</script>