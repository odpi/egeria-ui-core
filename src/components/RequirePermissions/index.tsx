import { hasComponent } from '@lfai/egeria-js-commons';
import { AccessDenied } from '../UserPermissions/AccessDenied';

export function RequirePermissions(props:any) {
  if (hasComponent(props.component)) {
    return (<>{props.element}</>);
  } else {
    if (props.showAccessDenied) {
      return (<AccessDenied component={props.component}/>);
    } else {
      return (<></>);
    }
  }
}