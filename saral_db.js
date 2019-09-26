var sqlite3=require("sqlite3");

//create table by using get method
let db=new sqlite3.Database("saral_api", function(err){
    if(!err){
        db.run("create table navgurukul_courses(id integer primary key autoincrement, name text, description text)", function(exists){
            if(exists){
                console.log("table allready exists!")
            }
            else{	
                console.log("table created successfully!")
            }
        })

        db.run("create table exercise_table(id integer, course_id integer primary key autoincrement, name text, content text, hint text)", function(exists){
            if(exists){
                console.log("table allready exists!")
            }
            else{	
                console.log("table created successfully!")
            } 
        })

        db.run("create table comment_table(exercise_id integer, id integer primary key autoincrement, username text, comment text)", function(exists){
            if(exists){
                console.log("table allready exists!")
            }else{	
                console.log("table created successfully!")
                }
        })   
    }else{
        console.log(err)
        res.send("{data:table allready exists}")
    }
})
    
