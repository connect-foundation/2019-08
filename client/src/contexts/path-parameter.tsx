import React, { Dispatch, createContext } from "react";
import { PathPrameter } from "core/entity/path-parameter";
import { Map } from "immutable";

type Action = {
  type: "IN";
  channelId: string;
};

type PathPrameterDispatch = Dispatch<Action>;

const PathPrameterStateContext = createContext<PathPrameter | undefined>(
  undefined
);

const PathPrameterDispatchContext = createContext<
  PathPrameterDispatch | undefined
>(undefined);

const PathPrameterReducer = (
  state: PathPrameter,
  action: Action
): PathPrameter => {
  switch (action.type) {
    case "IN":
      const newState: PathPrameter = JSON.parse(JSON.stringify(state));
      newState.channelId = action.channelId;
      return newState;
  }
};
