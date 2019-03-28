<template>
    <div>
        <div class = "book" v-for = "book in books" :key = "book.id">
            <h2>{{book.title}}</h2>
            <h3>{{book.author}}</h3>
            <p>{{book.description}}</p>
            <router-link :to="{ name: 'book', params: {id: book.id, book: book} }">See this book</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Books",
        data() {
            return {
                books: []
            }
        },
        mounted() {
            this.$api('books', 'get')
                .then(response => {
                    this.books = response
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
</script>

<style lang="scss" scoped>
    .book {
        border: 1px solid black;
        padding: 15px;
        margin-bottom: 15px;
    }
</style>