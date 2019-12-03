import { RouteComponentProps } from "react-router";

export interface InviteMatchType {
  snugId: string;
}

export interface InviteRouteComponentType
        extends RouteComponentProps<InviteMatchType> {}
