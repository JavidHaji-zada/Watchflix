import React from 'react'
import { useHistory } from 'react-router-dom'
import { MediaProduct } from '../../models/media-product'

interface MediaProps {
    media: MediaProduct
}
function Media(props: MediaProps): JSX.Element {
    const { media } = props
    const history = useHistory();
    function onMoviePressed() {
        history.replace(`/browse/${media._id}`)
    }
    return (
        <button
            style={styles.button}
            onClick={onMoviePressed}
        >
            <img
                style={{ width: 128, height: 128 }}
                src={media.thumbnail_url}
            />
        </button>
    )
}

const styles = {
    button: {
        backgroundColor: "transparent",
        borderWidth: 0,
    },
}

export default Media