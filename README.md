# IdleGrid

IdleGrid is a working marketplace prototype for renting access to idle computers by the hour. Open `index.html` in a modern browser; no installation is required.

## What works in this prototype

- Search and filter available Windows, Mac, and console listings
- Dynamic hourly checkout and reservation creation
- Owner listing workflow and estimated monthly payout
- Sessions dashboard
- Local browser persistence for bookings and listings
- Responsive interface with clear provider-required states

## Commercial model

Start with creator and developer workstations, not general personal-device access. The suggested blended consumer price is **$7.60/hour**. Hosts receive **75% ($5.70/hour)** and IdleGrid keeps **25% ($1.90/hour)** before payment, support, insurance, and infrastructure costs.

Suggested price bands:

| Machine | Guest price | Host share (75%) | Platform share (25%) |
|---|---:|---:|---:|
| Console streaming | $2–$4/hr | $1.50–$3/hr | $0.50–$1/hr |
| Gaming PC / Apple Silicon Mac | $5–$9/hr | $3.75–$6.75/hr | $1.25–$2.25/hr |
| RTX 4090 / M3 Max workstation | $8–$14/hr | $6–$10.50/hr | $2–$3.50/hr |
| Pro GPU / high-memory workstation | $14–$25/hr | $10.50–$18.75/hr | $3.50–$6.25/hr |

The host estimate uses: `available hours × expected 80% utilization × hourly host payout`. Owners also pay their own electricity and taxes. Do not promise utilization until a market-specific pilot measures it.

## How a production version should work

1. Host installs a signed IdleGrid agent and passes identity, hardware, network, and ownership checks.
2. Agent creates an isolated guest environment: ephemeral VM where supported, otherwise a dedicated restricted OS account. Personal sessions and storage remain inaccessible.
3. Guest searches by verified hardware, required software, latency, region, and availability.
4. Platform authorizes payment and host policy before issuing short-lived connection credentials.
5. An approved remote-access provider carries the encrypted session. Clipboard, file transfer, USB, microphones, and cameras default to off.
6. Owner retains a visible session indicator, instant disconnect, schedules, and a physical kill switch.
7. Session artifacts and guest accounts are destroyed or reverted; both parties receive a signed audit record.
8. Payout releases after a short dispute window, minus the 25% platform fee.

## Important product boundaries

- Do not expose an owner's normal desktop. Use an ephemeral VM, cloud gaming sandbox, or separate restricted account.
- Console rental is materially harder: platform terms, game licensing, account sharing, and vendor streaming restrictions must be reviewed before launch. Treat it as a later pilot, not the initial core market.
- Payment processing, remote control, identity verification, malware scanning, insurance, tax reporting, and production authentication are not implemented in this local prototype.
- Prohibit credential theft, spam, cryptomining without explicit host opt-in, evasion, malware, and access to owner peripherals or files.

## Recommended launch wedge

Pilot 25–50 owner-operated Windows workstations in one metro area for rendering, video export, build jobs, and supervised gaming. Begin with preinstalled licensed tools or bring-your-own-license workflows. Measure utilization, failure rate, support cost, energy cost, dispute rate, and host retention before expanding.
