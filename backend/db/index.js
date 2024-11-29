const {Pool} = require('pg') //importing pg library
const pool = new Pool(); //creating a pool

module.exports = {
    query: (text, params) => pool.query(text, params),
}