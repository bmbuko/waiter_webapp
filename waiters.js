module.exports = function waiter(pool) {




    async function getWaiter(name) {
        // let checkingsql =await pool.qu


        var insertsql = await pool.query('insert into waiters (waiter_name) values ($1)', [name]);
        return insertsql.rows
    }

    async function showWaiters() {
        var listOfWaiters = await pool.query('select waiter_name from waiters')
        return listOfWaiters.rows
    }

    async function allDays() {
        var getDays = await pool.query('select day_name from days_of_the_week')
        return getDays.rows
    }

    async function getIds(waiterName, days) {
        let waiters = await pool.query('select id from waiters where waiter_name = $1', [waiterName])


        var waiterId = waiters.rows[0].id
        // console.log(waiterId)


        for (var i = 0; i < days.length; i++) {
            let day = await pool.query('select id from days_of_the_week where day_name =$1', [days[i]])
            var dayId = day.rows[0].id
            //console.log(dayId)
            await pool.query('insert into admin (day_name_id,waiter_name_id) values($1,$2)', [dayId, waiterId])
        }
    }


    async function namePusher() {
     
            var wkdays = await allDays()
            var shfts = await schedules()
            // console.log(i)
            //var rows = day.rows
             wkdays.forEach(async(day) => {
                day.waiter_name = [];
    
                 shfts.forEach(async(waiter) => {
                    if (day.day_name === waiter.day_name) {
                        day.waiter_name.push(waiter)
                       
                        //console.log(day.waiter_name)
                    }
                    if(day.waiter_name.length ===3){
                        day.color = "green"
                    }
                    else if(day.waiter_name.length < 3){
                        day.color = "orange"
                    }
                    else if(day.waiter_name.length > 3){
                        day.color = "red"
                    }
                    
                    
                })
            })
            return wkdays;
      
    }

    async function reset() {
        const deleteData = "delete from admin"
        await pool.query(deleteData)

    }
    // joining the two
    async function schedules(dayid) {
        let shifts = await pool.query(` select waiter_name, day_name from admin
        join waiters on admin.waiter_name_id = waiters.id join days_of_the_week on admin.day_name_id = days_of_the_week.id`)
        return shifts.rows
    }


    return {

        getWaiter,
        getIds,
        allDays,
        showWaiters,
        reset,
        schedules,
       //  getshifts,
        namePusher


    }




}

//var insertsql = await pool.query('insert into admin (waiter_name_id, day_name_id) values ($1,$2)', [name, day]);
//return inser