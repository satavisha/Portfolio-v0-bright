---
type: "writing"
slug: "gullak-product-teardown"
title: "Gullak: The Key is Trust | A Product Teardown"
subtitle: "Where a digital gold savings journey loses trust—and how human support could restore it"
summary: "A product teardown of Gullak’s digital gold experience, tracing price-transparency friction and a support workflow designed to rebuild trust at critical moments."
tags:
  - "Product teardown"
  - "Fintech"
  - "Customer experience"
cover: "/content/work/gullak-product-teardown/gullak-product-teardown.png"
coverAlt: "Gullak product teardown cover with the Gullak logo and three digital gold app screens"
createdAt: "2026-07-06"
updatedAt: "2026-07-06"
featured: true
featuredOrder: 0
draft: false
artifactLinks:
  - label: "Original LinkedIn article"
    href: "https://www.linkedin.com/pulse/gullak-key-trust-product-teardown-satavisha-mitra-gpx2c/"
    kind: "link"
---

While working on financial products at Dvara’s Spark Money, I spent a lot of time studying how Indians save and invest. That eventually led me to Gullak, and I was genuinely impressed.

Consider this article my small ode to the team behind Gullak. As a product manager, these are simply my two cents on a few opportunities that, in my opinion, could make an already thoughtful product even stronger.

Let’s get started.

## 1. Context

Gullak is a digital gold savings app that lets users buy 24K digital gold through one-time purchases or automated daily, weekly, or monthly SIPs.

At the time of this teardown, the app had more than 1.3 million downloads, 300,000 active customers, ratings of 4.6 and 4.7 across the app stores, and had reached $2.5M ARR in 2025.

> “We want to see a country whose people are truly atmanirbhar by making wealth creation extremely easy and accessible.”

That ambition is the heart of Gullak’s vision: a financially atmanirbhar Bharat.

## 2. Users

Before jumping into the problem, let’s first understand who we’re designing for.

![Two Gullak user personas: Anjali, a cautious salaried saver, and Binod, a small-business owner with variable income](/content/work/gullak-product-teardown/user-personas.png)

The first is a young salaried professional who wants to save a small amount, such as ₹500, without committing to automatic deductions before she trusts the product. The second has irregular monthly income and wants to make one-time purchases after a good month while staying in control of his cash flow.

**Core user goal:** Help young earning Indians build a low-effort savings habit through familiar assets such as gold and silver.

## 3. User journey and friction points

![Gullak user journey from discovering digital gold to seeing a lower sale value and seeking help](/content/work/gullak-product-teardown/user-journey.png)

The journey begins with hope: gold feels safe, a small investment feels achievable, and the portfolio appears to grow. Trust drops at withdrawal. The user sees a sale value lower than the amount paid, cannot tell why, and turns to chat for an explanation. Satisfaction becomes worry, then frustration.

With that journey in mind, let’s identify the problems worth solving.

## 4. Prioritising the problem

To keep this teardown focused, I’ll concentrate on two key problems that stood out.

### Problem 1: The difference between buy and sell prices is unclear

Why this problem?

During my research, I found several Play Store reviews where users felt confused or even misled by the difference between the buying and selling price of gold. This suggests it was not just something I noticed while using the app, but a recurring pain point for users.

![Three Play Store reviews describing confusion about Gullak’s buy and sell prices](/content/work/gullak-product-teardown/play-store-reviews.png)

### Problem 2: Customers have no quick way to reach a human for critical issues

Why this problem?

The first problem naturally leads to the second. When users are confused about why they are receiving less than they invested, they often need immediate reassurance. Gullak offered chat-based support, but no clear way to escalate to a human when the chatbot was not enough.

## 5. Solutions

Let’s explore possible solutions to these two problems and prioritise them by impact and effort.

| Problem | Solution | Impact | Effort | Priority |
| --- | --- | --- | --- | --- |
| Price transparency | Improve the Asset Value page with a “Why is this different?” tooltip | High | Low | P0 |
| Price transparency | Add a buy-price breakdown to the confirmation screen | High | Medium | P1 |
| Price transparency | Add a sell-price breakdown to the confirmation screen | High | Medium | P1 |
| Price transparency | Link the existing educational video from relevant screens | Medium | Low | P2 |
| Customer support | Add “Talk to Human Support” to critical transaction screens | High | Medium | P0 |
| Customer support | Automatically offer human escalation after unresolved bot replies | High | Medium | P0 |
| Customer support | Escalate money-related issues beyond the chatbot | High | Medium | P1 |
| Customer support | Offer callback requests for urgent financial issues | Medium | High | P2 |
| Customer support | Let users upload screenshots or transaction proof | Medium | Medium | P1 |

My hypothesis is: **If Gullak explains the price difference at the moment of anxiety and escalates only unresolved or high-frustration cases to a human, users will feel more reassured, and retention among users who contacted support should improve.**

To keep this teardown short, let’s focus on one solution: a modified support workflow that incorporates human support.

![Support workflow that detects unresolved or frustrated chatbot conversations and offers live chat or a callback from a human agent](/content/work/gullak-product-teardown/human-support-workflow.png)

The bot first attempts to answer the question. The system then checks for signals such as three or more messages about the same issue, repeated questions, or phrases such as “I don’t understand,” “talk to a human,” or “this is wrong.” If those signals cross the escalation threshold, the user can continue in live chat or request a call. The agent receives the existing conversation context; when no one is available, Gullak sets a clear callback window and keeps email as a fallback.

## 6. Guardrails, success metrics, and trade-offs

### Guardrails

- Most importantly, escalated agents must receive the chat history so users do not have to repeat themselves.
- Human escalation should trigger only for critical financial journeys such as selling, withdrawing, failed payments, a locked vault, or KYC issues.
- Users should see the expected service-level agreement clearly before choosing a callback.

### Success metrics

#### North Star metric

Achieve a 90% or higher successful-resolution rate for customer issues escalated to human support.

#### Primary metrics

1. Improve the repeat-investment rate among users who contacted support by 5–10%. This is the key business metric.
2. Resolve at least 80% of escalated cases in the first human interaction.
3. Connect users to a human within five minutes in chat, or schedule at least 95% of callbacks within the promised service window.

### Trade-offs

- **Business:** Higher operating costs from hiring, training, and maintaining a human support team.
- **User:** Longer waits during peak hours, which could delay resolution for urgent queries.

Thank you for taking the time to read this teardown. If you have a different perspective or see a better solution, I’d genuinely love to hear it and learn from the discussion.
