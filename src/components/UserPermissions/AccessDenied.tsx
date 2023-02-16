import { LockAccess } from "tabler-icons-react";
import { Text } from '@mantine/core';

export const AccessDenied = (props:any) => {
  return <div style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <LockAccess size={48} strokeWidth={2} />

  <Text>You don't have access to {props.component}!</Text>
</div>;
}