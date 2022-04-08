export type User = {
  avatarUrl: string
  email: string
  id: number
  isPro: boolean
  name: string
};

export type AuthUser = User & {
  token: string
};

export type Auth = {
  email: string
  password: string
};
