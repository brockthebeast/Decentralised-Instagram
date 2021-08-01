import Decentragram from '../abis/Decentragram.json'
import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Navbar from './Navbar'
// import UploadDialog from './UploadDialog'

import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    // await this.imageUploadListener()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async imageUploadListener(){
    this.setState({ loading: true })
    this.state.decentragram.events.ImageCreated({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }, async function(error, event){ 
      console.log(event)
      console.log("image uploaded");
      this.setState({ loading: false })
      console.log(this.state.images)
      // await this.loadBlockchainData()
      // window.location.reload(false)

   }.bind(this))
    .on("changed", function(subscriptionId){
        // console.log(subscriptionId);
        // console.log("Image uploaded")
        this.setState({ loading: false })
        console.log("changed")
        window.location.reload(false)

      }.bind(this));
    

  }

  async reloadImage(){

  }

  async loadBlockchainData() {
    // console.log("load blockchain")
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    if(networkData) {
      const decentragram = new web3.eth.Contract(Decentragram.abi, networkData.address)
      this.setState({ decentragram })
      const imagesCount = await decentragram.methods.imageCount().call()
      this.setState({ imagesCount })
      // Load images
      // await this.setState({images : []})
      
      for (var i = 1; i <= imagesCount; i++) {
        const image = await decentragram.methods.images(imagesCount-i+1).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }
      // Sort images. Show highest tipped images first
      // this.setState({
      //   images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      // })
      this.setState({ loading: false})
    } else {
      window.alert('Decentragram contract not deployed to detected network.')
    }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.decentragram.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        // await this.loadBlockchainData()
        // console.log(this.state.images)
        // window.location.reload(false)


        this.setState({ loading: false })
      })
    })
  }

  sendMessage = (description,receiver) => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.decentragram.methods.directMessage(receiver, result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        // await this.loadBlockchainData()
        // console.log(this.state.images)
        window.location.reload(false)


        this.setState({ loading: false })
      })
    })
  }

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.decentragram.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      window.location.reload(false)

      this.setState({ loading: false })
    })
  }
  

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      decentragram: null,
      images: [],
      loading: true,
      searchKeyword : '',
      showingMessages: false,
      tabIndex : 0
    }

    this.uploadImage = this.uploadImage.bind(this)
    this.tipImageOwner = this.tipImageOwner.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.filterImage = this.filterImage.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.myMessages = this.myMessages.bind(this)
    this.filterMessages = this.filterMessages.bind(this)
    this.sortImage = this.sortImage.bind(this)


  }

   async filterImage(author){
    this.setState({ loading: true })
    this.setState({
      images: this.state.images.filter(image => image.author == "")
    })
    for (var i = this.state.imagesCount; i >0; i--) {
      const image = await this.state.decentragram.methods.images(i).call()
      this.setState({
        images: [...this.state.images, image]
      })
    }
    if(author!="") {
      this.setState({
        images: this.state.images.filter(image => image.author == author)
      })
    }

    this.sortImage(this.props.tabIndex);

    this.setState({ searchKeyword: author })
    
    this.setState({ loading: false })
    
  }
  async sortImage(tabIndex){
    console.log("tabIndex",tabIndex)
    this.setState({ loading: true })
    if(tabIndex ===1) {
      this.setState({
        images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount)
      })
    }
    else {
      this.setState({
        images: this.state.images.sort((a,b) => b.id - a.id)
      })
    }
    
 

    this.setState({ tabIndex: tabIndex })
    
    this.setState({ loading: false })
    
  }

  async myMessages(receiver){
    this.setState({ loading: true })
    this.setState({
      images: this.state.images.filter(image => image.author == "")
    })
    let count = await this.state.decentragram.methods.directCount(receiver).call();
    // count = count.toNumber();
    console.log(count);
    for (var i = count; i >0; i--) {
      const image = await this.state.decentragram.methods.directImages(receiver,i).call()
      // const image = 
      this.setState({
        images: [...this.state.images, image]
      })
    }
    // if(author!="") {
    //   this.setState({
    //     images: this.state.images.filter(image => image.author == author)
    //   })
    // }

    // this.setState({ searchKeyword: author })
    
    this.setState({ loading: false })
    this.setState({showingMessages: true})
    
  }

  async filterMessages(receiver,author){
    this.setState({ loading: true })
    this.setState({
      images: this.state.images.filter(image => image.author == "")
    })
    let count = await this.state.decentragram.methods.directCount(receiver).call();
    // count = count.toNumber();
    console.log(count);
    for (var i = count; i >0; i--) {
      const image = await this.state.decentragram.methods.directImages(receiver,i).call()
      // const image = 
      this.setState({
        images: [...this.state.images, image]
      })
    }
    if(author!="") {
      this.setState({
        images: this.state.images.filter(image => image.author == author)
      })
    }

    this.setState({ searchKeyword: author })
    
    this.setState({ loading: false })
    
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          // : <UploadDialog/>
          : <Main
              account={this.state.account}
              images={this.state.images}
              captureFile={this.captureFile}
              uploadImage={this.uploadImage}
              tipImageOwner={this.tipImageOwner}
              filterImage = {this.filterImage}
              searchKeyword = {this.state.searchKeyword}
              sendMessage = {this.sendMessage}
              myMessages = {this.myMessages}
              filterMessages = {this.filterMessages}
              showingMessages = {this.state.showingMessages}
              sortImage = {this.sortImage}
              tabIndex = {this.state.tabIndex}
              

            />
        }
      </div>
    );
  }
}

export default App;