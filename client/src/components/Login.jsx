import React from 'react'
import Web3 from 'web3';

var web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8546");

const Login = (props) => {
    const [loading, setLoading] = React.useState(false); // Loading button state

    const handleAuthenticate = (publicAddress, signature) =>
        fetch('http://127.0.0.1:5000/api/v1/auth', {
            body: JSON.stringify({ "publicAddress": publicAddress, "signature": signature }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then((response) => response.json());


    const handleSignMessage = async (publicAddress, nonce) => {
		try {
			const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [`I am signing my one-time nonce: ${nonce}`, publicAddress, '']
            });
			return { publicAddress, signature };
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};


    const handleSignup = (publicAddress) =>
        fetch(`http://127.0.0.1:5000/api/v1/users/`, {
            body: JSON.stringify({ "publicAddress": publicAddress, "username": "jason" }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((response) => response.json());



    const handleClick = async (e) => {
        e.preventDefault();

		// Check if MetaMask is installed
		if (!window.ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await window.ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3(window.ethereum);
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((err) => {
            if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
            } else {
            console.error(err);
            }
        });
        const publicAddress = accounts[0];
        // console.log(publicAddress);

		setLoading(true);

		// Look if user with current publicAddress is already present on backend
		fetch(`http://127.0.0.1:5000/api/v1/users?publicAddress=${publicAddress}`)
			.then((response) => response.json())
			// If yes, retrieve it. If no, create it.
			.then(async users => {
                if (users == null) {
                    users = await handleSignup(publicAddress);
                }
                return users;
            })
            // Popup MetaMask confirmation modal to sign message
            .then(res => handleSignMessage(res.publicAddress, res.nonce))
            // Send signature to backend on the /auth route
            .then(async res => {
                const data = await handleAuthenticate(res.publicAddress, res.signature);
                return data
            })
            .then(res => props.onLoggedIn(res.token))
			.catch((err) => {
				window.alert(err);
				setLoading(false);
			});
	};


  return (
    <button onClick={handleClick} className="font-inter font-medium bg-[#bdcbd8] text-white rounded-md px-4 py-2">
        {loading ? "Loading..." : "Login with Metamask"}
    </button>
  )
}

export default Login