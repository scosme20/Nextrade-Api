import express from 'express';
import cors from 'cors';
import authRoutes from './src/Routes/Auth/authRoutes.js';
import catalogRoutes from './src/Routes/catalogue/catalogueRoutes.js';
import productRoutes from './src/Routes/product/productRoutes.js';
import orderRoutes from './src/Routes/order/order.js';
import demandRoutes from './src/Routes/Demand/demmandRoutes.js';
import swaggerSetup from './Config/swagger/swagger.js';
import './Config/index.js'

const app = express();

const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/', catalogRoutes);
app.use('/api/', productRoutes);
app.use('/api/', orderRoutes);
app.use('/api/', demandRoutes);

swaggerSetup(app);

export default app;
