import React from 'react';
import { WebView } from 'react-native-webview';

interface VideoDetailParams {
    navigation;
    route;
}

export class VideoDetail extends React.Component<VideoDetailParams> {
    render() {
        const {ytubeId} = this.props.route.params;
        const url = `https://www.youtube.com/embed/${ytubeId}`;
        return(
            <WebView
                style={{marginTop: 20}}
                javaScriptEnabled={true}
                source={{uri: url}}
            />            
        );
    }
}