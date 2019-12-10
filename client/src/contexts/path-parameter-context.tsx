import React, { Dispatch, createContext, useReducer, useContext } from "react";
import { PathParameter } from "core/entity/path-parameter";

type Action = {
  type: "IN";
  channelId: number;
  
} | {
  type: "GETSNUGID";
  snugId: number;
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
  let newState: PathParameter = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "IN":
      newState.channelId = action.channelId;
      return newState;
    case "GETSNUGID":
      newState.snugId = action.snugId;
      return newState;
  }
};

export const PathParameterContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(PathParameterReducer, {});

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
