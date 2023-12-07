import React, { Component } from 'react';
import { Keyboard, TextInput, View } from 'react-native';

 export default class Example extends Component {
    constructor(){
        super();
        this.state = {
            keyboardOffset: 0,
        };
    }
    

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow(event) {
        this.setState({
            keyboardOffset: event.endCoordinates.height,
        })
    }

    _keyboardDidHide() {
        this.setState({
            keyboardOffset: 0,
        })
    }

    render() {
        return <View style={{flex: 1}}>
            <TextInput
                style={{
                    position: 'absolute',
                    width:    '100%',
                    bottom:   this.state.keyboardOffset,
                }}
                onSubmitEditing={Keyboard.dismiss}
            />
        </View>;
    }
}