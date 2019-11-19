import React, { createContext, Dispatch, useReducer, useContext } from "react";

// 추후 모달들 타입을 여기에 추가
type ModalToggled = {
  ChannelPlusModal: boolean;
};

export type Action = {
  type: "TOGGLE_CHANNEL_PLUS_MODAL";
};

type ModalDispatch = Dispatch<Action>;

const ModalStateContext = createContext<ModalToggled | undefined>(undefined);

const ModalDispatchContext = createContext<ModalDispatch | undefined>(
  undefined
);

const modalToggledReducer = (
  state: ModalToggled,
  action: Action
): ModalToggled => {
  switch (action.type) {
    case "TOGGLE_CHANNEL_PLUS_MODAL":
      return {
        ...state,
        ChannelPlusModal: !state.ChannelPlusModal
      };
  }
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalToggled, dispatch] = useReducer(modalToggledReducer, {
    ChannelPlusModal: false
  });
  return (
    <ModalDispatchContext.Provider value={dispatch}>
      <ModalStateContext.Provider value={modalToggled}>
        {children}
      </ModalStateContext.Provider>
    </ModalDispatchContext.Provider>
  );
};

export const useModalToggled = () => {
  const state = useContext(ModalStateContext);
  if (!state) return null;
  return state;
};

export const useModalToggledDispatch = () => {
  const dispatch = useContext(ModalDispatchContext);
  if (!dispatch) return null;
  return dispatch;
};
