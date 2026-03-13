import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Auth Slice
interface AuthState {
  token: string | null;
  userId: string | null;
  companyId: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

const initialAuthState: AuthState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId'),
  companyId: localStorage.getItem('companyId') !== 'null' ? localStorage.getItem('companyId') : null,
  role: localStorage.getItem('role'),
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; userId: string; companyId: string | null; role: string }>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.companyId = action.payload.companyId;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('companyId', String(action.payload.companyId));
      localStorage.setItem('role', action.payload.role);
    },
    setCompanyId: (state, action: PayloadAction<string>) => {
      state.companyId = action.payload;
      localStorage.setItem('companyId', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.companyId = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

// Company Slice
interface CompanyState {
  data: any | null;
}
const companySlice = createSlice({
  name: 'company',
  initialState: { data: null } as CompanyState,
  reducers: {
    setCompany: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    }
  }
});

// Agents Slice
interface AgentState {
  list: any[];
}
const agentSlice = createSlice({
  name: 'agents',
  initialState: { list: [] } as AgentState,
  reducers: {
    setAgents: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload;
    }
  }
});

// Applications Slice
interface AppState {
  list: any[];
}
const applicationSlice = createSlice({
  name: 'applications',
  initialState: { list: [] } as AppState,
  reducers: {
    setApplications: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload;
    }
  }
});

export const { setAuth, setCompanyId, logout } = authSlice.actions;
export const { setCompany } = companySlice.actions;
export const { setAgents } = agentSlice.actions;
export const { setApplications } = applicationSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    company: companySlice.reducer,
    agents: agentSlice.reducer,
    applications: applicationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
