create table days_of_the_week (
	id serial not null primary key,
    day_name text not null
	 
);
   create table waiters (
      id serial primary key, 
      waiter_name text not null 
    
     );
    
    create table admin (
	id serial not null primary key,
    day_name_id int,
    waiter_name_id int,
foreign key (day_name_id) references days_of_the_week(id),
foreign key (waiter_name_id) references waiters(id)
);
insert into days_of_the_week(day_name) values('Sunday');
insert into days_of_the_week(day_name) values('Monday');
insert into days_of_the_week(day_name) values('Tuesday');
insert into days_of_the_week(day_name) values('wednesday');
insert into days_of_the_week(day_name) values('Thursday');
insert into days_of_the_week(day_name) values('Friday');
insert into days_of_the_week(day_name) values('Satarday');

select waiter_name,waiter_name_id, day_name, day_name_id
from waiters
 inner join days_of_the_week 
 on days_of_the_week.id= waiters.id
 inner join admin
 on admin.day_name_id = days_of_the_week.id;
 
 select waiter_name, day_name from admin
         join waiters on admin.waiter_name_id = waiters.id join days_of_the_week on admin.day_name_id = days_of_the_week.id;