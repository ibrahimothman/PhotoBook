<template>
    <div role="alert" class="flex justify-center my-2">
        <div class="border  border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{{ message }}.</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['message'],
}
</script>