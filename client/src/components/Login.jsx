import React from 'react'
import { connectWallet, checkWalletConnected } from '../web3/connect';

const Login = (props) => {
    const [loading, setLoading] = React.useState(false); // Loading button state
    const [currentAccount, setCurrentAccount] = React.useState(''); // Connected wallet public address
    const { onLoggedIn } = props;

    React.useEffect(() => {
        async function fetchData() {
          const account = await checkWalletConnected();
          setCurrentAccount(account);
        }
        fetchData();
      });

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
            body: JSON.stringify({ "publicAddress": publicAddress, "username": publicAddress.slice(0, 3).append("...").append(publicAddress.slice(-3)) }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((response) => response.json());

    
    const connectWalletHandler = async () => {
        if (currentAccount === '') {
            const account = await connectWallet();
            setCurrentAccount(account);
            return account;
        }
        return currentAccount;
    }

    const authenticateUser = (account) => {
        fetch(`http://127.0.0.1:5000/api/v1/users?publicAddress=${account}`)
            .then((response) => response.json())
            // If yes, retrieve it. If no, create it.
            .then(async users => {
                if (users == null) {
                    users = await handleSignup(account);
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
            .then(res => onLoggedIn(res.token))
            .catch((err) => {
                window.alert(err);
                setLoading(false);
            });
    }

    const handleClick = async (e) => {
        e.preventDefault();

		setLoading(true);

        // Look if user with current publicAddress is already present on backend
        connectWalletHandler().then((address) => authenticateUser(address));

            
	};


  return (
    <div>
        <div onClick={handleClick} className="font-inter font-medium bg-[#bdcbd8] text-white rounded-md px-4 py-2 cursor-pointer">
            {loading ? "Connecting..." : "Login with Metamask"}
        </div>
    </div>
    
  )
}

export default Login