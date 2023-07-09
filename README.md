# Security Middleware Implementation

This project demonstrates the implementation of various security middlewares in Express to enhance the security and performance of your application.

## Middlewares

The project utilizes the following middlewares:

- Response Time Middleware: Measures the response time of each request.
- Morgan Middleware: Logs HTTP requests to the console.
- Helmet Middleware: Adds security headers to HTTP responses.
- JSON Web Token (JWT) Middleware: Authenticates and authorizes requests using JSON Web Tokens.
- DDOS Middleware: Protects against Distributed Denial-of-Service (DDoS) attacks.
- Express Rate Limiter Middleware: Implements rate limiting to control the number of requests per IP address.
- Joi: Performs data validation using the Joi library.

## Getting Started

To get started with the project, follow these steps:

1. Ensure you have Node.js and npm installed on your system.
2. Clone this repository or download the project files.
3. Open a terminal or command prompt and navigate to the project directory.
4. Install the project dependencies by running the following command:
   npm install

5. Start the application by running the following command:
   npm start

The application will start on port 3000.

## Middleware Usage

The middlewares are implemented in the `middlewares` directory. To use a specific middleware, you need to import it into your application and apply it as Express middleware using the `app.use()` method.

Here's an overview of how each middleware is used in your application:

1. Response Time Middleware:
    - Imported as `responseTimeMiddleware` from `./middlewares/responseTime.middleware`.
    - Applied using `app.use(responseTimeMiddleware)`.

2. DDOS Middleware:
    - Imported as `ddosMiddleware` from `./middlewares/ddos.middleware`.
    - Applied using `app.use(ddosMiddleware.express, callback)`.
    - Replace `callback` with the next middleware in the queue.

3. Morgan Middleware:
    - Imported as `morganMiddleware` from `./middlewares/morgan.middleware`.
    - Applied using `app.use(morganMiddleware)`.

4. Helmet Middleware:
    - Imported as `helmetMiddleware` from `./middlewares/helmet.middleware`.
    - Applied using `app.use(helmetMiddleware, callback)`.
    - Replace `callback` with the next middleware in the queue.

5. Express Rate Limiter Middleware:
    - Imported as `expressRateLimiterMiddleware` from `./middlewares/expressRateLimit.middleware`.
    - Applied using `app.use('/myEndPoint', expressRateLimiterMiddleware(config), callback)`.
    - Replace `config` with the configuration options for rate limiting, such as `endpoint`, `windowDurationInMinutes`, `requestLimit`, `statusCode`, and `ErrorMessage`.
    - Replace `callback` with the next middleware in the queue.

6. JSON Web Token (JWT) Middleware:
    - Imported as `authenticateJsonWebToken` from `./middlewares/jwt.middleware`.
    - Applied using `app.use(authenticateJsonWebToken)`.

7. Joi Data Validation:
    - Imported as `Joi` from the `joi` module.
    - Utilized in your route handler to validate the request data using a predefined schema.

Feel free to explore the `middlewares` directory for detailed implementation and configuration of each middleware.

## API Endpoint

The project includes an API endpoint `/myEndPoint` that utilizes the implemented middlewares to protect itself from malicious requests. The API endpoint is defined with the following route:
     -`/myEndPoint` (HTTP GET)

You can test the project by making requests to the `/myEndPoint` endpoint and observe the behavior and security enhancements provided by the middlewares.

## Contributing

Contributions to this project are welcome! If you encounter any issues or have suggestions for improvement, please submit an issue or a pull request on the project's GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
