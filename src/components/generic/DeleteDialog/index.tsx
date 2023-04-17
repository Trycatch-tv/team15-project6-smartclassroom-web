import * as React from 'react';
import { Component, ChangeEvent } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IDeleteProp } from '../../../types/generic.type';
import DeleteIcon from "@mui/icons-material/Delete";

type State = { open: boolean };
export default class DeleteDialog extends Component<IDeleteProp, State> {
    constructor(props: IDeleteProp) {
      super(props);
      this.onYes = this.onYes.bind(this);
      this.onNo = this.onNo.bind(this);

    }
    onYes = () => {
      this.props.handlerYes();
    }
    onNo = () => {
      this.props.handlerNo();
    }
    render() {
        return (
          <>
            <Dialog open={this.props.open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {this.props.description} <b>{this.props.elementName}</b>?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" color='error'   onClick={this.onYes} autoFocus>Eliminar</Button>
                  <Button variant="contained" color='primary' onClick={this.onNo}>Cancelar</Button>
                </DialogActions>
            </Dialog>
          </>
        );
    }
}