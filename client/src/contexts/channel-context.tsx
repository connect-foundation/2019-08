import React, { createContext, Dispatch, useReducer, useContext } from "react";

type Channel = {
  title: string;
  description: string;
  privacy: boolean;
};

export type Action = {
  type: "CREATE";
  title: string;
  description: string;
  privacy: boolean;
};

type Channels = Channel[];

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
        privacy: action.privacy
      });
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
  if (!state) throw new Error("ChannelProvider is not created");
  return state;
};

export const useChannelDispatch = () => {
  const dispatch = useContext(ChannelDispatchContext);
  if (!dispatch) throw new Error("ChannelProvider is not created");
  return dispatch;
};
