// Express.js
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'


const app = express()
const router = express.Router();
const port = process.env.PORT || '3000';

// Δηλώνουμε πως ο φάκελος "public" θα περιέχει τα στατικά αρχεία, π.χ. το http://127.0.0.1:3000/style.css θα επιστρέψει, το αρχείο /public/style.css
// Specify that the "public" folder will contain the static files, e.g. http://127.0.0.1:3000/style.css will return, the file /public/style.css
app.use(express.static('public'))

// Χρήση της Handlebars σαν template engine. Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, για να αναγνωριστεί το extname (το κάνουμε αυτό για να έχουμε αρχεία με κατάληξη .hbs / το default είναι .handlebars)
// Use Handlebars as a template engine. Note: the engine must have the same name as the extname, in order for the extname to be recognized (we do this to have files ending in .hbs / the default is .handlebars)
app.engine('hbs', engine({ extname: 'hbs' }));

// Ορίζουμε πως η 'hbs' θα είναι η μηχανή template (δηλ. θα ενεργοποιείται με την res.render()) 
// Set 'hbs' to be the template engine (i.e. activated with res.render())
app.set('view engine', 'hbs');

// ---------------------------------------------
// Model - το μοντέλο δεδομένων μας είναι αποθηκευμένο στη RAM. 
// Model - our data model is stored in RAM.
let tasks = [
    { "id": 1, "task": "Να βρω σφάλματα", "status": 0, "created_at": "2023-05-07 09:08:10" },
    { "id": 2, "task": "Να ξαναδώ τον κώδικα", "status": 0, "created_at": "2023-05-10 23:50:40" },
    { "id": 3, "task": "Να διορθώσω τα σφάλματα", "status": 1, "created_at": "2023-05-10 23:50:40" },
    { "id": 4, "task": "Να αναμορφώσω τον κώδικα", "status": 1, "created_at": "2023-05-10 23:50:40" },
    { "id": 5, "task": "Να πάω για μπύρες", "status": 1, "created_at": "2023-05-10 23:50:50" }
]

let getAllTasks = function (callback) {
    callback(null, tasks);
};

// function createRangeArray(start, end) {
//     let arr = [];
//     for (let i = start; i <= end; i++) {
//       arr.push(i);
//     }
//     return arr;
//   }

// ---------------------------------------------
// Controller - όλη η λογική που χρειάζεται να υλοποιεί ο εξυπηρετητής
// Controller - the business logic that the server needs to implement

// Θα πρέπει να επιστρέφει ένα task ανάλογα με το id του
// Should return a task based on its id
let getTaskById = function (taskId, callback) {
    // "task" is now a dummy object. Should be replaced with a the real task (with id=taskId) from the data model 
    let task = { "id": taskId, "task": "Να βρω σφάλματα", "status": 1, "created_at": "2023-05-07 09:08:10" };
    callback(null, task);
};

// Απαντάει σε αίτημα για όλα τα tasks
// Answers a request for all tasks
let listAllTasks = function (req, res) {
    getAllTasks(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        // console.log('res', tasks);
        res.send(tasks); // sends the object to the client
    });
};

// Απαντάει σε αίτημα για συγκεκριμένο task
// Answers a request for a specific task
let listSingleTask = function (req, res) {
    // read the value of the taskId parameter from the request url
    getTaskById(req.params.taskId, function (err, task) {
        if (err) {
            res.send(err);
        }
        // console.log('res', task);
        res.send(task); // sends the object to the client
    });
}

// Δημιουργεί την σελίδα που φορτώνεται την 1η φόρτωση της ιστοσελίδας στον φυλλομετρητή 
// Creates the page that is shown with the first user request, in the browser
let listAllTasksRender = function (req, res) {
    getAllTasks(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        // console.log('tasks', tasks);
        // στέλνει το object "tasks" στο template "tasks"
        // sends the "tasks" object to the "tasks" template
        res.render('tasks', { tasks: tasks }); 
    });
}

let toggleTask = function(req,res){
    console.log("toggle a task!");
    console.log(req.query["taskid"]);
    for(let task of tasks){
        if(req.query.taskid == task.id){
            if(task.status==0){
                task.status = 1;
            }
            else if(task.status==1) {
                task.status = 0;
            }
            console.log( task.status);
        }
    }
    res.render('tasks', { tasks: tasks }); 
}

let addTask = function(req,res){
    
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let dateCreated = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    let arr = [];
    for(let i in tasks){
      arr.push(tasks[i].id);
      
    }
    console.log(arr);
    let maxid=Math.max(...arr);
    console.log(maxid);
    let tempTask = {"id": maxid + 1, "task": req.query.taskName, "status": 0, "created_at": dateCreated};
    tasks.push(tempTask);
    console.log(tempTask.id);
    res.render('tasks', { tasks: tasks }); 
}

let deleteTask = function(req, res){
    console.log(req.query.taskid);
    
    for(let i in tasks){
        if(req.query.taskid == tasks[i].id){
            tasks.splice(i,1);
            for(let j in tasks){
                tasks[j].id = Number(j) + 1;
            }
        }
    }
    res.render('tasks', { tasks: tasks }); 
}


// Χρησιμοποίησε το αντικείμενο δρομολόγησης `router` 
// load the router 'routeρ'
app.use(router); 

// Όρισε δύο διαδρομές
// Define two routes
router.route('/api/tasks').get(listAllTasks);
router.route('/').get(listAllTasksRender);
router.route('/toggle').get(toggleTask);
router.route('/addTask').get(addTask);
router.route('/deleteTask').get(deleteTask);

// Επίσης έτσι: 
// Could also be done like this:
// app.route('/api/tasks').get(listAllTasks);
// app.route('/').get(listAllTasksRender);


const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });

