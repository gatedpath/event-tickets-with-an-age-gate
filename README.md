# Event tickets with an age gate

An ERC-721 ticket with an age-gated purchase, a resale price cap enforced on transfer, a check-in lock, organiser refunds and the three frontend states.

<!-- assets/rehearsal.gif goes here: the eleven-step rehearsal on a local fork, 13 s -->

1 contract · 27 tests · 11-step rehearsal in 13 s · deployed on testnet in 1 block · 2,436,939 gas · 761 test RBNT · verified on Routescan · its day run on testnet in 11 transactions · a web page in the three states

```sh
npm run dev -- --port 8547                              # forks testnet locally, seeds five wallets in the five credential states, serves the page
scripts/rehearse-ticket.sh                              # a ticket's whole day, eleven steps, nothing signed, no key anywhere
cd contracts && forge script script/Deploy.s.sol --rpc-url redbelly_testnet --account <keystore-name> --sender <your-address> --broadcast
                                                        # the one place a key is used: yours, in your keystore, never read by anything here
```

**The gate is in the contract, not the wallet.** `purchase` and `buy` ask the network's identity verifier about
the buyer against request 18, the over-18 recipe, and refuse a credential that was never issued, has expired, was
revoked or is from the wrong jurisdiction. The organiser never sees a birth date. A wallet cannot talk its way past
that, and neither can a front end.

**The check runs on every transfer.** The recipient of every mint and every resale must be eligible,
and the resale cap lives inside the transfer itself: a plain `transferFrom` is refused because a cap on a price
the contract cannot see is not a cap. After the door checks a ticket in, nothing moves it again. A refund still
reaches a holder whose credential has lapsed, because a burn checks nothing.

**Nothing deploys without the ship report.** Pre-flight, the gas report, the tests in all five credential states
and the Slither check write one file. The deploy script will not broadcast on mainnet without that file dated
today, and will not take a mock verifier there at all. On testnet it warns and lets you learn.

## Live on testnet

Chain 153, deployed and verified on 25 October 2026.

| | |
|---|---|
| `GatedTicket` | [`0x7296ABEffB78f95B061D9F635714379C43a6E1E1`](https://redbelly.testnet.routescan.io/address/0x7296ABEffB78f95B061D9F635714379C43a6E1E1/contract/153/code) |
| deploy transaction | `0x6a74ba5399458e4ed528a606d06fb7e1c23882d6fb65d5a02c88b11ff82ee686`, block 3,056,726 |
| gas | 2,436,939 at a base fee of 312,461 gwei, 761.45 test RBNT, about US$1.16 at that day's feed price; opening the sale cost 30,075 gas more in the same block |
| verifier | [`0x2E652B946DC303d8f53bC92D0787e13B109003e5`](https://redbelly.testnet.routescan.io/address/0x2E652B946DC303d8f53bC92D0787e13B109003e5/contract/153/code), a `ReceptorMock` I share with the gated token project |
| eligibility request | 18, the over-18 recipe in `recipes/over-18/` |
| face value, supply, cap | 1 RBNT, 100 tickets, resale capped at 110 percent of face value |
| record and report | `contracts/deployments/153-GatedTicket.json`, `contracts/deployments/ship-153-2026-10-25.md` |

The verifier is a mock because testnet has no real verifier for this recipe yet. Every wallet starts
ineligible and the mock's admin decides. The day after the deploy the ticket went through its whole day on
testnet in eleven transactions: a purchase at face value, a listing at the cap, the door's check-in, a refund,
a second purchase, the holder's credential revoked, and a refund that still reached the revoked holder. Every
refusal was read against the live network between the signed steps: a stranger at the gate, the cap plus one
wei, a wrong price, a used ticket, a second check-in, a purchase by a revoked holder, and a plain transfer to an
eligible holder refused because the only way a ticket changes hands is a priced resale. The one thing a single
verified wallet cannot show on the real network is a resale to a second buyer, because the buyer has to send the
transaction; that step is proven on the fork rehearsal. Nothing here is on mainnet, and I will not put a mock
there; the deploy script refuses it for me.

## Install

| You need | Why |
|---|---|
| Node 22 or later | The scripts and the web app |
| [Foundry](https://getfoundry.sh) | `forge`, `anvil` and `cast`: build, test, fork, deploy |
| A wallet verified on the network, for step 4 only | The network refuses any other sender, and so does the script's own pre-flight |

`npm run doctor` checks the first two and tells you what is missing, one line each with the fix.

1. **Install**, once per clone:

   ```sh
   npm install
   npm run contracts:install
   ```

2. **Test**:

   ```sh
   npm run test        # 95 tests: the scaffold's 68 and 27 for the ticket, one a fuzz over the resale price
   ```

3. **Rehearse** on a local fork, two shells, nothing signed:

   ```sh
   npm run dev -- --port 8547
   ```

   ```sh
   scripts/rehearse-ticket.sh
   ```

   The four ineligible wallets refused, the eligible one buying ticket 0 for 1 RBNT, a wrong price refused, a
   listing over the cap refused, a resale at exactly the cap to a second eligible wallet, a plain transfer
   refused, the door checking the ticket in and every move after that refused, the organiser refunding it at
   face value, and a second ticket refunded to a holder whose credential has since been revoked. The page at
   `/tickets` is served by the same command: not verified, verified but not over eighteen, and eligible with the
   purchase button and the resale box, which refuses a price over the cap before anything is signed.

4. **Deploy** to testnet with your own keystore. Make it once with `cast wallet import <keystore-name>
   --interactive`, verify that wallet on the network, fund it from the faucet, then:

   ```sh
   npm run preflight
   npm run ship -- --chain 153 --account <keystore-name>
   cd contracts && forge script script/Deploy.s.sol --rpc-url redbelly_testnet --account <keystore-name> --sender <your-address> --broadcast
   ```

   Set `VERIFIER` to a verifier contract you already have and the script uses it, which is what I did. Leave it
   unset and the script deploys a mock and says so in capitals. `FACE_VALUE`, `MAX_SUPPLY` and `RESALE_CAP_BPS`
   default to 1 RBNT, 100 and 11,000. The sale opens in the same broadcast when the deployer holds the
   organiser role; with a Safe as organiser, the Safe opens it.

## The flow

| When | Command | What you get |
|---|---|---|
| once per machine | `npm run doctor` | What is missing, with the fix |
| once per clone | `npm install && npm run contracts:install` | The contracts and the web app ready to build |
| every change | `npm run test` | 95 tests, every gated path in all five credential states |
| before a deploy | `npm run dev` and `scripts/rehearse-ticket.sh` | A ticket's whole day on a fork, in thirteen seconds |
| before a deploy | `npm run ship -- --chain 153 --account <keystore-name>` | One report: pre-flight, gas, tests, analysers. On mainnet, the gate |
| the deploy | `forge script ... --broadcast` | Here: one block, 2,436,939 gas, 761 test RBNT |
| after the deploy | `forge verify-contract ...` | Source on Routescan; the record carries the arguments already encoded |
| in use | `purchase`, `list`, `buy`, `checkIn`, `refund` | A ticket whose every move is an event on chain |

<details>
<summary>What the contract does, action by action</summary>

- **`purchase()`**, payable, gated. Exact face value, sale open, supply left; mints the next ticket to the caller.
  There is no per-wallet limit, on purpose: the gate proves this wallet holds a valid credential, and nothing on
  this chain proves two wallets are two people, so a limit would read as a promise the identity layer cannot keep.
- **`list(tokenId, price)`** and **`delist(tokenId)`**, the holder only. A price over the cap is refused at once.
- **`buy(tokenId)`**, payable, gated. Exact asking price, not your own ticket; moves the ticket and pays the seller
  in the same call. The cap is checked again inside the transfer.
- **`checkIn(tokenId)`**, the door role only. Once; clears any offer; from then on the ticket cannot be listed,
  bought or moved.
- **`refund(tokenId)`**, the organiser only. Burns the ticket and pays its holder face value, on a checked-in
  ticket too. Proceeds stay in the contract until `withdraw`.

Every plain `transferFrom` or `safeTransferFrom` is refused: the only way a ticket changes hands is `buy`, where
the contract can see the price. One request id is bound, so the ticket accepts the passport credential; the
recipe's other three over-18 credentials are a follow-up.

</details>

<details>
<summary>Why this network, and what the ticket would be anywhere else</summary>

The buyer proves they are over eighteen without the organiser ever seeing a birth date, and the ticket enforces
its own resale cap on every transfer.

| The same ticket | Who checks the buyer's age | What a resale over the cap does |
|---|---|---|
| on a chain with no identity layer | nobody, or an ID upload a front end keeps | goes through on any marketplace |
| with an allow-list the organiser keeps | the organiser, by hand, off chain | goes through; the list cannot see a price |
| here | the contract, against the network's verifier, on every mint and resale | refused, on chain, inside the transfer |

</details>

## Docs

| | |
|---|---|
| 01. The run record | `docs/01-run-record.md`: what was built, what the fork run found, what was not done |
| 02. The deploy | `contracts/deployments/ship-153-2026-10-25.md`: the report that gated it, every check and figure |
| 03. The rehearsal | `docs/03-rehearsal.txt`: the eleven steps as they ran, gas and status per transaction |
| 04. The day on testnet | `docs/04-live-on-testnet.txt`: the eleven transactions, every hash, every refusal read live |
| 05. The threat model | `THREAT-MODEL.md` |
| 06. The recipes | `recipes/README.md`: the eligibility recipes the kit ships, and why this ticket uses `over-18` |

## Development

```sh
git clone https://github.com/gatedpath/event-tickets-with-an-age-gate && cd event-tickets-with-an-age-gate
npm install && npm run contracts:install
npm run test
```

Issues and pull requests are welcome; `CONTRIBUTING.md` is short. If you have found a security problem,
please read `SECURITY.md` first. This is built on my kit at `npm create redbelly-dapp` and it is an
independent project: Redbelly did not make it and is not associated with it. Their developer portal is
[Vine](https://vine.redbelly.network), and that is where the network's own facts live. MIT.

<details>
<summary>The scaffold's own README, as generated</summary>

<!-- the template README goes here, unchanged except the title -->

</details>
