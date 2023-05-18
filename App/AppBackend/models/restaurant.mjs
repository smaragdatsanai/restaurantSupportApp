
export async function createRestaurant(email, password, owner_first_name, phone, company_name, city, street, street_number, delivery_time, minimum_order, callback) {
    let user_id;
    await createUser(email, password, (err, data) => {
        if(err){
            return console.error(err.message);
        }
        else {
            user_id = data[0].id;
        }  
    });
    const sql = `INSERT INTO "public.RESTAURANT" VALUES (${user_id}, '${owner_first_name}', NULL, '${company_name}', '${city}', '${street}', ${street_number}, NULL, NULL, ${delivery_time}, ${minimum_order}, '${phone}', 'Δευτέρα: ..-.. <br>Τρίτη: ..-..<br>
    Τετάρτη: ..-.. <br>Πέμπτη: ..-..<br>
    Παρασκευή: ..-.. <br>Σάββατο: ..-..<br>
    Κυριακή: ..-..') RETURNING "user_id";`;
    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();
        callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        callback(err, null);
    }
}

export async function getRestaurantById(id, callback) {
    let sql = `SELECT "user_id" as "rid", "company_name" as "rname", "avg_rating", "city", "street", "street_number", "tel", "open_on"
    FROM "public.RESTAURANT" NATURAL LEFT OUTER JOIN (SELECT "user_id", ROUND(AVG("rating")::numeric, 2) as "avg_rating"
                                                      FROM "public.RESTAURANT" JOIN "public.CUSTOMER_RATES_RESTAURANT" ON "user_id"="restaurant_id"
                                                      GROUP BY "user_id") AS r
    WHERE "user_id" = ${id};`;
    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();
        callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        callback(err, null);
    }
}