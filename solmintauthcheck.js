const { Connection, PublicKey } = require('@solana/web3.js');

async function checkMintAuthority(mintAddress) {
    // The connection to the cluster (https://api.mainnet-beta.solana.com') is by default free to use, but you can also use a node RPC url with higher limits.
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    const mintPublicKey = new PublicKey(mintAddress);

    try {
        const accountInfo = await connection.getAccountInfo(mintPublicKey);
        if (!accountInfo) {
            console.log('Mint address not found.');
            return;
        }

        // SPL Token Mint Layout: The first 4 bytes are the Mint Authority Option (0 or 1)
        const mintAuthorityOption = accountInfo.data.slice(0, 4);
        const isMintAuthorityEnabled = mintAuthorityOption.readUInt32LE() !== 0;

        console.log(`Mint authority is ${isMintAuthorityEnabled ? 'enabled' : 'disabled'}.`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Replace with the mint address you want to check
const mintAddress = 'EKMsNeUWCdhf3nzWhATCkwZnWMxHngS1CbFWnb81KrvY';
checkMintAuthority(mintAddress);
