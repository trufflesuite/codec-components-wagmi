import { useState, useEffect } from "react";
import { type Address, usePublicClient } from 'wagmi'
import type { Compilation } from "@truffle/compile-common";
import * as Decoder from "@truffle/decoder";

export interface UseDecoderOptions {
  address?: Address;
  compilations?: Compilation[];
}

export interface UseDecoderResult {
  decoder?: Decoder.ContractInstanceDecoder;
  loading: boolean;
};

export const useDecoder = ({
  address,
  compilations
}: UseDecoderOptions): UseDecoderResult => {
  const provider = usePublicClient();

  const [loading, setLoading] = useState<boolean>(false);
  const [decoder, setDecoder] = useState<Decoder.ContractInstanceDecoder>();

  useEffect(() => {
    (async () => {
      setDecoder(undefined);

      if (!address || !provider || !compilations) {
        return;
      }

      setLoading(true);

      const decoder = await Decoder.forAddress(address, {
        provider,
        projectInfo: {
          commonCompilations: compilations
        }
      });

      setDecoder(decoder);
      setLoading(false);
    })();
  }, [address, compilations, provider]);

  return { decoder, loading };
}
