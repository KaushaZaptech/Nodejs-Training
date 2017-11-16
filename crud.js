const app = require('express')()
const bodyParser = require('body-parser');
app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
app.set('views','views');
app.set('view engine', 'ejs');
var users = [{'id':'1','name':'Kausha','email':'kausha@gmail.com'},{'id':'2','name':'Dev','email':'dev@gmail.com'},{'id':'3','name':'John','email':'john@gmail.com'}];

app.get('/user/delete/:id', (req, res) => { //Delete User
    var id = req.params.id;    
    if(id){
        var index = users.findIndex(user => user.id === id);   
        if(index >= 0){
            users.splice(index,1);
            res.send(users);                  
        }
        else{
            res.send('Pass valid User Id')
        }
    }
    else{
        res.send('Pass User Id')
    }
})

app.get('/user/:id', (req, res) => {    //view User
    var id = req.params.id;    
    var index = users.findIndex(user => user.id === id); 
    if(index >= 0)
        res.send(users[index]);
    else
        res.send('Invalid Id');    
})
app.post('/user/edit/:id', (req, res) => {  //Edit user
    var id = req.params.id;
    if(id){
        var index = users.findIndex(user => user.id === id);        
        if(index >= 0){
            users[index].name = req.body.name;
            users[index].email = req.body.email
            res.send(users);        
        }
        else
            res.send('Invalid Id');
    }
})

app.get('/', (req, res) => {
    res.send(users);
    //res.render('users',{users:users,msg:users.length+' Users found'})
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))