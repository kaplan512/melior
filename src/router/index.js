import Vue                  from 'vue';
import VueRouter            from 'vue-router';
import Book                 from '../components/Book';
import Books                from '../components/Books';

Vue.use(VueRouter);


const Router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'books',
            component: Books
        },
        {
            path: '/:id',
            name: 'book',
            component: Book,
            props: true
        }
    ]
});

export default Router