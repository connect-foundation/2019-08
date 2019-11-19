import React, { createContext, Dispatch, useReducer, useContext } from "react";
import { Post } from "core/entity/post";

//코그 출처 https://velog.io/@velopert/typescript-context-api
export type Action =
  | {
      type: "CREATE";
      id: number;
      profileName: string;
      createdAt: string;
      updatedAt: string;
      profileThumnail: string;
      contents: string;
    }
  | {
      type: "REMOVE";
      id: number;
    };

type MessageDispatch = Dispatch<Action>;

type Posts = Post[];

const MessagesStateContext = createContext<Posts | undefined>(undefined);

const MessageDispatchContext = createContext<MessageDispatch | undefined>(
  undefined
);

const messageReducer = (state: Posts, action: Action): Posts => {
  switch (action.type) {
    case "CREATE":
      return state.concat({
        id: action.id,
        profileName: action.profileName,
        profileThumnail: action.profileThumnail,
        createdAt: action.createdAt,
        updatedAt: action.updatedAt,
        contents: action.contents
      });
    case "REMOVE":
      return state.filter(message => message.id !== action.id);
  }
};

export const MessageContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [messages, dispatch] = useReducer(messageReducer, []);
  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessagesStateContext.Provider value={messages}>
        {children}
      </MessagesStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

export const useMessages = () => {
  const state = useContext(MessagesStateContext);
  if (!state) throw new Error("MessagesProvider not found");
  return state;
};

export const useMessagesDispatch = () => {
  const dispatch = useContext(MessageDispatchContext);
  if (!dispatch) throw new Error("MessagesProvider not found");
  return dispatch;
};
