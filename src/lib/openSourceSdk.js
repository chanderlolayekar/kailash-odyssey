// src/lib/openSourceSdk.js
// Open-source drop-in replacement for @base/sdk and @base44/sdk

const LOCAL_COLLECTIONS = {
  User: [],
};

function createEntityHandler(entityName) {
  const getRecords = async () => {
    const data = LOCAL_COLLECTIONS[entityName];
    if (!data) {
      console.warn(`[openSourceSdk] Entity "${entityName}" requested — returning empty array.`);
      return [];
    }
    return Array.isArray(data) ? data : Object.values(data);
  };

  return {
    list: async (sortBy, limit) => {
      let items = [...(await getRecords())];
      if (limit) items = items.slice(0, limit);
      return items;
    },
    filter: async (query = {}, sortBy, limit) => {
      let items = await getRecords();
      items = items.filter((item) =>
        Object.entries(query).every(([key, val]) => item[key] === val)
      );
      if (limit) items = items.slice(0, limit);
      return items;
    },
    get: async (id) => {
      const items = await getRecords();
      return items.find((item) => item.id === id) || null;
    },
    create: async (record) => ({ id: crypto.randomUUID(), ...record }),
    update: async (id, patch) => ({ id, ...patch }),
    delete: async () => ({ success: true }),
  };
}

export function getAccessToken() {
  return null;
}

export function createAxiosClient() {
  return {
    get: async () => ({ data: {} }),
    post: async () => ({ data: {} }),
    put: async () => ({ data: {} }),
    delete: async () => ({ data: {} }),
    interceptors: {
      request: { use: () => {} },
      response: { use: () => {} },
    },
  };
}

export function createClient(config = {}) {
  const entities = new Proxy(
    {},
    {
      get(_, entityName) {
        return createEntityHandler(String(entityName));
      },
    }
  );

  return {
    config,
    entities,
    auth: {
      isAuthenticated: async () => false,
      me: async () => null,
      login: () => console.info('[openSourceSdk] Public mode: login disabled'),
      logout: () => console.info('[openSourceSdk] Public mode: logout disabled'),
    },
    functions: {
      invoke: async (fnName, payload) => {
        console.info(`[openSourceSdk] Function "${fnName}" called:`, payload);
        return { data: null };
      },
    },
    integrations: {
      Core: {
        InvokeLLM: async () => {
          throw new Error('InvokeLLM is disabled in standalone open-source mode.');
        },
        UploadFile: async () => {
          throw new Error('UploadFile is disabled in standalone open-source mode.');
        },
      },
    },
  };
}
