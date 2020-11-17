module.exports = function waiter(pool) {




    async function getWaiter(name) {

        if (name !== '') {

            var insertsql = await pool.query('insert into waiters (waiter_name) values ($1)', [name]);
            return insertsql.rows
        } else {

            return false
        }
    }
    async function getIds(waiterName,days){
        let waiters = await pool.query('select id from waiters where waiter_name = $1',[waiterName])
        var waiterId = waiters.rows[0].id

        for (var i =0;i<days.length;i++){
            let day  =await pool.query('select id from days_of_the_week where day_name ',[days[i]])
            var dayId = day.rows[0].id 

            await pool.query('insert into admin (day_name_id,waiter_name_id) values($1,$2)',[dayId,waiterId]) 
        }
    }
  
        return {

            getWaiter,
            getIds
        }




    }

//var insertsql = await pool.query('insert into admin (waiter_name_id, day_name_id) values ($1,$2)', [name, day]);
//return inser