import Router from './router.js';

var router = new Router({
    home: {
        logState: function(state){
            console.log(state);
        }
        
    }
});

router.initialize();