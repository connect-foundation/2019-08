import React, { createContext, Dispatch, useReducer } from "react";
import { Message } from "../core/entity/message";

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
