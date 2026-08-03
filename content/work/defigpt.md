---
type: "case-study"
slug: "defigpt"
title: "DefiGPT"
subtitle: "From Blockchain Noise to Actionable Insights"
summary: "An AI-powered concept that turns complex on-chain data into useful market analysis for traders, NFT collectors, and Web3 investors."
tags:
  - "AI product"
  - "Web3"
  - "Data products"
cover: "/content/work/defigpt/cover.png"
coverAlt: "DefiGPT mobile concept screens for wallet data and market insights"
createdAt: "2025-06-08"
updatedAt: "2025-07-31"
featured: false
draft: false
artifactLinks:
  - label: "Open Figma prototype"
    href: "https://www.figma.com/proto/TjES27Fx5EXwntbP7lbLON/ChatGPT-Project?type=design&t=CyjweznMCT2PkuCB-0&scaling=scale-down&page-id=0:1&starting-point-node-id=8:422&show-proto-sidebar=1"
    kind: "prototype"
---

DefiGPT is a blockchain-based platform that uses a generative engine and retrieval-augmented system to curate insights for users. It integrates NFT collections and data APIs such as Dune Analytics, Covalent, and Airstack for comprehensive market analysis.

> **Product vision:** Bridge the gap between raw blockchain data and actionable decisions for crypto investors.

![DefiGPT product vision and interface](/content/work/defigpt/product-vision.png)

## Why build it?

The breadth and complexity of blockchain data make it difficult for people without a data-analysis background to derive meaningful insights. DefiGPT aims to simplify that complexity so users can understand the crypto marketplace more deeply.

## Who is it for?

Traders, NFT collectors, and Web3 investors who want to understand the market and get insights into particular tokens, NFTs, and protocols before making investment decisions.

## Solution overview

The platform features two proprietary technologies: **Wallet2Vec**, for wallet segmentation, and a **recommendation engine** for personalised investment and trading recommendations.

It analyses multiple kinds of blockchain activity:

| Blockchain data type | Metrics |
| --- | --- |
| Token data | Token balances, transfers, ownership history, market capitalisation, volume, price changes, liquidity |
| DeFi protocol data | Lending rates, liquidity pool sizes, token swap volumes, total value locked, yield rates |
| GameFi | Daily active users, average transaction volume, token circulation, liquidity |
| NFT | Total transactions in NFT marketplaces |
| Transaction data | Transaction hashes, value transferred, transaction volume |

## Functional requirements

### Wallet2Vec

A wallet-embedding system powered by transformer architecture to create stronger wallet segmentation. Each wallet embedding is trained on a sequence of transactions.

### Recommendation engine

A personalised engine designed to understand a user’s style of trading and investment, then recommend useful visualisations.

### Data integration

Comprehensive market analysis across the blockchain data types above, supported by SQL and integrations with diverse data APIs.

## User flow

![DefiGPT end-to-end user flow](/content/work/defigpt/user-flow.png)
