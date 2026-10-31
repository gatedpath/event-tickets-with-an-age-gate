/** `IRedbellyVerifier.isEligible(address, uint64)` from @gatedpath/receptor-mock. */
export declare const verifierAbi: readonly [{
    readonly type: "function";
    readonly name: "isEligible";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "wallet";
        readonly type: "address";
    }, {
        readonly name: "requestId";
        readonly type: "uint64";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
}];
/** The network's permission contract: `isAllowed(address)` (RESEARCH.md question 7). */
export declare const permissionAbi: readonly [{
    readonly type: "function";
    readonly name: "isAllowed";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "wallet";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
}];
/**
 * `ReceptorMock.recordFor(address, uint64)` from @gatedpath/receptor-mock. The mock is the
 * only verifier in the kit that can say when a credential expires; real verifiers answer a plain
 * boolean. Used by `receptorMockExpiry` for testnet and fork demos only.
 */
export declare const receptorMockAbi: readonly [{
    readonly type: "function";
    readonly name: "recordFor";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "wallet";
        readonly type: "address";
    }, {
        readonly name: "requestId";
        readonly type: "uint64";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "isSet";
            readonly type: "bool";
        }, {
            readonly name: "status";
            readonly type: "uint8";
        }, {
            readonly name: "expiresAt";
            readonly type: "uint64";
        }];
    }];
}];
/**
 * The two `ReceptorMock` functions the dev state panel uses on a local Anvil (chain 31337):
 * `setStatus(wallet, requestId, status)` writes a state, `eligibilityStatus(wallet, requestId)`
 * reads it back. Never called against 151 or 153; the panel refuses to render there.
 */
export declare const receptorMockStatusAbi: readonly [{
    readonly type: "function";
    readonly name: "setStatus";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "wallet";
        readonly type: "address";
    }, {
        readonly name: "requestId";
        readonly type: "uint64";
    }, {
        readonly name: "status";
        readonly type: "uint8";
    }];
    readonly outputs: readonly [];
}, {
    readonly type: "function";
    readonly name: "eligibilityStatus";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "wallet";
        readonly type: "address";
    }, {
        readonly name: "requestId";
        readonly type: "uint64";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint8";
    }];
}];
