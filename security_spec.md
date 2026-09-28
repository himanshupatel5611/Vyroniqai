# Security Specification & Test Payloads

## 1. Data Invariants
1. `websiteRequests` can be created by any visitor or authenticated user, but must contain required fields (businessName, category, phone, email, location, selectedPlan, status, createdAt).
2. Users can read their own website requests if `userId == request.auth.uid`, and administrators (`vyroniqai640@gmail.com`) can read, update status, and manage all requests.
3. `testimonials` are verified client reviews that can be read publicly by visitors to the site. Creating or managing testimonials requires authentication.
4. `users` documents are strictly private: a user can only read and write their own document `users/{userId}` where `userId == request.auth.uid`.
5. Non-admins cannot elevate their own role to 'admin'.

## 2. The Dirty Dozen Payloads (Designed to Fail Validation)
1. **Unauthenticated User Profile Hijack**: Writing to `/users/other_user_123` with arbitrary claims -> `PERMISSION_DENIED`.
2. **Missing Required Fields on Request**: Creating a `websiteRequest` without `businessName` or `email` -> `PERMISSION_DENIED`.
3. **Privilege Escalation on User Profile**: Setting `role: "admin"` as standard user -> `PERMISSION_DENIED`.
4. **Oversized String Injection**: Injecting a 2MB payload into `specialRequirements` -> `PERMISSION_DENIED`.
5. **Unauthorized Status Modification**: Random user altering status of someone else's order -> `PERMISSION_DENIED`.
6. **Malicious Path Variable ID**: Attempting to create document with non-alphanumeric or path-traversal ID -> `PERMISSION_DENIED`.
7. **PII Scraping on User Collection**: Unauthenticated listing of `/users` collection -> `PERMISSION_DENIED`.
8. **Invalid Rating Bound**: Creating a testimonial with `rating: 99` -> `PERMISSION_DENIED`.
9. **Immutability Breach**: Tampering with `createdAt` or `id` during update -> `PERMISSION_DENIED`.
10. **Ghost Fields Injection**: Adding undeclared arbitrary fields into requests -> `PERMISSION_DENIED`.
11. **Spoofed Admin Claim**: Providing custom claim header without trusted auth check -> `PERMISSION_DENIED`.
12. **Negative / NaN Price / Duration Injection**: Invalid payload types -> `PERMISSION_DENIED`.
