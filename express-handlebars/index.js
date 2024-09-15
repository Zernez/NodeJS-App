const express = require('express');
const app = express();
const {engine} = require('express-handlebars');

const PORT = 3000;

app.set('view engine', 'hbs');
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts', 
    extname: 'hbs',
    defaultLayout: 'mirror_index',
    partialsDir: __dirname + '/views/partials'
}));


//Static files (import css, js, images)
app.use(express.static('public'));

//Writing an API function
simulatedAPI = () => {
    return [
        {name: 'Top Gun', color: 'even'},
        {name: 'Maverick', color: 'odd'},
        {name: 'Rambo |', color: 'even'},
        {name: 'Rambo ||', color: 'odd'},
        {name: 'Rambo |||', color: 'even'}
    ]
};

app.get('/', (req, res) => {    
    res.render('main', {layout: 'index', suggestedMovies: simulatedAPI()});
//    res.render('main');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 