create table users(
	id bigserial primary key,
	name varchar(50) not null,
	address varchar(150) not null,
	mobile_number numeric(10,0) not null,
	gender varchar(10) not null,
	citizen BOOLEAN not null 
);



insert into users(
   name,address,mobile_number,gender,citizen
   ) values('poornima','poornima house,whitefield',9309999910,'female',true);



create table transaction(
	id bigserial primary key,
	amount int not null,
	user_id int not null,
    quantity int not null,
	created_at timestamp default current_timestamp
);
	

insert into transaction(amount,user_id,quantity) values(1000,1,2);



SELECT *FROM users ORDER BY id DESC LIMIT 5;

SELECT COUNT(*) AS female_count FROM users WHERE gender = 'female';

UPDATE users SET name = 'DEEPAK K MAYUR' WHERE id = 1;



//////
SELECT users.id, users.name, SUM(transaction.amount) AS total_amount
FROM users
 LEFT JOIN transaction ON users.id = transaction.user_id
WHERE users.id = 1
GROUP BY users.id, users.name;
//////

//////-----------
SELECT COUNT(*) AS total_transactions
FROM transaction
WHERE created_at BETWEEN '2023-05-01'::date AND CURRENT_TIMESTAMP;
//////----------

///-----------------------------------------
SELECT users.id,users.name, SUM(transaction.amount) AS total_investment
FROM users
JOIN transaction ON users.id = transaction.user_id
WHERE DATE_TRUNC('month', transaction.created_at) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY users.name,users.id;
//--------------------------------------------


