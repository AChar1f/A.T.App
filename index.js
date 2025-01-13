import path from 'path';
import cors from 'cors';
import { userRouter, express } from './controller/UserController.js';
import { errorHandling } from './middleware/errorHandling.js';

const app = express();
const port = +process.env.PORT || 4000;

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});

app.use('/users', userRouter);
app.use(
    express.static("./static"),
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cors()
);

// Serve the main HTML file
app.get('^/$|/home', (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), 'static/html/index.html'));
});

// Catch-all route for 404
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(process.cwd(), 'static/html/404.html'));
});

// Error handling middleware
app.use(errorHandling);

// Start the server
app.listen(port, () => {
    console.log(`Live on port: ${port}`);
});
