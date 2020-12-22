create schema taskbox;
use taskbox;

create table users(
    id int not null unique auto_increment,
    email varchar(100) not null unique, 
    fullName varchar(100) not null,
    profilePic varchar(100) default null,
    pass blob not null,
    is_loggedin tinyint not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default null on update current_timestamp,
    deleted_at timestamp default null
);


create table tasks(
    id int not null unique auto_increment,
    title varchar(255) not null, 
    description text default null, 
    tags varchar(255) default null,
    periodicity_id int not null,
    dayweek varchar(45)  default null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default null on update current_timestamp,
    deleted_at timestamp default null
);


create table tags(
    id int not null unique auto_increment,
    title varchar(255) not null,
    created_at timestamp default current_timestamp
);


create table periodicity(
    id int not null unique auto_increment,
    type varchar(255) not null,
    created_at timestamp default current_timestamp
);