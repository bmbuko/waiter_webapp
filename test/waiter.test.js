const assert = require('assert');
const pg = require("pg");
const Pool = pg.Pool;
const waiter = require("../waiters")

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waiters_availability'

const pool = new Pool({
    connectionString

});




const waiterAvailability = waiter(pool)

describe('waiters Availability', function () {

    beforeEach(async function () {

        // clean the tables before each test run
        await pool.query("delete from waiters;");
        await pool.query("delete from admin;")


    });

    it('should be able to insert names in the  database and show the name in a list', async () => {
        await waiterAvailability.getWaiter('Phelisa');




        const nameList = await waiterAvailability.showWaiters()

        assert.deepEqual([
            {
                waiter_name: 'Phelisa'
            }
        ], nameList
        )

    });
    it("should not be able to show a list of weekdays", async () => {
        const alldays = await waiterAvailability.allDays()

        assert.deepEqual([{
        day_name: 'Sunday'},
        {day_name: 'Monday'},
        { day_name: 'Tuesday' },
        { day_name: 'wednesday' },
        { day_name: 'Thursday' },
        { day_name: 'Friday' },
        { day_name: 'Satarday' },
        ], alldays)
    })

     it("should be able to get the id of a waiter and the day id ", async () => {
    const ids = await waiterAvailability.getIds();
    assert.deepEqual([{waiter_name_id : '1'},
    {day_name_id : '1',ids}
])

     });
     it("should be able to  ", async () => {
    

     });
    // it("should be able to filter registrations from  Stellenbosch", async () => {
    //     await regNum.addRegNumber('CL 123 321');
    //     await regNum.addRegNumber('CA 123');
    //     await regNum.addRegNumber('CJ 124-124');
    //     await regNum.addRegNumber('CA 123-123');
    //     await regNum.addRegNumber('CA 124-124');

    //     const filterStellenbosch = await regNum.filter('3');

    //     assert.deepEqual([
    //         {
    //           reg_number: 'CL 123 321'
    //         }
    //       ]
    //       , filterStellenbosch );

    // });
    // it("should be able to filter all registration numbers entered", async () => {
    //     await regNum.addRegNumber('CL 123 321');
    //     await regNum.addRegNumber('CA 123');
    //     await regNum.addRegNumber('CJ 124-124');
    //     await regNum.addRegNumber('CA 123-123');
    //     await regNum.addRegNumber('CA 124-124');

    //     const filterAllTOwns = await regNum.filter('all');

    //     assert.deepEqual([{
    //         reg_number: 'CL 123 321'
    //     },
    //     {
    //         reg_number: 'CA 123'
    //     },
    //     {
    //         reg_number: 'CJ 124-124'
    //     },
    //     {
    //         reg_number: 'CA 123-123'
    //     },
    //     {
    //         reg_number: 'CA 124-124'
    //     }
    //     ]
    //         , filterAllTOwns);

    // });
    // it ("should be able to delete from database ", async ()=>{
    //     await regNum.addRegNumber('CL 123 321');
    //     await regNum.addRegNumber('CA 123');
    //     await regNum.addRegNumber('CJ 124-124');
    //     await regNum.addRegNumber('CA 123-123');
    //     await regNum.addRegNumber('CA 124-124');


    //     await regNum.resetData()
    // const reset=await regNum.showReg()
    //     assert.deepEqual([],reset);
    // })






    after(function () {
        pool.end();
    })

});