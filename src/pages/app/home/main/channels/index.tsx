import React, { useEffect, useState } from 'react'
import { Col, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { Cache } from '../../../../../shared/libs/cache';

import { Channel } from '../../../../../shared/models/channel'
import { MediaProduct } from '../../../../../shared/models/media-product';

function Channels(): JSX.Element {
    const history = useHistory();

    const [channels, setChannels] = useState<Channel[]>([]);
    const [lastMovie, setLastMovie] = useState<MediaProduct>();
    const [search, setSearch] = useState('')
    const [channelName, setChannelName] = useState('')
    const [channelError, setChannelError] = useState('');

    useEffect(() => {
        // get channels
        let channels = []
        let mediaProduct1 = new MediaProduct({ _id: 'id1', score: 5, release_date: new Date(), name: 'Kung Fu Panda', thumbnail_url: 'https://img1.evosis.org/movie/629/icon/icon0.png' })
        let channel1 = new Channel({ _id: 'id1', name: 'My Channel', medias: [mediaProduct1] })
        let mediaProduct2 = new MediaProduct({ _id: 'id2', score: 5, release_date: new Date(), name: 'Inception', thumbnail_url: 'https://bsaber.com/wp-content/uploads/2019/05/18598-20226.jpg' })
        let mediaProduct3 = new MediaProduct({ _id: 'id3', score: 4.7, release_date: new Date(), name: 'Tenet', thumbnail_url: 'https://images.pexels.com/users/avatars/3485071/watch-online-tenet-2020-free-hd-full-movie-969.jpeg?w=256&h=256&fit=crop&auto=compress' })
        let channel2 = new Channel({ _id: 'id2', name: 'Beyin Yakanlar', medias: [mediaProduct1, mediaProduct2, mediaProduct3, mediaProduct3] })
        channels.push(channel1, channel2)
        setChannels(channels)
        setLastMovie(mediaProduct3)
    }, [])

    console.log('channels ', channels)

    function onChannelPressed(channel: Channel): void {
        history.push(`/channel/${channel._id}`)
    }

    function onMoviePressed(media: MediaProduct): void {

    }

    function createChannel(): void {
        const options: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: channelName, username: Cache.getCurrentUser().username
            })
        }
        fetch('http://localhost:5000/new_channel', options)
            .then(res => {
                res.json().then(result => {
                    console.log('result ', result)
                    if (result.failed) {
                        setChannelError(result.failed)
                    } else if (result.success) {
                        let channel = new Channel(result.data)
                        history.replace(`/channel/${channel._id}`)
                    }
                })
            })
    }

    return (
        <div style={{ ...styles.container, flexDirection: 'column', flexWrap: 'wrap' }}>
            {
                lastMovie && (
                    <div style={{ ...styles.continueWatch, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ ...styles.channelName, fontWeight: 'bold' }}>Continue Watching</p>
                            <button style={styles.button} onClick={() => onMoviePressed(lastMovie)}>
                                <img style={styles.thumbnailStyle} src={lastMovie.thumbnail_url} />
                            </button>
                        </div>
                        <div>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FaSearch />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search here.."
                                            onChange={(e) => setSearch(e.target.value)}
                                            value={search}
                                            onSubmit={() => {
                                                //TODO submit
                                            }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <div style={{ flexDirection: 'row', display: 'flex' }}>
                                <input
                                    type="text"
                                    placeholder="Enter channel name"
                                    onChange={(e) => setChannelName(e.target.value)}
                                    value={channelName}
                                    maxLength={24}
                                    style={{ marginRight: 8, borderRadius: 6, paddingLeft: 6 }}
                                />
                                <Button onClick={createChannel} disabled={channelName == ''} variant='danger'>New Channel</Button>
                            </div>

                        </div>
                    </div>
                )
            }
            {
                channels.map((channel: Channel) => (
                    <div style={{ ...styles.channelContainer, flexDirection: 'column' }}>
                        <button style={styles.button} onClick={() => onChannelPressed(channel)}>
                            <u style={{ ...styles.channelName, fontWeight: 'bold' }}>{channel.name}</u>
                        </button>
                        <div>
                            {channel.medias.map(media => (
                                <button style={styles.button} onClick={() => onMoviePressed(media)}>
                                    <img style={styles.thumbnailStyle} src={media.thumbnail_url} />
                                </button>
                            ))}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

const styles = {
    container: {
        flex: 1,
        display: 'flex',
    },
    channelContainer: {
        flex: 1,
        maxHeight: 180,
    },
    channelName: {
        color: 'white',
        margin: 0
    },
    thumbnailStyle: {
        width: 128,
        height: 128,
    },
    button: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    continueWatch: {
        display: 'flex',
        height: 180
    }
}

export default Channels