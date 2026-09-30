# DNS and SSL handoff runbook

DNS, nameserver, production hostname, and live SSL changes are prohibited without explicit owner approval naming the records, old/new values, TTLs, target, window, and rollback.

1. Inventory current authoritative DNS, nameservers, mail/MX, verification records, CDN/WAF, certificate state, and TTLs without mutation.
2. Prepare an exact change set and prior-record rollback set. Protect unrelated records.
3. Verify the target on a temporary staging hostname first, including certificate chain, hostname, validity, renewal behavior, HTTPS redirect behavior, and canonical-host rules.
4. Obtain the exact owner production approval.
5. Apply only approved records in the approved window; never infer desired changes from provider prompts.
6. Verify authoritative propagation, HTTPS, redirects, mail/MX preservation, health, and critical journeys.
7. Observe through the declared window and roll back using preserved values if acceptance fails.
8. Record redacted before/after values, request IDs, timestamps, verifier, and result.

Premium SSL or any charge-bearing certificate requires a separate exact owner-approved quote.
