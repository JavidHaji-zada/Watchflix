import { CSSProperties } from 'react';
const infoTextContainer: CSSProperties = {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
}

const infoText: CSSProperties = {
    fontSize: 24,
    textAlign: 'justify'
}

// some inline styling props
const styles = { infoTextContainer, infoText }
export default styles