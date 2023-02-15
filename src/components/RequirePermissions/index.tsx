import { hasComponent } from '@lfai/egeria-js-commons';
import { AccessDenied } from '../UserPermissions/AccessDenied';

export function RequirePermissions(props:any) {
  if (hasComponent(props.component)) {
    return (<>{props.children}</>);
  } else {
    return (<AccessDenied component={props.component}/>);
  }
}