# README
 

### How do i Set up
 
- Clone this repository to your local machine
```
https://github.com/NuwuGildas/Brands-crud.git
```
- Navigate to the project directory:
```
cd brands-crud
```
- Start the Docker containers:
```
docker-compose up -d
``` 
- Make Migrations:
```
docker compose exec web php artisan migrate
```
- Seed your database with default:
```
 docker-compose exec app php artisan db:seed --class=BrandSeeder
```
- Link public directory to storage:
```
 docker-compose exec app php artisan storage:link  
```
- Access your Laravel application in your web browser at ```http://127.0.0.1:8000```

 
