// Does the deployer hold enough RBNT? Cost is gas times the latest base fee, priced in USD
// through the on-chain feed by gasCostUsd from @gatedpath/chains, with 25 percent on
// top because the base fee moves with the RBNT price between now and the send.
import { formatUnits, gasCostUsd, toCaller } from '@gatedpath/chains';
export const MARGIN_PERCENT = 25;
export async function checkBalance(deployer, gas, rpc, chain) {
    if (!deployer)
        return { id: 'balance', status: 'skip', reason: 'No deployer given, so there is no balance to read.' };
    if (chain !== 151 && chain !== 153)
        return { id: 'balance', status: 'skip', reason: 'The RPC is not a Redbelly chain, so the price feed is not there to read.' };
    try {
        const caller = toCaller(rpc);
        const balance = BigInt((await caller('eth_getBalance', [deployer, 'latest'])));
        const cost = await gasCostUsd({ gasUsed: gas, rpc });
        const required = (cost.wei * BigInt(100 + MARGIN_PERCENT)) / 100n;
        const data = {
            deployer,
            gas: gas.toString(),
            gasPriceWei: cost.gasPriceWei.toString(),
            costWei: cost.wei.toString(),
            costRbnt: cost.rbnt,
            costUsd: cost.usd,
            usdPerRbnt: cost.usdPerRbnt,
            requiredWei: required.toString(),
            requiredRbnt: formatUnits(required, 18),
            balanceWei: balance.toString(),
            balanceRbnt: formatUnits(balance, 18),
            marginPercent: MARGIN_PERCENT,
        };
        const short = (s) => (s.includes('.') ? s.replace(/(\.\d{4})\d+$/, '$1') : s);
        if (balance >= required) {
            return { id: 'balance', status: 'pass', reason: `${deployer} holds ${short(data.balanceRbnt)} RBNT; ${gas.toLocaleString('en-US')} gas costs about ${short(cost.rbnt)} RBNT (US$${cost.usd.toFixed(4)}) and ${short(data.requiredRbnt)} RBNT covers it with ${MARGIN_PERCENT}% margin.`, data };
        }
        return { id: 'balance', status: 'fail', reason: `${deployer} holds ${short(data.balanceRbnt)} RBNT but ${gas.toLocaleString('en-US')} gas needs ${short(data.requiredRbnt)} RBNT with ${MARGIN_PERCENT}% margin (US$${cost.usd.toFixed(4)} at the feed price); ${chain === 153 ? 'get testnet RBNT at https://redbelly.faucetme.pro/' : 'fund the deployer first'}.`, data };
    }
    catch (e) {
        return { id: 'balance', status: 'fail', reason: `Could not price the deployment: ${e.message}.`, data: { deployer, gas: gas.toString() } };
    }
}
