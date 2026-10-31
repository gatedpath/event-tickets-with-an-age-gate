'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ACCESS_URL, FAUCET_URL, VINE_FEES_URL, VINE_INTERACTION_URL } from './urls.js';
function cx(...parts) {
    return parts.filter(Boolean).join(' ');
}
function short(address) {
    return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
/** State 1: nothing is connected. */
export function NotConnected({ className, children }) {
    return (_jsxs("div", { className: cx('rb-elig', 'rb-elig-disconnected', className), role: "status", children: [_jsx("p", { className: "rb-elig-title", children: "Connect a wallet" }), _jsx("p", { className: "rb-elig-body", children: children ?? 'Redbelly checks identity per wallet, so the app needs a wallet before it can tell you anything.' })] }));
}
/** State 2: connected, but `permission.isAllowed` is false. The wallet cannot transact at all. */
export function NotVerified({ address, chainName = 'this network', testnet = false, className, children }) {
    return (_jsxs("div", { className: cx('rb-elig', 'rb-elig-unverified', className), role: "status", children: [_jsx("p", { className: "rb-elig-title", children: "Verify your wallet" }), _jsxs("p", { className: "rb-elig-body", children: [_jsx("code", { children: short(address) }), " is not yet allowed to transact on ", chainName, ". Redbelly gates every wallet behind a one-time identity check; this app never sees your documents, only a true or false from the network."] }), _jsxs("ol", { className: "rb-elig-steps", children: [_jsxs("li", { children: ["Open", ' ', _jsx("a", { href: ACCESS_URL, target: "_blank", rel: "noreferrer", children: ACCESS_URL }), ' ', "with this same wallet and complete verification."] }), testnet && (_jsxs("li", { children: ["Get testnet RBNT from", ' ', _jsx("a", { href: FAUCET_URL, target: "_blank", rel: "noreferrer", children: "FAUCETME" }), ' ', "so you can pay gas."] })), _jsx("li", { children: "Come back here. This page re-checks on every new block and moves on by itself." })] }), _jsx("p", { className: "rb-elig-muted", children: children ?? "Don't switch to another wallet to get past this: the credential belongs to the wallet that was verified." })] }));
}
/** State 3: verified on the network, but the verifier says no for this action. */
export function Ineligible({ requirement, className, children }) {
    return (_jsxs("div", { className: cx('rb-elig', 'rb-elig-ineligible', className), role: "status", children: [_jsx("p", { className: "rb-elig-title", children: "Not eligible for this action" }), _jsx("p", { className: "rb-elig-body", children: children ??
                    `Your wallet is verified on the network, but it does not hold an accepted proof for this action${requirement ? ` (${requirement})` : ''}. The contract would refuse the transaction, so the button stays off.` }), _jsx("p", { className: "rb-elig-muted", children: "The check is on-chain and the answer is a plain yes or no; the app cannot tell whether a credential is missing, expired or revoked. Your identity wallet can." })] }));
}
/** State 4: eligible. Usually wraps the action button. */
export function Eligible({ className, children }) {
    return (_jsxs("div", { className: cx('rb-elig', 'rb-elig-eligible', className), role: "status", children: [_jsx("p", { className: "rb-elig-title", children: "Eligible" }), children] }));
}
function humanDuration(seconds) {
    if (seconds <= 0)
        return 'now';
    const days = Math.floor(seconds / 86_400);
    if (days >= 2)
        return `${days} days`;
    const hours = Math.floor(seconds / 3600);
    if (hours >= 2)
        return `${hours} hours`;
    const minutes = Math.max(1, Math.floor(seconds / 60));
    return `${minutes} minutes`;
}
/** State 5: eligible, and the verifier says the credential expires soon. Wraps the action too. */
export function ExpiringSoon({ expiresAt, secondsToExpiry, className, children }) {
    const when = new Date(expiresAt * 1000);
    return (_jsxs("div", { className: cx('rb-elig', 'rb-elig-expiring', className), role: "status", children: [_jsxs("p", { className: "rb-elig-title", children: ["Eligible, credential expires in ", humanDuration(secondsToExpiry)] }), _jsxs("p", { className: "rb-elig-body", children: ["After ", _jsx("time", { dateTime: when.toISOString(), children: when.toUTCString() }), " this wallet will be refused until the credential is renewed. Renew it in your identity wallet before then; a transaction sent after expiry reverts."] }), children] }));
}
/** Shown while both reads are in flight for the first time. */
export function Checking({ className, children }) {
    return (_jsx("div", { className: cx('rb-elig', 'rb-elig-checking', className), role: "status", "aria-busy": "true", children: _jsx("p", { className: "rb-elig-body", children: children ?? 'Checking the network and the verifier…' }) }));
}
/** An RPC or contract read failed and nothing is cached. Says so; does not guess. */
export function EligibilityError({ error, onRetry, className, children }) {
    return (_jsxs("div", { className: cx('rb-elig', 'rb-elig-error', className), role: "alert", children: [_jsx("p", { className: "rb-elig-title", children: "Could not check eligibility" }), _jsx("p", { className: "rb-elig-body", children: children ?? (error?.message ?? 'The RPC did not answer.') }), onRetry && (_jsx("button", { type: "button", className: "rb-elig-button", onClick: onRetry, children: "Try again" }))] }));
}
/** One component that picks the state component for you. Bring your own action as `children`. */
export function EligibilityGate({ eligibility, address, chainName, testnet, requirement, className, children, render }) {
    const custom = render?.[eligibility.state];
    if (custom !== undefined)
        return _jsx(_Fragment, { children: typeof custom === 'function' ? custom(eligibility) : custom });
    switch (eligibility.state) {
        case 'disconnected':
            return _jsx(NotConnected, { className: className });
        case 'checking':
            return _jsx(Checking, { className: className });
        case 'unverified':
            return _jsx(NotVerified, { address: address, chainName: chainName, testnet: testnet, className: className });
        case 'ineligible':
            return _jsx(Ineligible, { requirement: requirement, className: className });
        case 'expiring':
            return (_jsx(ExpiringSoon, { expiresAt: eligibility.expiresAt, secondsToExpiry: eligibility.secondsToExpiry, className: className, children: children }));
        case 'eligible':
            return _jsx(Eligible, { className: className, children: children });
        case 'error':
            return _jsx(EligibilityError, { error: eligibility.error, onRetry: () => void eligibility.refresh(), className: className });
    }
}
/** "Last checked" line with a refresh button. Put it under any gate. */
export function LastChecked({ eligibility, className }) {
    const at = eligibility.lastCheckedAt;
    return (_jsxs("p", { className: cx('rb-elig-last-checked', className), children: [at ? (_jsxs(_Fragment, { children: ["Last checked ", _jsx("time", { dateTime: new Date(at).toISOString(), children: new Date(at).toLocaleTimeString() }), eligibility.blockNumber !== undefined ? ` at block ${eligibility.blockNumber.toString()}` : ''] })) : ('Not checked yet'), _jsx("button", { type: "button", className: "rb-elig-button rb-elig-button-small", onClick: () => void eligibility.refresh(), disabled: eligibility.isFetching, children: eligibility.isFetching ? 'Checking…' : 'Refresh' })] }));
}
/**
 * The wallet gas warning from Vine, which every Redbelly dApp should show near its first
 * transaction. See docs/wallet-gas-warning.md for the source and the reasoning.
 */
export function GasWarning({ transferUsd, className }) {
    return (_jsxs("p", { className: cx('rb-elig-gas', className), children: ["Gas on Redbelly is priced in US dollars and paid in RBNT", transferUsd ? `; a plain transfer costs about US$${transferUsd} right now` : '', ". Redbelly warns that most wallets show gas information wrongly on this network, so trust the figure here over the wallet's, and read", ' ', _jsx("a", { href: VINE_INTERACTION_URL, target: "_blank", rel: "noreferrer", children: "Vine's note" }), ' ', "and", ' ', _jsx("a", { href: VINE_FEES_URL, target: "_blank", rel: "noreferrer", children: "how fees work" }), "."] }));
}
