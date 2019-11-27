import React, { Dispatch, createContext, useReducer, useContext } from "react";
import { PathParameter } from "core/entity/path-parameter";

type Action = {
  type: "IN";
  channelId: number;
};

type PathParameterDispatch = Dispatch<Action>;

const PathParameterStateContext = createContext<PathParameter | undefined>(
  undefined
);

const PathParameterDispatchContext = createContext<
  PathParameterDispatch | undefined
>(undefined);

const PathParameterReducer = (
  state: PathParameter,
  action: Action
): PathParameter => {
  switch (action.type) {
    case "IN":
      const newState: PathParameter = JSON.parse(JSON.stringify(state));
      newState.channelId = action.channelId;
      return newState;
  }
};

export const PathParameterContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  let path: PathParameter = {
    channelId: -1
  };
  const [state, dispatch] = useReducer(PathParameterReducer, path);

  return (
    <PathParameterDispatchContext.Provider value={dispatch}>
      <PathParameterStateContext.Provider value={state}>
        {children}
      </PathParameterStateContext.Provider>
    </PathParameterDispatchContext.Provider>
  );
};

export const usePathParameter = () => {
  const state = useContext(PathParameterStateContext);
  if (!state) throw new Error("PathParameterProvider not found");
  return state;
};

export const usePathParameterDispatch = () => {
  const dispatch = useContext(PathParameterDispatchContext);
  if (!dispatch) throw new Error("PathParameterProvider not found");
  return dispatch;
};
