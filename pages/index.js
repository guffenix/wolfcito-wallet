import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { injected } from '../components/wallet/connectors'
import { Button, Container, Status } from '../styles/home'

const Home = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React()

  const connect = async () => {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex)
    }
  }

  const disconnect = async () => {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', false)
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])

  return (
    <Container>
      <Button onClick={connect}>Connect to MetaMask</Button>
      {active ? (
        <div>
          <Status>
            Connected with <br />
          </Status>
          <Status>
            <b>{account}</b>
          </Status>
        </div>
      ) : (
        <Status>Not connected</Status>
      )}
      <Button onClick={disconnect}>Disconnect</Button>
    </Container>
  )
}

export default Home
