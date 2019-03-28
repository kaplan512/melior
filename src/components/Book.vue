<template>
    <div>
        <form @submit.prevent="submit">
            <div>
                <input type="text" v-model="book.author">
            </div>
            <div>
                <input type="text" v-model="book.title">
            </div>
            <div>
                <input type="number" v-model="book.isbn">
            </div>
            <div>
                <input type="number" v-model="book.pages">
            </div>
            <div>
                <select type="number" v-model="book.formatId">
                    <option value="" disabled selected>Select book format</option>
                    <option v-for = "format in formats" :key = "format.id" :value="format.id">
                        {{format.name}}
                    </option>
                </select>
            </div>
            <div>
                <textarea v-model="book.description"></textarea>
            </div>
            <div>
                <input type="text" v-model="book.price">
            </div>
            <div>
                <select v-model="book.countryId" @change="setDataToRender('countries')">
                    <option value="" disabled selected>Select country</option>
                    <option v-for = "country in countries" :key = "country.id" :value="country.id">
                        {{country.name}}
                    </option>
                </select>
            </div>
            <div>
                <select v-model="book.cityId" @change="setDataToRender('cities')">
                    <option value="" disabled selected>Select city</option>
                    <option v-for = "city in citiesToRender" :key = "city.id" :value="city.id">
                        {{city.name}}
                    </option>
                </select>
            </div>
            <div>
                <select v-model="book.companyId">
                    <option value="" disabled selected>Select company</option>
                    <option v-for = "company in companiesToRender" :key = "company.id" :value="company.id">
                        {{company.name}}
                    </option>
                </select>
            </div>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Book",
        data() {
            return {
                book: {},
                dataToFetch: [
                    'formats',
                    'countries',
                    'cities',
                    'companies'
                ],
                cities: [],
                companies: [],
                countries: [],
                formats: []
            }
        },
        methods: {
            setDataToRender(arr) {
                if(arr === 'countries') {
                    this.book.cityId = this.citiesToRender[0].id
                    this.book.companyId = this.companiesToRender[0].id
                }
                else if(arr === 'cities') {
                    this.book.companyId = this.companiesToRender[0].id
                }
            },
            submit() {
                this.$api('books', 'post', this.book)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        computed: {
            citiesToRender() {
                return this.cities.filter( item => item.countryId === this.book.countryId );
            },
            companiesToRender() {
                return this.companies.filter( item => item.cityId === this.book.cityId );
            }
        },
        mounted() {
            if(this.$attrs.book) {
                this.book = Object.assign(this.$attrs.book)
            } else {
                this.$api('books', 'get')
                    .then(response => {
                        this.book = response.find( item => +item.id === +this.$route.params.id );
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }

            for(let i in this.dataToFetch) {
                this.$api(this.dataToFetch[i], 'get')
                    .then(response => {
                        this[[this.dataToFetch[i]]] = response
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }

        }
    }
</script>

<style lang="scss" scoped>
    form {
        width: 500px;
        margin: 0 auto;
        div {
            margin-bottom: 15px;
            input, select, textarea {
                width: 100%;
            }
            textarea {
                height: 100px;
            }
        }
    }
</style>