import React, { useEffect, useState } from 'react'

function Channel(props: any): JSX.Element {

    const [channelID, setChannelID] = useState('')

    useEffect(() => {
        let channelID = props.match.params.id
        setChannelID(channelID)
    }, [])
    return (
        <div>
            {channelID}
        </div>
    )
}

export default Channel