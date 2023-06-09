"use client";

import { useState } from "react";
import type { Address } from 'wagmi'

import * as CodecComponents from "@truffle/codec-components/react";
import "@truffle/codec-components/react-styles";

import { useCompilations } from "../hooks/useCompilations";
import { useDecoder } from "../hooks/useDecoder";
import { useVariables } from "../hooks/useVariables";

export function Watcher() {
  const [inputValue, setInputValue] = useState<string>("");
  const [address, setAddress] = useState<Address>();

  const {
    compilations,
    loading: loadingCompilations
  } = useCompilations({ address });

  const {
    decoder,
    loading: loadingDecoder
  } = useDecoder({ address, compilations });

  const {
    variables,
    loading: loadingVariables
  } = useVariables({ decoder });

  const loading = loadingCompilations || loadingDecoder || loadingVariables;
  const loadingMessage =
    loadingCompilations ? "Loading compilations..." :
      loadingDecoder ? "Loading decoder..." :
      loadingVariables ? "Loading variables..." : undefined;

  return (
    <div>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="contract address"
        value={inputValue}
      />
      <button onClick={() => setAddress(inputValue as Address)}>
        {loading ? 'fetching...' : 'fetch'}
      </button>
      {loading && (
        <div>{loadingMessage}</div>
      )}
      {variables && (
        <div>
          {variables.map((variable, index) => (
            <div key={index}>
              <CodecComponents.StateVariable data={variable} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
