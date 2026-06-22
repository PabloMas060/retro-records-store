import { Card, Col, Button } from "react-bootstrap";
import styles from './index.module.css';
import useMusic from "../../hooks/useMusic";

export const MusicCard = ({ music }) => {
    const { handleDrinkIdClick } = useMusic();

    return (
        <Col md={6} lg={3}>
            <Card className={`mb-4 ${styles.FondoCard}`}>

                <Card.Img
                    variant="top"
                    className={styles.imgCard}
                    src={music.album.images[0].url}
                    alt={music.name}
                />

                <Card.Body>

                    <Card.Title className={styles.NameSong}>
                        {music.name}
                    </Card.Title>

                    <Card.Text className={styles.ArtistName}>
                        {music.artists[0].name}
                    </Card.Text>

                    <Button
                        className={`w-100 text-uppercase mt-3 ${styles.buttonView}`}
                        onClick={() => handleDrinkIdClick(music.id)}
                    >
                        Ver más
                    </Button>

                </Card.Body>

            </Card>
        </Col>
    );
};