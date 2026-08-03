---
type: "case-study"
slug: "anti-sniping-anti-rug-pull"
title: "Designing Fairer Crypto Launches"
subtitle: "An Anti-Sniping and Anti-Rug-Pull Product Concept"
summary: "A launchpad concept that combines holding rules, early-sale disincentives, and identity signals to reduce bot activity and flash dumps."
tags:
  - "Web3"
  - "Risk controls"
  - "Product concept"
cover: null
coverAlt: null
createdAt: "2025-07-30"
updatedAt: "2025-09-29"
featured: false
draft: false
artifactLinks: []
---

## Problem statement

Decentralised launchpads struggle to deliver fair launches because automated sniper bots can buy large allocations in the first block and dump those tokens minutes later.

## Why this is worth solving

![Excerpt illustrating the effect of token sniper bots](/content/work/anti-sniping-anti-rug-pull/evidence-sniper-bots.png)

Sniper-bot behaviour can distort a launch before genuine retail users have a fair chance to participate.

![Excerpt with statistics about rug pulls and crypto scams](/content/work/anti-sniping-anti-rug-pull/evidence-rug-pulls.png)

Launchpads can also be vulnerable to insider activity and rapidly withdrawn liquidity. Together, bot participation and flash dumping can trigger double-digit price crashes, frighten retail users, and force honest projects to over-incentivise liquidity simply to earn trust.

## Solution directions

1. **Lock the first X blocks:** A sniper may buy in the first hour but cannot sell immediately.
2. **Increase tax on early sales:** Make flash dumping unprofitable.
3. **Add a cooldown:** Require an address to hold tokens for at least N blocks before its first transfer; earlier attempts revert.
4. **Use identity signals:** Connect with a service such as Passport and require a minimum score before an address can sell, making bot participation more difficult.

## Success metrics

- Reduction in sniper-bot participation.
- Share of retail wallets holding for more than 24 hours after launch.
- Reduction in post-launch volatility, such as keeping a first-day crash below 10%.
- Increase in repeat projects choosing the launchpad.

## Next steps

- GitHub-linked proof-of-work vesting.
- Discord AMAs inside the dashboard.
- DAO-based unlock voting.
- Zero-knowledge identity-based anti-bot gating.
