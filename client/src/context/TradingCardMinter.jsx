import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TradingCardMinterContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    if (!ethereum) {
        return alert("Please install MetaMask");
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        contract,
    });

    return contract;
};

export const TradingCardMinterProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    console.log(currentAccount);
    const [formData, setFormData] = useState({
        addressTo: "",
        name: "",
    });

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                window.alert("Please install MetaMask");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                const account = accounts[0];
                console.log("Found an authorized account: ", account);
                setCurrentAccount(account);
            } else {
                console.log("No authorized account found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const mintTradingCard = async () => {
        try {
            if (ethereum) {
                const { addressTo, name } = formData;
                const contract = getEthereumContract();

                const transaction = await contract.requestNewCard(
                    "Hello World!"
                );
                await transaction.wait();
                console.log(
                    `1 Card successfully sent to ${addressTo} under ${name} - Transaction hash: ${transaction.hash}`
                );
            } else {
                console.log("Ethereum is not present");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const createRandomNumber = async () => {
        try {
            if (ethereum) {
                const contract = getEthereumContract();

                const number = await contract._createRandomNum(
                    15,
                    ethers.utils.getAddress(
                        "0xf10718695c5aE9f0382410C15ecAf3D27a37840F"
                    )
                );

                await number.wait();
                console.log(number);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e, name) => {
        setFormData({ ...formData, [name]: e.target.value });
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TradingCardMinterContext.Provider
            value={{
                handleChange,
                formData,
                mintTradingCard,
                createRandomNumber,
            }}
        >
            {children}
        </TradingCardMinterContext.Provider>
    );
};
