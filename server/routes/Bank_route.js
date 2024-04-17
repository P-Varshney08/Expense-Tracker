const router=require("express").Router();
const Bank=require("../models/Bank_schema")
const Loan=require("../models/LoanSchema")
const User=require("../models/User")

const seedData = [
        { 
            name: 'Bank of America', 
            image:"https://img.freepik.com/free-photo/giant-building-with-sun_1127-400.jpg?t=st=1713195392~exp=1713198992~hmac=c85b3a54ddec071c921d450f0dff1d204553442ce81231c2f52425a114c8c97b&w=996",
            address: '100 Main St', 
            city: 'New York', 
            country: 'USA', 
            phone: '+1-555-123-4567', 
            email: 'info@bankofamerica.com', 
            interest_rate: 4.5, 
            assets: 5000000000 
        },
        { 
            name: 'Chase Bank',
            image:"https://img.freepik.com/free-photo/giant-building-with-sun_1127-400.jpg?t=st=1713195392~exp=1713198992~hmac=c85b3a54ddec071c921d450f0dff1d204553442ce81231c2f52425a114c8c97b&w=996", 
            address: '200 Market St', 
            city: 'San Francisco', 
            country: 'USA', 
            phone: '+1-555-987-6543', 
            email: 'info@chase.com', 
            interest_rate: 5, 
            assets: 6000000000 
        },
        { 
            name: 'HSBC Bank',
            image:"https://img.freepik.com/free-photo/giant-building-with-sun_1127-400.jpg?t=st=1713195392~exp=1713198992~hmac=c85b3a54ddec071c921d450f0dff1d204553442ce81231c2f52425a114c8c97b&w=996", 
            address: '300 Wall St', 
            city: 'London', 
            country: 'UK', 
            phone: '+44-20-1234-5678', 
            email: 'info@hsbc.com', 
            interest_rate: 3.8, 
            assets: 8000000000 
        },
        { 
            name: 'Wells Fargo', 
            image:"https://img.freepik.com/free-photo/office-skyscrapers-business-district_107420-95733.jpg?t=st=1713195258~exp=1713198858~hmac=177eea7c2c53bfeff1e41297815e2f5c9b928231503165e21d1f750ec85bfa42&w=996",
            address: '400 Broadway St', 
            city: 'Los Angeles', 
            country: 'USA', 
            phone: '+1-555-222-3333', 
            email: 'info@wellsfargo.com', 
            interest_rate: 4.2, 
            assets: 4500000000 
        },
        { 
            name: 'Citi Bank', 
            image:"https://img.freepik.com/free-photo/office-skyscrapers-business-district_107420-95733.jpg?t=st=1713195258~exp=1713198858~hmac=177eea7c2c53bfeff1e41297815e2f5c9b928231503165e21d1f750ec85bfa42&w=996",
            address: '500 Oak St', 
            city: 'Chicago', 
            country: 'USA', 
            phone: '+1-555-444-5555', 
            email: 'info@citibank.com', 
            interest_rate: 4.8, 
            assets: 7000000000,
        }
    ];


const updateBanks = async () => {
    try {
        const existingBanks = await Bank.find({});
        
        if (existingBanks.length === 0) {
            await Bank.insertMany(seedData);
            console.log('Bank data seeded successfully.');
        }
    } catch (error) {
        console.error('Error seeding stock data:', error);
    }
};

router.get('/AllBanks', async (req, res) => {
    try {
        await updateBanks();
        const bank = await Bank.find();
        return res.status(200).json(bank);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const data=await Bank.findById(id);
        if(data){
            return res.status(200).json({bank_data:data});
        }
        return res.status(404).send({message:"bank not found"})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:error})
        
    }
})

router.post("/take_loan/:userId/:bankId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const bankId = req.params.bankId;
        const { amount } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.loans.length > 0) {
            if(user.loans[user.loans.length-1].is_paid==false){
            return res.status(400).json({ message: 'User already has an existing loan' });
            }
        }
        const bank = await Bank.findById(bankId);
        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' });
        }
        const interestAmount = amount * (bank.interest_rate / 100);
        const totalAmountDue = amount + interestAmount;
        const amount_user=user.current_balance+amount
        user.current_balance += amount_user
        await user.save();
        const loan = new Loan({
            user_id: userId,
            bank_id: bankId,
            loan_amount: amount,
            interest_rate: bank.interest_rate,
            interest_amount: interestAmount,
            total_amount_due: totalAmountDue,
            is_approved: true, 
            is_paid: false,
            last_updated: new Date() 
        });

        await loan.save();
        user.loans.push(loan._id);
        await user.save();

        res.status(201).json({ message: 'Loan taken successfully', loan });
    } catch (error) {
        console.error('Error taking loan:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
router.get('/bank_details/:userId/bank_details', async (req, res) => {
    const userId = req.params.userId;

    try {
    
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
     
        const loans = await Loan.find({ user_id: userId });
        let totalLoanAmount = 0;
        for (const loan of loans) {
            const currentDate = new Date();
            const daysDiff = Math.floor((currentDate - loan.last_updated) / (1000 * 60 * 60 * 24));
            const interestAmount = (loan.loan_amount * loan.interest_rate / 100) * daysDiff;
            totalLoanAmount += loan.loan_amount + interestAmount;
        }

     
        res.json({ totalLoanAmount,loans });
    } catch (error) {
        console.error('Error fetching user bank details:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
router.post('/pay_loan/:userId/', async (req, res) => {
    const userId = req.params.userId;
    const { amount } = req.body;

    try {
   
        const user = await User.findById(userId).populate("loans");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const loan = await user.loans;
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        const currentDate = new Date();
        const daysDiff = Math.floor((currentDate - loan.last_updated) / (1000 * 60 * 60 * 24));
        const interestAmount = (loan.loan_amount * loan.interest_rate / 100) * daysDiff;
        const totalAmountDue = loan.loan_amount + interestAmount;

        if (amount < totalAmountDue) {
            return res.status(400).json({ message: 'Insufficient amount to pay off the loan' });
        }
        if (user.current_balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance to make the payment' });
        }

        user.current_balance -= amount;
        loan.is_paid = true;
        await Promise.all([user.save()]);

        res.status(200).json({ message: 'Loan payment successful' });
    } catch (error) {
        console.error('Error making loan payment:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});



module.exports=router;