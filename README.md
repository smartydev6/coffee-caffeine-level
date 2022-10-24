## Coffee app

An app that allows you to control the amount of caffeine you drink

### Local
- `cp .env.example .env`. And set `APP_KEY` and `DB_PASSWORD`. Generate key - `php artisan key:generate`
- Run containers `make build`
- Connect to container `docker exec -it coffee_laravel sh` and run migration `php artisan migrate && php artisan db:seed`
- Run frontend `yarn dev`
