import React, { Component } from 'react';
import Identicon from 'identicon.js';
import photo from '../plus.png'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import ChatIcon from '@material-ui/icons/Chat';

// import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Container, Button, Link } from 'react-floating-action-button'
import { CustomDialog, Dialog, useDialog } from 'react-st-modal';



class Main extends Component {


  // async componentWillMount() {
  //   const dialog = useDialog();

  // }
  // CustomDialogContent() {
  //   // use this hook to control the dialog
    // const dialog = useDialog();
  
  //   // const [value, setValue] = useState();
  
  //   return (
  //     <div>
  //       <h2>Share Image</h2>
  //               <form onSubmit={(event) => {
  //                 event.preventDefault()
  //                 const description = this.imageDescription.value
  //                 this.props.uploadImage(description)
  //               }} >
  //                 <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
  //                   <div className="form-group mr-sm-2">
  //                     <br></br>
  //                       <input
  //                         id="imageDescription"
  //                         type="text"
  //                         ref={(input) => { this.imageDescription = input }}
  //                         className="form-control"
  //                         placeholder="Image description..."
  //                         required />
  //                   </div>
  //                 <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
  //               </form>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="container-fluid mt-3">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
          {/* <Fab id = "uploadImage" color="primary" aria-label="add"
            onClick={async () => {
              const result = await CustomDialog(
                <div className="container-fluid mt-5">
                  <h2>Share Image</h2>
                          <form onSubmit={(event) => {
                            event.preventDefault()
                            const description = this.imageDescription.value
                            // this.state.dialog.close();
                            this.props.uploadImage(description)
                            
                          }} >
                            <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                              <div className="form-group mr-sm-2">
                                <br></br>
                                  <input
                                    id="imageDescription"
                                    type="text"
                                    ref={(input) => { this.imageDescription = input }}
                                    className="form-control"
                                    placeholder="Image description..."
                                    required />
                              </div>
                            <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
                          </form>
                          <p>&nbsp;</p>

                </div>,
                {
                  title: 'Share Image',
                  showCloseIcon: true,
                }
              );
            }}>
              <AddIcon />
            </Fab> */}
            <div className="content mr-auto ml-auto">
            
            
            <Container>
            <Button
                tooltip="My Messages!"
                rotate={false}
                onClick={() => {
                  // const searchKey = this.search.value
                  this.props.myMessages(this.props.account)
                }}>
                  <ChatIcon/>
              </Button>
            <Button
                tooltip="Send Message!"
                rotate={false}
                onClick={async () => {
                  const result = await CustomDialog(
                    <div className="container-fluid mt-3">
                      <h2>Send Message</h2>
                              <form onSubmit={(event) => {
                                event.preventDefault()
                                const description = this.imageDescription.value
                                const receiver = this.receiverAddress.value

                                this.props.sendMessage(description,receiver)
                                
                              }} >
                                <div className="form-group mr-sm-2">
                                    <br></br>
                                      <input
                                        id="imageDescription"
                                        type="text"
                                        ref={(input) => { this.receiverAddress = input }}
                                        className="form-control"
                                        placeholder="Send Image to (Wallet Address)"
                                         required/>
                                  </div>
                                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                                  <div className="form-group mr-sm-2">
                                    <br></br>
                                      <input
                                        id="imageDescription"
                                        type="text"
                                        ref={(input) => { this.imageDescription = input }}
                                        className="form-control"
                                        placeholder="Image description..."
                                         required/>
                                  </div>
                                <button type="submit" className="btn btn-primary btn-block btn-lg">Send!</button>
                              </form>
                              <p>&nbsp;</p>

                    </div>,
                    {
                      title: 'Direct Message',
                      showCloseIcon: true,
                    }
                  );
                }} >
                  <SendIcon/>
              </Button>
              <Button
                  tooltip="Upload Image!"
                  rotate={false}
                  onClick={async () => {
                    const result = await CustomDialog(
                      <div className="container-fluid mt-3">
                        <h2>Share Image</h2>
                                <form onSubmit={(event) => {
                                  event.preventDefault()
                                  const description = this.imageDescription.value
                                  this.props.uploadImage(description)
                                  
                                }} >
                                  <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                                    <div className="form-group mr-sm-2">
                                      <br></br>
                                        <input
                                          id="imageDescription"
                                          type="text"
                                          ref={(input) => { this.imageDescription = input }}
                                          className="form-control"
                                          placeholder="Image description..."
                                          required />
                                    </div>
                                  <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
                                </form>
                                <p>&nbsp;</p>

                      </div>,
                      {
                        title: 'Share Image',
                        showCloseIcon: true,
                      }
                    );
                  }} >
                    <AddIcon />
                    </Button>
            </Container>
              <p>&nbsp;</p>
              {/* <h2>Share Image</h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                this.props.uploadImage(description)
              }} >
                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control"
                        placeholder="Image description..."
                        required />
                  </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
              </form> */}
              <form onSubmit={(event) => {
                event.preventDefault()
                const searchKey = this.search.value
                {this.props.showingMessages ? this.props.filterMessages(this.props.account,searchKey) :
                this.props.filterImage(searchKey)}
              }} >
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="Search"
                        type="search"
                        ref={(input) => { this.search = input }}
                        className="form-control"
                        placeholder={this.props.searchKeyword !=="" ? this.props.searchKeyword : "Search (using wallet address)"}
                         />
                  </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Search!</button>
              </form>
              <p>&nbsp;</p>
              <FullWidthTabs 
              sortImage = {this.props.sortImage}
              tabIndex = {this.props.tabIndex}
              />
              <p>&nbsp;</p>
              { this.props.images.map((image, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                      />
                      <small className="text-muted">{image.author}</small>
                    </div>
                    <ul id="imageList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p className="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px'}}/></p>
                        <p>{image.description}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        <button disabled={image.author === this.props.account}
                          className="btn btn-link btn-sm float-right pt-0"
                          name={image.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipImageOwner(event.target.name, tipAmount)
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

// function CustomDialogContent() {
//   // use this hook to control the dialog
//   const dialog = useDialog();

//   // const [value, setValue] = useState();

//   return (
//     <div>
//       <h2>Share Image</h2>
//               <form onSubmit={(event) => {
//                 event.preventDefault()
//                 const description = this.imageDescription.value
//                 this.props.uploadImage(description)
//               }} >
//                 <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
//                   <div className="form-group mr-sm-2">
//                     <br></br>
//                       <input
//                         id="imageDescription"
//                         type="text"
//                         ref={(input) => { this.imageDescription = input }}
//                         className="form-control"
//                         placeholder="Image description..."
//                         required />
//                   </div>
//                 <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
//               </form>
//     </div>
//   );
// }

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function FullWidthTabs(props) {
  // const { filterImage } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = async(event, newValue) => {
    setValue(newValue);
    props.sortImage(newValue);
    
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab  label="Recent" {...a11yProps(0)}  />
          <Tab label="Most  Tipped"  {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {this.props.filterImage("df")}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews> */}
    </div>
  );
}

export default Main;

