import { ConnectKitButton } from '../components/ConnectKitButton'
import { Connected } from '../components/Connected'
import { NetworkSwitcher } from '../components/NetworkSwitcher'
import { Watcher } from "../components/Watcher";

export function Page() {
  return (
    <>
      <h1>@truffle/codec-components wagmi demo</h1>

      <ConnectKitButton />

      <Connected>
        <hr />
        <h2>Network</h2>
        <NetworkSwitcher />
        <br />
        <hr />
        <h2>Watcher</h2>
        <Watcher />
        <br />
        <hr />
      </Connected>
    </>
  );
}

export default Page;
