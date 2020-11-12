import React from 'react';
import { Text, View, FlatList, Image, TouchableWithoutFeedback } from 'react-native';

interface VideoProps {
    navigation;
}

interface VideoState {
    listLoaded: boolean;
    videoList: any[];
}

export class Video extends React.Component<VideoProps, VideoState> {
    constructor(props) {
        super(props);
        this.state = { listLoaded: false, videoList: [] };
    }

    componentDidMount = () => {
        return fetch(
            'https://www.googleapis.com/youtube/v3/search?part=snippet&q=pluralsight&type=video&key=AIzaSyBhc_GeGnOVfxJ-XsMpQRuLwRYVXEdQA74')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    listLoaded: true,
                    videoList: Array.from(responseJson.items)
                });
            })
            .catch(err => console.error(err));
    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.videoList.length) for (const item of this.state.videoList) console.log(item.id.videoId);

        return (
            <View>
                {(this.state.listLoaded && this.state.videoList.length) &&
                    <View style={{ paddingTop: 30 }}>
                        <FlatList data={this.state.videoList}
                            renderItem={({ item }) =>
                                <TubeItem
                                    navigate={navigate}
                                    key={item.id.etag}
                                    id={item.id.videoId}
                                    title={item.snippet.title}
                                    imageSrc={item.snippet.thumbnails.high.url} />
                            }
                        />
                    </View>
                }

                {!this.state.listLoaded &&
                    <View style={{ paddingTop: 30 }}>
                        <Text> LOADING </Text>
                    </View>
                }
            </View>
        );
    }
}

interface TubeItemProps {
    navigate;
    id: number;
    title: string;
    imageSrc: string;
}

export class TubeItem extends React.Component<TubeItemProps> {
    onPress = () => {
        this.props.navigate('VideoDetailRT', {ytubeId: this.props.id});
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={{ paddingTop: 20, alignItems: 'center' }}>
                    <Image
                        style={{ width: '100%', height: 200 }}
                        source={{ uri: this.props.imageSrc }}
                    />
                    <Text style={{fontSize: 20}}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}