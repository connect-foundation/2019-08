import React, { createContext, Dispatch, useReducer, useContext } from "react";
import { Message } from "../core/entity/message";
//코그 출처 https://velog.io/@velopert/typescript-context-api
type Action =
  | {
      type: "CREATE";
      id: number;
      name: string;
      timeStamp: string;
      imageSrc: string;
      contents: string;
    }
  | {
      type: "REMOVE";
      id: number;
    };

type MessageDispatch = Dispatch<Action>;

const MessagesStateContext = createContext<Message[] | undefined>(undefined);

const MessageDispatchContext = createContext<MessageDispatch | undefined>(
  undefined
);

const messageReducer = (state: Message[], action: Action): Message[] => {
  switch (action.type) {
    case "CREATE":
      return state.concat({
        id: action.id,
        name: action.name,
        imageSrc: action.imageSrc,
        timeStamp: action.timeStamp,
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
  const dispatch = useContext(MessageDispatchContext);
  if (!dispatch) throw new Error("MessagesProvider not found");
  if (!state) throw new Error("MessagesProvider not found");
  return [state, dispatch];
};
