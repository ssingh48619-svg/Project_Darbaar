const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface RequestOptions extends RequestInit {
  token?: string;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const config: RequestInit = {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    credentials: "include", // send cookies
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const darbaarApi = {
  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) =>
      request<{ success: boolean; token: string; user: any }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    register: (userData: any) =>
      request<{ success: boolean; token: string; user: any }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    getMe: (token?: string) =>
      request<{ success: boolean; user: any }>("/auth/me", { token }),
    logout: () =>
      request<{ success: boolean; message: string }>("/auth/logout", {
        method: "POST",
      }),
  },

  // Curated Assets
  assets: {
    list: (params?: Record<string, string>) => {
      const query = params ? `?${new URLSearchParams(params).toString()}` : "";
      return request<{ success: boolean; count: number; assets: any[] }>(`/assets${query}`);
    },
    getById: (id: string) =>
      request<{ success: boolean; asset: any }>(`/assets/${id}`),
    create: (data: any, token: string) =>
      request<{ success: boolean; asset: any }>("/assets", {
        method: "POST",
        body: JSON.stringify(data),
        token,
      }),
  },

  // Private Inquiries
  enquiries: {
    create: (data: any) =>
      request<{ success: boolean; message: string; enquiry: any }>("/enquiries", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getMy: (token?: string) =>
      request<{ success: boolean; enquiries: any[] }>("/enquiries/my", { token }),
    getAll: (token: string) =>
      request<{ success: boolean; enquiries: any[] }>("/enquiries", { token }),
  },

  // Private Advisory
  advisory: {
    create: (data: any) =>
      request<{ success: boolean; message: string; mandate: any }>("/advisory", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getMy: (token?: string) =>
      request<{ success: boolean; mandates: any[] }>("/advisory/my", { token }),
  },

  // Client Vault Collection
  collection: {
    getMy: (token?: string) =>
      request<{ success: boolean; collection: any }>("/collections/my", { token }),
    add: (item: any, token: string) =>
      request<{ success: boolean; collection: any }>("/collections/items", {
        method: "POST",
        body: JSON.stringify(item),
        token,
      }),
  },

  // Admin Directorate
  admin: {
    getOverview: (token: string) =>
      request<{ success: boolean; stats: any; recentAuditLogs: any[] }>("/admin/overview", {
        token,
      }),
    getUsers: (token: string) =>
      request<{ success: boolean; users: any[] }>("/admin/users", { token }),
  },
};
