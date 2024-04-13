const axios = require('axios');

// Controller function for handling sign-in
const signin = async (req, res) => {
    console.log('controller tk  aa gya')
    try {
        const { email, password } = req.body;

        // Make a request to your GraphQL server to handle sign-in
        const gqlRes = await axios.post('http://localhost:8000/graphql', {
            query: `
                mutation SignIn($input: signinInput) {
                    signin(input: $input) {
                        userId
                        email
                        userJwtToken {
                            token
                        }
                    }
                }
            `,
            variables: {
                input: {
                    email,
                    password
                }
            }
        });

        // If the sign-in was successful, send the response from GraphQL server back to the client
        res.json(gqlRes.data);

    } catch (error) {
        console.error('Error during sign-in:', error.message);
        // If there's an error, send an error response to the client
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { signin };
