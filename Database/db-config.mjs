import {Sequelize} from 'sequelize'

const sequelize = new Sequelize ({
    host: 'localhost',
    port:5432,
    dialect: 'postgres',
    username: process.env.POSTGRES_USERNAME|| 'postgres',
    password: process.env.POSTGRES_PASSWORD|| 'mkaradel01',
    database: 'RestaurantSupportingApp',
    logging: false ,
    define:{
        timestamps: false ,
        freezeTableName: true
    },

});

const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established succesfully");
    } catch (error) {
        console.error("Unable to connect to database:", error );
    }
};

testDbConnection();
export{sequelize};
