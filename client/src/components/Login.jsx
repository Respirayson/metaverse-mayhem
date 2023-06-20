import React from "react";
import { connectWallet, checkWalletConnected } from "../utils/connect";
import { AiFillPlayCircle } from "react-icons/ai";

const Login = (props) => {
  const [loading, setLoading] = React.useState(false); // Loading button state
  const [currentAccount, setCurrentAccount] = React.useState(""); // Connected wallet public address
  const { onLoggedIn } = props;

  React.useEffect(() => {
    async function fetchData() {
      const account = await checkWalletConnected();
      setCurrentAccount(account);
    }
    fetchData();
  }, []);

  const handleAuthenticate = (publicAddress, signature) =>
    fetch("http://127.0.0.1:5000/api/v1/auth", {
      body: JSON.stringify({
        publicAddress: publicAddress,
        signature: signature,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

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
        method: "personal_sign",
        params: [message, publicAddress, ""],
      });
      return { publicAddress, signature };
    } catch (err) {
      throw new Error("You need to sign the message to be able to log in.");
    }
  };

  const handleSignup = (publicAddress) =>
    fetch(`http://127.0.0.1:5000/api/v1/users/`, {
      body: JSON.stringify({
        publicAddress: publicAddress,
        username: publicAddress
          .slice(0, 3)
          .append("...")
          .append(publicAddress.slice(-3)),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const connectWalletHandler = async () => {
    if (currentAccount === "") {
      const account = await connectWallet();
      setCurrentAccount(account);
      return account;
    }
    return currentAccount;
  };

  const authenticateUser = (account) => {
    fetch(`http://127.0.0.1:5000/api/v1/users?publicAddress=${account}`)
      .then((response) => response.json())
      // If yes, retrieve it. If no, create it.
      .then(async (users) => {
        if (users == null) {
          users = await handleSignup(account);
        }
        return users;
      })
      // Popup MetaMask confirmation modal to sign message
      .then((res) => handleSignMessage(res.publicAddress, res.nonce))
      // Send signature to backend on the /auth route
      .then(async (res) => {
        const data = await handleAuthenticate(res.publicAddress, res.signature);
        return data;
      })
      .then((res) => onLoggedIn(res.token))
      .catch((err) => {
        window.alert(err);
        setLoading(false);
      });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Look if user with current publicAddress is already present on backend
    connectWalletHandler().then((address) => authenticateUser(address));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex flex-row justify-center items-center bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
    >
      {loading ? (
        "Connecting..."
      ) : (
        <>
          <AiFillPlayCircle className="text-white mr-2" />
          <p className="text-white text-base font-semibold">Connect Wallet</p>
        </>
      )}
    </button>
  );
};

export default Login;
