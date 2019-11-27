import React, { createContext, Dispatch, useReducer, useContext } from "react";
import { Channel } from "core/entity/channel";

export type Action =
  | {
      type: "CREATE";
      title: string;
      description: string;
      privacy: boolean;
      creatorName?: string;
      createdAt?: Date;
    }
  | {
      type: "MULTI";
      channels: Channels;
    };

export type Channels = Channel[];

type ChannelDispatch = Dispatch<Action>;

const ChannelsStateContext = createContext<Channels | undefined>(undefined);

const ChannelDispatchContext = createContext<ChannelDispatch | undefined>(
  undefined
);

const channelsReducer = (state: Channels, action: Action): Channels => {
  switch (action.type) {
    case "CREATE":
      return state.concat({
        title: action.title,
        description: action.description,
        privacy: action.privacy,
        creatorName: action.creatorName,
        createdAt: action.createdAt
      });
    case "MULTI":
      return state.concat(action.channels);
  }
};

export const ChannelsProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [channels, dispatch] = useReducer(channelsReducer, []);
  return (
    <ChannelDispatchContext.Provider value={dispatch}>
      <ChannelsStateContext.Provider value={channels}>
        {children}
      </ChannelsStateContext.Provider>
    </ChannelDispatchContext.Provider>
  );
};

export const useChannels = () => {
  const state = useContext(ChannelsStateContext);
  if (!state) return null;
  return state;
};

export const useChannelDispatch = () => {
  let dispatch = useContext(ChannelDispatchContext);
  if (!dispatch) return null;
  return dispatch;
};
