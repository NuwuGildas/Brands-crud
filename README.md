# README
 

### How to Set up
 
- Clone this repository to your local machine
```
https://github.com/NuwuGildas/Brands-crud.git
```
- Navigate to the project directory:
```
cd brands-crud
```
- Build:
```
docker compose build
``` 
- Start the Docker containers:
```
docker compose up -d
``` 
- create ```.env``` file and copy the content of ```.env.example```

- Edit your ```.env``` file:
```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=crud
DB_USERNAME=root
DB_PASSWORD=password
```
- Access docker app bash shell:
```
docker compose exec app bash
```
- **Prepare Laravel project:**
```bash
composer install

#generate your application key
php artisan key:generate

#migrate your database
php artisan migrate

#seed your database
php artisan db:seed

#link public directory to storage
php artisan storage:link

#exit bash shell
exit
```

- Access your Laravel application in your web browser at ```http://127.0.0.1:8000```

 
