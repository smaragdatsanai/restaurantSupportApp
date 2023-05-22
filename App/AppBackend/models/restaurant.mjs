
export async function createRestaurant(email, password, owner_first_name, phone, company_name, city, street, street_number, delivery_time, minimum_order, callback) {
    let user_id;
    try {
        const user = await createUser(email, password);
        user_id = user[0].id;
    } catch (err) {
        console.error('Error creating user:', err.message);
        return callback(err, null);
    }

    const values = {
        user_id,
        owner_first_name,
        company_name,
        city,
        street,
        street_number,
        delivery_time,
        minimum_order,
        phone,
        open_on: 'Δευτέρα: ..-.. <br>Τρίτη: ..-..<br> Τετάρτη: ..-.. <br>Πέμπτη: ..-..<br> Παρασκευή: ..-.. <br>Σάββατο: ..-..<br> Κυριακή: ..-..'
    };

    try {
        const restaurant = await Restaurant.create(values);
        console.log('New restaurant created:', restaurant.toJSON());
        callback(null, [restaurant.toJSON()]);
    } catch (err) {
        console.error('Error creating restaurant:', err.message);
        callback(err, null);
    }
}

// export async function getRestaurantById(id, callback) {
//     const sql = `SELECT "Restaurant_Id" AS "rid", "Name" AS "rname", "avg_rating", "city", "street", "street_number", "open_on"
//                 FROM "Restaurant"
//                 NATURAL LEFT OUTER JOIN (
//                   SELECT "Restaurant_Id", ROUND(AVG("rating")::numeric, 2) AS "avg_rating"
//                   FROM "Restaurant"
//                   JOIN "CUSTOMER_RATES_RESTAURANT" ON "Restaurant_Id" = "restaurant_id"
//                   GROUP BY "Restaurant_Id"
//                 ) AS r
//                 WHERE "Restaurant_Id" = '${id}';`;
//     try {
//         const [results] = await sequelize.query(sql);
//         console.log('Restaurant details:', results);
//         callback(null, results);
//     } catch (err) {
//         console.error('Error retrieving restaurant details:', err.message);
//         callback(err, null);
//     }
// }


// Synchronize the models with the database (create the tables if they don't exist)
sequelize.sync()
    .then(() => {
        console.log('Database and tables synchronized.');
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });

