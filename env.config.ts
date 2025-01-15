const {
    PORT: port = '3000',
    ORIGIN: origin = 'localhost',
    API_URL: api_url = 'http://api.url',

    DB_HOST: db_host = '127.0.0.1',
    DB_PORT: db_port = '3306',
    DB_DATABASE: db_database = 'database',
    DB_USERNAME: db_username = 'root',
    DB_PASSWORD: db_password = '',

    SECRET_KEY: secret_key = '',
    REFRESH_SECRET_KEY: refresh_secret_key = '',
} = process.env

export const EnvConfig = () => ({
    port,
    origin,
    api_url,
    db_host,
    db_port,
    db_database,
    db_username,
    db_password,
    secret_key,
    refresh_secret_key,
})