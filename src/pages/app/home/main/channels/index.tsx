import React, { useEffect, useState } from "react";
import { Col, Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Cache } from "../../../../../shared/libs/cache";

import { Channel } from "../../../../../shared/models/channel";
import { MediaProduct } from "../../../../../shared/models/media-product";

function Channels(): JSX.Element {
    const history = useHistory();

    const [channels, setChannels] = useState<Channel[]>([]);
    const [lastMovie, setLastMovie] = useState<MediaProduct>();
    const [search, setSearch] = useState("");
    const [channelName, setChannelName] = useState("");
    const [channelError, setChannelError] = useState("");
    let [updateScreen, setUpdateScreen] = useState(0);

    useEffect(() => {
        // get channels
        const options: RequestInit = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(
            `http://localhost:5000/channels/${Cache.getCurrentUser().username}`,
            options
        ).then((res) => {
            res.json().then((result) => {
                if (result.failed) {
                } else if (result.success) {
                    let channels = result.data.map(
                        (channel: any) => new Channel(channel)
                    );
                    setChannels(channels);
                    channels.forEach((channel: any) => {
                        fetch(`http://localhost:5000/medias/${channel._id}`, options)
                            .then((res) => {
                                res
                                    .json()
                                    .then((result) => {
                                        if (result.failed) {
                                        } else if (result.success) {
                                            let medias = result.data.map(
                                                (media: any) => new MediaProduct(media)
                                            );
                                            channel.medias = medias;
                                            let curChannels = channels;
                                            curChannels[
                                                curChannels.findIndex((c: any) => c._id == channel._id)
                                            ].medias = medias;
                                            console.log('medias ', medias)
                                            console.log('channels  ', curChannels)
                                            setChannels(curChannels);
                                            setUpdateScreen(updateScreen++);
                                        }
                                    })
                                    .catch((err) => {
                                        console.log("err ", err);
                                    });
                            })
                            .catch((err) => {
                                console.log("err ", err);
                            });
                    });
                }
            });
        });
        fetch(`http://localhost:5000/last_watch/${Cache.getCurrentUser().username}`, options)
            .then(res => {
                res.json().then(result => {
                    console.log('result ', result)
                    setLastMovie(new MediaProduct(result.data))
                })
            })
    }, []);

    function onChannelPressed(channel: Channel): void {
        history.push(`/channel/${channel._id}`);
    }

    function onMoviePressed(media: MediaProduct): void {
        history.replace(`/browse/${media._id}`)
    }

    function createChannel(): void {
        const options: RequestInit = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: channelName,
                username: Cache.getCurrentUser().username,
            }),
        };
        fetch("http://localhost:5000/new_channel", options).then((res) => {
            res.json().then((result) => {
                if (result.failed) {
                    setChannelError(result.failed);
                } else if (result.success) {
                    let channel = new Channel(result.data);
                    history.replace(`/channel/${channel._id}`);
                }
            });
        });
    }

    return (
        <div
            style={{ ...styles.container, flexDirection: "column", flexWrap: "wrap" }}
        >
            {lastMovie && (
                <div
                    style={{
                        ...styles.continueWatch,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <p style={{ ...styles.channelName, fontWeight: "bold" }}>
                            Continue Watching
						</p>
                        <button
                            style={styles.button}
                            onClick={() => onMoviePressed(lastMovie)}
                        >
                            <img
                                style={styles.thumbnailStyle}
                                src={lastMovie.thumbnail_url}
                            />
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
                        <div style={{ flexDirection: "row", display: "flex" }}>
                            <input
                                type="text"
                                placeholder="Enter channel name"
                                onChange={(e) => setChannelName(e.target.value)}
                                value={channelName}
                                maxLength={24}
                                style={{ marginRight: 8, borderRadius: 6, paddingLeft: 6 }}
                            />
                            <Button
                                onClick={createChannel}
                                disabled={channelName == ""}
                                variant="danger"
                            >
                                New Channel
							</Button>
                        </div>
                    </div>
                </div>
            )}
            {channels.map((channel: Channel) => (
                <div key={channel._id} style={{ ...styles.channelContainer, flexDirection: "column" }}>
                    <button
                        style={styles.button}
                        onClick={() => onChannelPressed(channel)}
                    >
                        <u style={{ ...styles.channelName, fontWeight: "bold" }}>
                            {channel.name}
                        </u>
                    </button>
                    <div>
                        {channel?.medias.length == 0 ? (
                            <div style={{ color: "red", fontSize: 24 }}>
                                No media found!
                            </div>
                        ) : (
                                channel?.medias.map((media) => (
                                    <button
                                        style={styles.button}
                                        onClick={() => onMoviePressed(media)}
                                    >
                                        <img
                                            style={{ width: 128, height: 128 }}
                                            src={media.thumbnail_url}
                                        />
                                    </button>
                                ))
                            )}
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        flex: 1,
        display: "flex",
    },
    channelContainer: {
        flex: 1,
        maxHeight: 180,
    },
    channelName: {
        color: "white",
        margin: 0,
    },
    thumbnailStyle: {
        width: 128,
        height: 128,
    },
    button: {
        backgroundColor: "transparent",
        borderWidth: 0,
    },
    continueWatch: {
        display: "flex",
        height: 180,
    },
};

export default Channels;
