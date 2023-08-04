import React, { useContext, useEffect, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { connectWallet, checkWalletConnected } from '../../utils/connect';
import { WebContext } from '../../context/WebContext';

/**
 * Component for the login button.
 * @param {Object} props - Component props.
 * @param {Function} props.onLoggedIn - Callback function for successful login.
 * @returns {JSX.Element} Login button component.
 */
function Login({ onLoggedIn, text }) {
  const [loading, setLoading] = useState(false); // Loading button state
  const [currentAccount, setCurrentAccount] = useState(''); // Connected wallet public address
  const { setShowAlert, setSuccess, setAlertMessage } = useContext(WebContext);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Fetches the connected wallet account on component mount.
     */
    async function fetchData() {
      const account = await checkWalletConnected();
      setCurrentAccount(account);
    }
    fetchData();
    window?.ethereum?.on('accountsChanged', fetchData);
  }, []);

  /**
   * Sends authentication request to the backend.
   * @param {string} publicAddress - Wallet public address.
   * @param {string} signature - Signed message signature.
   * @returns {Promise<Object>} Authentication response.
   */
  const handleAuthenticate = (publicAddress, signature) => fetch('https://metaverse-mayhem.onrender.com/api/v1/auth', {
    body: JSON.stringify({
      publicAddress,
      signature,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((response) => response.json());

  /**
   * Signs the message with the wallet and returns the signature.
   * @param {string} publicAddress - Wallet public address.
   * @param {string} nonce - One-time nonce for message signing.
   * @returns {Promise<Object>} Object containing publicAddress and signature.
   * @throws {Error} If the message signing fails.
   */
  const handleSignMessage = async (publicAddress, nonce) => {
    try {
      const message = `By proceeding, you agree to the following terms and conditions:

            1. You will comply with the provided terms.
            2. You will use the service lawfully and responsibly.
            3. Intellectual property rights belong to their respective owners.
            4. Your personal information will be handled as per our Privacy Policy.
            5. We are not liable for inaccuracies; use the service at your own risk.
            6. These terms may be modified without prior notice.
            
            By signing your one-time nonce: ${nonce}, you confirm your understanding and acceptance of these terms and conditions.`;

      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, publicAddress, ''],
      });
      return { publicAddress, signature };
    } catch (err) {
      throw new Error('You need to sign the message to be able to log in.');
    }
  };

  /**
   * Creates a new user account on the backend.
   * @param {string} publicAddress - Wallet public address.
   * @returns {Promise<Object>} Signup response.
   */
  const handleSignup = (publicAddress) => {
    if (publicAddress == null) {
      throw new Error('Unable to create user account. Please try again.');
    }
    return fetch('https://metaverse-mayhem.onrender.com/api/v1/users/', {
      body: JSON.stringify({
        publicAddress,
        username: publicAddress
          .slice(2, 8)
          .toUpperCase(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .catch((err) => {
        setAlertMessage(err.message);
        setShowAlert(true);
        setSuccess(false);
      });
  };

  /**
   * Handles the connection to the wallet.
   * @returns {Promise<string>} Connected wallet account.
   */
  const connectWalletHandler = async () => {
    if (currentAccount === '') {
      try {
        const account = await connectWallet();
        setCurrentAccount(account);
        return account;
      } catch (err) {
        setAlertMessage(err.message);
        setShowAlert(true);
        setSuccess(false);
        setLoading(false);
      }
    }
    return currentAccount;
  };

  /**
   * Authenticates the user by performing the necessary steps.
   * @param {string} account - Wallet public address.
   */
  const authenticateUser = (account) => {
    fetch(
      `https://metaverse-mayhem.onrender.com/api/v1/users?publicAddress=${account}`,
    )
      .then((response) => response.json())
      // If yes, retrieve it. If no, create it.
      .then(async (users) => {
        if (users == null) {
          users = await handleSignup(account);
        }
        return users;
      })
      // Popup MetaMask confirmation modal to sign message
      .then(async (res) => handleSignMessage(res.publicAddress, res.nonce))
      // Send signature to backend on the /auth route
      .then(async (res) => {
        const data = await handleAuthenticate(res.publicAddress, res.signature);
        console.log(data);
        return data;
      })
      .then((res) => onLoggedIn(res.token))
      // .then(() => navigate('/'))
      // .then(() => window.location.reload())
      .catch((err) => {
        setShowAlert(true);
        setAlertMessage(err.message);
        setSuccess(false);
        setLoading(false);
      });
  };

  /**
   * Handles the click event of the login button.
   * @param {Object} e - Event object.
   */
  const handleClick = async (e) => {
    setLoading(true);

    if (!window.ethereum) {
      setAlertMessage('Please install MetaMask to continue.');
      setShowAlert(true);
      setSuccess(false);
      setLoading(false);
      return;
    }

    connectWalletHandler().then((account) => authenticateUser(account));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center h-fit py-4 px-6 hover:bg-[#25718B] bg-[#25618B] rounded-[32px] gap-[12px]"
    >
      {loading ? (
        'Connecting...'
      ) : (
        <>
          <AiFillPlayCircle className="w-[24px] h-[24px] object-contain text-white" />
          <p className="text-white text-[16px] font-semibold">{text}</p>
        </>
      )}
    </button>
  );
}

export default Login;
