# DARBAAR — REST API ARCHITECTURE & SPECIFICATION

**Brand Tagline:** Where Heritage Meets Rarity  
**Architecture:** Node.js, Express.js, TypeScript, Mongoose, MongoDB Atlas  
**Authentication:** HttpOnly JWT Cookies, Role-Based Access Control (Client, Dealer, Advisor, Admin)

---

## 1. Authentication Endpoints

### `POST /api/auth/register`
Creates a private client or dealer account with Argon2/bcrypt password hashing.
- **Request Body:** `{ "fullName": "string", "email": "string", "password": "string", "role": "client" | "dealer" }`
- **Response (201):** `{ "user": { "id": "...", "fullName": "...", "email": "...", "role": "..." } }`
- **Cookie:** Sets HttpOnly `darbaar_session_token`.

### `POST /api/auth/login`
Authenticates principal credentials and issues secure session token.
- **Request Body:** `{ "email": "string", "password": "string" }`
- **Response (200):** User profile and active appointment salons.

### `POST /api/auth/logout`
Invalidates session and clears HttpOnly session cookie.

### `GET /api/auth/me`
Retrieves authenticated principal profile, collection permissions, and saved dossier privileges.

---

## 2. Asset & Catalogue Endpoints

### `GET /api/assets`
Curated asset query with multi-currency support, filtering, and pagination.
- **Query Params:**
  - `category`: `fine-art` | `timepieces` | `collectibles` | `private-sales`
  - `minPrice`, `maxPrice`: Numeric in USD
  - `maker`: Maison or artist name
  - `search`: Keyword string
  - `currency`: Target currency code (`USD`, `GBP`, `EUR`, `CHF`, `AED`, `INR`, `SGD`, `HKD`)
- **Response (200):** Paginated array of curated assets with converted valuations.

### `GET /api/assets/:id`
Retrieves complete specimen record including condition scorecard, provenance timeline, and available reports.

### `POST /api/assets` *(Advisor & Admin Only)*
Creates new curated asset listing. Requires full provenance audit log.

### `PATCH /api/assets/:id` *(Admin Only)*
Updates asset specifications, valuation range, or archival status.

### `DELETE /api/assets/:id` *(Admin Only)*
Archives or removes an asset listing.

---

## 3. Advisory & Private Inquiry Endpoints

### `POST /api/enquiries`
Submits confidential acquisition, consignment, or viewing inquiry.
- **Request Body:**
  ```json
  {
    "assetId": "string (optional)",
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "preferredSalon": "Geneva" | "London" | "New York" | "Singapore" | "Mumbai" | "Dubai",
    "inquiryType": "Acquisition" | "Advisory Consultation" | "Private Viewing" | "Consignment",
    "message": "string",
    "confidentialityAgreed": true
  }
  ```

### `GET /api/enquiries` *(Advisor & Admin Only)*
Lists client inquiries filtered by salon corridor and urgency.

### `PATCH /api/enquiries/:id` *(Advisor & Admin Only)*
Updates inquiry status (`pending`, `under_review`, `consultation_scheduled`, `closed`).

---

## 4. Collection Management Endpoints

### `GET /api/collections`
Retrieves authenticated client's personal vaulted and saved collections.

### `POST /api/collections`
Creates a custom curated collection binder.

### `POST /api/collections/:id/assets`
Adds an asset to the client's private vault tracker.

### `DELETE /api/collections/:id/assets/:assetId`
Removes an asset from collection ledger.

---

## 5. Provenance & Independent Reports

### `GET /api/assets/:id/provenance`
Returns verified provenance events, archival citations, and legal title clearances.

### `POST /api/assets/:id/provenance` *(Advisor & Admin Only)*
Appends verified archival milestone with supporting document references.

### `GET /api/assets/:id/valuations`
Returns valuation records, historical estimates, and certified appraisal dates.

---

## 6. Currencies & Exchange Rates

### `GET /api/currency/rates`
Returns live timestamps and rates for:
`USD`, `GBP`, `EUR`, `CHF`, `AED`, `INR`, `SGD`, `HKD`.
Rate source: European Central Bank / Interbank feeds with caching and fallback.
