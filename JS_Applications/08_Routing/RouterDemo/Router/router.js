export default class Router {
    constructor(routes){
        this.routes = routes;
        this.currentPath = '';
        this.currentQuerystring = '';
        this.state = {};
    }

    initialize() {
        history.pushState({}, '', '/');
        setInterval(this.listen.bind(this), 50);
        document.addEventListener('click', (e) => {
            if (e.target.href && e.target.origin === document.location.origin) {
                e.preventDefault();
                e.stopPropagation();
                history.pushState({}, '', e.target.href);
            }
        });
    }

    listen() {
        if (this.currentPath !== decodeURIComponent(document.location.pathname) ||
            this.currentQuerystring !== decodeURIComponent(document.location.search)) {
            this.currentPath = decodeURIComponent(document.location.pathname) || '';
            this.currentQuerystring = decodeURIComponent(document.location.search) || '';
            
            if (this.currentQuerystring !== '') {
                this.state = this.currentQuerystring
                    .match(/[A-ZА-Я0-9]+=[A-ZА-Я0-9]+/gi)
                    .map((el) => el.split('='))
                    .reduce((acc, el) => {
                        if (Array.isArray(el) && el.length === 2) {
                            acc[el[0]] = el[1];
                        }

                        return acc;
                    }, {});
            } else {
                this.state = history.state;
            }

            this.loadPage();
        }
    }

    loadPage() {
        var route = this.currentPath
            .split('/')
            .filter((el) => !!el);

        if (route.length >= 2 && this.routes.hasOwnProperty(route[0]) && 
            typeof(this.routes[route[0]][route[1]]) === 'function') {
                this.routes[route[0]][route[1]](this.state);
        }
    }
}