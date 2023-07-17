import Web3 from 'web3';
import { connectWallet, checkWalletConnected, getEthereumContract } from '../../src/utils/connect';
import { ethers } from 'ethers';

vi.mock('web3');

describe('Wallet Utils', () => {
  beforeEach(() => {
    window.ethereum = undefined;
    window.alert = vi.fn();
  });

  it('should connect wallet and return the connected account', async () => {
    window.ethereum = {
      enable: () => 13,
      request: () => ['0x123abc'],
    };

    const enableSpy = vi.spyOn(window.ethereum, 'enable');
    const requestSpy = vi.spyOn(window.ethereum, 'request');

    const account = await connectWallet();

    expect(window.ethereum.enable())
    expect(enableSpy).toHaveBeenCalled();
    expect(requestSpy).toHaveBeenCalledWith({ method: 'eth_requestAccounts' });
    expect(account).toBe('0x123abc');
  });

  it('should handle error when connecting wallet', async () => {
    window.ethereum = {
      enable: vi.fn().mockRejectedValue(new Error('You need to allow MetaMask.')),
    };
    await connectWallet();
    await expect(window.ethereum.enable()).rejects.toThrowError('You need to allow MetaMask.');

  });


  it('should handle user rejection when connecting wallet', async () => {
    window.ethereum = {
      request: vi.fn().mockRejectedValue({ code: 4001 }),
    };

    const consoleLogSpy = vi.spyOn(console, 'log');
    await connectWallet();
    await expect(window.ethereum.request()).rejects.toThrowError();
    expect(consoleLogSpy).toHaveBeenCalledWith('Please connect to MetaMask.');
  });
  

  it('should handle missing MetaMask installation when connecting wallet', async () => {
    await connectWallet();

    expect(window.alert).toHaveBeenCalledWith('Please install MetaMask first.');
  });


  it('should check if wallet is connected and return the connected account', async () => {
    window.ethereum = {
      request: vi.fn().mockResolvedValue(['0x123abc']),
    };

    const account = await checkWalletConnected();

    expect(window.ethereum.request).toHaveBeenCalledWith({ method: 'eth_accounts' });
    expect(account).toBe('0x123abc');
  });

  it('should return empty string when wallet is not connected', async () => {
    window.ethereum = {
      request: vi.fn().mockResolvedValue([]),
    };

    const account = await checkWalletConnected();

    expect(window.ethereum.request).toHaveBeenCalledWith({ method: 'eth_accounts' });
    expect(account).toBe('');
  });
});

describe("getEthereumContract", () => {
  it("returns the contract object when window.ethereum is available", () => {
    // Mock window.ethereum
    window.ethereum = true;

    // Mock dependencies
    const address = "0x123456789";
    const abi = [];
    const providerMock = {
      getSigner: vi.fn(() => ({
        connect: vi.fn(),
        getAddress: vi.fn(),
        signMessage: vi.fn(),
        sendTransaction: vi.fn(),
      })),
    };
    const ContractMock = vi.fn();

    // Mock ethers providers and contracts
    vi.spyOn(ethers.providers, "Web3Provider").mockImplementation(() => providerMock);
    vi.spyOn(ethers, "Contract").mockImplementation(() => ContractMock);

    // Call the function
    const result = getEthereumContract(address, abi);

    // Assert the expected output
    expect(ethers.providers.Web3Provider).toHaveBeenCalledWith(window.ethereum);
    expect(providerMock.getSigner).toHaveBeenCalled();
    expect(ethers.Contract).toHaveBeenCalledWith(address, abi, expect.any(Object));
    expect(result).toBe(ContractMock);

    // Clear mocks
    vi.restoreAllMocks();
  });

  it("returns undefined when window.ethereum is not available", () => {
    // Mock window.ethereum
    window.ethereum = undefined;

    // Call the function
    const result = getEthereumContract("0x123456789", []);

    // Assert the expected output
    expect(result).toBeUndefined();
  });
});
