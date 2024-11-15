CREATE TYPE DeficultLevel AS ENUM('easy' , 'medium' , 'hard');

CREATE TYPE Nutration AS (
    quatity VARCHAR(10) ,
    percentage SMALLINT 
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    username VARCHAR(60) ,
    email VARCHAR(60) ,
    password VARCHAR(60) 
) ;

CREATE TABLE recipe (
	id SERIAL PRIMARY KEY  ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    author_id INTEGER REFERENCES users(id) NOT NULL,
	title VARCHAR(60) NOT NULL ,
	summary VARCHAR(400) , 
    photo VARCHAR(200) ,
	prep_time  INTEGER ,
	cook_time  INTEGER ,
	cuisine_type  VARCHAR(40),
	course_type VARCHAR(40) NOT NULL,
	difficulty_level DeficultLevel ,
	diet VARCHAR(40) ARRAY ,
    instructions TEXT ,
    notes TEXT,
    introduction TEXT
);

CREATE TABLE nutrations_info (
    id SERIAL PRIMARY KEY ,
    recipe_id INTEGER REFERENCES recipe(id) ,
    fat Nutration ,
    staturated_fat Nutration ,
    cholesterol Nutration ,
    sodium Nutration ,
    pottasium Nutration ,
    carbohydrate Nutration ,
    fiber Nutration ,
    sugar Nutration ,
    protein Nutration ,
    vitamin_a Nutration ,
    vitamin_b1 Nutration ,
    vitamin_b2 Nutration ,
    vitamin_b3 Nutration ,
    vitamin_b6 Nutration ,
    vitamin_b12 Nutration ,
    vitamin_c Nutration ,
    vitamin_d Nutration ,
    vitamin_e Nutration ,
    vitamin_k Nutration ,
    calcium Nutration ,
    iron Nutration ,
    magnesium Nutration ,
    phosphorus Nutration ,
    zinc Nutration 
) ;
CREATE TABLE ingrediant_group (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(60) ,
    recipe_id INTEGER REFERENCES recipe(id) ,
    order_by SMALLINT 
) ;

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY  ,
    name VARCHAR(60) ,
    quantity VARCHAR(60) ,
    note VARCHAR(100) ,
    recipe_id INTEGER REFERENCES recipe(id) ,
    group_id INTEGER REFERENCES ingrediant_group(id)
) ;


