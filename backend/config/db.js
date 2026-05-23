const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        const db = mongoose.connection
        db.on('error', (error) => console.error('db error ::: ', error))
        db.once('open', () => console.log('database connected...'))
    } catch (error) {
        console.error('database connection failed ::: ', error)
        process.exit(1)
    }
}

module.exports = connectDB
