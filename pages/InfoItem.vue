<template>
    <div class="flex justify-center text-center lg:justify-between flex-1">
        <div class="text-center lg:text-left w-full p-4 lg:p-8">
            <h2 class="font-bold uppercase tracking-widest2 text-sm text-gray-600">{{ label }}</h2>

            <p v-if="!loading" class="text-xl mt-4">{{ value }}</p>
            <p v-else class="flex justify-center text-xl w-full mt-4">
                <Spinner class="text-blue-500 w-16 h-16"></Spinner>
            </p>
        </div>
    </div>
</template>
<script>
import Spinner from "~/components/Spinner";
export default {
    name: 'InfoItem',
    components: {Spinner},
    props: {
        label: {},
        value: {},
        loading: {
            default: false,
        },
    }
}
</script>
