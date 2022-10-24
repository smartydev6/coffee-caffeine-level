FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN apt-get update && \
    apt-get install -y libpq-dev && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip pdo pdo_pgsql pgsql

RUN a2enmod rewrite

COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

ARG WWWGROUP

RUN groupadd --force -g $WWWGROUP sail
RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 sail

WORKDIR /var/www/html
COPY . .
RUN chown -R www-data:www-data /var/www
RUN composer install
