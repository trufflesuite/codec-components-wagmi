import { useState, useEffect } from "react";
import type { Compilation } from "@truffle/compile-common";
import * as Decoder from "@truffle/decoder";
import * as Codec from "@truffle/codec";

export interface UseVariablesOptions {
  decoder?: Decoder.ContractInstanceDecoder;
}

export interface UseVariablesResult {
  variables?: Codec.StateVariable[];
  loading: boolean;
};

export const useVariables = ({
  decoder
}: UseVariablesOptions): UseVariablesResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [variables, setVariables] = useState<Codec.StateVariable[]>();

  useEffect(() => {
    (async () => {
      setVariables(undefined);

      if (!decoder) {
        return;
      }

      setLoading(true);

      const variables = await decoder.variables();

      setVariables(variables);
      setLoading(false);
    })();
  }, [decoder]);

  return { variables, loading };
}
