import { useEffect, useReducer, useRef } from "react";

type StateType  = {
  error: any,
  data: any,
  loading: boolean,
}

type ActionType = 
| { type: "loading" }
| { type: "fetched", payload: any}
| { type: "error", payload: any}

const useFetch = (url: string | undefined, limit?: number, option?: any) : StateType => {
  
  const cache = useRef<any>({});
  const cancleRequest = useRef<boolean>(false);

  const initialState : StateType = {
    error: undefined,
    data: undefined,
    loading: false,
  };

  const fetchReducer = (state: StateType, action: ActionType): StateType=> {
    switch (action.type) {
      case "loading":
        return { ...initialState, loading: true };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if(!url) return;
    cancleRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      if(cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, option);
        if(!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        if(limit) data.splice(limit);
        cache.current[url] = data;
        if(cancleRequest.current) return;
        dispatch({ type: "fetched", payload: data});
      } catch(error) {
        if(cancleRequest.current) return;
        dispatch({ type: "error", payload: error });
      }
    };
    fetchData();
    return () => {
      cancleRequest.current = true;
    }
  }, [url])

  return state;
}

export default useFetch;