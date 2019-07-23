var express=require("express");  //interchange module
var sqlite3=require("sqlite3"); 
	
var app=express();
app.use(express.json());

//create table by using get method
app.get("/create_table", function(req,res){
    let db=new sqlite3.Database("saral_api", function(err){
    if(!err){
    	db.run("create table navgurukul_courses(id integer primary key autoincrement, name text, description text)", function(exists){
	    	if(exists){
	    		console.log("table allready exists!")
	    	}else{	
	    		console.log("table created successfully!")
	    	}
    	})
    	db.run("create table exercise_table(id integer, course_id integer primary key autoincrement, name text, content text, hint text)", function(exists){
    		if(exists){
	    		console.log("table allready exists!")
	    	}else{	
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
    }
	})
	res.send("{data:table allready exists}")
})

//==========================================================================================================================

//get all course where using get method
app.get("/all_courses", function(req,res){
	let db=new sqlite3.Database("saral_api", function(err){
		if(!err){
			db.all("select * from navgurukul_courses", function(err,all_data){
				return res.send(all_data);
			})
		}else{
			res.send("error while select all courses");
		}
	})
})

//get all details calling id while using get method
app.get("/all_courses/:id", function(req,res){
	var id=req.params.id
	let db=new sqlite3.Database("saral_api", function(err){
		if(!err){
			db.all("select * from navgurukul_courses where id=" +id, function(err,data){
				if(data.length>0){
					return res.send(data)
				}else{
					return res.send("Please input correct id...")
				}
			})
		}else{
			return res.send("error while get the data from id calling.");
		}
	})
})

//add course by using post method 
app.post("/add_course", function(req,res){
	let db=new sqlite3.Database("saral_api", function(err){
		var name=req.body.name;
		var description=req.body.description;
		if(!err){
			db.run('insert into navgurukul_courses (name, description) values("'+ name +'", "'+ description +'");');
			return res.send(req.body);
		}else{
			return res.send("error while add the data");
		}
	})
})

//update the data while using put method
app.put("/edit_course/:id", function(req,res){
	let name=req.body.name
	let description=req.body.description
	let db=new sqlite3.Database("saral_api", function(err){
	if(err){
		return res.send("{ErrMsg:there is prblem while while editing data}")
	}else{
		db.all("select * from navgurukul_courses where id=" +req.params.id, function(err,data){
			if(data.length>0){
				db.run('update navgurukul_courses set name="'+ name +'", description="'+ description +'" where id="'+req.params.id+'"', function(err){
		 		return res.send("you have update data successfully.")
		 		})
			}else{
				return res.send("Please choose correct id....")
			}
		})
	}
	});
});	

//delete the data while using delete method
app.delete("/delete_course/:id", function(req,res){
	var id=req.params.id
	var db=new sqlite3.Database("saral_api", function(err){
		if(!err){
			db.all("select * from navgurukul_courses where id=" +id, function(err,data){
			if(data.length>0){
				db.run("delete from navgurukul_courses where id=" +id, function(data){
				return res.send("data deleted successfully")
				})
			}else{
				return res.send("Please choose correct id...");
			}
		})
		}
	})
})

//===================================all exercise data=========================================================

// any id call all exercise get data by using get method 
app.get("/all_courses/:course_id/all_exercises", function(req,res){
	course_id=req.params.course_id
	var db=new sqlite3.Database("saral_api", function(err){
		if(err){
			res.send(err)
		}else{
			db.all("select * from  exercise_table where course_id=" +course_id, function(err,data){
				if(data.length>0){
					return res.send(data)
				}else{
					return res.send("Please choose correct id...");
				}
				
			})
		}
	})
})

// any id call perticluar id exercise get data by using get method 
app.get("/all_courses/:course_id/all_exercises/:id", function(req,res){
	id=req.params.id
	course_id=req.params.course_id
	var db=new sqlite3.Database("saral_api", function(err,data){
		if(err){
			res.send("error while getting data")
		}else{
			db.all("select * from exercise_table where course_id=" +course_id + " and id="+id, function(err,all_data){
				if(all_data.length>0){
					console.log("done");
					return res.send(all_data);
				}else{
					return res.send("{data: There is no data in this id Please correct choose id...}")
				}
			})
		}
	})
})

// any id call add exercise data by using post method 
app.post("/add_exercise", function(req,res){
	var db=new sqlite3.Database("saral_api",function(err){
		var id=req.params.id
		var course_id=req.body.course_id
		var name=req.body.name
		var content=req.body.content
		var hint=req.body.hint
		if(err){
			res.send("err data while add exercise")
		}else{
			db.run('insert into exercise_table (course_id, name, content, hint) values("'+ course_id +'", "'+ name +'", "'+ content +'", "'+ hint +'");');
			return res.send(req.body)
		}
	})
})

// any id call all exercise update data by using put method 
app.put("/all_courses/:course_id/edit_exercise/:id", function(req,res){
	var db=new sqlite3.Database("saral_api", function(err){
		var id=req.params.id
		var course_id=req.body.course_id
		var name=req.body.name
		var content=req.body.content
		var hint=req.body.hint
		if(err){
			res.send("err data while add exercise")
		}else{
			db.all("select * from exercise_table where course_id=" +course_id + " and id="+id, function(err,all_data){
				if(all_data.length>0){
					db.run('update exercise_table set course_id="'+ course_id +'", name="'+ name +'", content="'+ content +'", hint="'+ hint +'" where id="'+id+'"', function(err){
					return res.send("exercise updated successfully!");
					})						
				}else{
					return res.send("Please choose correct id...")
				}
			})
		}
	})
})

// any id call delete exercise by using delete method 
app.delete("/all_courses/:course_id/delete_exercise/:id", function(req,res){
	var id=req.params.id
	var course_id=req.params.course_id
	var db=new sqlite3.Database("saral_api", function(err){
		if(err){
			res.send("err data while add exercise")
		}else{
			db.all("select * from exercise_table where course_id=" +course_id + " and id="+id, function(err,all_data){
				if(all_data.length>0){
					db.run("delete from exercise_table where id=" +id, function(err){					
						return res.send("exercise deleted successfully!");
					})						
				}else{
					return res.send("Please choose correct id...")
				}
			})
		}
	})
})

//===================================all comment data=========================================================

// any id call all comment get comment by using get method 
app.get("/all_exercises/:exercise_id/all_comments", function(req,res){
	exercise_id=req.params.exercise_id
	var db=new sqlite3.Database("saral_api", function(err){
		if(err){
			res.send(err)
		}else{
			db.all("select * from  comment_table where exercise_id=" +exercise_id, function(err,data){
				if(data.length>0){
					return res.send(data)
				}else{
					return res.send("Please choose correct id...");
				}
				
			})
		}
	})
})

// any id call perticluar id comment get data by using get method
app.get("/all_exercises/:exercise_id/all_comments/:id", function(req,res){
	var id=req.params.id
	var course_id=req.params.course_id
	var db=new sqlite3.Database("saral_api", function(err,data){
		if(err){
			res.send("error while getting data")
		}else{
			db.all("select * from comment_table where exercise_id=" +exercise_id + " and id="+id, function(err,all_data){
				if(all_data.length>0){
					console.log("done");
					return res.send(all_data);
				}else{
					return res.send("{data: There is no data in this id Please correct choose id...}")
				}
			})
		}
	})
})

// any id call add comment data by using post method 
app.post("/add_comment", function(req,res){
	var db=new sqlite3.Database("saral_api",function(err){
		var id=req.params.id
		var exercise_id=req.body.exercise_id
		var username=req.body.username
		var comment=req.body.comment
		if(err){
			res.send("err data while add exercise")
		}else{
			db.run('insert into comment_table (exercise_id, username, comment) values("'+ exercise_id +'", "'+ username +'", "'+ comment +'");');
			return res.send(req.body)
		}
	})
})

// any id call delete comment by using delete method 
app.delete("/all_exercises/:exercise_id/delete_comment/:id", function(req,res){
	var id=req.params.id
	var course_id=req.params.course_id
	var db=new sqlite3.Database("saral_api", function(err,data){
		if(err){
			res.send("error while getting data")
		}else{
			db.all("select * from comment_table where exercise_id=" +exercise_id + " and id="+id, function(err,all_data){
				if(all_data.length>0){
					db.run("delete from comment_table where id=" +id, function(err){					
						return res.send("exercise deleted successfully!");
					})
				}else{
					return res.send("{data: There is no data in this id Please correct choose id...}")
				}
			})
		}
	})
})
app.listen(5000,function(){
	console.log("server is listening portal code..");
})

