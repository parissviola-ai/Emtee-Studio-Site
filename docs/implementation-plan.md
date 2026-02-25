# Website Optimization Scope + 2-Week Implementation

Internal reference note for execution planning.

## Workstreams

### 1. SEO Pass
- Set unique titles and meta descriptions across key pages.
- Add schema markup (Organization, WebSite, Service, FAQ/Article where relevant).
- Improve internal linking between rooms, resources, case studies, and consultation.
- Validate sitemap, robots, and canonical setup.
- Deliverable: SEO checklist, metadata map, and schema validation captures.
- Estimate: 12-16 hours.
- Priority: High.

### 2. Performance Pass
- Optimize image/video payloads by route and device breakpoint.
- Improve loading strategy for heavy media (lazy load, poster strategy, preload review).
- Apply route-level optimization (dynamic imports and client/server boundary cleanup).
- Measure and tune Core Web Vitals on top traffic pages.
- Deliverable: Baseline vs post-optimization report for LCP, INP, CLS with prioritized fixes.
- Estimate: 16-22 hours.
- Priority: High.

### 3. Conversion Tracking
- Configure GA4 and event taxonomy (resource views, package interactions, consultation flow).
- Build a funnel from landing pages to submitted consultation form.
- Track form completion behavior and drop-off points.
- Create a simple weekly monitoring view.
- Deliverable: Tracking spec, verified event list, and funnel baseline with conversion rates.
- Estimate: 10-14 hours.
- Priority: High.

### 4. QA Report
- Run responsive and interaction testing on priority devices and browsers.
- Log defects with reproduction steps, severity, and fix status.
- Retest all fixes and verify no regressions in core flows.
- Deliverable: Device/browser matrix, issue log, and final QA signoff.
- Estimate: 10-14 hours.
- Priority: Medium.

### 5. Clean Handoff Docs
- Create content editing guide for resources, departments, and case studies.
- Create deployment and rollback runbook with environment checklist.
- Add troubleshooting notes for media, routing, and analytics.
- Deliverable: Maintainable docs in repository for non-dev and dev stakeholders.
- Estimate: 8-12 hours.
- Priority: Medium.

## 2-Week Implementation Plan

### Week 1
- Day 1 (Mon): baseline audit for SEO, performance, and existing analytics implementation.
- Day 2 (Tue): metadata + internal linking + schema implementation on key pages.
- Day 3 (Wed): performance pass phase 1 (image/video sizing and loading strategy updates).
- Day 4 (Thu): performance pass phase 2 (route-level optimization and re-measurement).
- Day 5 (Fri): GA4 event setup, event validation, and funnel definition.
- Output: SEO foundations live, initial performance gains shipped, analytics events firing.

### Week 2
- Day 6 (Mon): QA round 1 across mobile/desktop matrix; log and prioritize issues.
- Day 7 (Tue): fix high-priority QA issues and retest core flows.
- Day 8 (Wed): finalize funnel reporting and form conversion baseline report.
- Day 9 (Thu): create handoff docs (content guide + deployment runbook + troubleshooting).
- Day 10 (Fri): final regression sweep and package all reports for handoff.
- Output: validated release quality, conversion baseline, and complete operating documentation.

## Total Estimated Effort
- 56-78 hours.
