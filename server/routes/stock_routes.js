const express = require('express');
const router = express.Router();
const Stock = require("../models/Stock_schema.js");
const User=require("../models/User.js")

const seedData = [
    // { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3500.00 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2700.00 },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.00 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 300.00 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 700.00 }
];

const seedStocksData = async () => {
    try {
        const existingStocks = await Stock.find({});
        
        if (existingStocks.length === 0) {
            await Stock.insertMany(seedData);
            console.log('Stock data seeded successfully.');
        }
    } catch (error) {
        console.error('Error seeding stock data:', error);
    }
};

const updateStockPrices = async () => {
    try {
        const stocks = await Stock.find();

        for (const stock of stocks) {
            const changePercent = (Math.random() * 10 - 5) / 100; 
            const newPrice = stock.price * (1 + changePercent);
            const roundedPrice = Math.round(newPrice * 100) / 100; 

            stock.price = roundedPrice;
            stock.history.push({ timestamp: new Date(), price: roundedPrice });

            await stock.save();
        }
    } catch (error) {
        console.error('Error updating stock prices:', error);
    }
};


seedStocksData();
router.get('/stocks', async (req, res) => {
    try {
  
        await updateStockPrices();

        const stocks = await Stock.find();
        
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});



router.post('/set-money-for-stocks/:id', async (req, res) => {
    const userId = req.params.id;
    const { amount } = req.body; 

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.money_for_stock += amount;
        await user.save();

        res.status(200).json({ message: 'Money set aside for stock purchases successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
router.post('/buy-stock/:userId', async (req, res) => {
    console.log(req.body)
    const userId = req.params.userId;
    console.log(userId)
    const { symbol, quantity } = req.body; 

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const stock = await Stock.findOne({ symbol });
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        const cost = stock.price * quantity;
        if (user.money_for_stock < cost) {
            return res.status(400).json({ message: 'Insufficient funds in money_for_stock to purchase the stock.' });
        }

        user.money_for_stock -= cost;


        let ownedStock = user.ownedStocks.find(s => s.symbol === symbol);
        if (ownedStock) {
            ownedStock.quantity += quantity;
        } else {
            user.ownedStocks.push({ symbol, quantity });
        }

        await user.save();

        res.status(200).json({ message: 'Stock purchased successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
router.get('/portfolio/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        let totalInvestment = 0;
        let totalCurrentValue = 0;


        const portfolio = [];
        for (const ownedStock of user.ownedStocks) {

            const stock = await Stock.findOne({ symbol: ownedStock.symbol });
            if (!stock) {
                continue;
            }

            const currentStockValue = ownedStock.quantity * stock.price;
            const originalInvestment = ownedStock.quantity * stock.price;
            totalCurrentValue += currentStockValue;
            totalInvestment += originalInvestment;
            portfolio.push({
                symbol: ownedStock.symbol,
                name: stock.name,
                quantity: ownedStock.quantity,
                currentPrice: stock.price,
                currentValue: currentStockValue,
                originalInvestment: originalInvestment
            });
        }
        const earningsOrLosses = totalCurrentValue - totalInvestment;
        res.json({
            portfolio,
            totalInvestment,
            totalCurrentValue,
            earningsOrLosses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


module.exports = router;