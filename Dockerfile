FROM php:8.1-apache

# Set working directory
WORKDIR /var/www/html

# Install Node.js and NPM using NVM version manager
ENV NODE_VERSION=22.10.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm

RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Setup laravel application
# Copy Laravel app files while transfering ownership
COPY --chown=www-data:www-data . .

# Run composer install
RUN composer install --no-interaction --optimize-autoloader

# Install node modules
RUN npm install

# Setup Database (SQLite)
RUN mkdir -p database \
    && touch database/database.sqlite \
    && php artisan key:generate \
    && php artisan migrate --force

RUN npm run build

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Expose port 80 for Apache
EXPOSE 80
