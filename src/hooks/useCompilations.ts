import { useState, useEffect } from "react";
import { type Address, useNetwork } from 'wagmi'
import type { Compilation, WorkflowCompileResult } from "@truffle/compile-common";

export interface UseCompilationsOptions {
  address?: Address;
}

export interface UseCompilationsResult {
  compilations?: Compilation[];
  loading: boolean;
}

export const useCompilations = ({
  address
}: UseCompilationsOptions): UseCompilationsResult => {
  const { chain } = useNetwork();
  const networkId = chain?.id;

  const [loading, setLoading] = useState<boolean>(false);
  const [compilations, setCompilations] = useState<Compilation[]>();

  useEffect(() => {
    (async () => {
      setCompilations(undefined);

      if (!address || !networkId) {
        return;
      }

      setLoading(true);

      const { compilations } = await (await fetch(
        `/project-info?address=${address}&networkId=${networkId}`
      )).json() as WorkflowCompileResult;

      setCompilations(compilations);
      setLoading(false);
    })();
  }, [address, networkId]);

  return { compilations, loading };
}
