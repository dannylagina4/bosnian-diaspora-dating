import type { PropsWithChildren } from 'react';

export function ScreenContainer({ children }: PropsWithChildren) {
  return <div style={{ margin: '0 auto', maxWidth: 768, padding: 24 }}>{children}</div>;
}
