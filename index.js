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
  const allSevenDays = await waiterAvailability.allDays()
  //console.log(name)

  res.render('waiter', {
    username: name,
    allSevenDays

  })
})
// 
app.post('/waiter/:username', async (req, res) => {
  const name = req.params.username;
  // console.log(name)
  const day = req.body.days
//   if(day == "true"){
// console.log("true")
//   } else{
//     console.log("false")
//   }
  // const emp = await waiterAvailability.getWaiter(name)
  await waiterAvailability.getWaiter(name)
  const shiftsIds = await waiterAvailability.getIds(name, day)
   //.log(shiftsIds);
  const allSevenDays = await waiterAvailability.allDays()
  
  res.render('waiter', {
    shiftsIds,
    username: name,
    allSevenDays
    // shitftIds
  })
})



app.get('/days', async (req, res) => {
  // const name = req.params.username;
  //  const allSevenDays = await waiterAvailability.allDays()
  const waitersList = await waiterAvailability.showWaiters()
   const join = await waiterAvailability.schedules()
  const shift = await waiterAvailability.namePusher()
  // console.log({ join 
  // })
  res.render('days', {
    //  allSevenDays,
    // waitersList,
    shift,
   join
  })
})
app.get('/reset', async (req, res) => {
  await waiterAvailability.reset()
  res.redirect('/days');
})



// app.get('/waiters/',(req,res)=>{
//res.render('waiters',)







let PORT = process.env.PORT || 5012
  ;
app.listen(PORT, function () {

});