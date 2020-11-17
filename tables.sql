create table days_of_the_week(
	id serial not null primary key,
    day_name text not null
	 
);
   create table waiters (
      id serial primary key, 
      waiter_name text not null 
    
     );
    
    create table admin (
	id serial not null primary key,
    day_name_id int not null,
    waiter_name_id int not null,
foreign key (day_name_id) references days_of_the_week (id),
foreign key (waiter_name_id) references waiters(id)
);
insert into days_of_the_week(day_name) values('Sunday');
insert into days_of_the_week(day_name) values('Monday');
insert into days_of_the_week(day_name) values('Tuesday');
insert into days_of_the_week(day_name) values('wednesday');
insert into days_of_the_week(day_name) values('Thursday');
insert into days_of_the_week(day_name) values('Friday');
insert into days_of_the_week(day_name) values('Satarday');

