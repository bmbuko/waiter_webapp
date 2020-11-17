let express = require('express');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const waiter = require('./waiters')
const pg = require("pg")
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waiters_availability'
const pool = new Pool({
  connectionString
});


const waiterAvailability = waiter(pool)
let app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/waiter/:username', async (req, res) => {
  const name = req.params.username;
  console.log(name)
  //const name=req.body.names

  //const day = req.body.days
  //console.log(day)
 // const emp = await waiterAvailability.getWaiter(name)
  //const dId = await waiterAvailability.getIds(name, day)
  res.render('waiter', {
    waiters: name

  })
})

app.get('/waiter/',(req,res)=>{
  const name = req.params.username;
  console.log(name)
  //const name=req.bo
res.render('waiter', {
  waiters: name

})
})



// app.get('/waiters/',(req,res)=>{
//res.render('waiters',)

// });
app.post('/waiter/:username', async (req, res) => {
  const name = req.params.username;
  console.log(name)
  const day = req.body.days
 // const emp = await waiterAvailability.getWaiter(name)
 await waiterAvailability.getWaiter(name)
  const shiftsIds = await waiterAvailability.getIds(name, day)
  res.render('waiter', {
    shiftsIds
    // waiters: name,
    // shitftIds
  })
})






let PORT = process.env.PORT || 5012
  ;
app.listen(PORT, function () {

});