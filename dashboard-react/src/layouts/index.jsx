import { Container } from 'react-bootstrap'
import styles from './index.module.css'
import PropTypes from 'prop-types'

export const MainLayout = ({ children }) => {
    return (
        <div className={styles.main}>
            <Container fluid className={styles.container}>
                {children}
            </Container>
        </div>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
}