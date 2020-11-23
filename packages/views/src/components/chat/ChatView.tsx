import React from "react";
import { ViewsInterface } from "@whatsapp-deluxe/shared";
import MessageView from "./MessageView";
import { Component } from "@react-fullstack/fullstack";
import { TextField, Tooltip, Typography } from '@material-ui/core'
import { CellMeasurer, CellMeasurerCache, List, ListRowRenderer } from "react-virtualized";
import SendIcon from '@material-ui/icons/Send';

class ChatView extends Component<ViewsInterface["ChatView"], { textMessage: string }> {

    state = {
        textMessage: ''
    }

    _cache = new CellMeasurerCache({
        fixedWidth: true,
        keyMapper: (index) => this.props.messages[index]
      });

      componentDidUpdate() {
          if(this._list) {
            this._list.recomputeRowHeights()
          }
      }

    _list: List | null | undefined

    render() {
        let { messages, name, participants } = this.props;


        
        const rowRenderer : ListRowRenderer = ({ index,key,style,parent })=> {
            const message = messages[index];
			return <CellMeasurer columnIndex={0} cache={this._cache} key={key} rowIndex={index} parent={parent} >
                {({measure}) => (
                    <div key={message.id} style={{...style, display: 'flex', flexDirection:'column' }}>
                    <MessageView message={message} />
                </div>
                )}
                    
                </CellMeasurer>;
		}

        return <div>
            <Typography>
                { name }
            </Typography>
            <List
            ref={element => this._list = element}
            deferredMeasurementCache={this._cache}
            overscanRowCount={0}
            height={window.innerHeight - 100}
            width={window.innerWidth - window.innerWidth / 3.33 - 50}
            rowCount={messages.length}
            rowHeight={this._cache.rowHeight}
            rowRenderer={rowRenderer}>
            </List>
            <TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax={4}
          value={this.state.textMessage}
          onChange={(e) => {
              this.setState({ textMessage: e.target.value })
              e.preventDefault();
          }}
        />
        <Tooltip title="send!">
            <SendIcon onClick={() => {
                let message = this.state.textMessage;
                
            }} />
        </Tooltip>
        </div>
    }
}

export default ChatView;