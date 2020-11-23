import { CSSProperties } from 'react';
import colors from '../../shared/colors';
const container: CSSProperties = {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center'
}
const profileContainer: CSSProperties = {
    width: 300,
    height: 250,
    backgroundColor: colors.greys.porcelain,
    margin: 10,
    padding: 10,
}

const imageContainer: CSSProperties = {
    width: 75,
    height: 75,
    margin: 10
}

// some inline styling props
const styles = { profileContainer, imageContainer, container }
export default styles