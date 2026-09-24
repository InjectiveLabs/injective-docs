import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../.gitbook/add-network-to-wallet.mdx', import.meta.url), 'utf8');
const trustButtonCount = (source.match(/Add to Trust Wallet/g) || []).length;
const metamaskButtonCount = (source.match(/Add to MetaMask/g) || []).length;
const walletButtonCount = trustButtonCount + metamaskButtonCount;

assert.equal(trustButtonCount, 2, 'expected mainnet and testnet Trust Wallet buttons');
assert.equal(metamaskButtonCount, 2, 'expected mainnet and testnet MetaMask buttons');
assert.equal(
  (source.match(/addEventListener\("eip6963:announceProvider"/g) || []).length,
  walletButtonCount,
  'each EVM wallet button must listen for asynchronous EIP-6963 announcements',
);
assert.equal(
  (source.match(/eip6963:requestProvider/g) || []).length,
  walletButtonCount,
  'each EVM wallet button must request EIP-6963 providers',
);
assert.equal((source.match(/com\.trustwallet\.app/g) || []).length, trustButtonCount);
assert.equal((source.match(/io\.metamask/g) || []).length, metamaskButtonCount);
assert.equal(
  (source.match(/window\.setTimeout\(\(\) => settle\(legacyProvider\), 500\)/g) || []).length,
  walletButtonCount,
  'provider listeners must remain active for asynchronous announcements',
);
assert.ok(!source.includes('list.find((p) => p && p.isMetaMask) || eth'), 'MetaMask must not fall back to an unrelated injected provider');

for (const chainId of ['0x6f0', '0x59f']) {
  assert.ok(source.includes(`params: [{ chainId: "${chainId}" }]`), `missing switch request for ${chainId}`);
}

const errorCodeBlocks = source.match(/const getErrorCode = \(error\) => \{[\s\S]*?\n        \};/g) || [];
assert.equal(errorCodeBlocks.length, walletButtonCount, 'expected normalized wallet error handling for every EVM wallet button');
for (const [index, block] of errorCodeBlocks.entries()) {
  const getErrorCode = new Function(`${block}; return getErrorCode;`)();
  assert.equal(
    getErrorCode({ code: -32603, data: { originalError: { code: 4902 } } }),
    4902,
    `handler ${index + 1} must recognize nested unknown-chain errors`,
  );
  assert.equal(getErrorCode({ code: 4001 }), 4001, `handler ${index + 1} must preserve rejection errors`);
}

console.log('MetaMask and Trust Wallet EIP-6963 regression checks passed');
