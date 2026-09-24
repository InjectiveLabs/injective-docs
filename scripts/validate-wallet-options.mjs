import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../.gitbook/add-network-to-wallet.mdx', import.meta.url), 'utf8');
const trustButtonCount = (source.match(/Add to Trust Wallet/g) || []).length;
assert.equal(trustButtonCount, 2, 'expected mainnet and testnet Trust Wallet buttons');

assert.equal(
  (source.match(/addEventListener\("eip6963:announceProvider"/g) || []).length,
  trustButtonCount,
  'each Trust Wallet button must listen for EIP-6963 provider announcements',
);
assert.equal(
  (source.match(/eip6963:requestProvider/g) || []).length,
  trustButtonCount,
  'each Trust Wallet button must request EIP-6963 providers',
);
assert.equal(
  (source.match(/com\.trustwallet\.app/g) || []).length,
  trustButtonCount,
  'each Trust Wallet button must select rdns com.trustwallet.app',
);

for (const chainId of ['0x6f0', '0x59f']) {
  assert.ok(source.includes(`params: [{ chainId: "${chainId}" }]`), `missing switch request for ${chainId}`);
}

const discoveryBlocks = source.match(/const announcedProviders = \[\];[\s\S]*?const provider = announcedProviders\[0\] \|\| legacyProvider;/g) || [];
assert.equal(discoveryBlocks.length, trustButtonCount, 'expected one provider discovery block per Trust Wallet button');

class TestEvent {
  constructor(type) {
    this.type = type;
  }
}

for (const [index, block] of discoveryBlocks.entries()) {
  const trustProvider = { request: () => Promise.resolve([]) };
  const listeners = new Map();
  const eip6963Window = {
    ethereum: { isMetaMask: true },
    addEventListener(type, listener) { listeners.set(type, listener); },
    removeEventListener(type, listener) {
      if (listeners.get(type) === listener) listeners.delete(type);
    },
    dispatchEvent(event) {
      if (event.type === 'eip6963:requestProvider') {
        listeners.get('eip6963:announceProvider')?.({
          detail: {
            info: { rdns: 'com.trustwallet.app' },
            provider: trustProvider,
          },
        });
      }
    },
  };
  const discover = new Function('window', 'Event', `${block}; return provider;`);
  assert.equal(discover(eip6963Window, TestEvent), trustProvider, `handler ${index + 1} must select the EIP-6963 Trust provider`);

  const legacyProvider = { request: () => Promise.resolve([]) };
  const legacyWindow = {
    trustwallet: legacyProvider,
    ethereum: null,
    addEventListener(type, listener) { listeners.set(type, listener); },
    removeEventListener(type, listener) {
      if (listeners.get(type) === listener) listeners.delete(type);
    },
    dispatchEvent() {},
  };
  assert.equal(discover(legacyWindow, TestEvent), legacyProvider, `handler ${index + 1} must retain legacy fallback`);
}

console.log('Trust Wallet EIP-6963 regression checks passed');
